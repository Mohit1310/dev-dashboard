"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaginationControls from "./pagination-controls";
import { fetchDevToPosts } from "@/lib/news/fetch-news";
import NewsSkeleton from "./news-skeleton";
import { useState } from "react";
import type { DevToPost } from "@/lib/types";

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
              className="block border rounded p-3 hover:bg-muted transition"
              rel="noreferrer"
              target="_blank"
            >
              <div className="font-medium line-clamp-2">{a.title}</div>
              <div className="text-xs text-muted-foreground">
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
