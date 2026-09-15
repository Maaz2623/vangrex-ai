"use client";
import { FaGithub } from "react-icons/fa";
import { handleSignUp } from "../auth-functions";

export const SignUpView = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-6 flex size-11 items-center justify-center rounded-xl bg-foreground text-background">
            <span className="text-lg font-bold">V</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create your Vangrex account
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Start building with AI today
          </p>
        </div>

        {/* Auth Card */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              onClick={() => handleSignUp("google")}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border bg-background text-sm font-medium transition-colors hover:bg-muted"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.69 2.93-4.18 2.93-7.39Z"
                />
                <path
                  fill="#34A853"
                  d="M12 21.99c2.63 0 4.84-.87 6.45-2.37l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.51A9.74 9.74 0 0 0 12 21.99Z"
                />
                <path
                  fill="#FBBC05"
                  d="M6.54 14.08a5.85 5.85 0 0 1 0-3.74V7.83H3.3a9.76 9.76 0 0 0 0 8.76l3.24-2.51Z"
                />
                <path
                  fill="#EA4335"
                  d="M12 6.31c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.39 14.63 2.52 12 2.52a9.74 9.74 0 0 0-8.7 5.31l3.24 2.51C7.31 8.03 9.46 6.31 12 6.31Z"
                />
              </svg>
              Continue with Google
            </button>

            {/* GitHub */}
            <button
              type="button"
              onClick={() => handleSignUp("github")}
              className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border bg-background text-sm font-medium transition-colors hover:bg-muted"
            >
              <FaGithub className="size-5" />
              Continue with GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
          By creating an account, you agree to Vangrex's{" "}
          <span className="cursor-pointer underline underline-offset-4">
            Terms
          </span>{" "}
          and{" "}
          <span className="cursor-pointer underline underline-offset-4">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
};
