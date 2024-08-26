import { ModuleName, SUPPORTED_AI_MODELS } from "@/lib/model";
import { convertToCoreMessages, streamText } from "ai";

// Force the route to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

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
