// 1. Import dependencies
import 'server-only';
import { auth, currentUser } from "@clerk/nextjs/server";
import { createAI, createStreamableValue, getMutableAIState } from 'ai/rsc';
import { OpenAI } from 'openai';

export const maxDuration = 180;

// 1. Initialize OpenAI clients 
// 1a. For GPT4 Turbo Model (OpenAI)
const openai = new OpenAI({
  apiKey: process.env.OPENAIAAK96_API_KEY,
});

// 1b. For Cohere Command R+ (Azure)

// 1c. For GPT3.5 (Azure)

// 2. Define interfaces for search results and content results
interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon: string;
}
interface ContentResult extends SearchResult {
  html: string;
}

interface FetchDataParams {
  github_url: string;
  user_id?: string;
  user_query: string;
  dev_expertise?: string;
  task?: string;
  repo_expertise?: string;
  response_type?: string;
  dev_languages?: string;
}
interface RetreivalResults {
  prompt: RagPrompt;
  download_sources: DownloadSource[];
  documentation_sources_list: DocumentationSource[];
  code_sources: CodeSource[];
}

interface RagPrompt {
  instructions: string;
  instruction_reiterate: string;
  user_query: string;
  task: string;
  tags: string[]; 
  token_lengths: TokenLengths;
  downloads?: string;
  documentation?: string;
  code?: string;
}

interface TokenLengths {
  instructions?: number;
  downloads?: number;
  documentation?: number;
  code?: number;
  instruction_reiterate?: number;
  user_query?: number;
}

interface DownloadSource {
  download_instruction: string;
  download_type: string;
  download_description: string;
  download_source: string;
}

interface DocumentationSource {
  doc_type: string;
  doc_filename: string;
  doc_path: string;
  doc_source_directory: string;
}

interface CodeSource {
  file_path: string;
  dependancy_count: number;
}

interface Message {
  id: number;
  type: string;
  content: string;
  userMessage: string;
  isStreaming: boolean;
  searchResults?: RetreivalResults;
}

async function getSources({ github_url = 'https://github.com/huggingface/transformers', user_id = 'admin', user_query }: FetchDataParams): Promise<RetreivalResults> {
  try {
    const data = {
      github_url,
      user_id,
      user_query,
    };
    console.log('Request data:', data);

    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch('http://20.197.51.194:80/fetchdata', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();
    // console.log('Response JSON:', jsonResponse);

    return jsonResponse;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
}

const dboperationsUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/dboperations` : 'http://localhost:3000/api/dboperations';

const checkChatLimits = async (userId: string, userEmail: string) => {
  const params = new URLSearchParams({
    userId,
    userEmail,
    repoLimit: 'false',  
  });

  try {
    const response = await fetch(`${dboperationsUrl}/apiLimits/checkLimit?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // console.log('Check chat limits result:', result);
    return result;
  } catch (error) {
    console.error('Failed to fetch chat limits:', error);
    return null;
  }
};


async function myAction(userMessage: string, previousMessages: Message[], loadedRepo: any, userPreferences: any): Promise<any> {
  "use server";
  const { userId, sessionClaims } = auth();
  const { repoUrl,repoFullName,repoOrgName,repoName } = loadedRepo;
  const { chatRepoTasks, knowRepoOptions, coderOptions, fluffyResponseOptions, languagesOptions } = userPreferences;

  const userEmail: string = sessionClaims?.email as string || "";

  // console.log('User Id:', userId);
  // console.log('Session Claims:', sessionClaims);
  // console.log('User Email:', userEmail);
  // console.log('Repo Url:', repoUrl);
  // console.log('Repo Full Name:', repoFullName);
  // console.log('Repo Org Name:', repoOrgName);
  // console.log('Repo Name:', repoName);
  // console.log('Chat Repo Tasks:', chatRepoTasks);
  // console.log('Know Repo Options:', knowRepoOptions);
  // console.log('Coder Options:', coderOptions);
  // console.log('Fluffy Response Options:', fluffyResponseOptions);
  // console.log('Languages Options:', languagesOptions);
  // console.log('User Message:', userMessage);


  // console.log('Prev messages length:', previousMessages.length);
  // console.log('User Id', userId);
  // console.log('User email', sessionClaims?.email);

  const streamable = createStreamableValue({});

  if (!userId) {
    streamable.update({ 'llmResponse': "Please login to talk to the Repo" });
    streamable.update({ 'llmResponseEnd': true });
    streamable.done({ status: 'done' });
    return streamable.value;
  } 

  const limitCheck = await checkChatLimits(userId, userEmail);

  if (limitCheck.limitExceeded) {
    streamable.update({ 'llmResponse': "You have reached your chat limit. Please upgrade your account or wait until your limit resets." });
    streamable.update({ 'llmResponseEnd': true });
    streamable.done({ status: 'done' });
    return streamable.value;
  }

  if (!repoUrl) {
    streamable.update({ 'llmResponse': "Repo not recogonized, please try again." });
    streamable.update({ 'llmResponseEnd': true });
    streamable.done({ status: 'done' });
    return streamable.value;
  } 

  
  const finalContent: Array<any> = [];

  // (async () => {
  //   // console.log('userMessage', userMessage);
  //   const sourcesQuery: FetchDataParams = {
  //     user_query: userMessage,
  //     github_url: loadedRepoUrl,
  //   };
  //   console.log('Sources query:', sourcesQuery);
  //   const [sources] = await Promise.all([
  //     getSources(sourcesQuery)
  //   ]);

  //   console.log('Sources keys:', sources);

  //   streamable.update({ 'searchResults': sources });
    
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages:
  //       [{
  //         role: "system", content: `
  //         - Here is my query "${userMessage}", respond back with an answer that is as long as possible. If you can't find any relevant results, respond with "No relevant results found." `
  //       }], 
  //       stream: true, 
  //       model: "gpt-4-turbo-preview",
  //       temperature: 0,
  //   });

  //   for await (const chunk of chatCompletion) {
  //     if (chunk.choices[0]?.delta?.content && chunk.choices[0]?.finish_reason !== "stop") {
  //       streamable.update({ 'llmResponse': chunk.choices[0].delta.content });
  //       finalContent.push(chunk.choices[0].delta.content);
  //       console.log('Streamed contents:', chunk.choices[0].delta.content);
  //     } else if (chunk.choices[0]?.finish_reason === "stop") {
  //       streamable.update({ 'llmResponseEnd': true });
  //       // console.log('Final streamed contents:', finalContent.join(''));
  //     }
  //   }

  //   streamable.done({ status: 'done' });
  // })();
  
  streamable.done({ status: 'done' })
  return streamable.value;
}
// 11. Define initial AI and UI states
const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
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
    myAction
  },
  initialUIState,
  initialAIState,
}); 