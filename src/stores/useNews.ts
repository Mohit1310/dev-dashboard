import { create } from "zustand";
import { persist } from "zustand/middleware";

type NewsStore = {
  subreddit: string;
  setSubreddit: (tag: string) => void;
  mediumTag: string;
  setMediumTag: (tag: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const useNewsStore = create<NewsStore>()(
  persist(
    (set) => ({
      subreddit: "webdev",
      setSubreddit: (tag) => set({ subreddit: tag }),
      mediumTag: "javascript",
      setMediumTag: (tag) => set({ mediumTag: tag }),
      selectedTab: "hn",
      setSelectedTab: (tab) => set({ selectedTab: tab }),
    }),
    {
      name: "news-store",
    },
  ),
);
