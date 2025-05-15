"use client";

import { useEffect, useState } from "react";
import { GitHubChart } from "./github-chart";

export function GitHubChartContainer() {
  const [data, setData] = useState<{ date: string; count: number }[]>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("github-username");
    if (stored) setUsername(stored);
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/events/public`)
      .then((res) => res.json())
      .then((events) => {
        const counts: Record<string, number> = {};
        for (const event of events) {
          const day = new Date(event.created_at).toLocaleDateString("en-GB", {
            weekday: "short",
          });
          counts[day] = (counts[day] || 0) + 1;
        }
        const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const result = weekDays.map((day) => ({
          date: day,
          count: counts[day] || 0,
        }));

        setData(result);
      });
  }, [username]);

  return <GitHubChart data={data} />;
}
