export interface HNStory {
  id: number;
  title: string;
  url?: string;
  score: number;
  by: string;
  descendants: number;
  time: number;
}

export async function getTopStories(limit = 10): Promise<HNStory[]> {
  const res = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const ids: number[] = await res.json();
  const topIds = ids.slice(0, limit);

  const stories = await Promise.all(
    topIds.map(async (id) => {
      const storyRes = await fetch(
        `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
      );
      return await storyRes.json();
    }),
  );

  return stories.filter((s) => s?.title); // Filter out any nulls
}
