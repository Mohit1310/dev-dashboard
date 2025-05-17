"use client";
import { fetchGitHubTrendingRepos } from "@/lib/news/fetch-news";
import { useState } from "react";
import NewsSkeleton from "./news-skeleton";
import PaginationControls from "./pagination-controls";

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
            className="block rounded border p-3 transition hover:bg-muted"
            target="_blank"
            rel="noreferrer"
          >
            <div className="font-medium">{repo.name}</div>
            <div className="text-muted-foreground text-xs">
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
