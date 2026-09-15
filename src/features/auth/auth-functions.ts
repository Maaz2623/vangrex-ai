import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const handleSignIn = (provider: "google" | "github") => {
  authClient.signIn.social(
    {
      provider: provider,
    },
    {
      onSuccess: () => {
        toast.success("Log in successfull.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    },
  );
};

export const handleSignUp = (provider: "google" | "github") => {
  authClient.signIn.social(
    {
      provider,
    },
    {
      onSuccess: () => {
        toast.success("Account created successfully.");
      },
      onError: () => {
        toast.error("Something went wrong.");
      },
    },
  );
};
