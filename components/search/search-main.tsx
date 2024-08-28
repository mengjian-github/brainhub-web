"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SearchDetail from "@/components/search/search-detail";
import { AIState, search } from "@/lib/search";
import { readStreamableValue } from "ai/rsc";
import ModelSelector from "@/components/chat/model-selector";
import { ModuleName } from "@/lib/model";

export default function SearchMain() {
  const [query, setQuery] = useState("");
  const [aiState, setAIState] = useState<AIState>();
  const [hasSearchResult, setHasSearchResult] = useState(false);
  const [selectedModel, setSelectedModel] =
    useState<ModuleName>("claude-3-5-sonnet");

  useEffect(() => {
    const storedModel =
      localStorage.getItem("selectedModel") || "claude-3-5-sonnet";
    setSelectedModel(storedModel as ModuleName);
  }, []);

  const handleSearch = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    if (query.trim()) {
      const aiState = await search(query, selectedModel);
      setHasSearchResult(true);

      for await (const state of readStreamableValue(aiState)) {
        setAIState(state);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleModelChange = (value: ModuleName) => {
    setSelectedModel(value);
    localStorage.setItem("selectedModel", value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 pt-8">
      {!hasSearchResult && (
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
        className={`w-full max-w-[80%] ${hasSearchResult ? "mb-8" : "mt-4"}`}
      >
        <div className="flex items-stretch">
          <ModelSelector
            value={selectedModel}
            onValueChange={handleModelChange}
            className="w-32 sm:w-40 rounded-l-full border border-r-0 border-gray-300"
          />
          <div className="relative flex-grow">
            <Input
              type="search"
              value={query}
              onChange={handleInputChange}
              placeholder="输入问题，探索可能"
              className="w-full px-4 py-2 sm:py-3 rounded-r-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-base sm:text-lg [&::-webkit-search-cancel-button]:appearance-none"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="text-gray-400 w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
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
