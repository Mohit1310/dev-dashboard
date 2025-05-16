"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import PaginationControls from "./pagination-controls";
import NewsSkeleton from "./news-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNewsStore } from "@/stores/useNews";
import { fetchMediumPosts } from "@/lib/news/fetch-news";
import type { MediumPost } from "@/lib/types";

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
          className="px-2 py-1 border rounded text-sm w-full"
        />
        <Button type="submit" variant="outline">
          Go
        </Button>
      </form>
      <div className="text-xs text-muted-foreground mb-2">
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
              className="block border rounded p-3 hover:bg-muted transition"
              target="_blank"
              rel="noreferrer"
            >
              <div className="font-medium line-clamp-2">{post.title}</div>
              <div className="text-xs text-muted-foreground">
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
