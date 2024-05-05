
export interface RetrievalResults {
    prompt: RagPrompt;
    download_sources: DownloadSource[];
    documentation_sources_list: DocumentationSource[];
    code_sources: CodeSource[];
  }
  
export interface RagPrompt {
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
  
export interface TokenLengths {
    instructions?: number;
    downloads?: number;
    documentation?: number;
    code?: number;
    instruction_reiterate?: number;
    user_query?: number;
  }
  
export interface DownloadSource {
    download_instruction: string;
    download_type: string;
    download_description: string;
    download_source: string;
  }
  
export interface DocumentationSource {
    doc_type: string;
    doc_filename: string;
    doc_path: string;
    doc_source_directory: string;
  }
  
export interface CodeSource {
    file_path: string;
    dependancy_count: number;
  }
  
export interface Message {
    id: number;
    type: string;
    content: string;
    userMessage: string;
    isStreaming: boolean;
    searchResults?: RetrievalResults;
  }
  
export interface StreamMessage {
    searchResults?: any;
    userMessage?: string;
    llmResponse?: string;
    llmResponseEnd?: boolean;
  }
  
export interface Image {
    link: string;
  }
  
export interface Video {
    link: string;
    imageUrl: string;
  }
  
export interface FollowUp {
    choices: {
      message: {
        content: string;
      };
    }[];
  }
  