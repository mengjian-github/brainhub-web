"use client";

import Editor, { EditorRef } from "@/components/write/editor";
import DistributionModal from "@/components/write/distribution-modal";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Write() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({ markdown: "", html: "" });
  const editorRef = useRef<EditorRef>(null);

  const handleDistribute = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getMarkdown();
      const html = editorRef.current.getHtml();
      setContent({ markdown, html });
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="bg-card shadow">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-semibold">智脑写作</h2>
              <Button onClick={handleDistribute}>分发</Button>
            </div>
            <Editor ref={editorRef} />
            <DistributionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              content={content}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
