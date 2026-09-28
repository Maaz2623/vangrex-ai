"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";

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
      await authClient.signIn.social({
        provider,
      });
    } catch {
      setIsLoading(false);
      setLoadingProvider(null);
    }
  };

  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 size-[28rem] rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute -bottom-40 -right-40 size-[32rem] rounded-full bg-primary/[0.05] blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative grid min-h-svh lg:grid-cols-2">
        {/* Illustration */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative hidden overflow-hidden lg:block"
        >
          <img
            src="/auth/illustration.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/20" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
        </motion.section>

        {/* Authentication */}
        <section className="relative flex min-h-svh items-center justify-center px-6 py-12">
          {/* Mobile brand */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-6 top-6 lg:hidden"
          >
            <a
              href="#"
              className="flex items-center gap-2.5 font-semibold tracking-tight"
            >
              <img
                src="/logo.png"
                alt="Vangrex"
                className="size-8 rounded-lg object-contain"
              />
              <span>Vangrex</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 w-full max-w-sm"
          >
            <Card className="relative overflow-hidden rounded-2xl border-border/60 bg-card shadow-xl shadow-black/[0.04]">
              {/* Small top accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <CardHeader className="space-y-5 pb-6 pt-8">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-xl bg-primary/10 blur-xl" />

                    <img
                      src="/logo.png"
                      alt="Vangrex"
                      className="relative size-12 rounded-xl object-contain"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <CardTitle className="text-center text-2xl font-semibold tracking-tight">
                    Welcome to Vangrex
                  </CardTitle>

                  <CardDescription className="text-center leading-6">
                    Sign in to continue to your workspace.
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pb-8">
                <div className="space-y-3">
                  {/* Google */}
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSignIn("google")}
                    className="h-11 w-full justify-center gap-2.5 rounded-xl bg-background transition-colors hover:bg-muted/60"
                  >
                    {loadingProvider === "google" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <GoogleIcon />
                    )}

                    <span>
                      {loadingProvider === "google"
                        ? "Signing in..."
                        : "Continue with Google"}
                    </span>
                  </Button>

                  {/* GitHub */}
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isLoading}
                    onClick={() => handleSignIn("github")}
                    className="h-11 w-full justify-center gap-2.5 rounded-xl bg-background transition-colors hover:bg-muted/60"
                  >
                    {loadingProvider === "github" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <FaGithub className="size-4" />
                    )}

                    <span>
                      {loadingProvider === "github"
                        ? "Signing in..."
                        : "Continue with GitHub"}
                    </span>
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-border" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/60">
                    Secure access
                  </span>

                  <div className="h-px flex-1 bg-border" />
                </div>

                <p className="text-center text-xs leading-5 text-muted-foreground">
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

            <div className="mt-7 flex items-center justify-center gap-2 text-[10px] text-muted-foreground/50">
              <span className="size-1.5 rounded-full bg-primary/60" />
              Secure authentication
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
