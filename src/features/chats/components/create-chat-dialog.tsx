"use client";

import * as React from "react";
import {
  Bot,
  Check,
  ChevronRight,
  MessageSquare,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

type NewChatDialogProps = {
  onCreated?: (chat: { title: string; agent: string; model: string }) => void;
};

type PickerItem = {
  value: string;
  name: string;
  description: string;
};

const agents: PickerItem[] = [
  {
    value: "default",
    name: "Default Agent",
    description: "General-purpose AI assistant",
  },
  {
    value: "developer",
    name: "Developer Agent",
    description: "Code, architecture, and debugging",
  },
  {
    value: "researcher",
    name: "Research Agent",
    description: "Research, analysis, and synthesis",
  },
];

const models: PickerItem[] = [
  {
    value: "gpt-5",
    name: "GPT-5",
    description: "OpenAI",
  },
  {
    value: "claude-sonnet",
    name: "Claude Sonnet",
    description: "Anthropic",
  },
  {
    value: "gemini-pro",
    name: "Gemini Pro",
    description: "Google",
  },
];

export function NewChatDialog({ onCreated }: NewChatDialogProps) {
  const isMobile = useIsMobile();

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [agent, setAgent] = React.useState("default");
  const [model, setModel] = React.useState("gpt-5");

  const selectedAgent = agents.find((item) => item.value === agent);
  const selectedModel = models.find((item) => item.value === model);

  const handleCreate = () => {
    const chat = {
      title: title.trim() || "New conversation",
      agent,
      model,
    };

    onCreated?.(chat);

    console.log("Create chat:", chat);

    setOpen(false);
    setTitle("");
  };

  const form = (
    <NewChatForm
      title={title}
      setTitle={setTitle}
      agent={agent}
      setAgent={setAgent}
      model={model}
      setModel={setModel}
      selectedAgent={selectedAgent}
      selectedModel={selectedModel}
    />
  );

  const footer = (
    <div className="flex items-center justify-end gap-2">
      <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>

      <Button type="button" onClick={handleCreate} className="gap-2">
        <Plus className="size-4" />
        Create chat
      </Button>
    </div>
  );

  /*
   * Important:
   *
   * Only render ONE of Dialog or Drawer.
   * This prevents both Radix components from
   * sharing the same open state.
   */
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="sm" className="h-9 gap-2">
            <Plus className="size-4" />
            New chat
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[92svh]">
          <DrawerHeader className="border-b px-6 py-5 text-left">
            <div className="flex items-center gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                <MessageSquare className="size-4" />
              </div>

              <div className="flex min-w-0 flex-col gap-0.5">
                <DrawerTitle className="text-sm font-semibold">
                  New chat
                </DrawerTitle>

                <DrawerDescription className="text-xs">
                  Configure your new conversation.
                </DrawerDescription>
              </div>
            </div>
          </DrawerHeader>

          <div className="min-h-0 overflow-y-auto">{form}</div>

          <DrawerFooter className="border-t bg-muted/20 px-6 py-4">
            {footer}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-2">
          <Plus className="size-4" />
          New chat
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5 text-left">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
              <MessageSquare className="size-4" />
            </div>

            <div className="flex min-w-0 flex-col gap-0.5">
              <DialogTitle className="text-sm font-semibold">
                New chat
              </DialogTitle>

              <DialogDescription className="text-xs">
                Configure your new conversation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {form}

        <div className="border-t bg-muted/20 px-6 py-4">{footer}</div>
      </DialogContent>
    </Dialog>
  );
}

type NewChatFormProps = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  agent: string;
  setAgent: React.Dispatch<React.SetStateAction<string>>;
  model: string;
  setModel: React.Dispatch<React.SetStateAction<string>>;
  selectedAgent?: PickerItem;
  selectedModel?: PickerItem;
};

function NewChatForm({
  title,
  setTitle,
  agent,
  setAgent,
  model,
  setModel,
  selectedAgent,
  selectedModel,
}: NewChatFormProps) {
  return (
    <div className="space-y-6 px-6 py-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="chat-title">Chat title</Label>

        <Input
          id="chat-title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="e.g. Build authentication system"
          className="h-10"
        />

        <p className="text-[11px] text-muted-foreground">
          Optional. You can rename this conversation later.
        </p>
      </div>

      <Separator />

      {/* Agent */}
      <div className="space-y-2.5">
        <div>
          <Label>Agent</Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose the agent that will handle this conversation.
          </p>
        </div>

        <ResponsivePicker
          items={agents}
          value={agent}
          onSelect={setAgent}
          icon={<Bot className="size-4 text-muted-foreground" />}
          title="Choose agent"
          description="Select the agent you want to use for this conversation."
          trigger={
            <PickerTrigger
              icon={<Bot className="size-4 text-muted-foreground" />}
              title={selectedAgent?.name ?? "Select agent"}
              description={selectedAgent?.description}
            />
          }
        />
      </div>

      {/* Model */}
      <div className="space-y-2.5">
        <div>
          <Label>Model</Label>

          <p className="mt-1 text-xs text-muted-foreground">
            Select the model powering your agent.
          </p>
        </div>

        <ResponsivePicker
          items={models}
          value={model}
          onSelect={setModel}
          icon={<Sparkles className="size-4 text-muted-foreground" />}
          title="Choose model"
          description="Select the model that will power your agent."
          trigger={
            <PickerTrigger
              icon={<Sparkles className="size-4 text-muted-foreground" />}
              title={selectedModel?.name ?? "Select model"}
              description={selectedModel?.description}
            />
          }
        />
      </div>
    </div>
  );
}

