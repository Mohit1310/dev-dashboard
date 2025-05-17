"use client";
import { useGitHubStore } from "@/stores/useGithub";
import { ProfileDropdown } from "./profile/profile-dropdown";
import { ThemeToggle } from "./theme-toggle";

const Header = () => {
  const { username } = useGitHubStore();

  return (
    <div className="mx-auto flex max-w-6xl items-center justify-between p-4 pb-0">
      <h1 className="font-semibold text-2xl">
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
