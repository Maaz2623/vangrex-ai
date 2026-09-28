"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";
import { Bot, MoreHorizontal, Sparkles, Workflow } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export type Workspace = {
  id: string;
  title: string;
  preview: string;
  time: string;
  model?: string;
  messages?: number;
};

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export const WorkspaceList = ({ workspaces }: WorkspaceListProps) => {
  const router = useRouter();
  return (
    <motion.div
      layout
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {workspaces.map((workspace, index) => {
          // Only the first 8 cards are staggered.
          const staggerDelay = index < 8 ? index * 0.07 : 0;
          const iconDelay = index < 8 ? index * 0.07 + 0.04 : 0;

          return (
            <motion.article
              key={workspace.id}
              layout
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.98,
              }}
              transition={{
                opacity: {
                  duration: 0.18,
                  delay: staggerDelay,
                  ease: "easeOut",
                },
                y: {
                  duration: 0.22,
                  delay: staggerDelay,
                  ease: "easeOut",
                },
                scale: {
                  duration: 0.16,
                  ease: "easeOut",
                },
                layout: {
                  duration: 0.22,
                  ease: "easeOut",
                },
              }}
              whileHover={{
                y: -2,
              }}
              className="group relative flex min-h-[168px] flex-col rounded-xl border bg-card transition-colors duration-200 hover:border-foreground/15 hover:shadow-sm"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 p-4 pb-3">
                <button
                  type="button"
                  onClick={() => router.push(`/workspaces/${workspace.id}`)}
                  className="flex min-w-0 flex-1 cursor-pointer items-start gap-3 text-left"
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
                      delay: iconDelay,
                      ease: "easeOut",
                    }}
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/50 text-muted-foreground transition-colors group-hover:text-foreground"
                  >
                    <Workflow className="size-4" />
                  </motion.div>

                  <div className="min-w-0 pt-0.5">
                    <h3 className="truncate text-sm font-medium leading-5">
                      {workspace.title}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <span>{workspace.time}</span>

                      {workspace.messages !== undefined && (
                        <>
                          <span className="text-muted-foreground/40">•</span>

                          <span>
                            {workspace.messages}{" "}
                            {workspace.messages === 1 ? "message" : "messages"}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </button>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all duration-150 hover:bg-muted hover:text-foreground focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group-hover:opacity-100"
                      aria-label={`Actions for ${workspace.title}`}
                    >
                      <MoreHorizontal className="size-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>Open workspace</DropdownMenuItem>

                    <DropdownMenuItem>Rename</DropdownMenuItem>

                    <DropdownMenuItem>Archive</DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Preview */}
              <button
                type="button"
                className="flex min-w-0 flex-1 flex-col px-4 pb-3 text-left"
              >
                <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                  {workspace.preview}
                </p>
              </button>

              {/* Footer */}
              <div className="mt-auto flex items-center justify-between border-t bg-muted/20 px-4 py-2.5">
                <div className="flex min-w-0 items-center gap-1.5">
                  <Bot className="size-3.5 shrink-0 text-muted-foreground" />

                  <span className="truncate text-[11px] font-medium text-muted-foreground">
                    {workspace.model ?? "Vangrex AI"}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Sparkles className="size-3" />

                  <span>AI workspace</span>
                </div>
              </div>
            </motion.article>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
