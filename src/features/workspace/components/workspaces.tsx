"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";
import { Archive, Clock3, Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NewWorkspaceDialog } from "./create-workspace-dialog";
import { WorkspaceList } from "./workspace-list";
import type { Workspace } from "./workspace-list";

const workspaces = {
  today: [
    {
      id: "workspace_001",
      title: "Building the Vangrex dashboard",
      preview: "Let's design the main dashboard layout...",
      time: "10:42 PM",
      model: "GPT-5.6",
      messages: 24,
    },
    {
      id: "workspace_002",
      title: "AI agent architecture",
      preview: "How should we structure the agent system?",
      time: "9:18 PM",
      model: "Claude Sonnet",
      messages: 18,
    },
    {
      id: "workspace_003",
      title: "Next.js authentication flow",
      preview: "Let's connect Better Auth with the...",
      time: "8:31 PM",
      model: "GPT-5.6",
      messages: 31,
    },
    {
      id: "workspace_004",
      title: "Multi-model provider setup",
      preview: "Adding support for multiple AI model providers...",
      time: "7:45 PM",
      model: "GPT-5.6",
      messages: 16,
    },
    {
      id: "workspace_005",
      title: "Designing the chat interface",
      preview: "The chat experience should feel fast and minimal...",
      time: "6:52 PM",
      model: "Claude Sonnet",
      messages: 22,
    },
    {
      id: "workspace_006",
      title: "AI SDK streaming responses",
      preview: "Let's implement streaming responses with AI SDK...",
      time: "5:27 PM",
      model: "GPT-5.6",
      messages: 14,
    },
    {
      id: "workspace_007",
      title: "Agent configuration system",
      preview: "Users should be able to configure their own agents...",
      time: "4:16 PM",
      model: "GPT-5.6",
      messages: 27,
    },
    {
      id: "workspace_008",
      title: "Database schema planning",
      preview: "Let's define the schema for users, agents, models...",
      time: "2:48 PM",
      model: "Claude Sonnet",
      messages: 19,
    },
  ],

  yesterday: [
    {
      id: "workspace_009",
      title: "Design system planning",
      preview: "I want to keep the interface minimal...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 21,
    },
    {
      id: "workspace_010",
      title: "Multi-model chat architecture",
      preview: "Each agent should be able to use...",
      time: "Yesterday",
      model: "Claude Sonnet",
      messages: 17,
    },
    {
      id: "workspace_011",
      title: "Better Auth integration",
      preview: "Setting up sessions and protected routes...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 29,
    },
    {
      id: "workspace_012",
      title: "Sidebar navigation structure",
      preview: "Let's organize the main platform navigation...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 13,
    },
    {
      id: "workspace_013",
      title: "Vangrex agent marketplace",
      preview: "Exploring how users could share agents...",
      time: "Yesterday",
      model: "Claude Sonnet",
      messages: 25,
    },
    {
      id: "workspace_014",
      title: "Model selection interface",
      preview: "Users need a clean way to switch between models...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 12,
    },
    {
      id: "workspace_015",
      title: "Chat history architecture",
      preview: "Planning how conversations should be persisted...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 20,
    },
    {
      id: "workspace_016",
      title: "Agent system prompts",
      preview: "Designing the configuration experience for prompts...",
      time: "Yesterday",
      model: "Claude Sonnet",
      messages: 15,
    },
    {
      id: "workspace_017",
      title: "Streaming UI states",
      preview: "Handling loading, streaming, errors, and retries...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 23,
    },
    {
      id: "workspace_018",
      title: "Responsive dashboard layout",
      preview: "Making the dashboard work nicely on smaller screens...",
      time: "Yesterday",
      model: "GPT-5.6",
      messages: 18,
    },
  ],

  previous: [
    {
      id: "workspace_019",
      title: "Vangrex product direction",
      preview: "The core idea is a workspace for...",
      time: "Sep 26",
      model: "GPT-5.6",
      messages: 32,
    },
    {
      id: "workspace_020",
      title: "AI SDK experiments",
      preview: "Testing different model providers...",
      time: "Sep 25",
      model: "Claude Sonnet",
      messages: 11,
    },
    {
      id: "workspace_021",
      title: "Agent memory architecture",
      preview: "How should long-term and conversation memory work?",
      time: "Sep 25",
      model: "GPT-5.6",
      messages: 26,
    },
    {
      id: "workspace_022",
      title: "Prompt management system",
      preview: "Creating reusable system prompts for agents...",
      time: "Sep 24",
      model: "GPT-5.6",
      messages: 19,
    },
    {
      id: "workspace_023",
      title: "Model provider abstraction",
      preview: "Building a provider-independent model layer...",
      time: "Sep 24",
      model: "Claude Sonnet",
      messages: 24,
    },
    {
      id: "workspace_024",
      title: "Chat persistence strategy",
      preview: "Comparing approaches for storing conversations...",
      time: "Sep 23",
      model: "GPT-5.6",
      messages: 16,
    },
    {
      id: "workspace_025",
      title: "Vangrex onboarding flow",
      preview: "Designing the first-time user experience...",
      time: "Sep 22",
      model: "GPT-5.6",
      messages: 28,
    },
    {
      id: "workspace_026",
      title: "Agent creation workflow",
      preview: "Users should be able to create an agent in a few steps...",
      time: "Sep 21",
      model: "Claude Sonnet",
      messages: 21,
    },
    {
      id: "workspace_027",
      title: "Usage and token tracking",
      preview: "Planning how model usage and token consumption...",
      time: "Sep 20",
      model: "GPT-5.6",
      messages: 14,
    },
    {
      id: "workspace_028",
      title: "API key management",
      preview: "Thinking through secure provider API key storage...",
      time: "Sep 19",
      model: "GPT-5.6",
      messages: 17,
    },
    {
      id: "workspace_029",
      title: "Vangrex settings architecture",
      preview: "Organizing account, workspace, and model settings...",
      time: "Sep 18",
      model: "Claude Sonnet",
      messages: 22,
    },
    {
      id: "workspace_030",
      title: "Initial Vangrex prototype",
      preview: "Sketching the first version of the platform...",
      time: "Sep 17",
      model: "GPT-5.6",
      messages: 35,
    },
  ],
};

