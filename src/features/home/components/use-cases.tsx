"use client";

import { motion } from "motion/react";
import {
  Code2,
  FileSearch,
  Lightbulb,
  PenLine,
  Search,
  Terminal,
} from "lucide-react";

const useCases = [
  {
    icon: Search,
    title: "Research",
    text: "Explore topics, synthesize information, and turn scattered knowledge into useful answers.",
  },
  {
    icon: Code2,
    title: "Engineering",
    text: "Create coding-focused agents with the model, instructions, and behavior your projects require.",
  },
  {
    icon: PenLine,
    title: "Writing",
    text: "Give every writing workflow its own context, voice, and specialized instructions.",
  },
  {
    icon: FileSearch,
    title: "Analysis",
    text: "Build analytical agents designed around structured reasoning and repeatable tasks.",
  },
  {
    icon: Terminal,
    title: "Automation",
    text: "Design agents around tools and workflows that turn repetitive work into systems.",
  },
  {
    icon: Lightbulb,
    title: "Experimentation",
    text: "Try different models and agent configurations without rebuilding your entire workspace.",
  },
];

export function UseCases() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-10 grid gap-7 border-b border-border pb-8 md:grid-cols-[1fr_0.65fr] md:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-7 bg-primary" />
              Built for real work
            </p>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
              Whatever you&apos;re building.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted-foreground md:justify-self-end">
            Specialized agents make it possible to create a workspace that
            adapts to the way you actually work.
          </p>
        </div>

        <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.045 }}
                className="group relative min-h-52 border-b border-r border-border p-5 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-primary">
                    0{index + 1}
                  </span>
                  <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-lg font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
