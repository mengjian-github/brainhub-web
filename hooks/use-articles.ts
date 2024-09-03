import { useState, useEffect, useCallback } from "react";
import {
  fetchArticles,
  addArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/supabase/articles";
import { useAuth } from "@/hooks/auth-context";
import { toast } from "react-hot-toast";

export interface Article {
  id: number;
  title: string;
  markdown: string;
}

export function useArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true); // 新增：加载状态
  const { user } = useAuth();

  useEffect(() => {
    const loadArticles = async () => {
      if (user) {
        setIsLoading(true);
        try {
          const fetchedArticles = await fetchArticles(user.id);
          setArticles(fetchedArticles);
          if (fetchedArticles.length > 0) {
            setSelectedArticleId(fetchedArticles[0].id);
          }
        } catch (error) {
          console.error("加载文章失败:", error);
          toast.error("加载文章失败");
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadArticles();
  }, [user]);

  const addNewArticle = useCallback(async () => {
    if (user) {
      try {
        const newArticle: Omit<Article, "user_id"> = {
          id: Date.now(),
          title: "未命名文章",
          markdown: "",
        };
        await addArticle(newArticle, user.id);
        setArticles((prevArticles) => [...prevArticles, newArticle]);
        setSelectedArticleId(newArticle.id);
        toast.success("文章添加成功");
        return newArticle;
      } catch (error) {
        toast.error("文章添加失败");
      }
    }
  }, [user]);

  const updateLocalArticleContent = useCallback(
    (id: number, markdown: string) => {
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, markdown } : article
        )
      );
    },
    []
  );

  const updateArticleContent = useCallback(
    async (id: number, markdown: string) => {
      try {
        await updateArticle(id, { markdown });
        // 不需要在这里更新本地状态，因为已经在 updateLocalArticleContent 中更新了
      } catch (error) {
        console.error("更新文章失败:", error);
        toast.error("更新文章失败");
      }
    },
    []
  );

  const updateArticleTitle = useCallback(async (id: number, title: string) => {
    try {
      await updateArticle(id, { title });
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, title } : article
        )
      );
      toast.success("文章标题更新成功");
    } catch (error) {
      toast.error("文章标题更新失败");
    }
  }, []);

  const deleteArticleById = useCallback(
    async (id: number) => {
      try {
        await deleteArticle(id);
        setArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );
        if (selectedArticleId === id) {
          const nextArticle = articles.find((article) => article.id !== id);
          setSelectedArticleId(nextArticle ? nextArticle.id : null);
        }
        toast.success("文章删除成功");
      } catch (error) {
        toast.error("文章删除失败");
      }
    },
    [articles, selectedArticleId]
  );

  const selectArticle = useCallback((id: number) => {
    setSelectedArticleId(id);
  }, []);

  const getSelectedArticle = useCallback(() => {
    return articles.find((article) => article.id === selectedArticleId);
  }, [articles, selectedArticleId]);

  return {
    articles,
    selectedArticleId,
    addNewArticle,
    updateArticleContent,
    updateArticleTitle,
    deleteArticleById,
    selectArticle,
    getSelectedArticle,
    updateLocalArticleContent,
    isLoading, // 新增：返回加载状态
  };
}
