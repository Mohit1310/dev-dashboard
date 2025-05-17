"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchMediumPosts } from "@/lib/news/fetch-news";
import type { MediumPost } from "@/lib/types";
import { useNewsStore } from "@/stores/useNews";
import { useState } from "react";
import NewsSkeleton from "./news-skeleton";
import PaginationControls from "./pagination-controls";

const MediumPosts = () => {
  const [mediumPage, setMediumPage] = useState(0);
  const medium = fetchMediumPosts(mediumPage);
  const [tagInput, setTagInput] = useState("");
  const { mediumTag, setMediumTag } = useNewsStore();
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMediumTag(tagInput.trim());
        }}
        className="mb-2 flex gap-2"
      >
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          placeholder="Enter Medium tag (e.g. react)"
          className="w-full rounded border px-2 py-1 text-sm"
        />
        <Button type="submit" variant="outline">
          Go
        </Button>
      </form>
      <div className="mb-2 text-muted-foreground text-xs">
        Showing Medium posts tagged: <strong>{mediumTag}</strong>
      </div>
      <ScrollArea className="h-[200px]">
        {medium.isLoading ? (
          <NewsSkeleton />
        ) : (
          medium.data?.map((post: MediumPost) => (
            <a
              key={post.guid}
              href={post.link}
              className="block rounded border p-3 transition hover:bg-muted"
              target="_blank"
              rel="noreferrer"
            >
              <div className="line-clamp-2 font-medium">{post.title}</div>
              <div className="text-muted-foreground text-xs">
                {new Date(post.pubDate).toLocaleDateString()}
              </div>
            </a>
          ))
        )}
      </ScrollArea>
      <PaginationControls page={mediumPage} setPage={setMediumPage} />
    </>
  );
};

export default MediumPosts;
