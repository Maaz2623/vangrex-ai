"use client";

import { motion } from "motion/react";
import { ArrowRight, Brain, GitBranch, Sparkles } from "lucide-react";

const models = [
  { name: "OpenAI", models: ["GPT", "Reasoning"], mark: "O" },
  { name: "Anthropic", models: ["Claude", "Sonnet"], mark: "A" },
  { name: "Google", models: ["Gemini", "Flash"], mark: "G" },
  { name: "More", models: ["Your stack", "Your choice"], mark: "+" },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            <span className="h-px w-7 bg-primary" />
            Freedom of choice
          </p>
          <h2 className="text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
            The model is a detail.
            <br />
            <span className="font-serif font-normal italic">
              Your workflow is not.
            </span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
            Vangrex keeps your agents independent from any single model
            provider. Use the model that makes sense for the task.
          </p>
          <div className="mt-8 flex items-start gap-3 border-l border-primary pl-4 text-sm leading-6 text-muted-foreground">
            <GitBranch className="mt-1 size-4 shrink-0 text-primary" />
            Switch models without rebuilding your agent.
          </div>
        </motion.div>

        <div className="grid grid-cols-2 border-l border-t border-border">
          {models.map((model, index) => (
            <motion.article
              key={model.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group relative min-h-44 border-b border-r border-border p-5 transition-colors hover:bg-muted/40 sm:min-h-52 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] text-muted-foreground">
                  PROVIDER / 0{index + 1}
                </span>
                <ArrowRight className="size-4 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:text-primary group-hover:opacity-100" />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="flex size-9 items-center justify-center border border-border font-serif text-lg">
                  {model.mark}
                </span>
                <h3 className="text-base font-medium">{model.name}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {model.models.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-1.5 border border-border px-2 py-1 text-[10px] text-muted-foreground"
                  >
                    {index === 3 ? (
                      <Sparkles className="size-3 text-primary" />
                    ) : (
                      <Brain className="size-3 text-primary" />
                    )}
                    {item}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
