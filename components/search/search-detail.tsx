"use client";

import SearchProgress from "@/components/search/search-progress";
import SearchResult from "@/components/search/search-result";
import SearchSkeleton from "@/components/search/search-skeleton";
import { AIState } from "@/lib/search";

export default function SearchDetail({ aiState }: { aiState?: AIState }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
      <SearchProgress currentStep={aiState?.currentStep ?? 0} />
      {!aiState?.answer && <SearchSkeleton />}
      {aiState?.answer && (
        <div className="p-6">
          <SearchResult
            answer={aiState.answer}
            references={aiState.searchResults}
          />
        </div>
      )}
    </div>
  );
}
