import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, LanguageModel, streamText } from "ai";

export const runtime = "edge";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type ModuleName = "gpt-4o" | "claude-3-5-sonnet" | "gemini-1.5-pro";
type SupportedAiModels = {
  [key in ModuleName]: LanguageModel;
};

const SUPPORTED_AI_MODELS: SupportedAiModels = {
  "gpt-4o": openai("gpt-4o"),
  "claude-3-5-sonnet": anthropic("claude-3-5-sonnet-20240620"),
  "gemini-1.5-pro": google("models/gemini-1.5-pro-latest"),
};

export async function POST(req: Request) {
  const { messages, model }: { messages: any[]; model: ModuleName } =
    await req.json();

  const result = await streamText({
    model: SUPPORTED_AI_MODELS[model],
    system: "You are a helpful assistant.",
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
