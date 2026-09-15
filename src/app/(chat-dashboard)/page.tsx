import { ChatView } from "@/features/chat/component/chat-view";

interface Props {
  params: Promise<{
    chatId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { chatId } = await params;

  return <ChatView chatId={chatId} />;
}
