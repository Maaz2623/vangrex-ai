export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-xs text-primary-foreground">
              V
            </span>
            Vangrex
          </div>

          <p className="mt-2 text-xs text-muted-foreground">
            Your AI workspace, your way.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="hover:text-foreground">
            Terms
          </a>
          <a href="#" className="hover:text-foreground">
            GitHub
          </a>
          <a href="#" className="hover:text-foreground">
            Contact
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-border px-4 py-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vangrex. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
