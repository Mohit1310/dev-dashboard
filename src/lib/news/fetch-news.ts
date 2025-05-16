import { useNewsStore } from "@/stores/useNews";
import { useQuery } from "@tanstack/react-query";
import type { RedditPost } from "@/lib/types";

export function fetchHackerNewsPosts(page: number) {
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

export function fetchDevToPosts(page: number) {
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

export function fetchRedditPosts(after: string, sort = "top") {
  const subreddit = useNewsStore((s) => s.subreddit);

  return useQuery({
    queryKey: ["reddit", subreddit, sort, after],
    queryFn: async () => {
      const limit = 5;
      const afterParam = after ? `&after=${after}` : "";
      const res = await fetch(
        `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}&t=day&after=${afterParam}`,
      );
      const json = await res.json();
      return {
        posts: json.data.children.map((c: { data: RedditPost }) => c.data),
        after: json.data.after,
      };
    },
  });
}

export function fetchGitHubTrendingRepos(page = 0) {
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

export function fetchMediumPosts(page = 0) {
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
