import { ChatView } from "@/features/chat/component/chat-view";
import { getQueryClient, trpc } from "@/trpc/server";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;

  const queryClient = getQueryClient();

  const data = await queryClient.query(
    trpc.messages.getMessages.queryOptions({
      chatId,
    }),
  );

  return <ChatView data={data} chatId={chatId} />;
};

export default ChatIdPage;
