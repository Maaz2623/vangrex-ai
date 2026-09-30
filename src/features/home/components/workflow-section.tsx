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
      className="border-y border-border bg-muted/20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-7 border-b border-border pb-8 md:grid-cols-[1fr_0.7fr] md:items-end"
        >
          <div>
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              <span className="h-px w-7 bg-primary" />
              Simple by design
            </p>
            <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
              From idea to agent in minutes.
            </h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-muted-foreground md:justify-self-end">
            Vangrex turns the complexity of the AI stack into a workflow you can
            actually reason about.
          </p>
        </motion.div>

        <div className="mt-5 grid md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.075 }}
                className="group relative border-b border-border py-6 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-primary">
                    {step.number}
                  </span>
                  <Icon className="size-[18px] text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <h3 className="text-base font-medium">{step.title}</h3>
                  {index < steps.length - 1 && (
                    <ArrowDown className="size-3.5 text-primary md:hidden" />
                  )}
                </div>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-7 h-px w-full bg-border">
                  <div className="h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
