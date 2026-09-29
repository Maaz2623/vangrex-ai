"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  Check,
  Code2,
  Globe2,
  Info,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Terminal,
  Wrench,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ToolBuilderDialog } from "./tool-builder";

type Tool = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ElementType;
  version: string;
  status: "Published" | "Draft";
  usage: string;

  // Tool details
  executionType: string;
  capabilities: string[];
  createdAt: string;
  updatedAt: string;
};

const tools: Tool[] = [
  {
    id: "web-search",
    name: "Web Search",
    description:
      "Search the web for relevant information, sources, and up-to-date results.",
    category: "Research",
    icon: Globe2,
    version: "1.2.0",
    status: "Published",
    usage: "1.2k runs",
    executionType: "Agent",
    capabilities: ["web.search", "web.fetch"],
    createdAt: "Sep 12, 2026",
    updatedAt: "Sep 24, 2026",
  },
  {
    id: "code-runner",
    name: "Code Runner",
    description:
      "Execute code in a controlled environment and return structured results.",
    category: "Development",
    icon: Terminal,
    version: "1.0.0",
    status: "Published",
    usage: "842 runs",
    executionType: "Agent",
    capabilities: ["code.execute", "files.read"],
    createdAt: "Sep 10, 2026",
    updatedAt: "Sep 22, 2026",
  },
  {
    id: "github-reader",
    name: "GitHub Reader",
    description:
      "Read repositories, files, issues, and pull requests from GitHub.",
    category: "Development",
    icon: Code2,
    version: "0.4.0",
    status: "Published",
    usage: "426 runs",
    executionType: "Agent",
    capabilities: ["github.read"],
    createdAt: "Sep 8, 2026",
    updatedAt: "Sep 20, 2026",
  },
  {
    id: "research-agent",
    name: "Deep Research",
    description:
      "Research a topic across multiple sources and produce a structured report.",
    category: "Research",
    icon: Sparkles,
    version: "0.8.1",
    status: "Draft",
    usage: "—",
    executionType: "Agent",
    capabilities: ["web.search", "web.fetch", "files.write"],
    createdAt: "Sep 25, 2026",
    updatedAt: "Sep 28, 2026",
  },
  {
    id: "browser-agent",
    name: "Browser Agent",
    description:
      "Navigate websites and perform multi-step browser-based tasks.",
    category: "Automation",
    icon: Bot,
    version: "0.3.0",
    status: "Published",
    usage: "214 runs",
    executionType: "Agent",
    capabilities: ["browser.navigate", "browser.click"],
    createdAt: "Sep 5, 2026",
    updatedAt: "Sep 18, 2026",
  },
];

