import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from 'nanoid'
import { Buffer } from 'buffer';
import { v4 as uuidv4 } from 'uuid';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function subtaskparse(inputStr: string) {
  let startIndex = inputStr.indexOf('[');
  let bracketCount = 0;
  let endIndex = -1;

  for (let i = startIndex; i < inputStr.length; i++) {
      if (inputStr[i] === '[') {
          bracketCount++;
      } else if (inputStr[i] === ']') {
          bracketCount--;
          if (bracketCount === 0) {
              endIndex = i;
              break;
          }
      }
  }

  let subtasks = (startIndex !== -1 && endIndex !== -1) ? inputStr.slice(startIndex + 1, endIndex) : '';

  // B. Obtain the text within each {...} in subtasks variable and store as an array called subtasksListRaw
  let subtasksListRaw = subtasks.match(/{.*?}/g) || [];
  let subtasksList = subtasksListRaw.map(subtaskRaw => {
      let indexMatch = subtaskRaw.match(/'index':\s*(.*?),/);
      let subtaskNameMatch = subtaskRaw.match(/'subtaskName':\s*'(.*?)',/);
      let subtaskDescriptionMatch = subtaskRaw.match(/'subtaskDescription':\s*'(.*?)',/);
      let solutionTypeMatch = subtaskRaw.match(/'solutionType':\s*'(.*?)',/);
      let solutionDescriptionMatch = subtaskRaw.match(/'solutionDescription':\s*'(.*?)',/);
      let solutionCalloutsMatch = subtaskRaw.match(/'solutionCallouts':\s*'(.*?)'/);

      return {
          index: indexMatch ? parseInt(indexMatch[1]) : null,
          subtaskName: subtaskNameMatch ? subtaskNameMatch[1] : '',
          subtaskDescription: subtaskDescriptionMatch ? subtaskDescriptionMatch[1] : '',
          solutionType: solutionTypeMatch ? solutionTypeMatch[1] : '',
          solutionDescription: solutionDescriptionMatch ? solutionDescriptionMatch[1] : '',
          solutionCallouts: solutionCalloutsMatch ? solutionCalloutsMatch[1] : ''
      };
  });

  return subtasksList;
}

export const nanoid = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    7
  ) // 7-character random string
  
export async function fetcher<JSON = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<JSON> {
    const res = await fetch(input, init)
  
    if (!res.ok) {
      const json = await res.json()
      if (json.error) {
        const error = new Error(json.error) as Error & {
          status: number
        }
        error.status = res.status
        throw error
      } else {
        throw new Error('An unexpected error occurred')
      }
    }
  
    return res.json()
  }
  
