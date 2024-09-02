"use client";

import Editor, { EditorRef } from "@/components/write/editor";
import DistributionModal from "@/components/write/distribution-modal";
import ArticleList from "@/components/write/article-list"; // 新增导入
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/protected-route";
import { updateArticle } from "@/lib/supabase/articles"; // 导入Supabase方法

interface Article {
  id: number;
  title: string;
  markdown: string;
}

export default function Write() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({ markdown: "", html: "" });
  const [articles, setArticles] = useState<Article[]>([]); // 新增状态
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  ); // 新增状态
  const editorRef = useRef<EditorRef>(null);

  const handleDistribute = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getMarkdown();
      const html = editorRef.current.getHtml();
      setContent({ markdown, html });
      setIsModalOpen(true);
    }
  };

  const handleArticleSelect = (article: Article) => {
    if (editorRef.current) {
      editorRef.current.setMarkdown(article.markdown);
    }
    setSelectedArticleId(article.id);
  };

  const handleEditorChange = async (markdown: string) => {
    if (selectedArticleId !== null) {
      await updateArticle(selectedArticleId, { markdown });
    }
  };

  return (
    <ProtectedRoute redirectTo="/auth/login?redirectTo=/main/write">
      <div className="min-h-screen bg-background flex">
        <ArticleList
          articles={articles}
          onSelect={handleArticleSelect}
          setArticles={setArticles}
          selectedArticleId={selectedArticleId} // 传递选中态
        />
        <main className="flex-1">
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
    </ProtectedRoute>
  );
}
