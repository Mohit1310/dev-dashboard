"use client";
import { fetchGitHubTrendingRepos } from "@/lib/news/fetch-news";
import React, { useState } from "react";
import PaginationControls from "./pagination-controls";
import NewsSkeleton from "./news-skeleton";

type GithubRepo = {
  name: string;
  url: string;
  stars: number;
  language: string;
};

// todo: need to fix this

const GithbuTrending = () => {
  const [githubPage, setGithubPage] = useState(0);
  const github = fetchGitHubTrendingRepos(githubPage);

  return (
    <div>
      {github.isLoading ? (
        <NewsSkeleton />
      ) : (
        github.data?.map((repo: GithubRepo) => (
          <a
            key={repo.url}
            href={repo.url}
            className="block border rounded p-3 hover:bg-muted transition"
            target="_blank"
            rel="noreferrer"
          >
            <div className="font-medium">{repo.name}</div>
            <div className="text-xs text-muted-foreground">
              ⭐ {repo.stars} · {repo.language}
            </div>
          </a>
        ))
      )}
      <PaginationControls page={githubPage} setPage={setGithubPage} />
    </div>
  );
};

export default GithbuTrending;
