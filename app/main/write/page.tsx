"use client";

import Editor, { EditorRef } from "@/components/write/editor";
import DistributionModal from "@/components/write/distribution-modal";
import ArticleList from "@/components/write/article-list"; // 新增导入
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import ProtectedRoute from "@/components/protected-route";
import debounce from "lodash/debounce";
import AIChatSidebar from "@/components/write/ai-chat-sidebar"; // 新增导入
import { ChevronLeft, ChevronRight } from "lucide-react"; // 新增导入
import { useArticles } from "@/hooks/use-articles";
import { Loader2 } from "lucide-react"; // 导入 Loader2 图标

interface Article {
  id: number;
  title: string;
  markdown: string;
}

export default function Write() {
  const {
    articles,
    selectedArticleId,
    addNewArticle,
    updateArticleContent,
    updateArticleTitle,
    deleteArticleById,
    selectArticle,
    getSelectedArticle,
    updateLocalArticleContent, // 新增：用于更新本地文章内容
    isLoading, // 新增：从 useArticles 中获取加载状态
  } = useArticles();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({ markdown: "", html: "" });
  const editorRef = useRef<EditorRef>(null);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false); // 新增状态
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorContent, setEditorContent] = useState(""); // 新增：用于存储编辑器内容

  const debouncedSave = debounce((id: number, content: string) => {
    updateArticleContent(id, content);
  }, 1000);

  // 新增：监听 selectedArticleId 的变化
  useEffect(() => {
    if (selectedArticleId && isEditorReady) {
      const selectedArticle = getSelectedArticle();
      if (selectedArticle) {
        setEditorContent(selectedArticle.markdown);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedArticleId, isEditorReady]);

  const handleDistribute = () => {
    if (editorRef.current) {
      const markdown = editorRef.current.getMarkdown();
      const html = editorRef.current.getHtml();
      setContent({ markdown, html });
      setIsModalOpen(true);
    }
  };

  const handleArticleSelect = (article: Article) => {
    selectArticle(article.id);
  };

  const handleEditorChange = (value: string) => {
    setHasUnsavedChanges(true);
    if (selectedArticleId) {
      updateLocalArticleContent(selectedArticleId, value); // 立即更新本地状态
      debouncedSave(selectedArticleId, value); // debounce 保存到云端
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <ProtectedRoute redirectTo="/auth/login?redirectTo=/main/write">
      <div className="min-h-screen bg-background flex">
        <ArticleList
          articles={articles}
          onSelect={handleArticleSelect}
          onAddArticle={addNewArticle}
          onDeleteArticle={deleteArticleById}
          onUpdateTitle={updateArticleTitle}
          selectedArticleId={selectedArticleId}
        />
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isAIChatOpen ? "mr-1/3" : ""
          }`}
        >
          <div className="max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="bg-card shadow">
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-2xl font-semibold">智脑写作</h2>
                <div className="flex items-center space-x-4">
                  <Button
                    onClick={handleDistribute}
                    disabled={!selectedArticleId}
                  >
                    分发
                  </Button>
                </div>
              </div>
              {articles.length > 0 ? (
                <Editor
                  ref={editorRef}
                  onChange={handleEditorChange}
                  onReady={() => setIsEditorReady(true)}
                  initialContent={editorContent} // 新增：传递初始内容
                  key={selectedArticleId} // 添加这一行
                />
              ) : (
                <div className="p-8 text-center">
                  <p className="text-lg text-gray-600 mb-4">
                    请选择一篇文或创建新文章以开始编辑
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
          <button
            className="fixed right-0 top-4 bg-primary text-white p-2 rounded-l-md z-50 transition-all duration-300 ease-in-out"
            onClick={() => setIsAIChatOpen(!isAIChatOpen)}
            aria-label={isAIChatOpen ? "收起AI助手" : "展开AI助手"}
            style={{ right: isAIChatOpen ? "calc(33.333% - 2rem)" : "0" }}
          >
            {isAIChatOpen ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={24} />
            )}
          </button>
        </main>
        <AIChatSidebar isOpen={isAIChatOpen} />
      </div>
    </ProtectedRoute>
  );
}
