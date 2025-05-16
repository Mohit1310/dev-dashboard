"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaginationControls from "./pagination-controls";
import NewsSkeleton from "./news-skeleton";
import { useState } from "react";
import { fetchHackerNewsPosts } from "@/lib/news/fetch-news";

const HackerNews = () => {
  const [hnPage, setHnPage] = useState(0);
  const hn = fetchHackerNewsPosts(hnPage);
  return (
    <>
      <ScrollArea className="h-[200px]">
        {hn.isLoading ? (
          <NewsSkeleton />
        ) : (
          hn.data?.map((s) => (
            <a
              key={s.id}
              href={s.url || `https://news.ycombinator.com/item?id=${s.id}`}
              className="block border rounded p-3 hover:bg-muted transition"
              rel="noreferrer"
              target="_blank"
            >
              <div className="font-medium line-clamp-2">{s.title}</div>
              <div className="text-xs text-muted-foreground">
                by {s.by} ⬆ {s.score}
              </div>
            </a>
          ))
        )}
      </ScrollArea>
      <PaginationControls page={hnPage} setPage={setHnPage} />
    </>
  );
};

export default HackerNews;
