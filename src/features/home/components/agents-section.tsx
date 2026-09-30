"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Bot, Check, Sparkles } from "lucide-react";

const capabilities = [
  "Custom system instructions",
  "Model and provider configuration",
  "Temperature and generation parameters",
  "Tool and capability configuration",
];

export function AgentsSection() {
  return (
    <section
      id="agents"
      className="overflow-hidden border-y border-border bg-muted/20 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-7 bg-primary" />
            Agents that work your way
          </p>
          <h2 className="max-w-lg text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
            One agent for every kind of thinking.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            Create focused agents instead of forcing one assistant to do
            everything. Give each one a purpose, personality, model, and set of
            capabilities.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#workflow"
            className="group mt-9 inline-flex items-center gap-3 border-b border-foreground/30 pb-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
          >
            Explore agents
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative"
        >
          <div
            aria-hidden="true"
            className="absolute -right-8 -top-8 size-32 border-r border-t border-primary/30"
          />
          <div className="relative border border-border bg-background">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                Agent configuration / 001
              </p>
              <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Active
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center bg-primary text-primary-foreground">
                  <Bot className="size-5" />
                </div>
                <div>
                  <p className="text-base font-medium">Research Agent</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Built for deep research
                  </p>
                </div>
                <span className="ml-auto hidden border border-border px-2.5 py-1 font-mono text-[9px] text-muted-foreground sm:inline">
                  CUSTOM
                </span>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="size-3.5 text-primary" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                    Agent instructions
                  </span>
                </div>
                <p className="border-l border-primary/50 pl-4 text-sm leading-6 text-muted-foreground">
                  Research complex topics, compare sources, identify patterns,
                  and produce concise evidence-backed summaries.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-2 border-y border-border">
                <div className="py-4 pr-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                    Model
                  </p>
                  <p className="mt-2 text-sm font-medium">Claude Sonnet</p>
                </div>
                <div className="border-l border-border py-4 pl-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                    Temperature
                  </p>
                  <p className="mt-2 text-sm font-medium">0.3</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Tools & capabilities configured</span>
                <span className="font-mono">04 ENABLED</span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-3 left-5 right-5 -z-10 h-8 border border-border bg-muted/40" />
        </motion.div>
      </div>
    </section>
  );
}
