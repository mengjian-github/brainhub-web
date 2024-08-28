import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

export async function answerAgent(query: string, searchResult: any) {
  try {
    const stream = await streamText({
      model: anthropic("claude-3-sonnet-20240229"),
      prompt: `
      You are a professional search query assistant. Generate a relevant answer based on the following user query and search results.

      Requirements:
      1. The answer should be informative and of moderate length
      2. Use Markdown format
      3. Ensure the answer is highly relevant to the user's query
      4. Maintain an objective and neutral tone
      5. Output the content directly in Markdown format without 1-level headings
      6. Answer in the same language as the user's query
      7. Reference relevant search results in the answer using numbered hyperlinks, e.g., [1], [2], etc.
      8. The numbered references should correspond to the indices of the searchResult array (starting from 1)
      9. Do not add a reference list at the end of the answer

      User Query: ${query}
      Search Results:
      ${JSON.stringify(searchResult, null, 2)}
      `,
    });

    return stream;
  } catch (error) {
    console.error("answerAgent error:", error);
    throw error;
  }
}
