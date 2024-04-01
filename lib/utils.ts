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

