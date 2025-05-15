"use client";

import { useEffect, useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import {
  GitBranch,
  GitPullRequest,
  Star,
  GitCommit,
  GitMerge,
  MessageSquare,
  Circle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { useGitHubStore } from "@/stores/useGithub";

type GitHubEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
};

export const GitHubActivity = () => {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { username, setUsername } = useGitHubStore();

  useEffect(() => {
    const stored = localStorage.getItem("github-username");
    if (stored && !username) {
      setUsername(stored);
    }
  }, [setUsername, username]);

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

  const getEventUrl = (event: any): string | null => {
    const base = `https://github.com/${event.repo.name}`;
    switch (event.type) {
      case "PushEvent":
        return `${base}/commit/${event.payload?.head}`;
      case "PullRequestEvent":
        return event.payload?.pull_request?.html_url || `${base}/pulls`;
      case "IssuesEvent":
        return event.payload?.issue?.html_url || `${base}/issues`;
      case "WatchEvent":
      case "CreateEvent":
      case "ForkEvent":
        return base;
      default:
        return null;
    }
  };

  const getEventLabel = (event: { type: string }): string => {
    switch (event.type) {
      case "PushEvent":
        return "Pushed to";
      case "PullRequestEvent":
        return "Opened PR on";
      case "IssuesEvent":
        return "Opened issue on";
      case "WatchEvent":
        return "Starred";
      case "CreateEvent":
        return "Created";
      case "ForkEvent":
        return "Forked";
      default:
        return `${event.type.replace(/Event$/, "")} on`;
    }
  };

  return (
    <div className="space-y-2 text-sm">
      {events.map((event) => {
        const url = getEventUrl(event);
        return (
          <div
            key={event.id}
            className="flex items-start gap-2 border-b pb-1 last:border-none"
          >
            <div>{getIcon(event.type)}</div>
            <div>
              <p>
                <strong>{getEventLabel(event)}</strong>{" "}
                {url ? (
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    {event.repo.name}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">
                    {event.repo.name}
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(event.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
