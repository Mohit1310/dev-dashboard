"use client";

import { devTools } from "@/data/dev-tools";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  type LucideIcon,
  Zap,
  Send,
  Search,
  FileText,
  Globe,
  Codesandbox,
  MessageCircleDashed,
  BotMessageSquare,
  Bolt,
  MessageCircleHeart,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  send: Send,
  search: Search,
  "file-text": FileText,
  globe: Globe,
  codesandbox: Codesandbox,
  "message-circle-dashed": MessageCircleDashed,
  "bot-message-square": BotMessageSquare,
  bolt: Bolt,
  "message-circle-heart": MessageCircleHeart,
};

export default function ToolsWidget() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🧰 Developer Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {devTools.map((tool) => {
          const Icon = icons[tool.icon] ?? FileText;
          return (
            <Button
              key={tool.name}
              variant="outline"
              className="flex items-center gap-2 justify-start w-full"
              onClick={() => window.open(tool.url, "_blank")}
            >
              <Icon className="w-4 h-4" />
              {tool.name}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