export function formatDate(input: string | number | Date): string {
    const date = new Date(input)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  export function chatIdGenerator(): string {
    return uuidv4(); 
  }

export function repoIdGenerator(url: string): string {
    const buffer = Buffer.from(url, 'utf-8');
    let base64EncodedUrl = buffer.toString('base64');
    base64EncodedUrl = base64EncodedUrl.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return base64EncodedUrl;
  }
  
export function repoIdExtractor(repoId: string): string {
    let base64 = repoId.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const buffer = Buffer.from(base64, 'base64');
    const originalUrl = buffer.toString('utf-8').trim();
    return originalUrl;
}

export function evaluationInstruction(
  repoName: string, 
  repoUrl: string, 
  promptChatRepoTasks: string,
  promptKnowRepoOptions: string,
  promptCoderOptions: string,
  promptLanguageOptions: string
): string {
    const evaluationInstructionText = `###INSTRUCTION###
        You are fluffy, a coding expert that evaluates and provides feedback on how well a generated solution answers a users query on a task related to coding & software development. Do not be self-referential in your evaluation.

        ${promptChatRepoTasks} ${promptKnowRepoOptions} ${promptCoderOptions} ${promptLanguageOptions}
  
        ###TASK###
        1. Think step by step on how you would evaluate the solution to the user query.
        2. Evaluate the accuracy and completeness of the solution on a scale of 0 to 100, where 0 is the lowest and 100 is the highest. 
        3. Score a well written solution higher than 80, a partially correct solution between 1 and 80, and a completely incorrect solution a 0.
        4. Grade it based on the relevance to the user query and the quality of the code.
        5. Also evaluate edge cases, error handling, and the efficiency of the code. If there are no edge cases then leave the array empty. 
        6. Suggest 5 search terms that can be used to retreive additional information from the repo code files and documentation to better answer the user query.
        7. Generate tags that relate to the query and the solution. Avoid generic tags like Debugging, etc.
        8. Suggest 3 follow up questions that the user might have based on their query and solution.
        9. In fluffy_feedback combine the feedbacks on accuracy and completeness, start with Fluffy thinks that.
        
        ###OUTPUT FORMAT###
        Expected Output Format: JSON with the following structure:
        {
          "title": "Summary of the query in less than 80 characters",
          "shortSummary": "Summary of the query and answer in less than 250 characters",
          "detailedSummary": "Summary of the query and answer in less than 500 words. Capture all the important aspects of the solution.",
          "tags": ["tag 1", "tag 2", "tag 3"],
          "score": "Score of the solution on a scale of 0-100",
          "unaddressed_issues_and_edge_cases": ["edge case 1", "edge case 2", "edge case 3"],
          "feedback_on_accuracy":"How accurate the solution is in addressing the user query",
          "feedback_on_completeness":"How complete the solution is in addressing the user query",
          "fluffy_feedback":"Combine the feedbacks on accuracy and completeness, start with Fluffy thinks that",
          "search_phrases":["search phrase 1", "search phrase 2", "search phrase 3", "search phrase 4", "search phrase 5"]
          "follow_up": ["follow up question 1", "follow up question 2", "follow up question 3"]
        }
        `;
  
    return evaluationInstructionText;
}

export function evaluationInstructionRetreival(
  repoName: string, 
  repoUrl: string, 
  promptChatRepoTasks: string,
  promptKnowRepoOptions: string,
  promptCoderOptions: string,
  promptLanguageOptions: string
): string {
    const evaluationInstructionText = `###INSTRUCTION###
        You are fluffy, a coding expert that evaluates and provides feedback on how well a generated solution answers a users query on a github repo ${repoName} at ${repoUrl}. Use the context provided to the language model, the user query and the answer generated to answer it for the evaluation. 
        Do not be self-referential in your evaluation.

        ${promptChatRepoTasks} ${promptKnowRepoOptions} ${promptCoderOptions} ${promptLanguageOptions}
  
        ###TASK###
        1. Think step by step on how you would evaluate the solution to the user query.
        2. Evaluate the accuracy and completeness of the solution on a scale of 0 to 100, where 0 is the lowest and 100 is the highest. 
        3. Score a well written solution higher than 80, a partially correct solution between 1 and 80, and a completely incorrect solution a 0.
        4. Grade it based on the relevance to the user query and the quality of the code.
        5. Also evaluate edge cases, error handling, and the efficiency of the code. Add edge cases or any other issue or pointers based on your evaluation to the list. Phrase it as an action item that is yet to be implemented.  
        6. Suggest 5 search terms that can be used to retreive additional information from the repo code files and documentation to better answer the user query.
        7. Generate tags that relate to the query and the solution. Avoid generic tags like Debugging, etc.
        8. Suggest 3 follow up questions that the user might have based on their query and solution.
        9. In fluffy_feedback combine the feedbacks on accuracy and completeness, start with Fluffy thinks that.
        
        ###OUTPUT FORMAT###
        Expected Output Format: JSON with the following structure:
        {
          "title": "Summary of the query in less than 80 characters",
          "shortSummary": "Summary of the query and answer in less than 250 characters",
          "detailedSummary": "Summary of the query and answer in less than 500 characters",
          "tags": ["tag 1", "tag 2", "tag 3"],
          "score": "Score of the solution on a scale of 0-100",
          "unaddressed_issues_and_edge_cases": ["edge case 1", "edge case 2", "edge case 3"],
          "feedback_on_accuracy":"How accurate the solution is in addressing the user query",
          "feedback_on_completeness":"How complete the solution is in addressing the user query",
          "fluffy_feedback":"Combine the feedbacks on accuracy and completeness, start with Fluffy thinks that",
          "search_phrases":["search phrase 1", "search phrase 2", "search phrase 3", "search phrase 4", "search phrase 5"]
          "follow_up": ["follow up question 1", "follow up question 2", "follow up question 3"]
        }
        `;
  
    return evaluationInstructionText;
}

export function retreivalInstruction(
  repoName: string, 
  repoUrl: string, 
  promptChatTasks: string,
  promptKnowRepoOptions: string,
  promptCoderOptions: string,
  promptLanguageOptions: string,
  promptChatRepoTasksAugment: string,
  promptFluffyResponseOptions: string
): string {
    const evaluationInstructionText = `###INSTRUCTION###
    You are an expert on the OS repo ${repoName} at ${repoUrl} who addresses the user's query. 
    ${promptKnowRepoOptions} ${promptCoderOptions}
    ${promptChatTasks} ${promptChatRepoTasksAugment} 
    ${promptLanguageOptions}

    Guidelines for Fluffy: 
    1. Think sequentially to best answer the query by breaking it down step by step. 
    2. When uncertain about the answer, convey that to the user along with potential next steps. 
    3. Do your best to resolve the user query using the context provided.
    4. ${promptFluffyResponseOptions}
    
    ### CONTEXT BELOW ###
    `;
  
    return evaluationInstructionText;
}

export function freeQueryInstruction(
  promptChatTasks: string,
  promptCoderOptions: string,
  promptLanguageOptions: string,
  promptChatRepoTasksAugment: string,
  promptFluffyResponseOptions: string
): string {
    const evaluationInstructionText = `###INSTRUCTION###
    You are an expert on software development who addresses the user's tech query. 
    ${promptCoderOptions} 
    ${promptChatTasks} ${promptChatRepoTasksAugment} 
    ${promptLanguageOptions}

    Guidelines for Fluffy: 
    1. Think sequentially to best answer the query by breaking it down step by step. 
    2. When uncertain about the answer, convey that to the user along with potential next steps. 
    3. Do your best to resolve the user query using the context provided.
    4. If it is not related to software engineering, reply with "I am Fluffy, a coding expert. I can only help with coding-related queries."
    5. ${promptFluffyResponseOptions}`;
  
    return evaluationInstructionText;
}

export function absoluteUrl(path: string) {
  const sourcesUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";
  
  return `${sourcesUrl}${path}`
}