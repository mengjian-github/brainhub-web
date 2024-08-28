"use client";

import { useState } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchDetail from "@/components/search/search-detail";
import { AIState, search } from "@/lib/search";
import { readStreamableValue, StreamableValue } from "ai/rsc";

export default function SearchMain() {
  const [query, setQuery] = useState("");
  const [aiState, setAIState] = useState<AIState>();
  const [hasSearchResult, setHasSearchResult] = useState(false);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (query.trim()) {
      const aiState = await search(query);
      setHasSearchResult(true);

      for await (const state of readStreamableValue(aiState)) {
        setAIState(state);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-8">
      {!hasSearchResult && (
        <div className="mb-8 text-center">
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
        </div>
      )}

      <form
        onSubmit={handleSearch}
        className={`w-full max-w-[80%] ${hasSearchResult ? "mb-8" : "mt-4"}`}
      >
        <div className="relative">
          <Input
            type="search"
            value={query}
            onChange={handleInputChange}
            placeholder="输入问题，探索无限可能"
            className="w-full px-4 py-2 sm:py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 text-base sm:text-lg [&::-webkit-search-cancel-button]:appearance-none"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </form>

      {aiState && (
        <div className="w-full max-w-[80%]">
          <SearchDetail aiState={aiState} />
        </div>
      )}
    </div>
  );
}
