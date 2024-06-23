// app/action.tsx
import "server-only";
import { auth } from "@clerk/nextjs/server";
import { createAI, createStreamableValue } from "ai/rsc";
import { OpenAI } from "openai";
import {
  FetchDataParams,
  RetrievalResults,
  Message,
  UserPreferences,
  FluffyThoughts,
  GenerationStates,
  Chat,
  ChatCompletionOpenAI,
} from "@/lib/typesserver";
import { config, fixedParams } from "@/lib/config";
import {
  evaluationInstruction,
  retreivalInstruction,
  freeQueryInstruction,
  evaluationInstructionRetreival,
} from "@/lib/utils";
import {checkChatLimits, saveChat, updateChatLimit} from "@/lib/mongodbcalls";
export const maxDuration = 180;

// Client for generation
const openai = new OpenAI({
  apiKey: process.env.OPENAIAAK96_API_KEY,
});

// Client for evaluation
const openai35turbo = new OpenAI({
  apiKey: process.env.OPENAIAAK96_API_KEY,
});

// Fetch sources
async function getSources({
  github_url,
  user_id = "admin",
  user_query,
}: FetchDataParams): Promise<RetrievalResults> {
  const sourcesUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/fetchsources`
  : "http://localhost:3000/api/fetchsources";
  try {
    const data = {
      github_url,
      user_id,
      user_query,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(sourcesUrl, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ messages: data }),
    });

    if (response.ok) {
      try {
        const jsonResponse = await response.json();
        return jsonResponse;
      } catch (jsonError) {
        console.error("Error parsing JSON response:", jsonError);
        throw new Error("Received malformed JSON from the server.");
      }
    } else {
      const errorText = await response.text();
      console.error(`HTTP Error: ${response.status} - ${errorText}`);
      throw new Error(
        `Server responded with error ${response.status}: ${errorText}`
      );
    }
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
}

// Evaluate responses
const chatContextEvaluator = async (
  evalInstruction: string,
  generatedAnswer: string,
  userQuery: string,
  context: string
): Promise<ChatCompletionOpenAI> => {
  return await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: evalInstruction,
      },
      {
        role: "user",
        content: `###CONTEXT###
        ${context}
        ###USER QUERY###
        ${userQuery}

        ###GENERATED ANSWER###
        ${generatedAnswer}`,
      },
    ],
    model: "gpt-4o",
    response_format: { type: "json_object" },
    temperature: 0.1,
  });
};

const chatFreeEvaluator = async (
  evalInstruction: string,
  generatedAnswer: string,
  userQuery: string
): Promise<ChatCompletionOpenAI> => {
  return await openai35turbo.chat.completions.create({
    messages: [
      {
        role: "system",
        content: evalInstruction,
      },
      {
        role: "user",
        content: `###USER QUERY###
        ${userQuery}

        ###GENERATED ANSWER###
        ${generatedAnswer}`,
      },
    ],
    model: "gpt-3.5-turbo",
    response_format: { type: "json_object" },
    temperature: 0.1,
  });
};

// Core handler
async function myAction(
  userMessage: string,
  rawMessage: string,
  allMessages: Message[],
  loadedRepo: any,
  userPreferences: UserPreferences,
  currentMessage: Message
): Promise<any> {
  "use server";
  const { userId, sessionClaims } = auth();
  const {
    repoUrl,
    repoFullName,
    repoOrgName,
    repoName,
    serviceKey,
    repoId,
    chatId,
  } = loadedRepo;
  const {
    chatRepoTasks,
    knowRepoOptions,
    coderOptions,
    fluffyResponseOptions,
    languagesOptions,
  } = userPreferences;
  const userEmail: string = (sessionClaims?.email as string) || "";
  const userName: string = (sessionClaims?.fullName as string) || "";
  const streamable = createStreamableValue({});

  currentMessage.fluffyStatus = {
    gateKeepingChecks: "queued",
    gateKeepingStatus: "queued",
    sourcesNeeded: "No",
    sourcesFetched: "queued",
    fluffyThoughtsNeeded: "Yes",
    fluffyThoughtsFetched: "queued",
    llmResponseFetched: "queued",
    llmResponseEnd: "No",
    fluffyStatusOverall: "queued",
  };

  currentMessage.fluffyThoughts = {
    title: "",
    shortSummary: "",
    detailedSummary: "",
    tags: [],
    score: 0,
    edgeCases: [],
    feedbackonAccuracy: "",
    feedbackonCompleteness: "",
    fluffyFeedback: "",
    searchPhrases: [],
    followUp: [],
  };

  streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

  if (!userId) {
    currentMessage.fluffyStatus.gateKeepingChecks = "failed";
    currentMessage.fluffyStatus.gateKeepingStatus = "no_user_id";
    currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
    streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
  } else {
    const limitCheck = await checkChatLimits(userId, userEmail);
    if (limitCheck?.limitExceeded) {
      currentMessage.fluffyStatus.gateKeepingChecks = "failed";
      currentMessage.fluffyStatus.gateKeepingStatus = "limits_exceeded";
      currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
      streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
    } else if (!repoUrl) {
      currentMessage.fluffyStatus.gateKeepingChecks = "failed";
      currentMessage.fluffyStatus.gateKeepingStatus = "no_repo_url";
      currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
      streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
    } else {
      currentMessage.fluffyStatus.gateKeepingChecks = "passed";
      currentMessage.fluffyStatus.gateKeepingStatus = "success";
      currentMessage.fluffyStatus.fluffyStatusOverall = "inprogress";
      streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
    }
  }

  switch (currentMessage.fluffyStatus.gateKeepingChecks) {
    case "failed":

    case "passed":
      const finalContent: Array<any> = [];
      currentMessage.fluffyStatus.sourcesNeeded =
        repoFullName === "fluffy/llm" ? "No" : "Yes";
      currentMessage.fluffyStatus.sourcesFetched =
        currentMessage.fluffyStatus.sourcesNeeded === "Yes"
          ? "queued"
          : "skipped";
      streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

      const promptChatTasks =
        currentMessage.fluffyStatus.sourcesNeeded === "Yes"
          ? fixedParams[chatRepoTasks]
          : fixedParams[`${chatRepoTasks}Free`];
      const promptKnowRepoOptions = fixedParams[knowRepoOptions];
      const promptCoderOptions = fixedParams[coderOptions];
      const promptLanguageOptions = `${fixedParams.language
        } ${languagesOptions.join(", ")} ${fixedParams.languageend}`;
      const promptFluffyResponseOptions = fixedParams[fluffyResponseOptions];
      const promptFluffyResponseTokens =
        fixedParams[`${fluffyResponseOptions}Token`];
      const promptChatRepoTasksAugment =
        currentMessage.fluffyStatus.sourcesNeeded === "Yes"
          ? fixedParams[`${chatRepoTasks}Augment`]
          : fixedParams[`${chatRepoTasks}AugmentContext`];

      (async () => {
        if (currentMessage.fluffyStatus.sourcesNeeded === "Yes") {
          currentMessage.fluffyStatus.sourcesFetched = "inprogress";
          streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

          const sourcesQuery: FetchDataParams = {
            user_query: rawMessage,
            github_url: repoUrl,
          };

          const sources = await getSources(sourcesQuery);

          currentMessage.fluffyStatus.sourcesFetched = "done";
          currentMessage.sources = sources;
          currentMessage.tags = currentMessage.sources.prompt?.tags;
          streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
          streamable.update({ sources: currentMessage.sources });
          streamable.update({ tags: currentMessage.tags });

          currentMessage.contextUsed = `${currentMessage.sources.prompt.downloads} ${currentMessage.sources.prompt.documentation} ${currentMessage.sources.prompt.code} `;
          currentMessage.instructionUsed = retreivalInstruction(
            repoFullName,
            repoUrl,
            promptChatTasks,
            promptKnowRepoOptions,
            promptCoderOptions,
            promptLanguageOptions,
            promptChatRepoTasksAugment,
            promptFluffyResponseOptions
          );

          try {
            const chatCompletion = await openai.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: `${currentMessage.instructionUsed} ${currentMessage.contextUsed}`,
                },
                {
                  role: "user",
                  content: `${userMessage}`,
                },
              ],
              stream: true,
              model: "gpt-4o",
              temperature: 0.2,
              max_tokens: promptFluffyResponseTokens,
            });

            for await (const chunk of chatCompletion) {
              currentMessage.fluffyStatus.llmResponseFetched = "inprogress";
              streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
              if (
                chunk.choices[0]?.delta?.content &&
                chunk.choices[0]?.finish_reason !== "stop"
              ) {
                finalContent.push(chunk.choices[0].delta.content);
                streamable.update({
                  llmResponse: chunk.choices[0].delta.content,
                });
              } else if (chunk.choices[0]?.finish_reason === "stop") {
                currentMessage.fluffyStatus.llmResponseEnd = "Yes";
                streamable.update({
                  fluffyStatus: currentMessage.fluffyStatus,
                });
                streamable.update({ llmResponseEnd: true });
              }
            }
          } catch (error) {
            currentMessage.fluffyStatus.llmResponseFetched = "failed";
            currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            console.error("Error in chat completion:", error);
          }

          currentMessage.content = finalContent.join(" ");
          currentMessage.fluffyStatus.llmResponseFetched = "done";
          currentMessage.fluffyStatus.fluffyThoughtsFetched = "inprogress";
          streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

          const evalInstruction = evaluationInstructionRetreival(
            repoFullName,
            repoUrl,
            promptChatTasks,
            promptKnowRepoOptions,
            promptCoderOptions,
            promptLanguageOptions
          );

          try {
            const rawEvalResponse = await chatContextEvaluator(
              evalInstruction,
              currentMessage.content,
              userMessage,
              currentMessage.contextUsed
            );

            let parsedContent: any;
            try {
              parsedContent = JSON.parse(
                rawEvalResponse?.choices[0]?.message?.content
              );
            } catch (error) {
              console.error("Failed to parse JSON in eval response:", error);
              parsedContent = {
                title: "",
                shortSummary: "",
                detailedSummary: "",
                tags: [],
                score: 0,
                edgeCases: [],
                feedbackonAccuracy: "",
                feedbackonCompleteness: "",
                fluffy_feedback: "",
                searchPhrases: [],
                followUp: [],
              };
            }

            currentMessage.fluffyThoughts = {
              title: parsedContent.title ?? "",
              shortSummary: parsedContent.shortSummary ?? "",
              detailedSummary: parsedContent.detailedSummary ?? "",
              tags: parsedContent.tags ?? [],
              score: Number(parsedContent.score) ?? 0,
              edgeCases: parsedContent.unaddressed_issues_and_edge_cases ?? [],
              feedbackonAccuracy: parsedContent.feedback_on_accuracy ?? "",
              feedbackonCompleteness:
                parsedContent.feedback_on_completeness ?? "",
                fluffyFeedback : parsedContent.fluffy_feedback ?? "",
              searchPhrases: parsedContent.search_phrases ?? [],
              followUp: parsedContent.follow_up ?? [],
            } as FluffyThoughts;

            
            currentMessage.fluffyStatus.fluffyThoughtsFetched = "done";
            currentMessage.fluffyStatus.fluffyThoughtsFetched = "done";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            streamable.update({
              fluffyThoughts: currentMessage.fluffyThoughts,
            });
          } catch (error) {
            currentMessage.fluffyStatus.fluffyThoughtsFetched = "failed";
            currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            console.error("Error in evaluation:", error);
          }
        } else {
          currentMessage.fluffyStatus.sourcesFetched = "skipped";
          streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

          currentMessage.instructionUsed = freeQueryInstruction(
            promptChatTasks,
            promptCoderOptions,
            promptLanguageOptions,
            promptChatRepoTasksAugment,
            promptFluffyResponseOptions
          );
          try {
            const chatCompletion = await openai.chat.completions.create({
              messages: [
                {
                  role: "system",
                  content: `${currentMessage.instructionUsed} `,
                },
                {
                  role: "user",
                  content: `${userMessage}`,
                },
              ],
              stream: true,
              model: "gpt-4o",
              temperature: 0.2,
              max_tokens: promptFluffyResponseTokens,
            });

            for await (const chunk of chatCompletion) {
              currentMessage.fluffyStatus.llmResponseFetched = "inprogress";
              streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
              if (
                chunk.choices[0]?.delta?.content &&
                chunk.choices[0]?.finish_reason !== "stop"
              ) {
                finalContent.push(chunk.choices[0].delta.content);
                streamable.update({
                  llmResponse: chunk.choices[0].delta.content,
                });
              } else if (chunk.choices[0]?.finish_reason === "stop") {
                currentMessage.fluffyStatus.llmResponseEnd = "Yes";
                streamable.update({
                  fluffyStatus: currentMessage.fluffyStatus,
                });
                streamable.update({ llmResponseEnd: true });
              }
            }
          } catch (error) {
            currentMessage.fluffyStatus.llmResponseFetched = "failed";
            currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            console.error("Error in chat completion:", error);
          }

          currentMessage.content = finalContent.join(" ");
          currentMessage.fluffyStatus.llmResponseFetched = "done";
          currentMessage.fluffyStatus.fluffyThoughtsFetched = "inprogress";
          streamable.update({ fluffyStatus: currentMessage.fluffyStatus });

          const evalInstruction = evaluationInstruction(
            repoFullName,
            repoUrl,
            promptChatTasks,
            promptKnowRepoOptions,
            promptCoderOptions,
            promptLanguageOptions
          );
          try {
            const rawEvalResponse = await chatFreeEvaluator(
              evalInstruction,
              currentMessage.content,
              userMessage
            );

            let parsedContent: any;
            try {
              parsedContent = JSON.parse(
                rawEvalResponse?.choices[0]?.message?.content
              );
            } catch (error) {
              console.error("Failed to parse JSON in eval response:", error);
              parsedContent = {
                title: "",
                shortSummary: "",
                detailedSummary: "",
                tags: [],
                score: 0,
                edgeCases: [],
                feedbackonAccuracy: "",
                feedbackonCompleteness: "",
                searchPhrases: [],
                followUp: [],
              };
            }

            currentMessage.fluffyThoughts = {
              title: parsedContent.title ?? "",
              shortSummary: parsedContent.shortSummary ?? "",
              detailedSummary: parsedContent.detailedSummary ?? "",
              tags: parsedContent.tags ?? [],
              score: Number(parsedContent.score) ?? 0,
              edgeCases: parsedContent.unaddressed_issues_and_edge_cases ?? [],
              feedbackonAccuracy: parsedContent.feedback_on_accuracy ?? "",
              feedbackonCompleteness:
                parsedContent.feedback_on_completeness ?? "",
              fluffyFeedback: parsedContent.fluffy_feedback ?? "",
              searchPhrases: parsedContent.search_phrases ?? [],
              followUp: parsedContent.follow_up ?? [],
            } as FluffyThoughts;

            currentMessage.fluffyStatus.fluffyThoughtsFetched = "done";
            currentMessage.fluffyStatus.fluffyThoughtsFetched = "done";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            streamable.update({
              fluffyThoughts: currentMessage.fluffyThoughts,
            });
          } catch (error) {
            currentMessage.fluffyStatus.fluffyThoughtsFetched = "failed";
            currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
            streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
            console.error("Error in evaluation:", error);
          }
        }

        // console.log("Fluffy Response Rack:", currentMessage);
        // console.log("Fluffy Status Rack:", currentMessage.fluffyStatus);
        
        if (currentMessage.fluffyThoughts) {
          // Append tags if fluffyThoughts.tags is not an empty list
          if (currentMessage.fluffyThoughts.tags && currentMessage.fluffyThoughts.tags.length > 0) {
              currentMessage.tags = [...currentMessage.tags, ...currentMessage.fluffyThoughts.tags];
          }

          // Set title if fluffyThoughts.title is not an empty string
          if (currentMessage.fluffyThoughts.title && currentMessage.fluffyThoughts.title !== "") {
              currentMessage.title = currentMessage.fluffyThoughts.title;
          }

          // Set shortSummary if fluffyThoughts.shortSummary is not an empty string
          if (currentMessage.fluffyThoughts.shortSummary && currentMessage.fluffyThoughts.shortSummary !== "") {
              currentMessage.shortSummary = currentMessage.fluffyThoughts.shortSummary;
          }

          // Set shortSummary to detailedSummary if fluffyThoughts.detailedSummary is not an empty string
          if (currentMessage.fluffyThoughts.detailedSummary && currentMessage.fluffyThoughts.detailedSummary !== "") {
              currentMessage.shortSummary = currentMessage.fluffyThoughts.detailedSummary;
          }
        }

        streamable.update({ fluffyThoughts: currentMessage.fluffyThoughts });

        // console.log(currentMessage.fluffyThoughts)

        const messageIndex = allMessages.findIndex(
          (msg) => msg.id === currentMessage.id
        );
        if (messageIndex !== -1) {
          allMessages.splice(messageIndex, 1);
        }

        const newMessage: Message = currentMessage;

        // Add the new message at the end of the modified allMessages list
        allMessages.push(newMessage);

        // Find the earliest and latest createdAt dates
        const createdAtTimestamps = allMessages.map((msg) =>
          new Date(msg.createdAt).getTime()
        );
        const earliestCreatedAt = new Date(Math.min(...createdAtTimestamps));
        const latestCreatedAt = new Date(Math.max(...createdAtTimestamps));

        // Construct embedText by looping through all messages
        let embedText = allMessages
          .map(
            (msg) =>
              `Title: ${msg.title}\nUser Query: ${msg.userMessage}\nDescriptions: ${msg.shortSummary}\nDetailed Description: ${msg.detailedSummary}\nAnswer: ${msg.content}`
          )
          .join("\n\n");

        // Modify chatObject before returning it
        let chatObject: Chat = {
          repoId: repoId,
          path: `playground/${chatId}/repochat/${repoId}`,
          sharePath: `share/${chatId}/repochat/${repoId}`,
          uniqueId: `${chatId}-${repoId}`,
          chatId: chatId,
          repoUrl: repoUrl,
          repoName: repoName,
          title: currentMessage.title,
          description: currentMessage.shortSummary || "",
          service: serviceKey,
          createdAt: earliestCreatedAt.toISOString(),
          lastUpdatedAt: latestCreatedAt.toISOString(),
          shareSettings: "public",
          userEmail: userEmail,
          userName: userName,
          userId: userId || "",
          embedText: embedText,
          messages: allMessages,
        };

        // console.log("Chat Object:", chatObject);

        const handleChatOperation = async () => {
          try {
            const saveResult = await saveChat(chatObject);
            console.log("Chat operation result:", saveResult);
        
            if (saveResult) {
              const limitUpdateResult = await updateChatLimit(chatObject.userId);
              console.log("Limit update result:", limitUpdateResult);
            }
          } catch (error) {
            console.error("Error handling chat operation:", error);
          }
        };
        
        handleChatOperation();

        streamable.done({ status: "done" });
      })();
      return streamable.value;
  }
}

// 11. Define initial AI and UI states
const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

// 12. Export the AI instance
export const AI = createAI({
  actions: {
    myAction,
  },
  initialUIState,
  initialAIState,
});
