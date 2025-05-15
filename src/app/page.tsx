import BookmarksWidget from "@/components/bookmarks-widget";
import DailyNewsWidget from "@/components/widgets/daily-news-widget";
import { GitHubActivity } from "@/components/widgets/github-activity";
import { TILNotes } from "@/components/widgets/til-notes";
import ToolsWidget from "@/components/widgets/tools-widget";
import { WidgetCard } from "@/components/widgets/widget-card";

export default function Dashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <BookmarksWidget />
      <WidgetCard title="GitHub Activity">
        <GitHubActivity />
      </WidgetCard>
      <ToolsWidget />
      <DailyNewsWidget />
      <WidgetCard title="Today I Learned">
        <TILNotes />
      </WidgetCard>
    </div>
  );
}
