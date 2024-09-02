import { supabase } from "./client";

interface Article {
  id: number;
  title: string;
  markdown: string;
  user_id: string; // 添加user_id字段
}

export async function fetchArticles(userId: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("user_id", userId); // 使用传入的userId获取用户ID
  if (error) throw new Error(`Error fetching articles: ${error.message}`);
  return data as Article[];
}

export async function addArticle(
  article: Omit<Article, "user_id">,
  userId: string
): Promise<Article[]> {
  const { data, error } = await supabase.from("articles").insert({
    ...article,
    user_id: userId, // 使用传入的userId获取用户ID
  });
  if (error) throw new Error(`Error adding article: ${error.message}`);
  return data as unknown as Article[];
}

export async function updateArticle(
  id: number,
  updates: Partial<Article>
): Promise<Article[]> {
  const { data, error } = await supabase
    .from("articles")
    .update(updates)
    .eq("id", id);
  if (error) throw new Error(`Error updating article: ${error.message}`);
  console.log("Article updated successfully", data);
  return data as unknown as Article[];
}

export async function deleteArticle(id: number): Promise<Article[]> {
  const { data, error } = await supabase.from("articles").delete().eq("id", id);
  if (error) throw new Error(`Error deleting article: ${error.message}`);
  return data as unknown as Article[];
}
