"use client";

import Editor, { EditorRef } from "@/components/write/editor";
import DistributionModal from "@/components/write/distribution-modal";
import ArticleList from "@/components/write/article-list"; // 新增导入
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/protected-route";
import { updateArticle, fetchArticle } from "@/lib/supabase/articles"; // 导入Supabase方法
import debounce from "lodash/debounce";
import toast from "react-hot-toast";

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
  const [saveStatus, setSaveStatus] = useState<
    "保存中" | "已保存" | "保存失败"
  >("已保存");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const saveContent = useCallback(async (id: number, markdown: string) => {
    setSaveStatus("保存中");
    try {
      await updateArticle(id, { markdown });
      setSaveStatus("已保存");
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error("保存失败:", error);
      setSaveStatus("保存失败");
    }
  }, []);

  const debouncedSave = debounce(saveContent, 1000);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleDistribute = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getMarkdown();
      const html = editorRef.current.getHtml();
      setContent({ markdown, html });
      setIsModalOpen(true);
    }
  };

  const handleArticleSelect = async (article: Article) => {
    try {
      // 在切换文章之前,保存当前文章
      if (selectedArticleId && editorRef.current) {
        const currentMarkdown = editorRef.current.getMarkdown();
        await updateArticle(selectedArticleId, { markdown: currentMarkdown });
      }

      // 获取最新的文章数据
      const updatedArticle = await fetchArticle(article.id);

      if (editorRef.current) {
        editorRef.current.setMarkdown(updatedArticle.markdown);
      }
      setSelectedArticleId(updatedArticle.id);

      // 更新文章列表中的对应文章
      setArticles((prevArticles) =>
        prevArticles.map((a) =>
          a.id === updatedArticle.id ? updatedArticle : a
        )
      );

      setHasUnsavedChanges(false); // 重置未保存更改状态
      setSaveStatus("已保存"); // 更新保存状态
    } catch (error) {
      console.error("切换文章失败:", error);
      toast.error("切换文章失败,请稍后重试");
    }
  };

  const handleEditorChange = (value: string) => {
    setHasUnsavedChanges(true);
    if (selectedArticleId) {
      debouncedSave(selectedArticleId, value);
    }
  };

  return (
    <ProtectedRoute redirectTo="/auth/login?redirectTo=/main/write">
      <div className="min-h-screen bg-background flex">
        <ArticleList
          articles={articles}
          onSelect={handleArticleSelect}
          setArticles={setArticles}
          selectedArticleId={selectedArticleId}
        />
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="bg-card shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-semibold">智脑写作</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{saveStatus}</span>
                  <Button
                    onClick={handleDistribute}
                    disabled={!selectedArticleId}
                  >
                    分发
                  </Button>
                </div>
              </div>
              {selectedArticleId ? (
                <Editor ref={editorRef} onChange={handleEditorChange} />
              ) : (
                <div className="p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    请选择一篇文章或创建新文章以开始编辑
                  </p>
                </div>
              )}
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
