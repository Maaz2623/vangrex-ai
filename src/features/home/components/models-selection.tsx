"use client";

import { motion } from "motion/react";
import { ArrowRight, Brain, GitBranch, Sparkles } from "lucide-react";

const models = [
  {
    name: "OpenAI",
    models: ["GPT", "Reasoning"],
  },
  {
    name: "Anthropic",
    models: ["Claude", "Sonnet"],
  },
  {
    name: "Google",
    models: ["Gemini", "Flash"],
  },
  {
    name: "More",
    models: ["Your stack", "Your choice"],
  },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-4 text-sm font-medium text-primary">
              Freedom of choice
            </p>

            <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              The model is a detail.
              <br />
              Your workflow is not.
            </h2>

            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Vangrex keeps your agents independent from any single model
              provider. Use the model that makes sense for the task.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
              <GitBranch className="size-4 text-primary" />
              Switch models without rebuilding your agent.
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {models.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-border bg-background">
                    {index === 3 ? (
                      <Sparkles className="size-4 text-primary" />
                    ) : (
                      <Brain className="size-4 text-primary" />
                    )}
                  </div>

                  <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                </div>

                <h3 className="mt-7 text-sm font-medium">{model.name}</h3>

                <div className="mt-3 space-y-1">
                  {model.models.map((item) => (
                    <p key={item} className="text-xs text-muted-foreground">
                      {item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
