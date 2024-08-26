"use client";

import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchPage() {
  const handleSearch = (e?: React.FormEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 px-4 pt-32">
      <div className="mb-4 text-center">
        <Image
          className="m-auto mb-8"
          src="/logo.png"
          alt="Logo"
          width={150}
          height={60}
        />
        <h1 className="text-2xl sm:text-3xl font-bold mt-4 text-gray-800">
          智脑AI搜索
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2">
          快速、精准、智能 - 为您解答一切疑问
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        className="w-full max-w-xl mt-10 px-4 sm:px-0"
      >
        <div className="relative">
          <Input
            type="search"
            onKeyDown={handleKeyDown}
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
    </div>
  );
}
