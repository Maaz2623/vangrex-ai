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
    title: "Create your own agents",
    description:
      "Define specialized agents with their own instructions, model configuration, tools, and behavior.",
  },
  {
    icon: Layers3,
    title: "Multi-model by design",
    description:
      "Use different models for different jobs. Switch between providers without rebuilding your workflow.",
  },
  {
    icon: Workflow,
    title: "Composable workflows",
    description:
      "Build workflows around agents instead of forcing every task into a single general-purpose assistant.",
  },
  {
    icon: Settings2,
    title: "Fine-grained control",
    description:
      "Expose the AI SDK parameters that matter and configure agents exactly how you want them.",
  },
  {
    icon: MessageSquareText,
    title: "One conversation layer",
    description:
      "Interact with every agent through one consistent, fast, focused chat experience.",
  },
  {
    icon: Braces,
    title: "Developer friendly",
    description:
      "Built around modern AI primitives so your agents remain flexible as your stack evolves.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="mb-4 text-sm font-medium text-primary">
            Everything in one place
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            Your AI stack,
            <br />
            without the fragmentation.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Vangrex gives you a single layer for building and interacting with
            AI agents, while keeping the underlying models and configuration
            completely flexible.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group bg-background p-7 transition-colors hover:bg-muted/40"
              >
                <div className="mb-10 flex size-10 items-center justify-center rounded-xl border border-border bg-background shadow-sm transition-transform group-hover:-translate-y-1">
                  <Icon className="size-4 text-primary" />
                </div>

                <h3 className="font-medium">{feature.title}</h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
