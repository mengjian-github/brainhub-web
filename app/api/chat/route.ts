import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { convertToCoreMessages, LanguageModel, streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// const openai = createOpenAI({
//   baseURL: process.env.OPENAI_BASE_URL,
// });

// const anthropic = createAnthropic({
//   baseURL: process.env.ANTHROPIC_BASE_URL,
// });

// const google = createGoogleGenerativeAI({
//   baseURL: process.env.GOOGLE_BASE_URL,
// });

type ModuleName =
  | "gpt-4o"
  | "claude-3-5-sonnet"
  | "gemini-1.5-pro"
  | "gemini-1.5-flash"
  | "claude-3-haiku"
  | "gpt-4o-mini";
type SupportedAiModels = {
  [key in ModuleName]: LanguageModel;
};

const SUPPORTED_AI_MODELS: SupportedAiModels = {
  "gpt-4o": openai("gpt-4o"),
  "gpt-4o-mini": openai("gpt-4o-mini"),
  "claude-3-5-sonnet": anthropic("claude-3-5-sonnet-20240620"),
  "claude-3-haiku": anthropic("claude-3-haiku-20240307"),
  "gemini-1.5-pro": google("models/gemini-1.5-pro-latest"),
  "gemini-1.5-flash": google("models/gemini-1.5-flash-latest"),
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
