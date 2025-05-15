"use client";
import React from "react";
import { ThemeToggle } from "./theme-toggle";
import { ProfileDropdown } from "./profile/profile-dropdown";
import { useGitHubStore } from "@/stores/useGithub";

const Header = () => {
  const { username } = useGitHubStore();

  return (
    <div className="flex justify-between items-center max-w-6xl mx-auto p-4 pb-0">
      <h1 className="text-2xl font-semibold">
        {username || "john-doe"}&apos;s dashboard
      </h1>
      <div className="flex items-center gap-2">
        <ProfileDropdown />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Header;
