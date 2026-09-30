"use client";

import { motion } from "motion/react";
import { ArrowRight, Bot, ChevronRight, Sparkles, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-12 -z-10 size-[32rem] rounded-full border border-primary/15 sm:right-[-9rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-28 -z-10 size-[21rem] rounded-full border border-primary/10"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_0.72fr] lg:gap-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-7 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"
            >
              <span className="flex size-7 items-center justify-center border border-primary/30 text-primary">
                <Sparkles className="size-3.5" />
              </span>
              The AI workspace for agents
              <ChevronRight className="size-3 text-primary" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-4xl text-balance text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-7xl lg:text-[6.4rem]"
            >
              One place for
              <br />
              <span className="font-serif font-normal italic tracking-[-0.055em] text-primary">
                every AI agent.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.13 }}
              className="mt-7 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8"
            >
              Build, configure, and use powerful AI agents with the models you
              choose. Vangrex brings multi-agent and multi-model workflows into
              one beautifully simple workspace.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <a
                href="/auth"
                className="group inline-flex h-12 items-center justify-center gap-5 bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Start building
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#features"
                className="inline-flex h-12 items-center justify-center border border-border px-5 text-sm font-medium transition-colors hover:bg-muted"
              >
                Explore Vangrex
              </a>
            </motion.div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            className="hidden border-l border-border pl-6 pb-2 lg:block"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Workspace / 01
            </p>
            <p className="mt-5 max-w-xs font-serif text-2xl leading-snug">
              Give every kind of thinking its own place to work.
            </p>
            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              One workspace. Many ways forward.
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-16 sm:mt-24"
        >
          <div className="absolute -inset-4 -z-10 border border-primary/10 sm:-inset-7" />
          <div className="overflow-hidden border border-border bg-card shadow-[0_32px_90px_-50px_rgba(0,0,0,0.38)]">
            <div className="flex h-12 items-center justify-between border-b border-border px-4 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Vangrex / workspace
                </span>
              </div>
              <div className="hidden items-center gap-2 font-mono text-[10px] text-muted-foreground sm:flex">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                SYSTEM READY
              </div>
            </div>

            <div className="grid min-h-[390px] md:grid-cols-[205px_1fr]">
              <aside className="hidden border-r border-border p-4 md:block">
                <div className="mb-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                  Your agents
                  <span>03</span>
                </div>
                <div className="space-y-1">
                  {[
                    ["Research Agent", "01", true],
                    ["Coding Agent", "02", false],
                    ["Writer", "03", false],
                  ].map(([name, number, active]) => (
                    <div
                      key={name}
                      className={`flex items-center gap-2.5 px-2.5 py-3 text-xs ${
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${
                          active ? "bg-primary" : "bg-border"
                        }`}
                      />
                      <span className="flex-1">{name}</span>
                      <span className="font-mono text-[9px] opacity-60">
                        {number}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-t border-border pt-4 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                  Current model
                  <p className="mt-2 font-sans text-xs normal-case tracking-normal text-foreground">
                    Claude · GPT · Gemini
                  </p>
                </div>
              </aside>

              <div className="flex min-w-0 flex-col">
                <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center bg-primary text-primary-foreground">
                      <Bot className="size-4" />
                    </span>
                    <div>
                      <p className="text-xs font-medium">Research Agent</p>
                      <p className="mt-0.5 font-mono text-[9px] text-muted-foreground">
                        FOCUSED ON DEEP RESEARCH
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-muted-foreground">
                    MODEL / SONNET
                  </span>
                </div>

                <div className="flex-1 space-y-7 px-4 py-6 sm:px-8 sm:py-9">
                  <div className="ml-auto max-w-[78%] border border-primary/20 bg-primary/[0.07] px-4 py-3 text-xs leading-5">
                    Analyze the latest trends in AI agent infrastructure and
                    summarize the key opportunities.
                  </div>

                  <div className="flex max-w-[90%] gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center border border-border">
                      <Bot className="size-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs leading-5 text-muted-foreground">
                        I&apos;ll research the landscape across infrastructure,
                        orchestration, and model providers.
                      </p>
                      <div className="mt-4 border-l-2 border-primary py-1 pl-3">
                        <div className="flex items-center gap-2">
                          <Zap className="size-3 text-primary" />
                          <span className="font-mono text-[10px] text-muted-foreground">
                            RESEARCHING MULTIPLE SOURCES
                          </span>
                        </div>
                        <div className="mt-2 h-px w-36 bg-border">
                          <div className="h-px w-2/3 bg-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border p-3 sm:p-4">
                  <div className="flex min-h-11 items-center justify-between border border-border px-3 text-xs text-muted-foreground">
                    <span>Ask anything…</span>
                    <span className="font-mono text-[9px]">↵ SEND</span>
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
