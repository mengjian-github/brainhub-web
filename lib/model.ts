import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { LanguageModel } from "ai";

export type ModuleName =
  | "gpt-4o"
  | "claude-3-5-sonnet"
  | "gemini-1.5-pro"
  | "gemini-1.5-flash"
  | "claude-3-haiku"
  | "gpt-4o-mini";
export type SupportedAiModels = {
  [key in ModuleName]: LanguageModel;
};

export const SUPPORTED_AI_MODELS: SupportedAiModels = {
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "claude-3-5-sonnet": anthropic("claude-3-5-sonnet-20240620"),
  "claude-3-haiku": anthropic("claude-3-haiku-20240307"),
  "gemini-1.5-pro": google("models/gemini-1.5-pro-latest"),
  "gemini-1.5-flash": google("models/gemini-1.5-flash-latest"),
};
