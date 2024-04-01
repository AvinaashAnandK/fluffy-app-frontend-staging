// 1. Import dependencies
import 'server-only';
import { createAI, createStreamableValue } from 'ai/rsc';
import { OpenAI } from 'openai';

// 2. Initialize OpenAI client with Azure
const openai = new OpenAI({
  apiKey: process.env.TURBO_AZURE_KEY,
  baseURL: process.env.TURBO_FULL_ENDPOINT,
  defaultQuery: { 'api-version': process.env.TURBO_API_VERSION },
  defaultHeaders: { 'api-key': process.env.TURBO_AZURE_KEY },
});

// 3. Define interfaces for retreival results
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