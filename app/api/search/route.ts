import { ModuleName, SUPPORTED_AI_MODELS } from "@/lib/model";
import { retrieveTool } from "@/lib/tools/retieve";
import { searchTool } from "@/lib/tools/search";
import { convertToCoreMessages, streamText } from "ai";

// Force the route to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model }: { messages: any[]; model: ModuleName } =
    await req.json();

  console.log(messages, model);

  const result = await streamText({
    model: SUPPORTED_AI_MODELS[model],
    maxTokens: 2500,
    system: `作为一名专业的搜索专家，你具备在网络上搜索任何信息的能力。
    对于每个用户查询，充分利用搜索结果，在你的回答中提供额外的信息和帮助。
    如果有与你的回答相关的图片，请务必也包含在内。
    直接针对用户的问题给出回答，并用从搜索结果中获得的见解来丰富你的回应。
    当引用或参考特定URL的信息时，始终使用[[编号]](url)格式明确引用源URL。根据需要可以包含多个引用，例如：[[编号]](url)，[[编号]](url)。
    编号必须始终与搜索结果的顺序相匹配。
    retrieve工具只能用于用户提供的URL。不能使用搜索结果中的URL。
    如果是域名而不是URL，请在搜索工具的include_domains中指定。
    请确保回答的语言与用户的语言相匹配。当前日期和时间：${new Date().toLocaleString()}
    `,
    messages: convertToCoreMessages(messages),
    tools: { retrieveTool, searchTool },
  });

  return result.toDataStreamResponse();
}
