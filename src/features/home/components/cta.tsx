"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="px-4 pb-24 pt-12 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-muted/30 px-6 py-20 text-center sm:px-12"
      >
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

        <div className="relative">
          <div className="mx-auto flex size-11 items-center justify-center rounded-xl border border-border bg-background shadow-sm">
            <Sparkles className="size-5 text-primary" />
          </div>

          <h2 className="mx-auto mt-7 max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Build your AI workspace.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
            Create agents. Choose models. Build workflows. Put your AI stack
            exactly where you want it.
          </p>

          <a
            href="#"
            className="group mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:gap-3 hover:shadow-lg"
          >
            Get started with Vangrex
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
