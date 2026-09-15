import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

import { createGoogleGenerativeAI } from "@ai-sdk/google";

import { db } from "@/db";
import { message } from "@/db/schema";

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

    instructions: "You are a helpful assistant.",

    messages: await convertToModelMessages(messages),

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
