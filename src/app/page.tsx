import { ThemeToggle } from "@/components/theme-toggle";
import { Bookmarks } from "@/components/widgets/bookmarks";
import { GitHubActivity } from "@/components/widgets/github-activity";
import { RSSFeed } from "@/components/widgets/rss-feed";
import { TILNotes } from "@/components/widgets/til-notes";
import { WidgetCard } from "@/components/widgets/widget-card";

export default function Dashboard() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Dev Dashboard</h1>
        <ThemeToggle />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <WidgetCard title="Bookmarks">
          <Bookmarks />
        </WidgetCard>
        <WidgetCard title="GitHub Activity">
          <GitHubActivity username="mohit1310" />
        </WidgetCard>
        <WidgetCard title="RSS Feed">
          <RSSFeed />
        </WidgetCard>
        <WidgetCard title="Today I Learned">
          <TILNotes />
        </WidgetCard>
      </div>
    </>
  );
}
