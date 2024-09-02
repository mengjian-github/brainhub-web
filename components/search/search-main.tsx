"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchDetail from "@/components/search/search-detail";
import { AIState, search } from "@/lib/search";
import { readStreamableValue } from "ai/rsc";

// 定义搜索状态的类型
type SearchStatus =
  | "idle"
  | "searching"
  | "searchStreamStart"
  | "completed"
  | "error";

export default function SearchMain() {
  const [query, setQuery] = useState("");
  const [aiState, setAIState] = useState<AIState>();
  const [searchStatus, setSearchStatus] = useState<SearchStatus>("idle");

  const handleSearch = useCallback(
    async (e?: React.FormEvent<HTMLFormElement>) => {
      e?.preventDefault();

      if (!query.trim()) return;

      setSearchStatus("searching");

      try {
        const aiState = await search(query, "gpt-4o");
        setSearchStatus("searchStreamStart");

        for await (const state of readStreamableValue(aiState)) {
          setAIState(state);
        }
        setSearchStatus("completed");
      } catch (error) {
        console.error("搜索出错:", error);
        setSearchStatus("error");
        // 这里可以添加更多错误处理逻辑
      }
    },
    [query]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-8">
      {searchStatus === "idle" && (
        <div className="mt-24 text-center">
          <Image
            className="m-auto mb-4"
            src="/logo.png"
            alt="Logo"
            width={100}
            height={40}
          />
          <h1 className="text-2xl sm:text-3xl font-bold mt-2 text-gray-800">
            智脑AI搜索
          </h1>
          <p className="text-lg text-gray-600 mt-2 mb-6">
            智能搜索，为您提供精准答案
          </p>
        </div>
      )}

      <form
        onSubmit={handleSearch}
        className={`w-full max-w-[80%] ${
          searchStatus !== "idle" ? "mb-8" : "mt-4"
        }`}
      >
        <div className="relative flex items-center">
          <Input
            type="search"
            value={query}
            onChange={handleInputChange}
            placeholder="输入问题，探索可能"
            className="w-full px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-base sm:text-lg pr-12 [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </form>

      <div className="w-full max-w-[80%] transition-all duration-300 ease-in-out">
        {searchStatus === "searching" && (
          <div className="flex justify-center items-center h-32 animate-fade-in">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
        {["searchStreamStart", "completed"].includes(searchStatus) &&
          aiState && (
            <div className="animate-fade-in">
              <SearchDetail aiState={aiState} />
            </div>
          )}
        {searchStatus === "error" && (
          <div className="text-red-500 text-center">
            搜索时发生错误,请稍后重试。
          </div>
        )}
      </div>
    </div>
  );
}
