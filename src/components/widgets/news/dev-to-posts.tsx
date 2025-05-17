"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchDevToPosts } from "@/lib/news/fetch-news";
import type { DevToPost } from "@/lib/types";
import { useState } from "react";
import NewsSkeleton from "./news-skeleton";
import PaginationControls from "./pagination-controls";

const DevToPosts = () => {
  const [devPage, setDevPage] = useState(0);
  const dev = fetchDevToPosts(devPage);
  return (
    <>
      <ScrollArea className="h-[200px]">
        {dev.isLoading ? (
          <NewsSkeleton />
        ) : (
          dev.data?.map((a: DevToPost) => (
            <a
              key={a.id}
              href={a.url}
              className="block rounded border p-3 transition hover:bg-muted"
              rel="noreferrer"
              target="_blank"
            >
              <div className="line-clamp-2 font-medium">{a.title}</div>
              <div className="text-muted-foreground text-xs">
                by {a.user.username} 💬 {a.comments_count}
              </div>
            </a>
          ))
        )}
      </ScrollArea>
      <PaginationControls page={devPage} setPage={setDevPage} />
    </>
  );
};

export default DevToPosts;
