"use client";

import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import {
  GitBranch,
  GitPullRequest,
  Star,
  Upload,
  GitCommit,
  GitMerge,
  MessageSquare,
  Circle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
};

export const GitHubActivity = ({ username }: { username: string }) => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const getIcon = (type: string) => {
    switch (type) {
      case "PushEvent":
        return <GitCommit className="h-4 w-4 text-primary" />;
      case "PullRequestEvent":
        return <GitPullRequest className="h-4 w-4 text-primary" />;
      case "CreateEvent":
        return <GitBranch className="h-4 w-4 text-primary" />;
      case "WatchEvent":
        return <Star className="h-4 w-4 text-primary" />;
      case "ForkEvent":
        return <GitMerge className="h-4 w-4 text-primary" />;
      case "IssuesEvent":
        return <MessageSquare className="h-4 w-4 text-primary" />;
      default:
        return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.slice(0, 5)); // limit to latest 5
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [username]);

  if (loading) {
    return (
      <div className="space-y-2">
        {[...Array(3)].map((_, i) => (
          // biome-ignore lint: react/no-array-index-key: false
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 text-sm">
      {events.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-2 border-b pb-1 last:border-none"
        >
          <div>{getIcon(event.type)}</div>
          <div>
            <p>
              <strong>{event.type.replace(/Event$/, "")}</strong> on
              <span className="text-muted-foreground">{event.repo.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(event.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
