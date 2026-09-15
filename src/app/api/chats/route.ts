import { db } from "@/db";
import { chat } from "@/db/schema";
import { auth } from "@/lib/auth";
import { nanoid } from "nanoid";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const { chatId } = await req.json();

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Unauthorized");
  }

  await db.insert(chat).values({
    id: chatId,

    // We'll replace this with the authenticated user ID
    // once Better Auth session handling is added.
    userId: session.user.id,

    title: null,
  });

  return Response.json({
    chatId,
  });
}