const groups = [
  {
    label: "Published",
    icon: Wrench,
  },
  {
    label: "Drafts",
    icon: Sparkles,
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(query);

    const update = () => {
      setMatches(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, [query]);

  return matches;
}

/* -------------------------------------------------------------------------- */
/* Tool Info                                                                  */
/* -------------------------------------------------------------------------- */

function ToolInfo({
  tool,
  open,
  onOpenChange,
}: {
  tool: Tool | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!tool) return null;

  const Icon = tool.icon;

  const content = (
    <div className="space-y-6">
      {/* Identity */}
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{tool.name}</h3>

            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {tool.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">{tool.category}</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium">Description</h4>

        <p className="text-sm leading-6 text-muted-foreground">
          {tool.description}
        </p>
      </div>

      {/* Details */}
      <div className="rounded-xl border">
        <div className="grid grid-cols-2 divide-x divide-y">
          <DetailItem label="Version" value={`v${tool.version}`} />

          <DetailItem label="Execution" value={tool.executionType} />

          <DetailItem label="Usage" value={tool.usage} />

          <DetailItem label="Tool ID" value={tool.id} mono />
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium">Capabilities</h4>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Permissions available to this tool during execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tool.capabilities.map((capability) => (
            <div
              key={capability}
              className="inline-flex items-center gap-1.5 rounded-md border bg-muted/30 px-2.5 py-1.5 text-[11px] text-muted-foreground"
            >
              <Check className="size-3 text-foreground" />
              <span className="font-mono">{capability}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid gap-3 border-t pt-4 sm:grid-cols-2">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Created
          </p>

          <p className="mt-1 text-xs font-medium">{tool.createdAt}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Last updated
          </p>

          <p className="mt-1 text-xs font-medium">{tool.updatedAt}</p>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-5 text-left">
            <DialogTitle className="text-base">Tool information</DialogTitle>

            <DialogDescription className="text-xs">
              Details and execution capabilities for this tool.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
            {content}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-base">Tool information</DrawerTitle>

          <DrawerDescription className="text-xs">
            Details and execution capabilities for this tool.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-h-[75vh] overflow-y-auto px-4 pb-8">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail Item                                                                */
/* -------------------------------------------------------------------------- */

function DetailItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 p-3.5">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-1 truncate text-xs font-medium",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tools                                                                      */
/* -------------------------------------------------------------------------- */

export const Tools = () => {
  const [toolBuilderOpen, setToolBuilderOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");
  const [selectedTool, setSelectedTool] = React.useState<Tool | null>(null);
  const [infoOpen, setInfoOpen] = React.useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredTools = React.useMemo(() => {
    if (!normalizedSearch) return tools;

    return tools.filter((tool) =>
      [tool.name, tool.description, tool.category, tool.status].some((value) =>
        value.toLowerCase().includes(normalizedSearch),
      ),
    );
  }, [normalizedSearch]);

  const groupedTools = React.useMemo(() => {
    return groups
      .map((group) => ({
        ...group,
        tools: filteredTools.filter((tool) =>
          group.label === "Published"
            ? tool.status === "Published"
            : tool.status === "Draft",
        ),
      }))
      .filter((group) => group.tools.length > 0);
  }, [filteredTools]);

  const totalResults = filteredTools.length;

  const openToolInfo = (tool: Tool) => {
    setSelectedTool(tool);
    setInfoOpen(true);
  };

  const closeToolInfo = (open: boolean) => {
    setInfoOpen(open);

    if (!open) {
      // Small delay keeps the closing animation smooth.
      window.setTimeout(() => {
        setSelectedTool(null);
      }, 180);
    }
  };

  return (
    <>
      <main className="px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          {/* Header */}
          <motion.div
            initial={{
              opacity: 0,
              y: 6,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.22,
              ease: "easeOut",
            }}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight">Tools</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Build and manage tools for your agents
              </p>
            </div>

            <Button
              asChild
              className="shrink-0"
              onClick={() => setToolBuilderOpen(true)}
            >
              <div className="flex">
                <Plus className="size-4" />

                <p className="">Create</p>
              </div>
            </Button>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.2,
              delay: 0.05,
            }}
          >
            <Separator />
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
              delay: 0.07,
              ease: "easeOut",
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tools..."
                className="h-10 pl-9 pr-9"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.12,
                    }}
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {normalizedSearch && (
                <motion.p
                  key={totalResults}
                  initial={{
                    opacity: 0,
                    y: 3,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -3,
                  }}
                  transition={{
                    duration: 0.14,
                  }}
                  className="text-xs text-muted-foreground"
                >
                  {totalResults} {totalResults === 1 ? "tool" : "tools"}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Tool history */}
          <div>
            <div className="space-y-8 pb-8 pr-1">
              <AnimatePresence mode="popLayout">
                {groupedTools.length > 0 ? (
                  groupedTools.map((group, index) => {
                    const Icon = group.icon;

                    return (
                      <motion.section
                        key={group.label}
                        layout
                        initial={{
                          opacity: 0,
                          y: 8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -6,
                        }}
                        transition={{
                          opacity: {
                            duration: 0.18,
                            delay: index * 0.05,
                            ease: "easeOut",
                          },
                          y: {
                            duration: 0.22,
                            delay: index * 0.05,
                            ease: "easeOut",
                          },
                          layout: {
                            duration: 0.22,
                            ease: "easeOut",
                          },
                        }}
                        className="space-y-3"
                      >
                        {/* Group header */}
                        <motion.div
                          initial={{
                            opacity: 0,
                            y: 4,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.18,
                            delay: index * 0.05 + 0.06,
                            ease: "easeOut",
                          }}
                          className="flex items-center gap-2 px-1"
                        >
                          <Icon className="size-3.5 text-muted-foreground" />

                          <h2 className="text-xs font-medium text-muted-foreground">
                            {group.label}
                          </h2>

                          <span className="text-[11px] text-muted-foreground/60">
                            {group.tools.length}
                          </span>
                        </motion.div>

                        {/* Tool cards */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          <AnimatePresence mode="popLayout">
                            {group.tools.map((tool, toolIndex) => {
                              const ToolIcon = tool.icon;

                              return (
                                <motion.article
                                  key={tool.id}
                                  layout
                                  initial={{
                                    opacity: 0,
                                    y: 8,
                                  }}
                                  animate={{
                                    opacity: 1,
                                    y: 0,
                                  }}
                                  exit={{
                                    opacity: 0,
                                    scale: 0.98,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    delay: toolIndex * 0.035,
                                    ease: "easeOut",
                                  }}
                                  className="group relative flex min-h-[190px] flex-col rounded-xl border bg-background p-4 transition-colors hover:bg-muted/30"
                                >
                                  {/* Card top */}
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex min-w-0 items-center gap-3">
                                      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50">
                                        <ToolIcon className="size-4 text-foreground" />
                                      </div>

                                      <div className="min-w-0">
                                        <h3 className="truncate text-sm font-medium">
                                          {tool.name}
                                        </h3>

                                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                                          {tool.category}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Info */}
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      type="button"
                                      onClick={() => openToolInfo(tool)}
                                      className="size-8 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                                      aria-label={`View information about ${tool.name}`}
                                    >
                                      <Info className="size-4" />
                                    </Button>
                                  </div>

                                  {/* Description */}
                                  <p className="mt-4 line-clamp-3 text-xs leading-5 text-muted-foreground">
                                    {tool.description}
                                  </p>

                                  {/* Footer */}
                                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                                      <span>v{tool.version}</span>

                                      <span className="size-1 rounded-full bg-muted-foreground/40" />

                                      <span>{tool.usage}</span>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => openToolInfo(tool)}
                                      className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                      Details
                                      <ArrowUpRight className="size-3 opacity-60" />
                                    </button>
                                  </div>
                                </motion.article>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </motion.section>
                    );
                  })
                ) : (
                  /* Empty state */
                  <motion.div
                    key="empty"
                    initial={{
                      opacity: 0,
                      y: 6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -4,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center"
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.9,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      transition={{
                        duration: 0.18,
                        delay: 0.05,
                      }}
                      className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted"
                    >
                      <Search className="size-4 text-muted-foreground" />
                    </motion.div>

                    <h3 className="text-sm font-medium">No tools found</h3>

                    <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                      No tools match{" "}
                      <span className="font-medium text-foreground">
                        "{search}"
                      </span>
                      .
                    </p>

                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-4 text-xs font-medium text-primary hover:underline"
                    >
                      Clear search
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Responsive tool information */}
      <ToolInfo
        tool={selectedTool}
        open={infoOpen}
        onOpenChange={closeToolInfo}
      />
      <ToolBuilderDialog
        open={toolBuilderOpen}
        onOpenChange={setToolBuilderOpen}
      />
    </>
  );
};
