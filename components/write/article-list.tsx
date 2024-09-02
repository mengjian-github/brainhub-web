import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react"; // 导入lucide图标
import ArticleItem from "./article-item"; // 导入ArticleItem组件
import {
  fetchArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/supabase/articles"; // 导入Supabase方法
import { useAuth } from "@/hooks/auth-context";
import { toast } from "react-hot-toast"; // 导入hot-toast库

interface Article {
  id: number;
  title: string;
  markdown: string;
}

interface ArticleListProps {
  articles: Article[];
  onSelect: (article: Article) => void;
  setArticles: (articles: Article[]) => void;
  selectedArticleId: number | null;
}

export default function ArticleList({
  articles,
  onSelect,
  setArticles,
  selectedArticleId,
}: ArticleListProps) {
  const { user } = useAuth(); // 获取user
  const [isCollapsed, setIsCollapsed] = useState(false); // 新增状态
  const [isEditing, setIsEditing] = useState<number | null>(null); // 新增状态
  const [isPopoverOpen, setIsPopoverOpen] = useState<number | null>(null); // 新增状态

  useEffect(() => {
    const loadArticles = async () => {
      if (user) {
        const articles = await fetchArticles(user.id);
        setArticles(articles);
        if (articles.length > 0) {
          onSelect(articles[0]);
        }
      }
    };
    loadArticles();
  }, [user]);

  const handleAddArticle = async () => {
    if (user) {
      try {
        const newArticle: Omit<Article, "user_id"> = {
          id: Date.now(),
          title: "未命名文章",
          markdown: "",
        };
        await addArticle(newArticle, user.id);
        setArticles([...articles, newArticle]);
        setIsEditing(newArticle.id);
        onSelect(newArticle);
        toast.success("文章添加成功");
      } catch (error) {
        toast.error("文章添加失败");
      }
    }
  };

  const handleDeleteArticle = async (id: number) => {
    try {
      await deleteArticle(id);
      setArticles(articles.filter((article) => article.id !== id));
      if (selectedArticleId === id && articles.length > 1) {
        const nextArticle = articles.find((article) => article.id !== id);
        onSelect(nextArticle!);
      }
      setIsPopoverOpen(null);
      toast.success("文章删除成功");
    } catch (error) {
      toast.error("文章删除失败");
    }
  };

  const handleTitleChange = async (id: number, title: string) => {
    if (isEditing === id) {
      setArticles(
        articles.map((article) =>
          article.id === id ? { ...article, title } : article
        )
      );
    }
  };

  const handleTitleBlur = async (id: number, title: string) => {
    if (isEditing === id) {
      try {
        await updateArticle(id, { title });
        setArticles(
          articles.map((article) =>
            article.id === id ? { ...article, title } : article
          )
        );
        setIsEditing(null);
        toast.success("文章更新成功");
      } catch (error) {
        toast.error("文章更新失败");
      }
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
