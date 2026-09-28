export function LogoCloud() {
  const items = ["OpenAI", "Anthropic", "Google", "Mistral", "Meta", "AI SDK"];

  return (
    <section className="border-y border-border/60 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <p className="mb-7 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Built for the modern AI stack
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-sm font-medium text-muted-foreground/70 sm:gap-x-14">
          {items.map((item) => (
            <span
              key={item}
              className="transition-colors hover:text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
