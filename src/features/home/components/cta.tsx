"use client";

import { motion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55 }}
        className="relative mx-auto max-w-7xl overflow-hidden border border-border bg-foreground px-6 py-16 text-background sm:px-12 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-40 size-[30rem] rounded-full border border-background/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-24 size-[22rem] rounded-full border border-background/10"
        />
        <div className="relative grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-background/60">
              <Sparkles className="size-4 text-primary" />
              Your workspace is waiting
            </p>
            <h2 className="max-w-3xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl">
              Build your AI workspace.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-background/65 sm:text-base">
              Create agents. Choose models. Build workflows. Put your AI stack
              exactly where you want it.
            </p>
          </div>

          <a
            href="/auth"
            className="group inline-flex h-12 items-center justify-between gap-8 bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
          >
            Get started with Vangrex
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
