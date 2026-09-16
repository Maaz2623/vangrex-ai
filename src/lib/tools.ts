import { tavily } from "@tavily/core";
import { tool } from "ai";
import { z } from "zod";

const client = tavily({
  apiKey: process.env.TAVILY_API_KEY!,
});

export const webSearchTool = tool({
  description:
    "Search the web for current or factual information. Use this when the user asks about recent events, current information, websites, products, people, companies, or anything that may require up-to-date information.",

  inputSchema: z.object({
    query: z.string().describe("The search query"),
  }),

  execute: async ({ query }) => {
    const result = await client.search(query, {
      searchDepth: "basic",
      maxResults: 5,
    });

    return {
      query,
      results: result.results.map((item) => ({
        title: item.title,
        url: item.url,
        content: item.content,
      })),
    };
  },
});
