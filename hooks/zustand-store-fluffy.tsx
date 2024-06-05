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
  chatRepoTasks: "explore" | "debug" | "solve" | "verify";
  knowRepoOptions: "newcomer" | "familiar" | "expert";
  coderOptions: "novice" | "codeComfortable" | "experienced";
  fluffyResponseOptions: "concise" | "detailed" | "indepth";
  languagesOptions: string[];
  isPreferencesVisible: boolean;
  setChatRepoTasks: (value: "explore" | "debug" | "solve" | "verify") => void;
  setKnowRepoOptions: (value: "newcomer" | "familiar" | "expert") => void;
  setCoderOptions: (value: "novice" | "codeComfortable" | "experienced") => void;
  setFluffyResponseOptions: (value: "concise" | "detailed" | "indepth") => void;
  setLanguagesOptions: (value: string[]) => void;
  setIsPreferencesVisible: (value: boolean) => void;
}

interface LoadedRepoState {
  repoUrl: string;
  repoFullName: string;
  repoOrgName: string;
  repoName: string;
  serviceKey: "commandrplus" | "gpt4" | "llama3" | "gemini";
  setRepoUrl: (value: string) => void;
  setRepoFullName: (value: string) => void;
  setRepoOrgName: (value: string) => void;
  setRepoName: (value: string) => void;
  setServiceKey: (value: "commandrplus" | "gpt4" | "llama3" | "gemini") => void;
}

export const useLoadedRepo = create<LoadedRepoState>((set) => ({
  repoUrl: '',
  repoFullName: '',
  repoOrgName: '',
  repoName: '',
  serviceKey: 'gpt4',
  setRepoUrl: (value: string) => set({ repoUrl: value }),
  setRepoFullName: (value: string) => set({ repoFullName: value }),
  setRepoOrgName: (value: string) => set({ repoOrgName: value }),
  setRepoName: (value: string) => set({ repoName: value }),
  setServiceKey: (value: "commandrplus" | "gpt4" | "llama3" | "gemini") => set({ serviceKey: value }),
}));

export const useUserPreferences = create<UserPreferencesState>((set) => ({
  chatRepoTasks: 'solve',
  knowRepoOptions: 'newcomer',
  coderOptions: 'novice',
  fluffyResponseOptions: 'detailed',
  languagesOptions: [],
  isPreferencesVisible: true,
  setChatRepoTasks: (value) => set({ chatRepoTasks: value }),
  setKnowRepoOptions: (value) => set({ knowRepoOptions: value }),
  setCoderOptions: (value) => set({ coderOptions: value }),
  setFluffyResponseOptions: (value) => set({ fluffyResponseOptions: value }),
  setLanguagesOptions: (value) => set({ languagesOptions: value }),
  setIsPreferencesVisible: (value) => set({ isPreferencesVisible: value }),
}));


export const useAddRepoModal = create<useAddRepoModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));

export const useProModal = create<useProModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false})
}));

