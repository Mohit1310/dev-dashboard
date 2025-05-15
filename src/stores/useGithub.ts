import { create } from "zustand";

interface GitHubStore {
  username: string;
  setUsername: (name: string) => void;
}

export const useGitHubStore = create<GitHubStore>((set) => ({
  username: "",
  setUsername: (name) => {
    localStorage.setItem("github-username", name);
    set({ username: name });
  },
}));
