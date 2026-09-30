"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { label: "Features", href: "#features" },
  { label: "Agents", href: "#agents" },
  { label: "Models", href: "#models" },
  { label: "How it works", href: "#workflow" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between border border-border/70 bg-background/90 px-4 py-3 shadow-[0_8px_32px_-20px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:px-6"
      >
        <a
          href="#"
          className="flex items-center gap-2.5"
          aria-label="Vangrex home"
        >
          <Image
            src="/logo.png"
            alt=""
            className="size-8 object-contain"
            height={40}
            width={40}
            priority
          />
          <span className="text-sm font-semibold tracking-[0.14em]">
            VANGREX
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative py-2 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
              <span
                className={`absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 ${
                  index === 0 ? "group-focus-visible:scale-x-100" : ""
                }`}
              />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href="/auth"
            className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </a>
          <a
            href="/auth"
            className="group inline-flex items-center gap-3 bg-foreground px-4 py-2.5 text-[13px] font-medium text-background transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Get started
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex size-10 items-center justify-center border border-border transition-colors hover:bg-muted md:hidden"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
        >
          {open ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </motion.nav>

      {open && (
        <motion.div
          id="mobile-navigation"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mx-auto mt-2 max-w-7xl border border-border bg-background p-3 shadow-xl md:hidden"
        >
          <div className="grid">
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 border-b border-border/70 px-3 py-3.5 text-sm transition-colors hover:bg-muted"
              >
                <span className="w-5 font-mono text-[10px] text-primary">
                  0{index + 1}
                </span>
                {link.label}
              </a>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-3">
              <a
                href="/auth"
                onClick={() => setOpen(false)}
                className="border border-border px-3 py-3 text-center text-sm"
              >
                Sign in
              </a>
              <a
                href="/auth"
                onClick={() => setOpen(false)}
                className="bg-foreground px-3 py-3 text-center text-sm font-medium text-background"
              >
                Get started
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
