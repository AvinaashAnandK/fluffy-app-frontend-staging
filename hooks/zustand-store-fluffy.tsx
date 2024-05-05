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
  repoUrl: string;
  repoFullName: string;
  repoOrgName: string;
  repoName: string;
  setRepoUrl: (value: string) => void;
  setRepoFullName: (value: string) => void;
  setRepoOrgName: (value: string) => void;
  setRepoName: (value: string) => void;
}

export const useLoadedRepo = create<LoadedRepoState>((set) => ({
  repoUrl: '',
  repoFullName: '',
  repoOrgName: '',
  repoName: '',
  setRepoUrl: (value: string) => set({ repoUrl: value }),
  setRepoFullName: (value: string) => set({ repoFullName: value }),
  setRepoOrgName: (value: string) => set({ repoOrgName: value }),
  setRepoName: (value: string) => set({ repoName: value }),
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

