import { create } from "zustand";

interface useAddRepoModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

interface useProModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

interface UserPreferencesState {
  chatRepoTasks: string;
  knowRepoOptions: string;
  coderOptions: string;
  fluffyResponseOptions: string;
  languagesOptions: string[];
  setChatRepoTasks: (value: string) => void;
  setKnowRepoOptions: (value: string) => void;
  setCoderOptions: (value: string) => void;
  setFluffyResponseOptions: (value: string) => void;
  setLanguagesOptions: (value: string[]) => void;
}

interface LoadedRepoState {
  loadedRepoUrl: string;
  setLoadedRepoUrl: (value: string) => void;
}

export const useLoadedRepo = create<LoadedRepoState>((set) => ({
  loadedRepoUrl: '',
  setLoadedRepoUrl: (value) => set({ loadedRepoUrl: value }),
}));

export const useUserPreferences = create<UserPreferencesState>((set) => ({
  chatRepoTasks: 'solve',
  knowRepoOptions: 'newcomer',
  coderOptions: 'novice',
  fluffyResponseOptions: 'detailed',
  languagesOptions: [],
  setChatRepoTasks: (value) => set({ chatRepoTasks: value }),
  setKnowRepoOptions: (value) => set({ knowRepoOptions: value }),
  setCoderOptions: (value) => set({ coderOptions: value }),
  setFluffyResponseOptions: (value) => set({ fluffyResponseOptions: value }),
  setLanguagesOptions: (value) => set({ languagesOptions: value }),
}));


export const useAddRepoModal = create<useAddRepoModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));

export const useProModal = create<useProModalStore>((set) => ({
    isOpen: true,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));

interface CodeSource {
  dependancy_count: string;
  file_path: string;
}

interface DocumentationSource {
  doc_filename: string;
  doc_path: string;
  doc_source_directory: string;
  doc_type: string; // Assuming these are the only two types
}

interface DownloadSource {
  download_description: string;
  download_instruction: string;
  download_source: string;
  download_type: string; // Assuming these are the only two types
}

interface CurrentChatMetadataState {
  repoId: string; // Assuming repoId is a string
  chatId: string; // Assuming chatId is a string
  codeSources: CodeSource[];
  documentationSourcesList: DocumentationSource[];
  downloadSources: DownloadSource[];
  setRepoId: (value: string) => void;
  setChatId: (value: string) => void;
  setCodeSources: (value: CodeSource[]) => void;
  setDocumentationSourcesList: (value: DocumentationSource[]) => void;
  setDownloadSources: (value: DownloadSource[]) => void;
}

// Create the Zustand store for CurrentChatMetadata
export const useCurrentChatMetadata = create<CurrentChatMetadataState>((set) => ({
  repoId: '',
  chatId: '',
  codeSources: [],
  documentationSourcesList: [],
  downloadSources: [],
  setRepoId: (repoId) => set({ repoId }),
  setChatId: (chatId) => set({ chatId }),
  setCodeSources: (codeSources) => set({ codeSources }),
  setDocumentationSourcesList: (documentationSourcesList) => set({ documentationSourcesList }),
  setDownloadSources: (downloadSources) => set({ downloadSources }),
}));
