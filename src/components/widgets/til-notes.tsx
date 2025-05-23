"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const LOCAL_KEY = "til-notes";

export const TILNotes = () => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setNotes(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, notes);
  }, [notes]);

  return (
    <Tabs defaultValue="preview">
      <TabsList className="mb-2">
        <TabsTrigger value="edit">Edit</TabsTrigger>
        <TabsTrigger value="preview">Preview</TabsTrigger>
      </TabsList>

      <TabsContent value="edit">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write something you learned today..."
          className="min-h-[200px]"
        />
      </TabsContent>

      <TabsContent value="preview">
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown>{notes}</ReactMarkdown>
        </div>
      </TabsContent>
    </Tabs>
  );
};
