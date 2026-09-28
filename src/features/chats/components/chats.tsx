"use client";

import * as React from "react";

import { MessageSquare, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import { NewChatDialog } from "./create-chat-dialog";

const chats = {
  today: [
    {
      id: "chat_001",
      title: "Building the Vangrex dashboard",
      preview: "Let's design the main dashboard layout...",
      time: "10:42 PM",
    },
    {
      id: "chat_002",
      title: "AI agent architecture",
      preview: "How should we structure the agent system?",
      time: "9:18 PM",
    },
    {
      id: "chat_003",
      title: "Next.js authentication flow",
      preview: "Let's connect Better Auth with the...",
      time: "8:31 PM",
    },
    {
      id: "chat_004",
      title: "Multi-model provider setup",
      preview: "Adding support for multiple AI model providers...",
      time: "7:45 PM",
    },
    {
      id: "chat_005",
      title: "Designing the chat interface",
      preview: "The chat experience should feel fast and minimal...",
      time: "6:52 PM",
    },
    {
      id: "chat_006",
      title: "AI SDK streaming responses",
      preview: "Let's implement streaming responses with AI SDK...",
      time: "5:27 PM",
    },
    {
      id: "chat_007",
      title: "Agent configuration system",
      preview: "Users should be able to configure their own agents...",
      time: "4:16 PM",
    },
    {
      id: "chat_008",
      title: "Database schema planning",
      preview: "Let's define the schema for users, agents, models...",
      time: "2:48 PM",
    },
  ],

  yesterday: [
    {
      id: "chat_009",
      title: "Design system planning",
      preview: "I want to keep the interface minimal...",
      time: "Yesterday",
    },
    {
      id: "chat_010",
      title: "Multi-model chat architecture",
      preview: "Each agent should be able to use...",
      time: "Yesterday",
    },
    {
      id: "chat_011",
      title: "Better Auth integration",
      preview: "Setting up sessions and protected routes...",
      time: "Yesterday",
    },
    {
      id: "chat_012",
      title: "Sidebar navigation structure",
      preview: "Let's organize the main platform navigation...",
      time: "Yesterday",
    },
    {
      id: "chat_013",
      title: "Vangrex agent marketplace",
      preview: "Exploring how users could share agents...",
      time: "Yesterday",
    },
    {
      id: "chat_014",
      title: "Model selection interface",
      preview: "Users need a clean way to switch between models...",
      time: "Yesterday",
    },
    {
      id: "chat_015",
      title: "Chat history architecture",
      preview: "Planning how conversations should be persisted...",
      time: "Yesterday",
    },
    {
      id: "chat_016",
      title: "Agent system prompts",
      preview: "Designing the configuration experience for prompts...",
      time: "Yesterday",
    },
    {
      id: "chat_017",
      title: "Streaming UI states",
      preview: "Handling loading, streaming, errors, and retries...",
      time: "Yesterday",
    },
    {
      id: "chat_018",
      title: "Responsive dashboard layout",
      preview: "Making the dashboard work nicely on smaller screens...",
      time: "Yesterday",
    },
  ],

  previous: [
    {
      id: "chat_019",
      title: "Vangrex product direction",
      preview: "The core idea is a workspace for...",
      time: "Sep 26",
    },
    {
      id: "chat_020",
      title: "AI SDK experiments",
      preview: "Testing different model providers...",
      time: "Sep 25",
    },
    {
      id: "chat_021",
      title: "Agent memory architecture",
      preview: "How should long-term and conversation memory work?",
      time: "Sep 25",
    },
    {
      id: "chat_022",
      title: "Prompt management system",
      preview: "Creating reusable system prompts for agents...",
      time: "Sep 24",
    },
    {
      id: "chat_023",
      title: "Model provider abstraction",
      preview: "Building a provider-independent model layer...",
      time: "Sep 24",
    },
    {
      id: "chat_024",
      title: "Chat persistence strategy",
      preview: "Comparing approaches for storing conversations...",
      time: "Sep 23",
    },
    {
      id: "chat_025",
      title: "Vangrex onboarding flow",
      preview: "Designing the first-time user experience...",
      time: "Sep 22",
    },
    {
      id: "chat_026",
      title: "Agent creation workflow",
      preview: "Users should be able to create an agent in a few steps...",
      time: "Sep 21",
    },
    {
      id: "chat_027",
      title: "Usage and token tracking",
      preview: "Planning how model usage and token consumption...",
      time: "Sep 20",
    },
    {
      id: "chat_028",
      title: "API key management",
      preview: "Thinking through secure provider API key storage...",
      time: "Sep 19",
    },
    {
      id: "chat_029",
      title: "Vangrex settings architecture",
      preview: "Organizing account, workspace, and model settings...",
      time: "Sep 18",
    },
    {
      id: "chat_030",
      title: "Initial Vangrex prototype",
      preview: "Sketching the first version of the platform...",
      time: "Sep 17",
    },
  ],
};

type Chat = {
  id: string;
  title: string;
  preview: string;
  time: string;
};

const groups: {
  label: string;
  chats: Chat[];
}[] = [
  {
    label: "Today",
    chats: chats.today,
  },
  {
    label: "Yesterday",
    chats: chats.yesterday,
  },
  {
    label: "Previous 7 days",
    chats: chats.previous,
  },
];

export const Chats = () => {
  return (
    <main className="flex min-h-0 w-full flex-1 flex-col overflow-hidden bg-background">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 lg:px-8">
        <div>
          <h1 className="text-base font-semibold tracking-tight">Chats</h1>

          <p className="mt-0.5 text-xs text-muted-foreground">
            Your conversations
          </p>
        </div>

        <NewChatDialog />
      </header>

      {/* Chat list */}
      <ScrollArea className="min-h-0 flex-1">
        <div className="w-full px-6 py-6 lg:px-8">
          <div className="space-y-8">
            {groups.map((group) => (
              <section key={group.label}>
                <h2 className="mb-2 px-2 text-xs font-medium text-muted-foreground">
                  {group.label}
                </h2>

                <div className="divide-y rounded-xl border bg-card">
                  {group.chats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

function ChatItem({ chat }: { chat: Chat }) {
  return (
    <div className="group flex items-center gap-3 px-4 py-3.5 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-muted/50">
      <a
        href={`/chat/${chat.id}`}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-background">
          <MessageSquare className="size-4 text-muted-foreground" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3">
            <h3 className="truncate text-sm font-medium">{chat.title}</h3>

            <span className="hidden shrink-0 text-[11px] text-muted-foreground sm:inline">
              {chat.time}
            </span>
          </div>

          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {chat.preview}
          </p>
        </div>
      </a>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-background hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
          >
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Chat options</span>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem>Rename</DropdownMenuItem>
          <DropdownMenuItem>Archive</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
