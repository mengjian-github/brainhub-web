import { generateText } from "ai";
import { retrieveTool } from "../tools/retieve";
import { searchTool } from "../tools/search";
import { anthropic } from "@ai-sdk/anthropic";

export async function searchAgent(input: {
  originalQuery: string;
  needsSearch: boolean;
  isEnglish: boolean;
  searchQuery?: {
    original: string;
    english?: string;
  };
  extractedLinks?: string[];
}) {
  if (!input.needsSearch) {
    return [];
  }

  const prompt = `
Analyze the following user query and perform search operations:

Original query: ${input.originalQuery}
Is English: ${input.isEnglish}
Search query: ${input.searchQuery?.original}
English search query: ${input.searchQuery?.english || ""}
Extracted links: ${input.extractedLinks?.join(", ") || ""}

1. If there are extracted links, use the retrieve tool to get their content.
2. Based on the retrieve results, decide whether to rewrite the search query.
3. Determine the number of search results (range 30-50) based on the complexity of the question.
4. Use the search tool to perform searches. If the original query is not in English and an English search query is provided, perform searches in both the original language and English.
5. Use the retrieve tool for link retrieval.
6. Sort search results by relevance to the question.

Please note:
1. Do not perform retrieve operations if the extracted links are empty.
2. Do not perform search operations if the search query is empty.
3. Do not perform retrieve operations if the search query is empty.
`;

  const { toolResults } = await generateText({
    model: anthropic("claude-3-sonnet-20240229"),
    prompt: prompt,
    tools: { retrieveTool, searchTool },
  });

  return toolResults;
}
