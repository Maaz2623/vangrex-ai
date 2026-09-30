export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 py-10 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <a
              href="#"
              className="inline-flex items-center gap-3"
              aria-label="Vangrex home"
            >
              <span className="flex size-8 items-center justify-center bg-primary font-serif text-lg text-primary-foreground">
                V
              </span>
              <span className="text-sm font-semibold tracking-[0.14em]">
                VANGREX
              </span>
            </a>
            <p className="mt-3 text-xs text-muted-foreground">
              Your AI workspace, your way.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-7 gap-y-3 text-xs text-muted-foreground"
          >
            <a href="#" className="transition-colors hover:text-primary">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-border py-5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Vangrex. All rights reserved.</p>
          <p>One workspace · Many ways forward</p>
        </div>
      </div>
    </footer>
  );
}
