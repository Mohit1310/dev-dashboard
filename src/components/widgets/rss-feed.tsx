"use client";

import { useEffect, useState } from "react";
import { getRSSFeed, type FeedItem } from "@/lib/rss";
import Link from "next/link";

export const RSSFeed = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        const data = await getRSSFeed("https://overreacted.io/rss.xml");
        setItems(data.slice(0, 5));
      } catch (e) {
        console.error("Failed to load RSS feed", e);
      } finally {
        setLoading(false);
      }
    }

    loadFeed();
  }, []);

  if (loading)
    return <div className="text-sm text-muted-foreground">Loading...</div>;

  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={item.link}>
          <Link
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {item.title}
          </Link>
          {item.pubDate && (
            <div className="text-xs text-muted-foreground">
              {new Date(item.pubDate).toLocaleDateString()}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
