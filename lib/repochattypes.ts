import { type Message } from 'ai'

export interface Chat extends Record<string, any> {
  id?: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
  repoUrl: string
  repoId: string
  chatId: string
}

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface DownloadSource extends Record<string, any> {
  downloadMode: string;
  downloadDescription: string;
  downloadInstruction: string;
}

export interface DocumentationSource extends Record<string, any> {
  doc_filename: string;
  doc_type: string;
  doc_path: string;
  doc_description: string;
  doc_source: string;
}

export interface CodeSource extends Record<string, any> {
  file_path: string;
  dependancy_count: number; 
  dependancy_map: string; 
}

export interface Sources extends Record<string, any> {
  downloads: DownloadSource[];
  documentationSources: DocumentationSource[];
  codeSources: CodeSource[];
}
