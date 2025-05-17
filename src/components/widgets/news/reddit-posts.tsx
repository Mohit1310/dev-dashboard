"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchRedditPosts } from "@/lib/news/fetch-news";
import type { RedditPost } from "@/lib/types";
import { useNewsStore } from "@/stores/useNews";
import { useEffect, useState } from "react";
import NewsSkeleton from "./news-skeleton";
import RedditPaginationControls from "./reddit-pagination-controls";

const RedditPosts = () => {
  const [sort, setSort] = useState("top");
  const [redditAfter, setRedditAfter] = useState("");
  const [afterHistory, setAfterHistory] = useState([""]);
  const reddit = fetchRedditPosts(redditAfter, sort);

  // Reset after + history when sort changes
  useEffect(() => {
    setRedditAfter("");
    setAfterHistory([""]);
  }, []);

  // Track history for going back
  useEffect(() => {
    if (reddit.data?.after && !afterHistory.includes(reddit.data.after)) {
      setAfterHistory((prev) => [...prev, reddit.data.after]);
    }
  }, [reddit.data?.after, afterHistory]);

  const [subredditInput, setSubredditInput] = useState("");
  const { subreddit, setSubreddit } = useNewsStore();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSubreddit(subredditInput.trim());
        }}
        className="mb-2 flex gap-2"
      >
        <Input
          value={subredditInput}
          onChange={(e) => setSubredditInput(e.target.value)}
          placeholder="Enter subreddit name (e.g. react)"
          className="w-full rounded border px-2 py-1 text-sm"
        />
        <Select
          value={sort}
          onValueChange={(v) => setSort(v)}
          defaultValue="top"
        >
          <SelectTrigger className="mb-2 w-[150px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="best">Best</SelectItem>
            <SelectItem value="hot">Hot</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="top">Top</SelectItem>
            <SelectItem value="rising">Rising</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline">
          Go
        </Button>
      </form>
      <div className="mb-2 text-muted-foreground text-xs">
        Showing Reddit posts of subreddit: <strong>{subreddit}</strong>
      </div>
      <ScrollArea className="h-[200px]">
        {reddit.isLoading ? (
          <NewsSkeleton />
        ) : (
          reddit.data?.posts?.map((p: RedditPost) => (
            <a
              key={p.id}
              href={`https://reddit.com${p.permalink}`}
              className="block rounded border p-3 transition hover:bg-muted"
              rel="noreferrer"
              target="_blank"
            >
              <div className="line-clamp-2 font-medium">{p.title}</div>
              <div className="text-muted-foreground text-xs">
                {p.ups} upvotes · {p.num_comments} comments
              </div>
            </a>
          ))
        )}
      </ScrollArea>
      <RedditPaginationControls
        after={redditAfter}
        setAfter={setRedditAfter}
        history={afterHistory}
      />
    </>
  );
};

export default RedditPosts;
