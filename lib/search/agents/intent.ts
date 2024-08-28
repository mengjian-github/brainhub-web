import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

const searchIntentSchema = z.object({
  originalQuery: z.string(),
  needsSearch: z.boolean(),
  isEnglish: z.boolean(),
  searchQuery: z
    .object({
      original: z.string(),
      english: z.string().optional(),
    })
    .optional(),
  extractedLinks: z.array(z.string()).optional(),
});

export async function searchIntentAgent(userInput: string) {
  try {
    const { object } = await generateObject({
      model: anthropic("claude-3-sonnet-20240229"),
      schema: searchIntentSchema,
      prompt: `
      Analyze the following user input, determine if it's in English, and decide if a search engine query is needed. If so, rewrite it as a suitable search question.
      If the input contains any links, please extract them.

      User input: ${userInput}

      Please output in the following format:
      {
        "originalQuery": "Original user input",
        "needsSearch": true/false,
        "isEnglish": true/false,
        "searchQuery": {
          "original": "Rewritten search question in the original language",
          "english": "Rewritten search question in English (only if input is not in English)"
        },
        "extractedLinks": ["link1", "link2"]
      }

      If no search is needed, omit the searchQuery field. If there are no links, omit the extractedLinks field.
      Always include the "isEnglish" field indicating whether the input is in English.
      If the input is not in English, provide both the original language and English versions in the searchQuery.
      If the input is already in English, only provide the "original" field in searchQuery and omit the "english" field.
      `,
    });

    return object;
  } catch (error) {
    console.error("searchIntentAgent error:", error);
    throw error;
  }
}
