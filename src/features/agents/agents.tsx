"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Bot,
  Check,
  Plus,
  Search,
  Sparkles,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
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

import { AgentCard } from "./components/agent-card";
import type { Agent } from "./types";
import { useRouter } from "next/navigation";

/* -------------------------------------------------------------------------- */
/* Agent data                                                                 */
/* -------------------------------------------------------------------------- */

const agents: Agent[] = [
  {
    id: "research-agent",
    name: "Research Agent",
    description:
      "Research complex topics across multiple sources and produce structured, source-backed reports.",
    category: "Research",
    icon: Sparkles,
    version: "1.4.0",
    status: "Published",
    usage: "2.8k runs",
    image: "/auth/illustration.png",
    model: "GPT-5",
    tools: ["Web Search", "Browser Agent"],
    capabilities: ["web.search", "web.fetch", "files.read", "files.write"],
    createdAt: "Sep 8, 2026",
    updatedAt: "Sep 26, 2026",
  },

  {
    id: "coding-agent",
    name: "Coding Agent",
    description:
      "Analyze codebases, implement changes, run code, and help debug software projects.",
    category: "Development",
    icon: Bot,
    version: "1.1.0",
    status: "Published",
    image: "/auth/illustration.png",

    usage: "1.9k runs",
    model: "GPT-5",
    tools: ["Code Runner", "GitHub Reader"],
    capabilities: ["code.execute", "files.read", "files.write", "github.read"],
    createdAt: "Sep 6, 2026",
    updatedAt: "Sep 24, 2026",
  },

  {
    id: "browser-agent",
    name: "Browser Agent",
    description:
      "Navigate websites, interact with pages, and complete multi-step browser workflows.",
    category: "Automation",
    icon: Zap,
    version: "0.9.0",
    status: "Published",
    image: "/auth/illustration.png",

    usage: "842 runs",
    model: "GPT-5",
    tools: ["Browser Agent"],
    capabilities: [
      "browser.navigate",
      "browser.click",
      "browser.type",
      "browser.extract",
    ],
    createdAt: "Sep 4, 2026",
    updatedAt: "Sep 22, 2026",
  },

  {
    id: "data-analyst",
    name: "Data Analyst",
    description:
      "Analyze datasets, identify patterns, calculate insights, and generate clear summaries.",
    category: "Analytics",
    icon: Bot,
    version: "0.7.0",
    image: "/auth/illustration.png",

    status: "Published",
    usage: "516 runs",
    model: "GPT-5",
    tools: ["Code Runner", "File Reader"],
    capabilities: ["code.execute", "files.read", "files.write", "data.analyze"],
    createdAt: "Sep 12, 2026",
    updatedAt: "Sep 21, 2026",
  },

  {
    id: "customer-support-agent",
    name: "Customer Support",
    description:
      "Handle customer questions using your organization's knowledge, tools, and workflows.",
    category: "Support",
    icon: Bot,
    version: "0.3.0",
    image: "/auth/illustration.png",

    status: "Draft",
    usage: "—",
    model: "GPT-5",
    tools: ["Web Search", "Knowledge Base"],
    capabilities: [
      "web.search",
      "knowledge.retrieve",
      "tickets.read",
      "tickets.update",
    ],
    createdAt: "Sep 25, 2026",
    updatedAt: "Sep 28, 2026",
  },

  {
    id: "content-agent",
    name: "Content Agent",
    description:
      "Create, rewrite, summarize, and adapt content for different audiences and formats.",
    category: "Content",
    icon: Sparkles,
    image: "/auth/illustration.png",

    version: "0.6.0",
    status: "Published",
    usage: "1.2k runs",
    model: "GPT-5",
    tools: ["File Reader", "Web Search"],
    capabilities: [
      "content.generate",
      "content.rewrite",
      "files.read",
      "web.search",
    ],
    createdAt: "Sep 10, 2026",
    updatedAt: "Sep 23, 2026",
  },
];

/* -------------------------------------------------------------------------- */
/* Groups                                                                     */
/* -------------------------------------------------------------------------- */

