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
    <section className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-14 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-sm font-medium text-primary">
              Built for real work
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              Whatever you&apos;re building.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Specialized agents make it possible to create a workspace that
            adapts to the way you actually work.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="group rounded-2xl border border-border p-6 transition-all hover:-translate-y-1 hover:bg-muted/30 hover:shadow-lg"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-4" />
                </div>

                <h3 className="mt-8 text-sm font-medium">{item.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
