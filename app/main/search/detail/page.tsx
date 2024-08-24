"use client";

import SearchProgress from "@/components/search/search-progress";
import SearchResult from "@/components/search/search-result";
import SearchSkeleton from "@/components/search/search-skeleton";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResultType {
  summary: string;
  references: any[];
}

export default function SearchDetailPage() {
  const [isSearching, setIsSearching] = useState(true);
  const [searchResult, setSearchResult] = useState<SearchResultType | null>(
    null
  );
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/main/search");
  };

  useEffect(() => {
    if (query) {
      // 这里可以添加实际的搜索逻辑
      console.log("搜索问题:", query);
      setIsSearching(true);
      // 模拟搜索过程
      setTimeout(() => {
        setIsSearching(false);
        setSearchResult({
          summary: `这是关于 "${query}" 的搜索结果摘要。`,
          references: [
            { title: "参考链接1", url: "https://example.com/1" },
            { title: "参考链接2", url: "https://example.com/2" },
          ],
        });
      }, 2000);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/main/search"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          返回搜索
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          搜索问题: 「{query}」
        </h1>
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <SearchProgress />
          {isSearching && <SearchSkeleton />}
          {searchResult && (
            <SearchResult
              summary={searchResult.summary}
              references={searchResult.references}
            />
          )}
        </div>
      </div>
    </div>
  );
}
