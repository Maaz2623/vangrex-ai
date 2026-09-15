"use client";

import {
  Bot,
  CheckIcon,
  CopyIcon,
  LoaderCircle,
  Menu,
  MessageSquare,
  PlusIcon,
  RefreshCcwIcon,
  RotateCcw,
  Send,
  Square,
} from "lucide-react";

import {
  Fragment,
  InputEventHandler,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import {
  Attachment,
  AttachmentHoverCard,
  AttachmentHoverCardContent,
  AttachmentHoverCardTrigger,
  AttachmentInfo,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  getAttachmentLabel,
  getMediaCategory,
} from "@/components/ai-elements/attachments";
import { nanoid } from "nanoid";
import {
  PromptInputActionAddAttachments,
  PromptInputMessage,
  PromptInputProvider,
} from "@/components/ai-elements/prompt-input";

type Props = {
  chatId?: string;
};
const models = [
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o",
    name: "GPT-4o",
    providers: ["openai", "azure"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    providers: ["openai", "azure"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "o1",
    name: "o1",
    providers: ["openai", "azure"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "o1-mini",
    name: "o1 Mini",
    providers: ["openai", "azure"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-opus-4-20250514",
    name: "Claude 4 Opus",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-sonnet-4-20250514",
    name: "Claude 4 Sonnet",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    providers: ["anthropic", "azure", "google-vertex", "amazon-bedrock"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    providers: ["google", "google-vertex"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    providers: ["google", "google-vertex"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-1.5-flash",
    name: "Gemini 1.5 Flash",
    providers: ["google", "google-vertex"],
  },
  {
    chef: "Meta",
    chefSlug: "llama",
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    providers: ["groq", "togetherai", "amazon-bedrock"],
  },
  {
    chef: "Meta",
    chefSlug: "llama",
    id: "llama-3.1-405b",
    name: "Llama 3.1 405B",
    providers: ["togetherai", "amazon-bedrock"],
  },
  {
    chef: "Meta",
    chefSlug: "llama",
    id: "llama-3.1-70b",
    name: "Llama 3.1 70B",
    providers: ["groq", "togetherai", "amazon-bedrock"],
  },
  {
    chef: "Meta",
    chefSlug: "llama",
    id: "llama-3.1-8b",
    name: "Llama 3.1 8B",
    providers: ["groq", "togetherai"],
  },
  {
    chef: "DeepSeek",
    chefSlug: "deepseek",
    id: "deepseek-r1",
    name: "DeepSeek R1",
    providers: ["deepseek", "openrouter"],
  },
  {
    chef: "DeepSeek",
    chefSlug: "deepseek",
    id: "deepseek-v3",
    name: "DeepSeek V3",
    providers: ["deepseek", "openrouter"],
  },
  {
    chef: "DeepSeek",
    chefSlug: "deepseek",
    id: "deepseek-coder-v2",
    name: "DeepSeek Coder V2",
    providers: ["deepseek", "openrouter"],
  },
  {
    chef: "Mistral AI",
    chefSlug: "mistral",
    id: "mistral-large",
    name: "Mistral Large",
    providers: ["mistral", "azure"],
  },
  {
    chef: "Mistral AI",
    chefSlug: "mistral",
    id: "mistral-small",
    name: "Mistral Small",
    providers: ["mistral", "azure"],
  },
  {
    chef: "Mistral AI",
    chefSlug: "mistral",
    id: "codestral",
    name: "Codestral",
    providers: ["mistral"],
  },
  {
    chef: "Alibaba",
    chefSlug: "alibaba",
    id: "qwen-2.5-72b",
    name: "Qwen 2.5 72B",
    providers: ["alibaba", "openrouter"],
  },
  {
    chef: "Alibaba",
    chefSlug: "alibaba",
    id: "qwen-2.5-coder-32b",
    name: "Qwen 2.5 Coder 32B",
    providers: ["alibaba", "openrouter"],
  },
  {
    chef: "Alibaba",
    chefSlug: "alibaba",
    id: "qwen-max",
    name: "Qwen Max",
    providers: ["alibaba"],
  },
  {
    chef: "Cohere",
    chefSlug: "cohere",
    id: "command-r-plus",
    name: "Command R+",
    providers: ["cohere", "azure", "amazon-bedrock"],
  },
  {
    chef: "Cohere",
    chefSlug: "cohere",
    id: "command-r",
    name: "Command R",
    providers: ["cohere", "azure", "amazon-bedrock"],
  },
  {
    chef: "xAI",
    chefSlug: "xai",
    id: "grok-3",
    name: "Grok 3",
    providers: ["xai"],
  },
  {
    chef: "xAI",
    chefSlug: "xai",
    id: "grok-2-1212",
    name: "Grok 2 1212",
    providers: ["xai"],
  },
  {
    chef: "xAI",
    chefSlug: "xai",
    id: "grok-vision",
    name: "Grok Vision",
    providers: ["xai"],
  },
  {
    chef: "Moonshot AI",
    chefSlug: "moonshotai",
    id: "moonshot-v1-128k",
    name: "Moonshot v1 128K",
    providers: ["moonshotai"],
  },
  {
    chef: "Moonshot AI",
    chefSlug: "moonshotai",
    id: "moonshot-v1-32k",
    name: "Moonshot v1 32K",
    providers: ["moonshotai"],
  },
  {
    chef: "Perplexity",
    chefSlug: "perplexity",
    id: "sonar-pro",
    name: "Sonar Pro",
    providers: ["perplexity"],
  },
  {
    chef: "Perplexity",
    chefSlug: "perplexity",
    id: "sonar",
    name: "Sonar",
    providers: ["perplexity"],
  },
  {
    chef: "Vercel",
    chefSlug: "v0",
    id: "v0-chat",
    name: "v0 Chat",
    providers: ["vercel"],
  },
  {
    chef: "Amazon",
    chefSlug: "amazon-bedrock",
    id: "nova-pro",
    name: "Nova Pro",
    providers: ["amazon-bedrock"],
  },
  {
    chef: "Amazon",
    chefSlug: "amazon-bedrock",
    id: "nova-lite",
    name: "Nova Lite",
    providers: ["amazon-bedrock"],
  },
  {
    chef: "Amazon",
    chefSlug: "amazon-bedrock",
    id: "nova-micro",
    name: "Nova Micro",
    providers: ["amazon-bedrock"],
  },
];

interface ModelItemProps {
  model: (typeof models)[0];
  selectedModel: string;
  onSelect: (id: string) => void;
}

type Attachment = {
  filename: string;
  id: string;
  mediaType: string;
  type: "file";
  url: string;
};

export const ChatView = ({ chatId }: Props) => {
  const [activeChatId, setActiveChatId] = useState(
    () => chatId ?? crypto.randomUUID(),
  );

  const [isNewChat, setIsNewChat] = useState(!chatId);
  // useEffect(() => {
  //   setActiveChatId(chatId);
  // }, [chatId]);

  const createChat = useCallback(async (id: string) => {
    const response = await fetch("/api/chats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatId: id,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create chat");
    }

    return id;
  }, []);

  const { messages, sendMessage, stop, status, regenerate } = useChat({
    id: activeChatId,
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        chatId: activeChatId,
      },
    }),
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState("");

  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

  const handleRemove = useCallback((id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const handleAction = () => {
    if (status === "streaming" || status === "submitted") {
      stop();
      return;
    }

    if (status === "error") {
      if (!input.trim()) return;

      sendMessage({
        text: input.trim(),
      });

      setInput("");
    }
  };

  const [open, setOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>("gpt-4o");

  const handleModelSelect = useCallback((id: string) => {
    setSelectedModel(id);
    setOpen(false);
  }, []);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);

    if (!files.length) return;

    const newAttachments: Attachment[] = files.map((file) => ({
      filename: file.name,
      id: nanoid(),
      mediaType: file.type || "application/octet-stream",
      type: "file" as const,
      // Only used for the UI preview
      url: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    setAttachmentFiles((prev) => [...prev, ...files]);

    e.target.value = "";
  }, []);

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read file"));
        }
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const selectedModelData = models.find((model) => model.id === selectedModel);

  // Get unique chefs in order of appearance
  const chefs = [...new Set(models.map((model) => model.chef))];

  const hasMessages = messages.length > 0;

  const isBusy = status === "submitted" || status === "streaming";

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (status !== "ready") return;

      const text = input.trim();

      if (!text && attachmentFiles.length === 0) return;

      if (isNewChat) {
        const chatId = await createChat(activeChatId);

        setIsNewChat(false);

        window.history.replaceState({}, "", `/${chatId}`);
      }

      const files = await Promise.all(
        attachmentFiles.map(async (file) => ({
          type: "file" as const,
          url: await fileToDataUrl(file),
          mediaType: file.type || "application/octet-stream",
          filename: file.name,
        })),
      );

      await sendMessage({
        text,
        files,
      });

      setInput("");
      setAttachments([]);
      setAttachmentFiles([]);
    },
    [input, attachmentFiles, status, activeChatId, createChat, sendMessage],
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <div className="flex min-h-0 flex-1 flex-col">
          {/* Messages */}
          <ScrollArea className="min-h-0 flex-1">
            <div
              className={cn(
                "mx-auto w-full max-w-3xl px-4",
                hasMessages
                  ? "py-8 pb-32"
                  : "flex min-h-full items-center justify-center",
              )}
            >
              {!chatId && !hasMessages ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border bg-muted/30">
                    <Bot className="size-6" />
                  </div>

                  <h1 className="text-2xl font-semibold tracking-tight">
                    How can I help?
                  </h1>

                  <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                    Ask Vangrex anything. Start a conversation and explore what
                    you can build.
                  </p>
                </div>
              ) : (
                <Conversation>
                  <ConversationContent>
                    {messages.length === 0 ? (
                      <ConversationEmptyState
                        icon={<MessageSquare className="size-12" />}
                        title="Start a conversation"
                        description="Type a message below to begin chatting"
                      />
                    ) : (
                      messages.map((message, messageIndex) => (
                        <Fragment key={message.id}>
                          {message.parts.map((part, i) => {
                            switch (part.type) {
                              case "text":
                                const isLastMessage =
                                  messageIndex === messages.length - 1;
                                return (
                                  <Fragment key={`${message.id}-${i}`}>
                                    <Message from={message.role}>
                                      <MessageContent>
                                        <MessageResponse>
                                          {part.text}
                                        </MessageResponse>
                                      </MessageContent>
                                    </Message>
                                    {message.role === "assistant" &&
                                      isLastMessage && (
                                        <MessageActions>
                                          <MessageAction
                                            onClick={() => regenerate()}
                                            label="Retry"
                                          >
                                            <RefreshCcwIcon className="size-3" />
                                          </MessageAction>
                                          <MessageAction
                                            onClick={() =>
                                              navigator.clipboard.writeText(
                                                part.text,
                                              )
                                            }
                                            label="Copy"
                                          >
                                            <CopyIcon className="size-3" />
                                          </MessageAction>
                                        </MessageActions>
                                      )}
                                  </Fragment>
                                );
                              default:
                                return null;
                            }
                          })}
                        </Fragment>
                      ))
                    )}
                  </ConversationContent>

                  <ConversationScrollButton />
                </Conversation>
              )}
            </div>
          </ScrollArea>

          {/* Composer */}
          <PromptInputProvider>
            <div
              className={cn(
                "shrink-0 bg-background px-4 pb-4 pt-2",
                chatId && "absolute bottom-0 translate-y-40",
              )}
            >
              <form
                onSubmit={handleSubmit}
                className="mx-auto w-full max-w-3xl"
              >
                <div className="relative flex rounded-2xl border bg-background p-2 shadow-sm transition-shadow focus-within:shadow-md">
                  <div className="w-full">
                    <Attachments variant="inline">
                      {attachments.map((attachment) => (
                        <AttachmentItem
                          attachment={attachment}
                          key={attachment.id}
                          onRemove={handleRemove}
                        />
                      ))}
                    </Attachments>
                    <div className="flex items-center">
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFiles}
                      />

                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <PlusIcon />
                      </Button>
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isBusy}
                        placeholder="Message Vangrex..."
                        className="h-11 border-0 bg-transparent pr-12 text-sm shadow-none focus-visible:ring-0"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <ModelSelector onOpenChange={setOpen} open={open}>
                      <ModelSelectorTrigger asChild>
                        <Button
                          className="w-[100px] justify-between"
                          variant="outline"
                        >
                          {selectedModelData?.chefSlug && (
                            <ModelSelectorLogo
                              provider={selectedModelData.chefSlug}
                            />
                          )}
                          {selectedModelData?.name && (
                            <ModelSelectorName>
                              {selectedModelData.name}
                            </ModelSelectorName>
                          )}
                        </Button>
                      </ModelSelectorTrigger>
                      <ModelSelectorContent>
                        <ModelSelectorInput placeholder="Search models..." />
                        <ModelSelectorList>
                          <ModelSelectorEmpty>
                            No models found.
                          </ModelSelectorEmpty>
                          {chefs.map((chef) => (
                            <ModelSelectorGroup heading={chef} key={chef}>
                              {models
                                .filter((model) => model.chef === chef)
                                .map((model) => (
                                  <ModelItem
                                    key={model.id}
                                    model={model}
                                    onSelect={handleModelSelect}
                                    selectedModel={selectedModel}
                                  />
                                ))}
                            </ModelSelectorGroup>
                          ))}
                        </ModelSelectorList>
                      </ModelSelectorContent>
                    </ModelSelector>
                    <Button
                      type={
                        status === "streaming" || status === "submitted"
                          ? "button"
                          : "submit"
                      }
                      size="icon"
                      disabled={
                        status === "ready"
                          ? !input.trim()
                          : status === "error"
                            ? !input.trim()
                            : false
                      }
                      onClick={
                        status === "streaming" ||
                        status === "submitted" ||
                        status === "error"
                          ? handleAction
                          : undefined
                      }
                      className={cn(
                        " right-2 top-2 size-9 rounded-xl transition-all",
                        status === "error" &&
                          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                      )}
                    >
                      {status === "submitted" && (
                        <LoaderCircle className="size-4 animate-spin" />
                      )}

                      {status === "streaming" && (
                        <Square className="size-3.5 fill-current" />
                      )}

                      {status === "ready" && <Send className="size-4" />}

                      {status === "error" && <RotateCcw className="size-4" />}
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </PromptInputProvider>
        </div>
      </main>
    </div>
  );
};

const ModelItem = memo(({ model, selectedModel, onSelect }: ModelItemProps) => {
  const handleSelect = useCallback(
    () => onSelect(model.id),
    [onSelect, model.id],
  );
  return (
    <ModelSelectorItem key={model.id} onSelect={handleSelect} value={model.id}>
      <ModelSelectorLogo provider={model.chefSlug} />
      <ModelSelectorName>{model.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {model.providers.map((provider) => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {selectedModel === model.id ? (
        <CheckIcon className="ml-auto size-4" />
      ) : (
        <div className="ml-auto size-4" />
      )}
    </ModelSelectorItem>
  );
});

interface AttachmentItemProps {
  attachment: (typeof initialAttachments)[0];
  onRemove: (id: string) => void;
}

const AttachmentItem = memo(({ attachment, onRemove }: AttachmentItemProps) => {
  const handleRemove = useCallback(
    () => onRemove(attachment.id),
    [onRemove, attachment.id],
  );
  const mediaCategory = getMediaCategory(attachment);
  const label = getAttachmentLabel(attachment);

  return (
    <AttachmentHoverCard key={attachment.id}>
      <AttachmentHoverCardTrigger asChild>
        <Attachment data={attachment} onRemove={handleRemove}>
          <div className="relative size-5 shrink-0">
            <div className="absolute inset-0 transition-opacity group-hover:opacity-0">
              <AttachmentPreview />
            </div>
            <AttachmentRemove className="absolute inset-0" />
          </div>
          <AttachmentInfo />
        </Attachment>
      </AttachmentHoverCardTrigger>
      <AttachmentHoverCardContent>
        <div className="space-y-3">
          {mediaCategory === "image" &&
            attachment.type === "file" &&
            attachment.url && (
              <div className="flex max-h-96 w-80 items-center justify-center overflow-hidden rounded-md border">
                <img
                  alt={label}
                  className="max-h-full max-w-full object-contain"
                  height={384}
                  src={attachment.url}
                  width={320}
                />
              </div>
            )}
          <div className="space-y-1 px-0.5">
            <h4 className="font-semibold text-sm leading-none">{label}</h4>
            {attachment.mediaType && (
              <p className="font-mono text-muted-foreground text-xs">
                {attachment.mediaType}
              </p>
            )}
          </div>
        </div>
      </AttachmentHoverCardContent>
    </AttachmentHoverCard>
  );
});

AttachmentItem.displayName = "AttachmentItem";
