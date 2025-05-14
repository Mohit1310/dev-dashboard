import Parser from "rss-parser";

export interface FeedItem {
  title: string;
  link: string;
  pubDate?: string;
}

const parser = new Parser();

export async function getRSSFeed(url: string): Promise<FeedItem[]> {
  const feed = await parser.parseURL(url);
  return feed.items.map((item) => ({
    title: item.title ?? "Untitled",
    link: item.link ?? "#",
    pubDate: item.pubDate,
  }));
}
