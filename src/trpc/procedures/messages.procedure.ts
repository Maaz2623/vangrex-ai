import { db } from "@/db";
import { createTRPCRouter, protectedProcedure } from "../init";
import z from "zod";
import { chat, message } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const messagesRouter = createTRPCRouter({
  getMessages: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const [chatRow] = await db
        .select()
        .from(chat)
        .where(
          and(eq(chat.id, input.chatId), eq(chat.userId, ctx.auth.user.id)),
        );

      if (!chatRow) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Conversation not found.",
        });
      }

      const messages = await db
        .select()
        .from(message)
        .where(eq(message.chatId, chatRow.id));

      return messages;
    }),
});
