"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { ArrowUpRight, Loader2, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { authClient } from "@/lib/auth-client";

export const AuthView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<
    "google" | "github" | null
  >(null);

  const handleSignIn = async (provider: "google" | "github") => {
    if (isLoading) return;

    setIsLoading(true);
    setLoadingProvider(provider);

    try {
      await authClient.signIn.social({ provider });
    } catch {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, black, transparent 85%)",
        }}
      />

      <div className="relative grid min-h-svh lg:grid-cols-[1.05fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          aria-label="Vangrex workspace"
          className="relative hidden min-h-svh overflow-hidden border-r border-border bg-foreground lg:block"
        >
          <img
            src="/auth/illustration.png"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/15 to-foreground/5" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/10" />

          <a
            href="/"
            className="absolute left-10 top-9 z-10 inline-flex items-center gap-3 text-background"
            aria-label="Vangrex home"
          >
            <img src="/logo.png" alt="" className="size-9 object-contain" />
            <span className="text-sm font-semibold tracking-[0.14em]">
              VANGREX
            </span>
          </a>

          <div className="absolute bottom-10 left-10 right-10 z-10 text-background">
            <p className="mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-background/65">
              <span className="h-px w-8 bg-primary" />
              Your AI workspace
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.055em] xl:text-6xl">
              Make room for
              <br />
              <span className="font-serif font-normal italic text-primary">
                better thinking.
              </span>
            </h1>
            <div className="mt-8 flex items-center gap-3 border-t border-background/20 pt-5 text-xs text-background/65">
              <span className="font-mono text-primary">01—04</span>
              <span>Agents, models, and workflows in one place.</span>
            </div>
          </div>

          <div className="absolute right-8 top-1/2 z-10 hidden -translate-y-1/2 xl:block">
            <div className="flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-background/50 [writing-mode:vertical-rl]">
              <span className="h-10 w-px bg-background/30" />
              Vangrex workspace
            </div>
          </div>
        </motion.section>

        <section className="relative flex min-h-svh items-center justify-center px-5 py-24 sm:px-10 lg:px-12">
          <motion.a
            href="/"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-5 top-6 inline-flex items-center gap-2.5 sm:left-10 lg:hidden"
            aria-label="Vangrex home"
          >
            <img src="/logo.png" alt="" className="size-8 object-contain" />
            <span className="text-sm font-semibold tracking-[0.14em]">
              VANGREX
            </span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-[390px]"
          >
            <div className="mb-8">
              <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
                <span className="h-px w-7 bg-primary" />
                Secure access
              </p>
              <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-4xl">
                Welcome to Vangrex
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Sign in to continue to your workspace.
              </p>
            </div>

            <Card className="overflow-hidden rounded-none border-border bg-card shadow-[0_24px_70px_-48px_rgba(0,0,0,0.35)]">
              <div className="h-0.5 w-full bg-primary" />

              <CardHeader className="sr-only">
                <CardTitle>Sign in to Vangrex</CardTitle>
                <CardDescription>
                  Choose a provider to continue to your workspace.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 p-5 sm:p-7">
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSignIn("google")}
                    className="group h-12 w-full justify-between rounded-none border-border bg-background px-4 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-3">
                      {loadingProvider === "google" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <GoogleIcon />
                      )}
                      {loadingProvider === "google"
                        ? "Signing in..."
                        : "Continue with Google"}
                    </span>
                    {loadingProvider !== "google" && (
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSignIn("github")}
                    className="group h-12 w-full justify-between rounded-none border-border bg-background px-4 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-3">
                      {loadingProvider === "github" ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <FaGithub className="size-4" />
                      )}
                      {loadingProvider === "github"
                        ? "Signing in..."
                        : "Continue with GitHub"}
                    </span>
                    {loadingProvider !== "github" && (
                      <ArrowUpRight className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground/70">
                    Encrypted sign-in
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <p className="text-xs leading-5 text-muted-foreground">
                  By continuing, you agree to Vangrex&apos;s{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                  >
                    Terms
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    disabled={isLoading}
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50"
                  >
                    Privacy Policy
                  </button>
                  .
                </p>
              </CardContent>
            </Card>

            <p className="mt-6 text-center text-xs text-muted-foreground">
              New to Vangrex?{" "}
              <button
                type="button"
                disabled={isLoading}
                className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary disabled:pointer-events-none disabled:opacity-50"
              >
                Create an account
              </button>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 border-t border-border pt-5 text-[10px] text-muted-foreground">
              <ShieldCheck className="size-3.5 text-primary" />
              Secure authentication
              <span className="mx-1 text-border">/</span>
              <span className="font-mono uppercase tracking-[0.12em]">
                Vangrex
              </span>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
};

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4">
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.79-.07-1.55-.2-2.28H12v4.32h5.23a4.47 4.47 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.92-4.18 2.92-7.43Z"
    />
    <path
      fill="#34A853"
      d="M12 21.99c2.63 0 4.84-.87 6.45-2.33l-3.14-2.45c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.74 9.74 0 0 0 12 21.99Z"
    />
    <path
      fill="#FBBC05"
      d="M6.54 14.11A5.85 5.85 0 0 1 6.23 12c0-.73.13-1.44.31-2.11V7.36H3.3A9.74 9.74 0 0 0 2.26 12c0 1.57.38 3.05 1.04 4.36l3.24-2.25Z"
    />
    <path
      fill="#EA4335"
      d="M12 5.86c1.43 0 2.71.49 3.72 1.46l2.78-2.78C16.83 3.02 14.63 2 12 2a9.74 9.74 0 0 0-8.7 5.36l3.24 2.53C7.31 7.58 9.46 5.86 12 5.86Z"
    />
  </svg>
);
