import { ChatView } from "@/features/chat/component/chat-view";
import React from "react";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

const ChatIdPage = async ({ params }: Props) => {
  const { chatId } = await params;
  

  return <ChatView chatId={chatId} />;
};

export default ChatIdPage;
