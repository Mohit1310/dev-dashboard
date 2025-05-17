"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNewsStore } from "@/stores/useNews";
import DevToPosts from "./news/dev-to-posts";
import HackerNews from "./news/hacker-news";
import MediumPosts from "./news/medium-posts";
import RedditPosts from "./news/reddit-posts";
// import GithbuTrending from "./news/github-trending";

export default function DailyNewsWidget() {
  const { selectedTab, setSelectedTab } = useNewsStore();

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
          <TabsContent value="hn">
            <HackerNews />
          </TabsContent>
          <TabsContent value="devto">
            <DevToPosts />
          </TabsContent>
          <TabsContent value="reddit">
            <RedditPosts />
          </TabsContent>
          {/* <TabsContent value="github">
            <GithbuTrending />
          </TabsContent> */}
          <TabsContent value="medium">
            <MediumPosts />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