type ResponsivePickerProps = {
  trigger: React.ReactNode;
  items: PickerItem[];
  value: string;
  onSelect: (value: string) => void;
  icon: React.ReactNode;
  title: string;
  description: string;
};

function ResponsivePicker({
  trigger,
  items,
  value,
  onSelect,
  icon,
  title,
  description,
}: ResponsivePickerProps) {
  const isMobile = useIsMobile();

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filteredItems = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return items;
    }

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }, [items, search]);

  const handleOpenChange = (value: boolean) => {
    setOpen(value);

    if (!value) {
      setSearch("");
    }
  };

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setOpen(false);
    setSearch("");
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>
          <button type="button" className="w-full">
            {trigger}
          </button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[80svh]">
          <DrawerHeader className="border-b px-6 py-4 text-left">
            <DrawerTitle className="text-sm">{title}</DrawerTitle>

            <DrawerDescription className="text-xs">
              {description}
            </DrawerDescription>
          </DrawerHeader>

          <div className="min-h-0 overflow-y-auto">
            <PickerContent
              items={filteredItems}
              value={value}
              icon={icon}
              search={search}
              setSearch={setSearch}
              onSelect={handleSelect}
              mobile
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <button type="button" className="w-full">
          {trigger}
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        sideOffset={8}
        className="w-[--radix-popover-trigger-width] overflow-hidden p-0"
      >
        <PickerContent
          items={filteredItems}
          value={value}
          icon={icon}
          title={title}
          description={description}
          search={search}
          setSearch={setSearch}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  );
}

type PickerContentProps = {
  items: PickerItem[];
  value: string;
  icon: React.ReactNode;
  title?: string;
  description?: string;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSelect: (value: string) => void;
  mobile?: boolean;
};

function PickerContent({
  items,
  value,
  icon,
  title,
  description,
  search,
  setSearch,
  onSelect,
  mobile = false,
}: PickerContentProps) {
  return (
    <div className="overflow-hidden">
      {/* Search */}
      <div
        className={["border-b px-3 pb-3 pt-3", mobile && "px-6"]
          .filter(Boolean)
          .join(" ")}
      >
        {!mobile && (
          <div className="mb-2 px-1">
            {title && <div className="text-sm font-semibold">{title}</div>}

            {description && (
              <div className="mt-0.5 text-xs text-muted-foreground">
                {description}
              </div>
            )}
          </div>
        )}

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search..."
            className="h-9 pl-8 text-xs"
            autoFocus
          />
        </div>
      </div>

      {/* Options */}
      <div
        className={[
          "max-h-64 overflow-y-auto p-2",
          mobile && "max-h-[50svh] px-4 py-3",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {items.length > 0 ? (
          <div className="space-y-1">
            {items.map((item) => {
              const selected = item.value === value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => onSelect(item.value)}
                  className={[
                    "flex w-full items-center gap-3 rounded-lg p-2.5 text-left",
                    "transition-colors",
                    "hover:bg-muted",
                    selected && "bg-muted/70",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div
                    className={[
                      "flex size-9 shrink-0 items-center justify-center rounded-lg border",
                      "bg-background transition-colors",
                      selected && "border-primary/30 bg-primary/5",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {icon}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">
                        {item.name}
                      </span>

                      {selected && (
                        <span className="shrink-0 text-[10px] font-medium text-primary">
                          Selected
                        </span>
                      )}
                    </div>

                    <div className="truncate text-xs text-muted-foreground">
                      {item.description}
                    </div>
                  </div>

                  {selected && (
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="size-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-8 text-center">
            <div className="mb-2 flex size-9 items-center justify-center rounded-full border bg-muted/50">
              <Search className="size-4 text-muted-foreground" />
            </div>

            <p className="text-sm font-medium">No results found</p>

            <p className="mt-1 text-xs text-muted-foreground">
              Try searching for something else.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className={["border-t bg-muted/20 px-3 py-2", mobile && "px-6"]
          .filter(Boolean)
          .join(" ")}
      >
        <p className="text-[10px] text-muted-foreground">
          {items.length} {items.length === 1 ? "option" : "options"}
        </p>
      </div>
    </div>
  );
}

function PickerTrigger({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
}) {
  return (
    <div
      className="
        group flex w-full items-center gap-3
        rounded-lg border bg-background
        p-3 text-left
        transition-colors
        hover:bg-muted/50
      "
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium">{title}</div>

        {description && (
          <div className="truncate text-xs text-muted-foreground">
            {description}
          </div>
        )}
      </div>

      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </div>
  );
}
