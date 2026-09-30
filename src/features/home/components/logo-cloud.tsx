const items = ["OpenAI", "Anthropic", "Google", "Mistral", "Meta", "AI SDK"];

export function LogoCloud() {
  return (
    <section className="border-y border-border">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:px-8 md:grid-cols-[220px_1fr] md:items-center">
        <p className="max-w-[180px] font-mono text-[9px] uppercase leading-5 tracking-[0.17em] text-muted-foreground">
          Built for the modern AI stack
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item, index) => (
            <span
              key={item}
              className="flex items-center gap-2 text-sm font-medium tracking-tight text-foreground/65 transition-colors hover:text-primary"
            >
              <span className="font-mono text-[9px] text-primary/70">
                0{index + 1}
              </span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
