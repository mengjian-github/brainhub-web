import { openrouter } from "@openrouter/ai-sdk-provider";

import { LanguageModel } from "ai";

export type ModuleName =
  | "gpt-4o"
  | "claude-3-5-sonnet"
  | "gemini-1.5-pro"
  | "gemini-1.5-flash"
  | "claude-3-haiku"
  | "gpt-4o-mini"
  | "auto";

export type SupportedAiModels = {
  [key in ModuleName]: LanguageModel;
};

export const SUPPORTED_AI_MODELS: SupportedAiModels = {
  "gpt-4o": openrouter("openai/gpt-4o"),
  "gpt-4o-mini": openrouter("openai/gpt-4o-mini"),
  "claude-3-5-sonnet": openrouter("anthropic/claude-3.5-sonnet"),
  "claude-3-haiku": openrouter("anthropic/claude-3-haiku"),
  "gemini-1.5-pro": openrouter("google/gemini-pro-1.5"),
  "gemini-1.5-flash": openrouter("google/gemini-flash-1.5"),
  auto: openrouter("openrouter/auto"),
};