const groups: {
  label: string;
  icon: React.ElementType;
  workspaces: Workspace[];
}[] = [
  {
    label: "Today",
    icon: Clock3,
    workspaces: workspaces.today,
  },
  {
    label: "Yesterday",
    icon: Clock3,
    workspaces: workspaces.yesterday,
  },
  {
    label: "Previous 7 days",
    icon: Archive,
    workspaces: workspaces.previous,
  },
];

export const Workspaces = () => {
  const [search, setSearch] = React.useState("");

  const normalizedSearch = search.trim().toLowerCase();

  const filteredGroups = React.useMemo(() => {
    if (!normalizedSearch) {
      return groups;
    }

    return groups
      .map((group) => ({
        ...group,
        workspaces: group.workspaces.filter(
          (workspace) =>
            workspace.title.toLowerCase().includes(normalizedSearch) ||
            workspace.preview.toLowerCase().includes(normalizedSearch) ||
            workspace.model?.toLowerCase().includes(normalizedSearch),
        ),
      }))
      .filter((group) => group.workspaces.length > 0);
  }, [normalizedSearch]);

  const totalResults = filteredGroups.reduce(
    (total, group) => total + group.workspaces.length,
    0,
  );

  return (
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
            <h1 className="text-xl font-semibold tracking-tight">Workspaces</h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Your AI workspaces
            </p>
          </div>

          <NewWorkspaceDialog />
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
              placeholder="Search workspaces..."
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
                {totalResults} {totalResults === 1 ? "workspace" : "workspaces"}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Workspace history */}
        <div>
          <div className="space-y-8 pb-8 pr-1">
            <AnimatePresence mode="popLayout">
              {filteredGroups.length > 0 ? (
                filteredGroups.map((group, index) => {
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
                          {group.workspaces.length}
                        </span>
                      </motion.div>

                      {/* Workspace cards */}
                      <WorkspaceList workspaces={group.workspaces} />
                    </motion.section>
                  );
                })
              ) : (
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

                  <h3 className="text-sm font-medium">No workspaces found</h3>

                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    No workspaces match{" "}
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
  );
};
