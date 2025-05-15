import { useNewsStore } from "@/stores/useNews";
import { useQuery } from "@tanstack/react-query";

export function useHackerNews(page: number) {
  return useQuery({
    queryKey: ["hacker-news", page],
    queryFn: async () => {
      const res = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
      );
      const ids: number[] = await res.json();
      const slice = ids.slice(0 + page * 5, 5 + page * 5);
      const stories = await Promise.all(
        slice.map(async (id) => {
          const story = await fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
          );
          return await story.json();
        }),
      );

      return stories.filter(Boolean);
    },
  });
}

export function useDevTo(page: number) {
  return useQuery({
    queryKey: ["devto", page],
    queryFn: async () => {
      const res = await fetch(
        `https://dev.to/api/articles?per_page=5&page=${page + 1}`,
      );
      return res.json();
    },
  });
}

export function useReddit(page: number) {
  const subreddit = useNewsStore((s) => s.subreddit);
  return useQuery({
    queryKey: ["reddit", page],
    queryFn: async () => {
      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/top.json?limit=5&t=day`,
      );
      const json = await res.json();
      return json.data.children.map((c: any) => c.data);
    },
  });
}

export function useGitHubTrending(page = 0) {
  return useQuery({
    queryKey: ["github-trending", page],
    queryFn: async () => {
      const res = await fetch(
        `http://gtrend.yapie.me/repositories?since=daily&language=typescript&page=${page + 1}`,
      );
      return res.json();
    },
  });
}

export function useMedium(page = 0) {
  const tag = useNewsStore((s) => s.mediumTag);
  return useQuery({
    queryKey: ["medium", tag, page],
    queryFn: async () => {
      const url = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/${tag}`;
      const res = await fetch(url);
      const data = await res.json();
      return data.items.slice(page * 5, (page + 1) * 5);
    },
  });
}
