"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useGitHubStore } from "@/stores/useGithub";
import { GithubIcon, User } from "lucide-react";
import { useState } from "react";

export function ProfileDropdown() {
  const { username, setUsername } = useGitHubStore();
  const [input, setInput] = useState("");

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("github-username", input.trim());
    setUsername(input.trim());
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 px-3">
          <User className="h-4 w-4" />
          <span className="font-medium text-muted-foreground text-sm lowercase">
            {username || "john-doe"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuLabel className="flex items-center gap-1">
          <GithubIcon className="h-4 w-4" />
          GitHub Username
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <form className="space-y-2 px-2 py-1.5" onSubmit={handleSave}>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter GitHub username"
          />
          <Button className="w-full" size="sm" type="submit">
            Save
          </Button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
