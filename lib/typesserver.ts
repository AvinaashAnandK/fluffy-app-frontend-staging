//lib/typeserver.ts
import { ObjectId } from 'mongodb';

export interface FetchDataParams {
    github_url: string;
    user_id?: string;
    user_query: string;
    dev_expertise?: string;
    task?: string;
    repo_expertise?: string;
    response_type?: string;
    dev_languages?: string;
  }
  
export interface RetrievalResults {
    prompt: RagPrompt;
    download_sources: DownloadSource[];
    documentation_sources_list: DocumentationSource[];
    code_sources: CodeSource[];
  }
  
export interface Message {
    id: number;
    tags: string[]; 
    title: string;
    createdAt: Date;
    shortSummary?: string;
    detailedSummary?: string;
    userMessage: string;
    type: string;
    sources?: RetrievalResults;
    contextUsed?: string;
    instructionUsed?: string;
    content: string;
    isStreaming: boolean;
    fluffyThoughts?: FluffyThoughts;
    fluffyStatus: GenerationStates;
    linkedUserChats?: string[];
    linkedOrgChats?: string[];
    linkedCommunityChats?: string[];
    webSources?: JSON[];
  }

export interface StreamMessage {
    tags: string[]; 
    title?: string;
    shortSummary?: string;
    detailedSummary?: string;
    userMessage?: string;
    llmResponse?: string;
    llmResponseEnd?: "Yes" | "No";
    sources?: any;
    fluffyThoughts?: any;
    fluffyStatus: any;
    linkedUserChats?: string[];
    linkedOrgChats?: string[];
    linkedCommunityChats?: string[];
    webSources?: JSON[];
    errorMessage?: string;
    errorReason?: string;
  }

export type UserPreferences = {
    _id?: ObjectId;
    chatRepoTasks: "explore" | "debug" | "solve" | "verify";
    knowRepoOptions: "newcomer" | "familiar" | "expert";
    coderOptions: "novice" | "codeComfortable" | "experienced";
    fluffyResponseOptions: "concise" | "detailed" | "indepth";
    languagesOptions: string[]; 
  };

export interface GenerationStates {
    gateKeepingChecks: "passed" | "failed" | "queued";
    gateKeepingStatus: "success" | "no_user_id" | "limits_exceeded" | "no_repo_url" | "queued";
    sourcesNeeded: "Yes" | "No";
    sourcesFetched: "queued" | "inprogress" | "done" | "failed" | "skipped";
    fluffyThoughtsNeeded: "Yes" | "No";
    fluffyThoughtsFetched: "queued" | "inprogress" | "done" | "failed" | "skipped";
    llmResponseFetched: "queued" | "inprogress" | "done" | "failed";
    llmResponseEnd: "Yes" | "No";
    fluffyStatusOverall: "queued" | "inprogress" | "done" | "failed";
}


export interface FluffyThoughts {
  title: string;
  shortSummary: string;
  detailedSummary: string;
  tags: string[];
  score: number;
  edgeCases: string[];
  feedbackonAccuracy: string;
  feedbackonCompleteness: string;
  fluffyFeedback: string;
  searchPhrases: string[];
  followUp: string[];
}

export interface Chat {
  id?: string;
  repoId: string;
  path: string;
  sharePath: string;
  uniqueId: string;
  chatId: string;
  repoUrl: string;
  repoName: string;
  title: string;
  description: string;
  service: string;
  createdAt: string;
  lastUpdatedAt: string;
  shareSettings: string;
  userEmail: string;
  userName: string;
  userId: string;
  embedText: string;
  messages: Message[];
}

// Not used as of now
export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  favicon: string;
}

export interface ContentResult extends SearchResult {
  html: string;
}

// Foundational Types
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

// Open AI Types
export interface ChatCompletionOpenAI {
  id?: any;
  object?: any;
  created?: any;
  model?: any;
  system_fingerprint?: any;
  choices?: any;
  usage?: any;
}

// TYPES FOR MONGO DB CALLS
export interface ApiLimits {
  _id?: ObjectId;
  userId: string;
  totalRepoAddedCount: number;
  totalChatsCreatedCount: number;
  currentRepoAddedCount: number;
  currentChatsCreatedCount: number;
  currentRepoAddedLimit: number;
  currentChatsCreatedLimit: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  purchaseHistory: any[];
  currentUserType: string;
}

export interface UpdatePurchaseRequest {
  userId: string;
  purchaseHistory: any[];
  repoLimit: number;
  chatsLimit: number;
  userType: string;
}

export interface PurchaseHistory {
  _id?: ObjectId;
  userId: string;
  userEmail: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  subscriptionStatus: string;  // free, active, cancelled
  currentPlan?: string; // Free, Pro, Enterprise
  subcriptionStart?: Date | null;
  nextBillingDate?: Date | null;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  stripeCurrentPeriodEnd?: Date | null;
  clickOnSubscriptionCounter?: number;
  pricePaid?: number;
}

export interface PurchaseHistoryUpdate {
  subscriptionStatus: string;  
  cancellationReason: string;
  stripeSubscriptionId: string;
}

export interface FormattedSubscription {
  currentPlan: string | null;
  subcriptionStartDate: string | null; 
  nextBillingDate: string | null;
  lastUpdatedAt: string | null;
  subscriptionStatus: string | null;
  subcriptionStart: string | null;
  billingFrequency: string | null;
}