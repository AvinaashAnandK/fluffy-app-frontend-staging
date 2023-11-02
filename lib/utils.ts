import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
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
