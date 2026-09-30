"use client";

import { motion } from "motion/react";
import {
  Blocks,
  Braces,
  Layers3,
  MessageSquareText,
  Settings2,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Blocks,
    index: "01",
    title: "Create your own agents",
    description:
      "Define specialized agents with their own instructions, model configuration, tools, and behavior.",
    note: "PURPOSE, PERSONA, TOOLS",
  },
  {
    icon: Layers3,
    index: "02",
    title: "Multi-model by design",
    description:
      "Use different models for different jobs. Switch between providers without rebuilding your workflow.",
    note: "CHOOSE PER TASK",
  },
  {
    icon: Workflow,
    index: "03",
    title: "Composable workflows",
    description:
      "Build workflows around agents instead of forcing every task into a single general-purpose assistant.",
    note: "AGENTS THAT FIT TOGETHER",
  },
  {
    icon: Settings2,
    index: "04",
    title: "Fine-grained control",
    description:
      "Expose the AI SDK parameters that matter and configure agents exactly how you want them.",
    note: "TUNE THE DETAILS",
  },
  {
    icon: MessageSquareText,
    index: "05",
    title: "One conversation layer",
    description:
      "Interact with every agent through one consistent, fast, focused chat experience.",
    note: "ONE FAMILIAR SPACE",
  },
  {
    icon: Braces,
    index: "06",
    title: "Developer friendly",
    description:
      "Built around modern AI primitives so your agents remain flexible as your stack evolves.",
    note: "MADE TO ADAPT",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="grid gap-8 border-b border-border pb-10 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-7 bg-primary" />
              Everything in one place
            </p>
            <h2 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              Your AI stack,
              <br />
              <span className="font-serif font-normal italic">
                without the fragmentation.
              </span>
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted-foreground md:justify-self-end">
            Vangrex gives you a single layer for building and interacting with
            AI agents, while keeping the underlying models and configuration
            completely flexible.
          </p>
        </motion.div>

        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.055, duration: 0.45 }}
                className="group relative border-b border-border py-7 sm:px-5 sm:first:pl-0 sm:nth-2:pr-0 lg:nth-3:pr-0 lg:nth-3:pl-5 lg:nth-last-3:border-b-0"
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-primary">
                    {feature.index}
                  </span>
                  <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h3 className="mt-8 text-base font-medium tracking-tight">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
                <p className="mt-6 font-mono text-[9px] tracking-[0.14em] text-muted-foreground/70">
                  {feature.note}
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
