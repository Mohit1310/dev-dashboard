"use client";

import { useBookmarkStore } from "@/stores/useBookmark";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Bookmark } from "lucide-react";
import { v4 as uuid } from "uuid";

export default function BookmarksWidget() {
  const { bookmarks, addBookmark, removeBookmark } = useBookmarkStore();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const handleAdd = () => {
    if (!title || !url) return;
    addBookmark({ id: uuid(), title, url });
    setTitle("");
    setUrl("");
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="w-5 h-5" />
          Bookmarks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>

        <div className="space-y-2">
          {bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="flex items-center justify-between rounded-md border px-3 py-2 text-sm hover:bg-muted transition"
            >
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate max-w-xs"
              >
                {bookmark.title}
              </a>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeBookmark(bookmark.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
