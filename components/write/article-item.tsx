import { Edit, Trash } from "lucide-react"; // 导入图标
import { Input } from "../ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // 导入shadcn的Popover组件
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface Article {
  id: number;
  title: string;
  markdown: string;
}

interface ArticleItemProps {
  article: Article;
  isEditing: number | null;
  isPopoverOpen: number | null;
  selectedArticleId: number | null;
  onSelect: (article: Article) => void;
  onEdit: (id: number | null) => void;
  onDelete: (id: number) => Promise<void>;
  onTitleBlur: (id: number, title: string) => void;
  onPopoverChange: (id: number | null) => void;
  onTitleChange: (id: number, title: string) => void;
}

export default function ArticleItem({
  article,
  isEditing,
  isPopoverOpen,
  selectedArticleId,
  onSelect,
  onEdit,
  onDelete,
  onTitleBlur,
  onPopoverChange,
  onTitleChange,
}: ArticleItemProps) {
  const [localTitle, setLocalTitle] = useState(article.title);

  useEffect(() => {
    setLocalTitle(article.title);
  }, [article.title]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value);
    onTitleChange(article.id, e.target.value);
  };

  const handleTitleBlur = () => {
    onTitleBlur(article.id, localTitle);
  };

  return (
    <li
      className={`flex justify-between items-center p-3 cursor-pointer rounded-lg border ${
        selectedArticleId === article.id
          ? "border-blue-500 bg-blue-50"
          : "border-gray-200 bg-white"
      } shadow-sm hover:shadow-md transition-shadow`}
      onClick={() => onSelect(article)} // 将点击事件绑定到整个列表项
    >
      {isEditing === article.id ? (
        <input
          type="text"
          value={localTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          autoFocus
          className="flex-1 w-full p-1 border rounded"
        />
      ) : (
        <span className="flex-1 text-gray-800 mr-2">{article.title}</span>
      )}
      <div className="flex space-x-2">
        <Edit
          className="h-5 w-5 text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation(); // 阻止事件冒泡
            onEdit(article.id);
          }}
        />
        <Popover
          open={isPopoverOpen === article.id}
          onOpenChange={(open) => onPopoverChange(open ? article.id : null)}
        >
          <PopoverTrigger asChild>
            <Trash
              className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation(); // 阻止事件冒泡
              }}
            />
          </PopoverTrigger>
          <PopoverContent>
            <div className="p-4">
              <h3 className="text-lg font-semibold">确认删除</h3>
              <p className="text-sm text-gray-600">
                你确定要删除这篇文章吗？此操作无法撤销。
              </p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" onClick={() => onPopoverChange(null)}>
                  取消
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDelete(article.id)}
                >
                  删除
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </li>
  );
}
