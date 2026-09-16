import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useGetMessages = (chatId: string) => {
  const trpc = useTRPC();

  return useSuspenseQuery(
    trpc.messages.getMessages.queryOptions({
      chatId,
    }),
  );
};
