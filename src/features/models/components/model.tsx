"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";

import {
  Bot,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  ExternalLink,
  Info,
  Search,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import type { ModelData } from "../types";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

interface ModelProps {
  models: ModelData[];
}

type SortOption =
  | "Recommended"
  | "Newest"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Largest Context"
  | "Max Output";

type ModelTab =
  | "overview"
  | "pricing"
  | "capabilities"
  | "api"
  | "privacy";

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatNumber(value?: number) {
  if (value === undefined || value === null) {
    return "—";
  }

  return new Intl.NumberFormat("en-US").format(value);
}

function formatCompactNumber(value?: number) {
  if (value === undefined || value === null) {
    return "—";
  }

  if (value >= 1_000_000) {
    const millions = value / 1_000_000;

    return `${Number.isInteger(millions) ? millions : millions.toFixed(1)}M`;
  }

  if (value >= 1_000) {
    const thousands = value / 1_000;

    return `${Number.isInteger(thousands) ? thousands : thousands.toFixed(1)}K`;
  }

  return formatNumber(value);
}

/**
 * Vercel's API returns pricing per token.
 *
 * Example:
 * 0.00000012
 *
 * becomes:
 * $0.12 / 1M tokens
 */
function formatPricePerMillion(value?: string) {
  if (!value) {
    return "—";
  }

  const price = Number(value) * 1_000_000;

  if (!Number.isFinite(price)) {
    return "—";
  }

  if (price === 0) {
    return "$0";
  }

  if (price < 0.01) {
    return `$${price.toFixed(4)}`;
  }

  if (price < 1) {
    return `$${price.toFixed(2)}`;
  }

  if (price < 100) {
    return `$${price.toFixed(2)}`;
  }

  return `$${price.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(timestamp?: number) {
  if (!timestamp) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp * 1000));
}

function formatRelativeDate(timestamp?: number) {
  if (!timestamp) {
    return "—";
  }

  const date = new Date(timestamp * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / 86_400_000);

  if (days < 1) {
    return "Today";
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 30) {
    return `${days}d ago`;
  }

  if (days < 365) {
    return `${Math.floor(days / 30)}mo ago`;
  }

  return `${Math.floor(days / 365)}y ago`;
}

function getProvider(model: ModelData) {
  const provider =
    model.id.split("/")[0] ||
    model.owned_by ||
    "unknown";

  return provider;
}

function getProviderName(model: ModelData) {
  const provider = getProvider(model);

  const names: Record<string, string> = {
    openai: "OpenAI",
    anthropic: "Anthropic",
    google: "Google",
    amazon: "Amazon",
    mistral: "Mistral",
    meta: "Meta",
    deepseek: "DeepSeek",
    alibaba: "Alibaba",
    qwen: "Qwen",
    cohere: "Cohere",
    xai: "xAI",
    zai: "Z.ai",
    moonshot: "Moonshot",
    minimax: "MiniMax",
    groq: "Groq",
    fireworks: "Fireworks",
    deepinfra: "DeepInfra",
    together: "Together",
    perplexity: "Perplexity",
    cerebras: "Cerebras",
    "black-forest-labs": "Black Forest Labs",
    recraft: "Recraft",
    bytedance: "ByteDance",
    xiaomi: "Xiaomi",
    stepfun: "StepFun",
    inception: "Inception",
    poolside: "Poolside",
    mixedbread: "Mixedbread",
    quiverai: "QuiverAI",
    browserbase: "Browserbase",
    exa: "Exa",
  };

  return (
    names[provider.toLowerCase()] ??
    model.owned_by ??
    provider
  );
}

function getProviderInitial(model: ModelData) {
  return getProviderName(model).charAt(0).toUpperCase();
}

function getProviderClass(model: ModelData) {
  const provider = getProviderName(model).toLowerCase();

  switch (provider) {
    case "openai":
      return "bg-foreground text-background";

    case "anthropic":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";

    case "google":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400";

    case "mistral":
      return "bg-orange-500/10 text-orange-600 dark:text-orange-400";

    case "meta":
      return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";

    case "amazon":
      return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";

    case "deepseek":
      return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";

    case "xai":
      return "bg-foreground text-background";

    default:
      return "bg-muted text-muted-foreground";
  }
}

function getModelTypeLabel(type?: string) {
  if (!type) {
    return "Model";
  }

  return type
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTagLabel(tag: string) {
  return tag
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getPermissionLabel(
  value?: "all" | "some" | "none",
) {
  switch (value) {
    case "all":
      return "All";

    case "some":
      return "Some";

    case "none":
      return "None";

    default:
      return "—";
  }
}

function getPermissionClass(
  value?: "all" | "some" | "none",
) {
  switch (value) {
    case "all":
      return "text-emerald-600 dark:text-emerald-400";

    case "some":
      return "text-amber-600 dark:text-amber-400";

    case "none":
      return "text-muted-foreground";

    default:
      return "text-muted-foreground";
  }
}

/* -------------------------------------------------------------------------- */
/* Responsive hook                                                            */
/* -------------------------------------------------------------------------- */

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia(
      "(max-width: 767px)",
    );

    const update = () => {
      setIsMobile(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  return isMobile;
}

/* -------------------------------------------------------------------------- */
/* Copy button                                                                 */
/* -------------------------------------------------------------------------- */

function CopyButton({
  value,
  label = "Copy",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch {
      // Ignore clipboard failures.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <Check className="size-3" />
      ) : (
        <Copy className="size-3" />
      )}

      {copied ? "Copied" : label}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail row                                                                  */
/* -------------------------------------------------------------------------- */

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="shrink-0 text-xs text-muted-foreground">
        {label}
      </span>

      <span
        className={`min-w-0 text-right text-xs font-medium ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Model details                                                               */
/* -------------------------------------------------------------------------- */

function ModelDetails({
  model,
}: {
  model: ModelData;
}) {
  const provider = getProviderName(model);

  return (
    <Tabs
      defaultValue="overview"
      className="flex min-h-0 flex-1 flex-col"
    >
      <TabsList className="grid h-9 w-full grid-cols-5 rounded-lg">
        <TabsTrigger
          value="overview"
          className="text-[11px]"
        >
          Overview
        </TabsTrigger>

        <TabsTrigger
          value="pricing"
          className="text-[11px]"
        >
          Pricing
        </TabsTrigger>

        <TabsTrigger
          value="capabilities"
          className="text-[11px]"
        >
          Capabilities
        </TabsTrigger>

        <TabsTrigger
          value="api"
          className="text-[11px]"
        >
          API
        </TabsTrigger>

        <TabsTrigger
          value="privacy"
          className="text-[11px]"
        >
          Privacy
        </TabsTrigger>
      </TabsList>

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
        {/* Overview */}
        <TabsContent
          value="overview"
          className="mt-0 space-y-5"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-foreground/85">
              {model.description ||
                "No description available for this model."}
            </p>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Model information
            </p>

            <div className="divide-y rounded-lg border px-3">
              <DetailRow
                label="Provider"
                value={provider}
              />

              <DetailRow
                label="Model ID"
                value={
                  <span className="break-all font-mono text-[11px]">
                    {model.id}
                  </span>
                }
              />

              <DetailRow
                label="Type"
                value={getModelTypeLabel(model.type)}
              />

              <DetailRow
                label="Context window"
                value={`${formatNumber(
                  model.context_window,
                )} tokens`}
              />

              <DetailRow
                label="Max output"
                value={`${formatNumber(
                  model.max_tokens,
                )} tokens`}
              />

              <DetailRow
                label="Released"
                value={formatDate(model.released)}
              />

              <DetailRow
                label="Knowledge cutoff"
                value={model.knowledge ?? "—"}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Context
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatCompactNumber(
                  model.context_window,
                )}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Max output
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatCompactNumber(
                  model.max_tokens,
                )}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* Pricing */}
        <TabsContent
          value="pricing"
          className="mt-0 space-y-5"
        >
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Input
              </p>

              <p className="mt-1 text-lg font-semibold tracking-tight">
                {formatPricePerMillion(
                  model.pricing?.input,
                )}
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                per 1M tokens
              </p>
            </div>

            <div className="rounded-lg border bg-muted/20 p-4">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Output
              </p>

              <p className="mt-1 text-lg font-semibold tracking-tight">
                {formatPricePerMillion(
                  model.pricing?.output,
                )}
              </p>

              <p className="mt-1 text-[10px] text-muted-foreground">
                per 1M tokens
              </p>
            </div>
          </div>

          {(model.pricing?.input_cache_read ||
            model.pricing?.input_cache_write) && (
            <div>
              <p className="mb-1 text-xs font-medium text-muted-foreground">
                Cache pricing
              </p>

              <div className="divide-y rounded-lg border px-3">
                {model.pricing.input_cache_read && (
                  <DetailRow
                    label="Cache read"
                    value={`${formatPricePerMillion(
                      model.pricing.input_cache_read,
                    )} / 1M`}
                  />
                )}

                {model.pricing.input_cache_write && (
                  <DetailRow
                    label="Cache write"
                    value={`${formatPricePerMillion(
                      model.pricing.input_cache_write,
                    )} / 1M`}
                  />
                )}
              </div>
            </div>
          )}

          <div className="rounded-lg border bg-muted/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Raw input price
            </p>

            <p className="mt-1 font-mono text-xs">
              {model.pricing?.input ?? "—"}
            </p>
          </div>

          <div className="rounded-lg border bg-muted/20 p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Raw output price
            </p>

            <p className="mt-1 font-mono text-xs">
              {model.pricing?.output ?? "—"}
            </p>
          </div>
        </TabsContent>

        {/* Capabilities */}
        <TabsContent
          value="capabilities"
          className="mt-0 space-y-5"
        >
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              Tags
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {model.tags?.length ? (
                model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-muted px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {getTagLabel(tag)}
                  </span>
                ))
              ) : (
                <span className="text-xs text-muted-foreground">
                  No tags available.
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Modalities
            </p>

            <div className="divide-y rounded-lg border px-3">
              <DetailRow
                label="Input"
                value={
                  model.modalities?.input?.length
                    ? model.modalities.input.join(
                        ", ",
                      )
                    : "—"
                }
              />

              <DetailRow
                label="Output"
                value={
                  model.modalities?.output?.length
                    ? model.modalities.output.join(
                        ", ",
                      )
                    : "—"
                }
              />
            </div>
          </div>

          {model.reasoning_options?.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Reasoning options
              </p>

              <div className="rounded-lg border p-3">
                <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[10px] leading-5 text-muted-foreground">
                  {JSON.stringify(
                    model.reasoning_options,
                    null,
                    2,
                  )}
                </pre>
              </div>
            </div>
          )}
        </TabsContent>

        {/* API */}
        <TabsContent
          value="api"
          className="mt-0 space-y-5"
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-muted-foreground">
                Model ID
              </p>

              <CopyButton value={model.id} />
            </div>

            <div className="mt-2 rounded-lg border bg-muted/20 p-3">
              <code className="break-all font-mono text-xs">
                {model.id}
              </code>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Supported parameters
            </p>

            <div className="flex flex-wrap gap-1.5">
              {model.supported_parameters?.length ? (
                model.supported_parameters.map(
                  (parameter) => (
                    <span
                      key={parameter}
                      className="rounded-md border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {parameter}
                    </span>
                  ),
                )
              ) : (
                <span className="text-xs text-muted-foreground">
                  No parameter information available.
                </span>
              )}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Supported specifications
            </p>

            <div className="flex flex-wrap gap-1.5">
              {model.supported_specifications?.length ? (
                model.supported_specifications.map(
                  (specification) => (
                    <span
                      key={specification}
                      className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {specification}
                    </span>
                  ),
                )
              ) : (
                <span className="text-xs text-muted-foreground">
                  No specification information.
                </span>
              )}
            </div>
          </div>

          <div className="divide-y rounded-lg border px-3">
            <DetailRow
              label="Temperature"
              value={
                model.temperature
                  ? "Supported"
                  : "Not supported"
              }
            />

            <DetailRow
              label="Object type"
              value={model.object}
            />

            <DetailRow
              label="Created"
              value={formatDate(model.created)}
            />
          </div>
        </TabsContent>

        {/* Privacy */}
        <TabsContent
          value="privacy"
          className="mt-0 space-y-4"
        >
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  Zero Data Retention
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Whether the model supports zero data
                  retention according to the Gateway
                  catalog.
                </p>
              </div>

              <span
                className={`shrink-0 text-xs font-semibold ${getPermissionClass(
                  model.zdr,
                )}`}
              >
                {getPermissionLabel(model.zdr)}
              </span>
            </div>
          </div>

          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">
                  No Training
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Whether submitted data is covered by
                  the model provider's no-training policy.
                </p>
              </div>

              <span
                className={`shrink-0 text-xs font-semibold ${getPermissionClass(
                  model.no_training,
                )}`}
              >
                {getPermissionLabel(
                  model.no_training,
                )}
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-muted/40 p-3 text-[11px] leading-5 text-muted-foreground">
            Privacy and training attributes are provided
            by the Vercel AI Gateway model catalog and may
            vary by provider or routing configuration.
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}