const groups = [
  {
    label: "Published",
    icon: Check,
  },
  {
    label: "Drafts",
    icon: Sparkles,
  },
] as const;

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
/* Detail item                                                                */
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
/* Agent information                                                          */
/* -------------------------------------------------------------------------- */

function AgentInfo({
  agent,
  open,
  onOpenChange,
}: {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (!agent) return null;

  const Icon = agent.icon;

  const content = (
    <div className="space-y-6">
      {/* Identity */}
      <div className="flex items-start gap-4">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border bg-muted/50">
          <Icon className="size-5" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{agent.name}</h3>

            <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {agent.status}
            </span>
          </div>

          <p className="mt-1 text-xs text-muted-foreground">{agent.category}</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <h4 className="text-xs font-medium">Description</h4>

        <p className="text-sm leading-6 text-muted-foreground">
          {agent.description}
        </p>
      </div>

      {/* Details */}
      <div className="overflow-hidden rounded-xl border">
        <div className="grid grid-cols-2 divide-x divide-y">
          <DetailItem label="Version" value={`v${agent.version}`} />
          <DetailItem label="Model" value={agent.model} />
          <DetailItem label="Usage" value={agent.usage} />
          <DetailItem label="Agent ID" value={agent.id} mono />
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium">Tools</h4>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Tools available to this agent during execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool) => (
            <div
              key={tool}
              className="inline-flex items-center gap-1.5 rounded-md border bg-muted/30 px-2.5 py-1.5 text-[11px] text-muted-foreground"
            >
              <Check className="size-3 text-foreground" />
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium">Capabilities</h4>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Permissions available to this agent during execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((capability) => (
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

          <p className="mt-1 text-xs font-medium">{agent.createdAt}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Last updated
          </p>

          <p className="mt-1 text-xs font-medium">{agent.updatedAt}</p>
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-5 text-left">
            <DialogTitle className="text-base">{agent.name}</DialogTitle>

            <DialogDescription className="text-xs">
              Details, model, tools, and execution capabilities for this agent.
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
          <DrawerTitle className="text-base">{agent.name}</DrawerTitle>

          <DrawerDescription className="text-xs">
            Details, model, tools, and execution capabilities for this agent.
          </DrawerDescription>
        </DrawerHeader>

        <div className="max-h-[75vh] overflow-y-auto px-4 pb-8">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}

/* -------------------------------------------------------------------------- */
/* Agents                                                                     */
/* -------------------------------------------------------------------------- */

export const Agents = () => {
  const [agentBuilderOpen, setAgentBuilderOpen] = React.useState(false);

  const [search, setSearch] = React.useState("");

  const [selectedAgent, setSelectedAgent] = React.useState<Agent | null>(null);

  const [infoOpen, setInfoOpen] = React.useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  /* ------------------------------------------------------------------------ */
  /* Search                                                                    */
  /* ------------------------------------------------------------------------ */

  const filteredAgents = React.useMemo(() => {
    if (!normalizedSearch) {
      return agents;
    }

    return agents.filter((agent) =>
      [
        agent.name,
        agent.description,
        agent.category,
        agent.status,
        agent.model,
        agent.id,
        ...agent.tools,
        ...agent.capabilities,
      ].some((value) => value.toLowerCase().includes(normalizedSearch)),
    );
  }, [normalizedSearch]);

  /* ------------------------------------------------------------------------ */
  /* Groups                                                                    */
  /* ------------------------------------------------------------------------ */

  const router = useRouter();

  const groupedAgents = React.useMemo(() => {
    return groups
      .map((group) => ({
        ...group,

        agents: filteredAgents.filter((agent) =>
          group.label === "Published"
            ? agent.status === "Published"
            : agent.status === "Draft",
        ),
      }))
      .filter((group) => group.agents.length > 0);
  }, [filteredAgents]);

  const totalResults = filteredAgents.length;

  /* ------------------------------------------------------------------------ */
  /* Open agent                                                                */
  /* ------------------------------------------------------------------------ */

  const openAgent = React.useCallback((agent: Agent) => {
    setSelectedAgent(agent);
    setInfoOpen(true);
  }, []);

  const handleInfoChange = React.useCallback((open: boolean) => {
    setInfoOpen(open);

    if (!open) {
      window.setTimeout(() => {
        setSelectedAgent(null);
      }, 180);
    }
  }, []);

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
              <h1 className="text-xl font-semibold tracking-tight">Agents</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Build and manage agents for your workflows
              </p>
            </div>

            <Button
              type="button"
              className="shrink-0"
              onClick={() => setAgentBuilderOpen(true)}
            >
              <Plus className="size-4" />
              <span>Create</span>
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
                placeholder="Search agents..."
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
                  {totalResults} {totalResults === 1 ? "agent" : "agents"}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Agent groups */}
          <div>
            <div className="space-y-8 pb-8 pr-1">
              <AnimatePresence mode="popLayout">
                {groupedAgents.length > 0 ? (
                  groupedAgents.map((group, index) => {
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
                            {group.agents.length}
                          </span>
                        </motion.div>

                        {/* Agent cards */}
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          <AnimatePresence mode="popLayout">
                            {group.agents.map((agent, agentIndex) => (
                              <AgentCard
                                key={agent.id}
                                agent={agent}
                                index={agentIndex}
                                onOpen={openAgent}
                              />
                            ))}
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

                    <h3 className="text-sm font-medium">No agents found</h3>

                    <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                      No agents match{" "}
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

      {/* Agent information */}
      <AgentInfo
        agent={selectedAgent}
        open={infoOpen}
        onOpenChange={handleInfoChange}
      />

      {/* Create agent */}
      <Dialog open={agentBuilderOpen} onOpenChange={setAgentBuilderOpen}>
        <DialogContent className="max-w-lg overflow-hidden p-0">
          <DialogHeader className="border-b px-6 py-5">
            <DialogTitle>Build an agent</DialogTitle>
            <DialogDescription>
              Design your agent visually by connecting models, tools, and
              subagents on a canvas.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 pb-4">
            <div className="relative overflow-hidden rounded-xl border bg-muted/30 p-6">
              {/* Canvas preview */}
              <div className="pointer-events-none absolute inset-0 opacity-40">
                <div className="absolute left-1/2 top-1/2 h-px w-32 -translate-x-1/2 bg-border" />
                <div className="absolute left-[28%] top-[35%] h-px w-20 rotate-[25deg] bg-border" />
                <div className="absolute right-[28%] top-[35%] h-px w-20 -rotate-[25deg] bg-border" />
              </div>

              <div className="relative flex min-h-52 items-center justify-center">
                {/* Main agent */}
                <div className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-xl border bg-background shadow-sm">
                  <Bot className="mb-1 size-5" />
                  <span className="text-[11px] font-medium">Agent</span>
                </div>

                {/* Tool node */}
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
                  <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                    <Wrench className="size-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium">Tools</span>
                </div>

                {/* Subagent node */}
                <div className="absolute right-5 top-5 flex items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
                  <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                    <Users className="size-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium">Subagent</span>
                </div>

                {/* Model node */}
                <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg border bg-background px-3 py-2 shadow-sm">
                  <div className="flex size-6 items-center justify-center rounded-md bg-muted">
                    <Sparkles className="size-3.5 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-medium">Model</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div>
                <h3 className="text-sm font-semibold">
                  Your agent, built visually.
                </h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Start with an agent and build its capabilities by connecting
                  models, tools, skills, and specialized subagents. Shape how
                  everything works together directly on the canvas.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="rounded-lg border bg-background p-3">
                  <Wrench className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-xs font-medium">Connect tools</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    Give agents real capabilities.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-3">
                  <Users className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-xs font-medium">Add subagents</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    Delegate specialized work.
                  </p>
                </div>

                <div className="rounded-lg border bg-background p-3">
                  <Workflow className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-xs font-medium">Compose flows</p>
                  <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                    Connect everything together.
                  </p>
                </div>
              </div>
            </div>

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={() => {
                setAgentBuilderOpen(false);
                router.push("/agents/builder");
              }}
            >
              Open agent builder
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
