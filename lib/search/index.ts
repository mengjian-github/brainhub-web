"use server";

import { searchIntentAgent } from "@/lib/search/agents/intent";
import { searchAgent } from "./agents/search";
import { answerAgent } from "./agents/answer";
import { createStreamableValue } from "ai/rsc";
import { ModuleName } from "../model";

export type AIState = {
  query: string;
  currentStep: number;
  answer: string;
  searchResults: any[];
};

export async function search(query: string, model: ModuleName) {
  const initialState: AIState = {
    query,
    currentStep: 0,
    answer: "",
    searchResults: [],
  };
  const stream = createStreamableValue<AIState>(initialState);

  async function updateState(newState: Partial<AIState>) {
    Object.assign(initialState, newState);
    stream.update({ ...initialState });
  }

  async function processAnswer(searchResults: any[] = []) {
    const answer = await answerAgent(query, searchResults, model);
    let result = "";
    for await (const textPart of answer.textStream) {
      result += textPart;
      await updateState({ answer: result, currentStep: 3 });
    }
    stream.done(initialState);
    return answer;
  }

  async function process() {
    const intent = await searchIntentAgent(query, model);
    await updateState({ currentStep: 1 });

    if (!intent.needsSearch) {
      return processAnswer();
    }

    const searchResult = await searchAgent(intent, model);
    const filterSearchResults = searchResult.filter(
      (result) => result.toolName === "searchTool"
    );
    let results = filterSearchResults.flatMap(
      (result) => result.result.results
    );
    results = results.filter((result) => result.score > 0.5);
    results.sort((a, b) => b.score - a.score);
    await updateState({ currentStep: 2, searchResults: results });

    return processAnswer(results);
  }

  process();

  return stream.value;
}
