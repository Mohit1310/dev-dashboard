"use client";

import {
  useHackerNews,
  useDevTo,
  useReddit,
  // useGitHubTrending,
  useMedium,
} from "@/lib/news/use-news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewsStore } from "@/stores/useNews";
import { Input } from "../ui/input";

export default function DailyNewsWidget() {
  const [hnPage, setHnPage] = useState(0);
  const [devPage, setDevPage] = useState(0);
  const [redditPage, setRedditPage] = useState(0);
  // const [githubPage, setGithubPage] = useState(0);
  const [mediumPage, setMediumPage] = useState(0);

  const hn = useHackerNews(hnPage);
  const dev = useDevTo(devPage);
  const reddit = useReddit(redditPage);
  // const github = useGitHubTrending(githubPage);
  const medium = useMedium(mediumPage);

  const { selectedTab, setSelectedTab } = useNewsStore();

  const renderSkeletons = () =>
    Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="border p-3 rounded space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    ));

  const PaginationControls = ({
    page,
    setPage,
    isPreviousData,
  }: {
    page: number;
    setPage: (n: number) => void;
    isPreviousData?: boolean;
  }) => (
    <div className="flex justify-between mt-4">
      <Button
        variant="ghost"
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
      >
        Prev
      </Button>
      <Button
        variant="ghost"
        onClick={() => setPage(page + 1)}
        disabled={isPreviousData}
      >
        Next
      </Button>
    </div>
  );

  const renderHackerNews = () => (
    <>
      {hn.isLoading
        ? renderSkeletons()
        : hn.data?.map((s) => (
            <a
              key={s.id}
              href={s.url || `https://news.ycombinator.com/item?id=${s.id}`}
              className="block border rounded p-3 hover:bg-muted transition"
              rel="noreferrer"
              target="_blank"
            >
              <div className="font-medium">{s.title}</div>
              <div className="text-xs text-muted-foreground">
                by {s.by} ⬆ {s.score}
              </div>
            </a>
          ))}
      <PaginationControls page={hnPage} setPage={setHnPage} />
    </>
  );

  const renderDevTo = () => (
    <>
      {dev.isLoading
        ? renderSkeletons()
        : dev.data?.map((a: any) => (
            <a
              key={a.id}
              href={a.url}
              className="block border rounded p-3 hover:bg-muted transition"
              rel="noreferrer"
              target="_blank"
            >
              <div className="font-medium">{a.title}</div>
              <div className="text-xs text-muted-foreground">
                by {a.user.username} 💬 {a.comments_count}
              </div>
            </a>
          ))}
      <PaginationControls page={devPage} setPage={setDevPage} />
    </>
  );

  const renderReddit = () => {
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
            className="px-2 py-1 border rounded text-sm w-full"
          />
          <Button type="submit" variant="outline">
            Go
          </Button>
        </form>
        <div className="text-xs text-muted-foreground mb-2">
          Showing Reddit posts of subreddit: <strong>{subreddit}</strong>
        </div>
        {reddit.isLoading
          ? renderSkeletons()
          : reddit.data?.map((p: any) => (
              <a
                key={p.id}
                href={`https://reddit.com${p.permalink}`}
                className="block border rounded p-3 hover:bg-muted transition"
                rel="noreferrer"
                target="_blank"
              >
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-muted-foreground">
                  {p.ups} upvotes · {p.num_comments} comments
                </div>
              </a>
            ))}
        <PaginationControls page={redditPage} setPage={setRedditPage} />
      </>
    );
  };

  // const renderGitHub = () => (
  //   <>
  //     {github.isLoading
  //       ? renderSkeletons()
  //       : github.data?.map((repo: any) => (
  //           <a
  //             key={repo.url}
  //             href={repo.url}
  //             className="block border rounded p-3 hover:bg-muted transition"
  //             target="_blank"
  //             rel="noreferrer"
  //           >
  //             <div className="font-medium">{repo.name}</div>
  //             <div className="text-xs text-muted-foreground">
  //               ⭐ {repo.stars} · {repo.language}
  //             </div>
  //           </a>
  //         ))}
  //     <PaginationControls page={githubPage} setPage={setGithubPage} />
  //   </>
  // );

  const renderMedium = () => {
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
        {medium.isLoading
          ? renderSkeletons()
          : medium.data?.map((post: any) => (
              <a
                key={post.guid}
                href={post.link}
                className="block border rounded p-3 hover:bg-muted transition"
                target="_blank"
                rel="noreferrer"
              >
                <div className="font-medium">{post.title}</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(post.pubDate).toLocaleDateString()}
                </div>
              </a>
            ))}
        <PaginationControls page={mediumPage} setPage={setMediumPage} />
      </>
    );
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>🗞️ Daily Dev News</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="hn">Hacker News</TabsTrigger>
            <TabsTrigger value="devto">Dev.to</TabsTrigger>
            <TabsTrigger value="reddit">Reddit</TabsTrigger>
            {/* <TabsTrigger value="github">GitHub</TabsTrigger> */}
            <TabsTrigger value="medium">Medium</TabsTrigger>
          </TabsList>
          <TabsContent value="hn">{renderHackerNews()}</TabsContent>
          <TabsContent value="devto">{renderDevTo()}</TabsContent>
          <TabsContent value="reddit">{renderReddit()}</TabsContent>
          {/* <TabsContent value="github">{renderGitHub()}</TabsContent> */}
          <TabsContent value="medium">{renderMedium()}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
