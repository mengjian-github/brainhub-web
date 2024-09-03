import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 导入lucide图标
import ArticleItem from "./article-item"; // 导入ArticleItem组件
import { Article } from "@/hooks/use-articles";

interface ArticleListProps {
  articles: Article[];
  onSelect: (article: Article) => void;
  onAddArticle: () => Promise<Article | undefined>;
  onDeleteArticle: (id: number) => Promise<void>;
  onUpdateTitle: (id: number, title: string) => Promise<void>;
  selectedArticleId: number | null;
}

export default function ArticleList({
  articles,
  onSelect,
  onAddArticle,
  onDeleteArticle,
  onUpdateTitle,
  selectedArticleId,
}: ArticleListProps) {
  const [isCollapsed, setIsCollapsed] = useState(false); // 新增状态
  const [isEditing, setIsEditing] = useState<number | null>(null); // 新增状态
  const [isPopoverOpen, setIsPopoverOpen] = useState<number | null>(null); // 新增状态

  const handleAddArticle = async () => {
    const newArticle = await onAddArticle();
    if (newArticle) {
      setIsEditing(newArticle.id);
      onSelect(newArticle);
    }
  };

  const handleDeleteArticle = async (id: number) => {
    await onDeleteArticle(id);
    setIsPopoverOpen(null);
  };

  const handleTitleChange = (id: number, title: string) => {
    // 移除这里的更新逻辑，只在编辑状态下更新本地状态
    if (isEditing === id) {
      // 这里可以添加本地状态更新逻辑，如果需要的话
    }
  };

  const handleTitleBlur = (id: number, title: string) => {
    if (isEditing === id) {
      onUpdateTitle(id, title); // 只在失焦时触发后台更新
      setIsEditing(null);
    }
  };

  return (
    <div
      className={`bg-gray-100 p-4 transition-width duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3
          className={`text-xl font-semibold ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          我的空间
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight /> : <ChevronLeft />}{" "}
          {/* 使用lucide图标 */}
        </Button>
      </div>
      {!isCollapsed && (
        <>
          <ul className="space-y-2">
            {articles.map((article) => (
              <ArticleItem
                key={article.id}
                article={article}
                isEditing={isEditing}
                isPopoverOpen={isPopoverOpen}
                selectedArticleId={selectedArticleId}
                onSelect={onSelect}
                onEdit={setIsEditing}
                onDelete={handleDeleteArticle}
                onTitleBlur={handleTitleBlur} // 新增失焦处理
                onPopoverChange={setIsPopoverOpen}
                onTitleChange={handleTitleChange}
              />
            ))}
          </ul>
          <Button onClick={handleAddArticle} className="mt-4 w-full">
            添加文章
          </Button>
        </>
      )}
    </div>
  );
}
