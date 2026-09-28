"use client";

import { motion } from "motion/react";
import { ArrowRight, Bot, ChevronRight, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[850px] items-center overflow-hidden pt-24">
      {/* Background grid */}
      <div
        className="absolute inset-0 -z-20 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground shadow-sm backdrop-blur"
          >
            <Sparkles className="size-3.5 text-primary" />
            The AI workspace for agents
            <ChevronRight className="size-3" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-balance text-5xl font-semibold tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[84px]"
          >
            One place for
            <br />
            <span className="bg-gradient-to-b from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
              every AI agent.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
          >
            Build, configure, and use powerful AI agents with the models you
            choose. Vangrex brings multi-agent and multi-model workflows into
            one beautifully simple workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/10 transition-all hover:gap-3 hover:shadow-xl"
            >
              Start building
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href="#features"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-medium transition-colors hover:bg-muted"
            >
              Explore Vangrex
            </a>
          </motion.div>
        </div>

        {/* Product visualization */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mx-auto mt-20 max-w-5xl"
        >
          <div className="absolute -inset-10 -z-10 rounded-[40px] bg-primary/5 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-2xl shadow-black/5">
            {/* fake window header */}
            <div className="flex h-12 items-center border-b border-border px-4">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
                <span className="size-2.5 rounded-full bg-muted-foreground/30" />
              </div>

              <div className="mx-auto flex items-center gap-2 rounded-md border border-border bg-muted/50 px-3 py-1 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-green-500" />
                Vangrex
              </div>

              <div className="w-12" />
            </div>

            <div className="grid min-h-[420px] md:grid-cols-[190px_1fr]">
              {/* fake sidebar */}
              <div className="hidden border-r border-border p-4 md:block">
                <div className="mb-5 h-7 rounded-md bg-muted" />

                <div className="space-y-1">
                  <div className="rounded-lg bg-muted px-3 py-2 text-xs">
                    New conversation
                  </div>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Research Agent
                  </div>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Coding Agent
                  </div>
                  <div className="px-3 py-2 text-xs text-muted-foreground">
                    Writer
                  </div>
                </div>
              </div>

              {/* fake chat */}
              <div className="relative flex flex-col">
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Bot className="size-3.5" />
                    </span>
                    Research Agent
                  </div>

                  <span className="text-[10px] text-muted-foreground">
                    Claude · GPT · Gemini
                  </span>
                </div>

                <div className="flex-1 space-y-7 p-6 sm:p-10">
                  <div className="ml-auto max-w-[70%]">
                    <div className="rounded-2xl rounded-tr-md bg-primary px-4 py-3 text-xs leading-5 text-primary-foreground">
                      Analyze the latest trends in AI agent infrastructure and
                      summarize the key opportunities.
                    </div>
                  </div>

                  <div className="flex max-w-[80%] gap-3">
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                      <Bot className="size-3.5" />
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs leading-5 text-muted-foreground">
                        I&apos;ll research the current landscape across
                        infrastructure, orchestration, and model providers.
                      </div>

                      <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/30 px-3 py-2">
                        <Zap className="size-3 text-primary" />
                        <span className="text-[10px] text-muted-foreground">
                          Researching multiple sources...
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border p-4">
                  <div className="flex h-10 items-center rounded-xl border border-border bg-background px-3 text-xs text-muted-foreground">
                    Ask anything...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