/* -------------------------------------------------------------------------- */
/* Model information panel                                                    */
/* -------------------------------------------------------------------------- */

function ModelInfo({
  model,
  open,
  onOpenChange,
}: {
  model: ModelData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  const title = model.name;
  const provider = getProviderName(model);

  const content = (
    <ModelDetails model={model} />
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
      >
        <DrawerContent className="max-h-[92vh]">
          <div className="mx-auto flex w-full max-w-3xl min-h-0 flex-col px-4 pb-6">
            <DrawerHeader className="px-0 text-left">
              <div className="flex items-center gap-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${getProviderClass(
                    model,
                  )}`}
                >
                  {getProviderInitial(model)}
                </div>

                <div className="min-w-0">
                  <DrawerTitle className="truncate text-base">
                    {title}
                  </DrawerTitle>

                  <DrawerDescription className="mt-0.5 truncate font-mono text-[10px]">
                    {provider} · {model.id}
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            <div className="min-h-0 flex-1">
              {content}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="flex max-h-[85vh] w-[calc(100%-2rem)] max-w-2xl flex-col overflow-hidden p-6">
        <DialogHeader className="shrink-0">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${getProviderClass(
                model,
              )}`}
            >
              {getProviderInitial(model)}
            </div>

            <div className="min-w-0 text-left">
              <DialogTitle className="truncate">
                {title}
              </DialogTitle>

              <DialogDescription className="mt-0.5 truncate font-mono text-[10px]">
                {provider} · {model.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1">
          {content}
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Model card                                                                  */
/* -------------------------------------------------------------------------- */

function ModelCard({
  model,
  index,
  onInfo,
}: {
  model: ModelData;
  index: number;
  onInfo: (model: ModelData) => void;
}) {
  const provider = getProviderName(model);

  const tags = model.tags ?? [];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -8,
      }}
      transition={{
        duration: 0.2,
        delay: Math.min(index * 0.025, 0.18),
        ease: "easeOut",
      }}
      className="group"
    >
      <div className="relative h-full overflow-hidden rounded-xl border bg-card transition-colors hover:bg-muted/30">
        <div className="flex h-full flex-col p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${getProviderClass(
                  model,
                )}`}
              >
                {getProviderInitial(model)}
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold tracking-tight">
                  {model.name}
                </h3>

                <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
                  {model.id}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onInfo(model)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md border bg-background text-muted-foreground opacity-70 transition-all hover:bg-muted hover:text-foreground hover:opacity-100"
              aria-label={`View information about ${model.name}`}
            >
              <Info className="size-4" />
            </button>
          </div>

          {/* Description */}
          <p className="mt-4 line-clamp-2 min-h-10 text-xs leading-5 text-muted-foreground">
            {model.description ||
              "No description available for this model."}
          </p>

          {/* Tags */}
          <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground"
              >
                {getTagLabel(tag)}
              </span>
            ))}

            {tags.length > 3 && (
              <span className="rounded-md bg-muted px-2 py-1 text-[10px] text-muted-foreground">
                +{tags.length - 3}
              </span>
            )}
          </div>

          <Separator className="my-5" />

          {/* Main stats */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Context
              </p>

              <p className="mt-1 text-sm font-medium">
                {formatCompactNumber(
                  model.context_window,
                )}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Max output
              </p>

              <p className="mt-1 text-sm font-medium">
                {formatCompactNumber(
                  model.max_tokens,
                )}
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Input
              </p>

              <p className="mt-1 text-sm font-medium">
                {formatPricePerMillion(
                  model.pricing?.input,
                )}

                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  / 1M
                </span>
              </p>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Output
              </p>

              <p className="mt-1 text-sm font-medium">
                {formatPricePerMillion(
                  model.pricing?.output,
                )}

                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  / 1M
                </span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-1.5 text-[10px] text-muted-foreground">
              <Bot className="size-3.5 shrink-0" />

              <span className="truncate">
                {provider}
              </span>

              <span className="text-border">
                ·
              </span>

              <span>
                {getModelTypeLabel(model.type)}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onInfo(model)}
              className="shrink-0 text-xs font-medium text-foreground transition-opacity hover:underline"
            >
              View details
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

export const Model = ({
  models,
}: ModelProps) => {
  const [search, setSearch] =
    React.useState("");

  const [provider, setProvider] =
    React.useState("All");

  const [tag, setTag] =
    React.useState("All");

  const [sort, setSort] =
    React.useState<SortOption>(
      "Recommended",
    );

  const [selectedModel, setSelectedModel] =
    React.useState<ModelData | null>(null);

  const [detailsOpen, setDetailsOpen] =
    React.useState(false);

  const normalizedSearch =
    search.trim().toLowerCase();

  /* ---------------------------------------------------------------------- */
  /* Dynamic filter options                                                 */
  /* ---------------------------------------------------------------------- */

  const providerOptions = React.useMemo(() => {
    const providers = new Set<string>();

    for (const model of models) {
      providers.add(getProviderName(model));
    }

    return [
      "All",
      ...Array.from(providers).sort(
        (a, b) => a.localeCompare(b),
      ),
    ];
  }, [models]);

  const tagOptions = React.useMemo(() => {
    const tags = new Set<string>();

    for (const model of models) {
      for (const tag of model.tags ?? []) {
        tags.add(tag);
      }
    }

    return [
      "All",
      ...Array.from(tags).sort(
        (a, b) => a.localeCompare(b),
      ),
    ];
  }, [models]);

  /* ---------------------------------------------------------------------- */
  /* Filter + sort                                                           */
  /* ---------------------------------------------------------------------- */

  const filteredModels = React.useMemo(() => {
    const filtered = models.filter(
      (model) => {
        const providerName =
          getProviderName(model);

        const matchesSearch =
          !normalizedSearch ||
          model.name
            .toLowerCase()
            .includes(normalizedSearch) ||
          model.id
            .toLowerCase()
            .includes(normalizedSearch) ||
          providerName
            .toLowerCase()
            .includes(normalizedSearch) ||
          model.description
            ?.toLowerCase()
            .includes(normalizedSearch) ||
          model.tags?.some((item) =>
            item
              .toLowerCase()
              .includes(normalizedSearch),
          );

        const matchesProvider =
          provider === "All" ||
          providerName === provider;

        const matchesTag =
          tag === "All" ||
          model.tags?.includes(tag);

        return (
          matchesSearch &&
          matchesProvider &&
          matchesTag
        );
      },
    );

    return [...filtered].sort(
      (a, b) => {
        switch (sort) {
          case "Newest":
            return (
              (b.released ?? 0) -
              (a.released ?? 0)
            );

          case "Price: Low to High":
            return (
              Number(a.pricing?.input ?? 0) -
              Number(b.pricing?.input ?? 0)
            );

          case "Price: High to Low":
            return (
              Number(b.pricing?.input ?? 0) -
              Number(a.pricing?.input ?? 0)
            );

          case "Largest Context":
            return (
              (b.context_window ?? 0) -
              (a.context_window ?? 0)
            );

          case "Max Output":
            return (
              (b.max_tokens ?? 0) -
              (a.max_tokens ?? 0)
            );

          case "Recommended":
          default:
            return (
              Number(
                b.tags?.includes("reasoning") ??
                  false,
              ) -
              Number(
                a.tags?.includes("reasoning") ??
                  false,
              )
            );
        }
      },
    );
  }, [
    models,
    normalizedSearch,
    provider,
    tag,
    sort,
  ]);

  /* ---------------------------------------------------------------------- */
  /* Filters                                                                 */
  /* ---------------------------------------------------------------------- */

  const hasFilters =
    Boolean(normalizedSearch) ||
    provider !== "All" ||
    tag !== "All" ||
    sort !== "Recommended";

  const clearFilters = () => {
    setSearch("");
    setProvider("All");
    setTag("All");
    setSort("Recommended");
  };

  const openDetails = (
    model: ModelData,
  ) => {
    setSelectedModel(model);
    setDetailsOpen(true);
  };

  const handleDetailsChange = (
    open: boolean,
  ) => {
    setDetailsOpen(open);

    if (!open) {
      window.setTimeout(() => {
        setSelectedModel(null);
      }, 200);
    }
  };

  return (
    <main className="px-4 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Header */}
        <motion.div
          initial={{
            opacity: 0,
            y: 6,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.22,
            ease: "easeOut",
          }}
          className="flex items-center justify-between gap-4"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold tracking-tight">
                Models
              </h1>

              <span className="rounded-full border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {models.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Browse and compare AI models
              available in Vangrex
            </p>
          </div>
        </motion.div>

        <Separator />

        {/* Search + filters */}
        <motion.div
          initial={{
            opacity: 0,
            y: 5,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.2,
            delay: 0.07,
            ease: "easeOut",
          }}
          className="flex flex-col gap-3"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search models..."
                className="h-10 pl-9 pr-9"
              />

              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.12,
                    }}
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="absolute right-2 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Provider */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                >
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {provider === "All"
                      ? "Provider"
                      : provider}

                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {providerOptions.map(
                    (item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={() =>
                          setProvider(item)
                        }
                      >
                        <span className="flex-1">
                          {item}
                        </span>

                        {provider === item && (
                          <Check className="ml-4 size-3.5" />
                        )}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Capability / tag */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                >
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {tag === "All"
                      ? "Capability"
                      : getTagLabel(tag)}

                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="max-h-80 overflow-y-auto"
                >
                  {tagOptions.map(
                    (item) => (
                      <DropdownMenuItem
                        key={item}
                        onClick={() =>
                          setTag(item)
                        }
                      >
                        <span className="flex-1">
                          {item === "All"
                            ? "All"
                            : getTagLabel(item)}
                        </span>

                        {tag === item && (
                          <Check className="ml-4 size-3.5" />
                        )}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                >
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {sort}

                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {[
                    "Recommended",
                    "Newest",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Largest Context",
                    "Max Output",
                  ].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() =>
                        setSort(
                          item as SortOption,
                        )
                      }
                    >
                      <span className="flex-1">
                        {item}
                      </span>

                      {sort === item && (
                        <Check className="ml-4 size-3.5" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results count */}
          <AnimatePresence mode="wait">
            {(normalizedSearch ||
              provider !== "All" ||
              tag !== "All") && (
              <motion.div
                key={`${filteredModels.length}-${provider}-${tag}`}
                initial={{
                  opacity: 0,
                  y: 3,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -3,
                }}
                transition={{
                  duration: 0.14,
                }}
                className="flex items-center justify-between"
              >
                <p className="text-xs text-muted-foreground">
                  {filteredModels.length}{" "}
                  {filteredModels.length === 1
                    ? "model"
                    : "models"}{" "}
                  found
                </p>

                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Clear filters
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Models */}
        <div className="pb-8">
          <AnimatePresence mode="popLayout">
            {filteredModels.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filteredModels.map(
                    (model, index) => (
                      <ModelCard
                        key={model.id}
                        model={model}
                        index={index}
                        onInfo={openDetails}
                      />
                    ),
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{
                  opacity: 0,
                  y: 6,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.18,
                    delay: 0.05,
                  }}
                  className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted"
                >
                  <Search className="size-4 text-muted-foreground" />
                </motion.div>

                <h3 className="text-sm font-medium">
                  No models found
                </h3>

                <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                  No models match your current
                  search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-4 text-xs font-medium text-primary hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Model details */}
      {selectedModel && (
        <ModelInfo
          model={selectedModel}
          open={detailsOpen}
          onOpenChange={
            handleDetailsChange
          }
        />
      )}
    </main>
  );
};