"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Bot, Check, Sparkles } from "lucide-react";

export function AgentsSection() {
  return (
    <section
      id="agents"
      className="border-y border-border/60 bg-muted/20 py-28 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 lg:grid-cols-2 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 text-sm font-medium text-primary">
            Agents that work your way
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            One agent for every kind of thinking.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
            Create focused agents instead of forcing one assistant to do
            everything. Give each one a purpose, personality, model, and set of
            capabilities.
          </p>

          <div className="mt-8 space-y-3">
            {[
              "Custom system instructions",
              "Model and provider configuration",
              "Temperature and generation parameters",
              "Tool and capability configuration",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-muted-foreground"
              >
                <span className="flex size-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Check className="size-3" />
                </span>
                {item}
              </div>
            ))}
          </div>

          <a
            href="#"
            className="group mt-9 inline-flex items-center gap-2 text-sm font-medium"
          >
            Explore agents
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative rounded-3xl border border-border bg-background p-4 shadow-xl">
            <div className="rounded-2xl border border-border bg-muted/20 p-5">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <Bot className="size-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">Research Agent</p>
                  <p className="text-xs text-muted-foreground">
                    Built for deep research
                  </p>
                </div>

                <span className="ml-auto flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[10px] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-green-500" />
                  Active
                </span>
              </div>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Sparkles className="size-3.5 text-primary" />
                    <span className="text-xs font-medium">
                      Agent instructions
                    </span>
                  </div>

                  <p className="text-xs leading-5 text-muted-foreground">
                    Research complex topics, compare sources, identify patterns,
                    and produce concise evidence-backed summaries.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="text-[10px] text-muted-foreground">Model</p>
                    <p className="mt-1 text-xs font-medium">Claude Sonnet</p>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4">
                    <p className="text-[10px] text-muted-foreground">
                      Temperature
                    </p>
                    <p className="mt-1 text-xs font-medium">0.3</p>
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
