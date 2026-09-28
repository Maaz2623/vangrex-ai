"use client";

import { motion } from "motion/react";
import { ArrowDown, Bot, Cpu, MessageSquare, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Bot,
    title: "Create an agent",
    description:
      "Define what your agent is, how it behaves, and what it should be capable of.",
  },
  {
    number: "02",
    icon: Cpu,
    title: "Choose its model",
    description:
      "Connect the model that fits the job and tune its generation parameters.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Start a conversation",
    description:
      "Select your agent from the workspace and start working immediately.",
  },
  {
    number: "04",
    icon: Sparkles,
    title: "Build something",
    description: "Move between agents and models as your work changes.",
  },
];

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="border-y border-border/60 bg-muted/20 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="mb-4 text-sm font-medium text-primary">
            Simple by design
          </p>

          <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
            From idea to agent in minutes.
          </h2>

          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Vangrex turns the complexity of the AI stack into a workflow you can
            actually reason about.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative"
              >
                <div className="rounded-2xl border border-border bg-background p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">
                      {step.number}
                    </span>

                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </div>
                  </div>

                  <h3 className="mt-10 text-sm font-medium">{step.title}</h3>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <ArrowDown className="absolute -bottom-3 left-1/2 z-10 size-4 -translate-x-1/2 text-muted-foreground md:-right-3 md:left-auto md:top-1/2 md:translate-x-1/2 md:rotate-[-90deg]" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
