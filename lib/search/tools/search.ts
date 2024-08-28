import { tool } from "ai";
import { z } from "zod";

type SearchResultItem = {
  title: string;
  url: string;
  content: string;
  score: number;
};

type SearchResultImage =
  | string
  | {
      url: string;
      description: string;
      number_of_results?: number;
    };

type SearchResults = {
  images: SearchResultImage[];
  results: SearchResultItem[];
  number_of_results?: number;
  query: string;
};

const searchSchema = z.object({
  query: z.string().describe("The query to search for"),
  max_results: z.number().describe("The maximum number of results to return"),
  search_depth: z
    .enum(["basic", "advanced"])
    .describe("The depth of the search"),
  include_domains: z
    .array(z.string())
    .optional()
    .describe(
      "A list of domains to specifically include in the search results. Default is None, which includes all domains."
    ),
  exclude_domains: z
    .array(z.string())
    .optional()
    .describe(
      "A list of domains to specifically exclude from the search results. Default is None, which doesn't exclude any domains."
    ),
});

export const searchTool = tool({
  description: "Search the web for information",
  parameters: searchSchema,
  execute: async ({
    query,
    max_results,
    search_depth,
    include_domains,
    exclude_domains,
  }: z.infer<typeof searchSchema>) => {
    // Tavily API requires a minimum of 5 characters in the query
    const filledQuery =
      query.length < 5 ? query + " ".repeat(5 - query.length) : query;
    let searchResult: SearchResults;

    try {
      searchResult = await tavilySearch(
        filledQuery,
        max_results,
        search_depth,
        include_domains,
        exclude_domains
      );
    } catch (error) {
      console.error("Search API error:", error);
      searchResult = {
        results: [],
        query: filledQuery,
        images: [],
        number_of_results: 0,
      };
    }

    return searchResult;
  },
});

async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: "basic" | "advanced" = "basic",
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    throw new Error("TAVILY_API_KEY is not set in the environment variables");
  }
  const includeImageDescriptions = true;
  const response = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: Math.max(maxResults, 5),
      search_depth: searchDepth,
      include_images: true,
      include_image_descriptions: includeImageDescriptions,
      include_answers: true,
      include_domains: includeDomains,
      exclude_domains: excludeDomains,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Tavily API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const processedImages = includeImageDescriptions
    ? data.images
        .map(({ url, description }: { url: string; description: string }) => ({
          url: sanitizeUrl(url),
          description,
        }))
        .filter(
          (
            image: SearchResultImage
          ): image is { url: string; description: string } =>
            typeof image === "object" &&
            image.description !== undefined &&
            image.description !== ""
        )
    : data.images.map((url: string) => sanitizeUrl(url));

  return {
    ...data,
    images: processedImages,
  };
}

function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, "%20");
}
