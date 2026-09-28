"use client";

import { motion } from "motion/react";
import { ArrowUpRight, Menu } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex h-14 items-center justify-between rounded-full border border-border/60 bg-background/75 px-4 shadow-sm backdrop-blur-xl"
        >
          <a
            href="#"
            className="flex items-center font-semibold tracking-tight"
          >
            <Image
              src="/logo.png"
              alt="Vangrex"
              className="object-contain"
              height={40}
              width={40}
            />
            <span className="tracking-wide">VANGREX</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <a
              href="#features"
              className="transition-colors hover:text-foreground"
            >
              Features
            </a>
            <a
              href="#agents"
              className="transition-colors hover:text-foreground"
            >
              Agents
            </a>
            <a
              href="#models"
              className="transition-colors hover:text-foreground"
            >
              Models
            </a>
            <a
              href="#workflow"
              className="transition-colors hover:text-foreground"
            >
              How it works
            </a>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#"
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Sign in
            </a>

            <a
              href="#"
              className="group flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
            >
              Get started
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 hover:bg-muted md:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="size-5" />
          </button>
        </motion.nav>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 rounded-2xl border border-border bg-background p-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-1">
              {["Features", "Agents", "Models", "How it works"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replaceAll(" ", "-")}`}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item}
                </a>
              ))}

              <div className="my-2 h-px bg-border" />

              <a
                href="#"
                className="rounded-xl px-3 py-2.5 text-sm hover:bg-muted"
              >
                Sign in
              </a>

              <a
                href="#"
                className="rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
}
