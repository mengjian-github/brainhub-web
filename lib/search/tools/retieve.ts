import { z } from "zod";
import { tool } from "ai";

export const retrieveTool = tool({
  description: "Retrieve content from the web",
  parameters: z.object({
    url: z.string().describe("url to retrieve content from"),
  }),
  execute: async ({ url }: { url: string }) => {
    let results:
      | {
          results: { title: string; content: string; url: string }[];
          query: string;
          images: any[];
        }
      | undefined;
    try {
      const response = await fetch(`https://r.jina.ai/${url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "X-With-Generated-Alt": "true",
        },
      });
      const json = await response.json();
      if (!json.data || json.data.length === 0) {
      } else {
        // Limit the content to 5000 characters
        if (json.data.content.length > 5000) {
          json.data.content = json.data.content.slice(0, 5000);
        }
        results = {
          results: [
            {
              title: json.data.title,
              content: json.data.content,
              url: json.data.url,
            },
          ],
          query: "",
          images: [],
        };
      }
    } catch (error) {
      console.error("Retrieve API error:", error);
    }
    return results;
  },
});
