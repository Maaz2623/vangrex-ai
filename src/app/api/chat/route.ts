import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { db } from "@/db";
import { message } from "@/db/schema";
import { webSearchTool } from "@/lib/tools";

export const maxDuration = 30;

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!,
});

export async function POST(req: Request) {
  const {
    chatId,
    messages,
  }: {
    chatId: string;
    messages: UIMessage[];
  } = await req.json();

  console.log("CHAT ID: ", chatId);

  // Get the latest message sent by the user
  const userMessage = messages[messages.length - 1];

  if (!userMessage) {
    return new Response("No message provided", {
      status: 400,
    });
  }

  // Persist the user message
  await db.insert(message).values({
    id: userMessage.id,
    chatId,
    role: userMessage.role,
    parts: userMessage.parts,
    metadata: userMessage.metadata,
  });

  const result = streamText({
    model: google("gemini-3.5-flash-lite"),

    instructions: `You are Vangrex AI.

You have access to a web search tool.

Use web search when:
- The user asks for current information
- The user asks about something that may have changed recently
- The user asks you to search the web
- You need information that you do not reliably know

When you use search, base your answer on the returned results.
Include relevant source URLs in your response when appropriate.

Do not search for ordinary conversational questions where web access is unnecessary.`,

    tools: {
      web_search: webSearchTool,
    },

    messages: await convertToModelMessages(messages),

    stopWhen: isStepCount(10),

    onFinish: async ({ text }) => {
      await db.insert(message).values({
        id: crypto.randomUUID(),
        chatId,
        role: "assistant",
        parts: [
          {
            type: "text",
            text,
          },
        ],
      });
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
    }),
  });
}
