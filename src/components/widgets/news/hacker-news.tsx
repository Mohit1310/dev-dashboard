"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchHackerNewsPosts } from "@/lib/news/fetch-news";
import { useState } from "react";
import NewsSkeleton from "./news-skeleton";
import PaginationControls from "./pagination-controls";

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
              className="block rounded border p-3 transition hover:bg-muted"
              rel="noreferrer"
              target="_blank"
            >
              <div className="line-clamp-2 font-medium">{s.title}</div>
              <div className="text-muted-foreground text-xs">
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
