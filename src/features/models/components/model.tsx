"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";

import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Info,
  Search,
  X,
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

const MODELS_PER_PAGE = 20;

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
 * Vercel's model catalog pricing is represented as price per token.
 *
 * Example:
 * 0.00000012
 *
 * becomes:
 * $0.12 / 1M tokens
 */
function formatPricePerMillion(value?: string) {
  if (value === undefined || value === null || value === "") {
    return "—";
  }

  const price = Number(value) * 1_000_000;

  if (!Number.isFinite(price)) {
    return value;
  }

  if (price === 0) {
    return "$0";
  }

  if (price < 0.01) {
    return `$${price.toFixed(4)}`;
  }

  return `$${price.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

function formatDate(timestamp?: number) {
  if (timestamp === undefined || timestamp === null) {
    return null;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(timestamp * 1000));
}

function getProvider(model: ModelData) {
  return model.id.split("/")[0] || model.owned_by;
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

  return names[provider.toLowerCase()] ?? model.owned_by;
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

function getLabel(value: string) {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

/* -------------------------------------------------------------------------- */
/* Responsive hook                                                            */
/* -------------------------------------------------------------------------- */

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");

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
      // Clipboard can fail in restricted browser contexts.
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border bg-background px-2 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}

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
      <span className="shrink-0 text-xs text-muted-foreground">{label}</span>

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

function ModelDetails({ model }: { model: ModelData }) {
  const released = formatDate(model.released);
  const created = formatDate(model.created);

  const hasPricing =
    model.pricing?.input !== undefined || model.pricing?.output !== undefined;

  const hasModalities =
    model.modalities?.input?.length > 0 || model.modalities?.output?.length > 0;

  const hasCapabilities = model.tags?.length > 0;
  const hasParameters = model.supported_parameters?.length > 0;

  return (
    <Tabs defaultValue="overview" className="flex min-h-0 flex-1 flex-col">
      <TabsList className="grid h-9 w-full shrink-0 grid-cols-4 rounded-lg">
        <TabsTrigger value="overview" className="text-[11px]">
          Overview
        </TabsTrigger>

        {hasPricing && (
          <TabsTrigger value="pricing" className="text-[11px]">
            Pricing
          </TabsTrigger>
        )}

        {(hasCapabilities || hasModalities) && (
          <TabsTrigger value="capabilities" className="text-[11px]">
            Capabilities
          </TabsTrigger>
        )}

        {hasParameters && (
          <TabsTrigger value="api" className="text-[11px]">
            API
          </TabsTrigger>
        )}
      </TabsList>

      {/* Important: this is the actual scrolling region */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pr-1">
        {/* ------------------------------------------------------------------ */}
        {/* Overview                                                           */}
        {/* ------------------------------------------------------------------ */}

        <TabsContent value="overview" className="mt-0 space-y-5 pb-2 pt-5">
          {model.description && (
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                Description
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground/85">
                {model.description}
              </p>
            </div>
          )}

          <div>
            <p className="mb-1 text-xs font-medium text-muted-foreground">
              Model information
            </p>

            <div className="divide-y rounded-lg border px-3">
              <DetailRow label="Name" value={model.name} />

              <DetailRow label="Provider" value={model.owned_by} />

              <DetailRow label="Type" value={getLabel(model.type)} />

              <DetailRow
                label="Model ID"
                value={
                  <span className="break-all font-mono text-[11px]">
                    {model.id}
                  </span>
                }
              />

              <DetailRow
                label="Context window"
                value={`${formatNumber(model.context_window)} tokens`}
              />

              <DetailRow
                label="Max output"
                value={`${formatNumber(model.max_tokens)} tokens`}
              />

              {model.knowledge && (
                <DetailRow label="Knowledge cutoff" value={model.knowledge} />
              )}

              {released && <DetailRow label="Released" value={released} />}

              {created && <DetailRow label="Created" value={created} />}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Context
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatCompactNumber(model.context_window)}
              </p>
            </div>

            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Max output
              </p>

              <p className="mt-1.5 text-sm font-semibold">
                {formatCompactNumber(model.max_tokens)}
              </p>
            </div>
          </div>
        </TabsContent>

        {/* ------------------------------------------------------------------ */}
        {/* Pricing                                                            */}
        {/* ------------------------------------------------------------------ */}

        {hasPricing && (
          <TabsContent value="pricing" className="mt-0 space-y-5 pb-2 pt-5">
            <div className="grid grid-cols-2 gap-3">
              {model.pricing.input !== undefined && (
                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Input
                  </p>

                  <p className="mt-1 text-lg font-semibold tracking-tight">
                    {formatPricePerMillion(model.pricing.input)}
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    per 1M tokens
                  </p>
                </div>
              )}

              {model.pricing.output !== undefined && (
                <div className="rounded-lg border bg-muted/20 p-4">
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                    Output
                  </p>

                  <p className="mt-1 text-lg font-semibold tracking-tight">
                    {formatPricePerMillion(model.pricing.output)}
                  </p>

                  <p className="mt-1 text-[10px] text-muted-foreground">
                    per 1M tokens
                  </p>
                </div>
              )}
            </div>

            <div className="rounded-lg border bg-muted/20 p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                Catalog pricing
              </p>

              <div className="mt-2 divide-y">
                {model.pricing.input !== undefined && (
                  <DetailRow
                    label="Input / token"
                    value={model.pricing.input}
                    mono
                  />
                )}

                {model.pricing.output !== undefined && (
                  <DetailRow
                    label="Output / token"
                    value={model.pricing.output}
                    mono
                  />
                )}
              </div>
            </div>
          </TabsContent>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Capabilities                                                       */}
        {/* ------------------------------------------------------------------ */}

        {(hasCapabilities || hasModalities) && (
          <TabsContent
            value="capabilities"
            className="mt-0 space-y-5 pb-2 pt-5"
          >
            {hasCapabilities && (
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Tags
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-muted px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {getLabel(tag)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {hasModalities && (
              <div>
                <p className="mb-1 text-xs font-medium text-muted-foreground">
                  Modalities
                </p>

                <div className="divide-y rounded-lg border px-3">
                  {model.modalities.input.length > 0 && (
                    <DetailRow
                      label="Input"
                      value={model.modalities.input.join(", ")}
                    />
                  )}

                  {model.modalities.output.length > 0 && (
                    <DetailRow
                      label="Output"
                      value={model.modalities.output.join(", ")}
                    />
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* API                                                                 */}
        {/* ------------------------------------------------------------------ */}

        {hasParameters && (
          <TabsContent value="api" className="mt-0 space-y-5 pb-2 pt-5">
            <div>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium text-muted-foreground">
                  Model ID
                </p>

                <CopyButton value={model.id} />
              </div>

              <div className="mt-2 rounded-lg border bg-muted/20 p-3">
                <code className="break-all font-mono text-xs">{model.id}</code>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Supported parameters
              </p>

              <div className="flex flex-wrap gap-1.5">
                {model.supported_parameters.map((parameter) => (
                  <span
                    key={parameter}
                    className="rounded-md border bg-background px-2 py-1 font-mono text-[10px] text-muted-foreground"
                  >
                    {parameter}
                  </span>
                ))}
              </div>
            </div>
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
}

/* -------------------------------------------------------------------------- */
/* Model information dialog / drawer                                          */
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

  const provider = getProviderName(model);

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90dvh] overflow-hidden">
          <div className="flex min-h-0 max-h-[90dvh] w-full flex-col">
            <DrawerHeader className="shrink-0 px-4 pb-4 text-left">
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
                    {model.name}
                  </DrawerTitle>

                  <DrawerDescription className="mt-0.5 truncate font-mono text-[10px]">
                    {provider} · {model.id}
                  </DrawerDescription>
                </div>
              </div>
            </DrawerHeader>

            <div className="min-h-0 flex-1 overflow-hidden px-4 pb-5">
              <ModelDetails model={model} />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          flex
          h-[min(720px,calc(100dvh-2rem))]
          w-[calc(100%-2rem)]
          max-w-2xl
          flex-col
          gap-0
          overflow-hidden
          p-0
        "
      >
        <DialogHeader className="shrink-0 border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${getProviderClass(
                model,
              )}`}
            >
              {getProviderInitial(model)}
            </div>

            <div className="min-w-0 text-left">
              <DialogTitle className="truncate">{model.name}</DialogTitle>

              <DialogDescription className="mt-0.5 truncate font-mono text-[10px]">
                {provider} · {model.id}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* The content area is bounded and ModelDetails owns the scroll. */}
        <div className="min-h-0 flex-1 overflow-hidden px-6 py-4">
          <ModelDetails model={model} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Model table                                                                 */
/* -------------------------------------------------------------------------- */

function ModelTable({
  models,
  onInfo,
}: {
  models: ModelData[];
  onInfo: (model: ModelData) => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Model
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Provider
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Context
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Max Output
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Input
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Output
              </th>

              <th className="px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Capabilities
              </th>

              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            <AnimatePresence initial={false}>
              {models.map((model, index) => {
                const provider = getProviderName(model);
                const tags = model.tags ?? [];

                return (
                  <motion.tr
                    key={model.id}
                    layout
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
                      y: -6,
                    }}
                    transition={{
                      duration: 0.16,
                      delay: Math.min(index * 0.015, 0.12),
                    }}
                    className="group border-b last:border-0 hover:bg-muted/30"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${getProviderClass(
                            model,
                          )}`}
                        >
                          {getProviderInitial(model)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {model.name}
                          </p>

                          <p className="mt-0.5 max-w-[260px] truncate font-mono text-[10px] text-muted-foreground">
                            {model.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="text-xs font-medium">{provider}</span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="whitespace-nowrap text-xs font-medium">
                        {formatCompactNumber(model.context_window)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="whitespace-nowrap text-xs font-medium">
                        {formatCompactNumber(model.max_tokens)}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="whitespace-nowrap">
                        <span className="text-xs font-medium">
                          {formatPricePerMillion(model.pricing.input)}
                        </span>

                        <span className="ml-1 text-[9px] text-muted-foreground">
                          / 1M
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="whitespace-nowrap">
                        <span className="text-xs font-medium">
                          {formatPricePerMillion(model.pricing.output)}
                        </span>

                        <span className="ml-1 text-[9px] text-muted-foreground">
                          / 1M
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex max-w-[220px] items-center gap-1.5 overflow-hidden">
                        {tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="shrink-0 rounded-md bg-muted px-2 py-1 text-[9px] font-medium text-muted-foreground"
                          >
                            {getLabel(tag)}
                          </span>
                        ))}

                        {tags.length > 2 && (
                          <span className="shrink-0 text-[10px] text-muted-foreground">
                            +{tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      <button
                        type="button"
                        onClick={() => onInfo(model)}
                        className="inline-flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        aria-label={`View information about ${model.name}`}
                      >
                        <Info className="size-3.5" />
                      </button>
                    </td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Pagination                                                                  */
/* -------------------------------------------------------------------------- */

function ModelPagination({
  page,
  totalPages,
  totalModels,
  startIndex,
  endIndex,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  totalModels: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const getPages = () => {
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Showing{" "}
        <span className="font-medium text-foreground">{startIndex + 1}</span>
        {"–"}
        <span className="font-medium text-foreground">{endIndex}</span> of{" "}
        <span className="font-medium text-foreground">{totalModels}</span>{" "}
        models
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPages().map((item, index) =>
            item === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className="flex size-8 items-center justify-center text-xs text-muted-foreground"
              >
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                onClick={() => onPageChange(item)}
                className={`inline-flex size-8 items-center justify-center rounded-md text-xs font-medium transition-colors ${
                  page === item
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        <button
          type="button"
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex size-8 items-center justify-center rounded-md border bg-background text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Main component                                                              */
/* -------------------------------------------------------------------------- */

export const Model = ({ models }: ModelProps) => {
  const [search, setSearch] = React.useState("");
  const [provider, setProvider] = React.useState("All");
  const [tag, setTag] = React.useState("All");

  const [sort, setSort] = React.useState<SortOption>("Recommended");

  const [page, setPage] = React.useState(1);

  const [selectedModel, setSelectedModel] = React.useState<ModelData | null>(
    null,
  );

  const [detailsOpen, setDetailsOpen] = React.useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  /* ---------------------------------------------------------------------- */
  /* Dynamic provider options                                               */
  /* ---------------------------------------------------------------------- */

  const providerOptions = React.useMemo(() => {
    const providers = new Set<string>();

    for (const model of models) {
      providers.add(getProviderName(model));
    }

    return ["All", ...Array.from(providers).sort((a, b) => a.localeCompare(b))];
  }, [models]);

  /* ---------------------------------------------------------------------- */
  /* Dynamic tag options                                                    */
  /* ---------------------------------------------------------------------- */

  const tagOptions = React.useMemo(() => {
    const tags = new Set<string>();

    for (const model of models) {
      for (const item of model.tags ?? []) {
        tags.add(item);
      }
    }

    return ["All", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, [models]);

  /* ---------------------------------------------------------------------- */
  /* Filter + sort                                                           */
  /* ---------------------------------------------------------------------- */

  const filteredModels = React.useMemo(() => {
    const filtered = models.filter((model) => {
      const providerName = getProviderName(model);

      const matchesSearch =
        !normalizedSearch ||
        model.name.toLowerCase().includes(normalizedSearch) ||
        model.id.toLowerCase().includes(normalizedSearch) ||
        model.owned_by.toLowerCase().includes(normalizedSearch) ||
        model.type.toLowerCase().includes(normalizedSearch) ||
        model.description?.toLowerCase().includes(normalizedSearch) ||
        model.tags?.some((item) =>
          item.toLowerCase().includes(normalizedSearch),
        );

      const matchesProvider = provider === "All" || providerName === provider;

      const matchesTag = tag === "All" || model.tags?.includes(tag);

      return matchesSearch && matchesProvider && matchesTag;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case "Newest":
          return (b.released ?? 0) - (a.released ?? 0);

        case "Price: Low to High":
          return Number(a.pricing.input) - Number(b.pricing.input);

        case "Price: High to Low":
          return Number(b.pricing.input) - Number(a.pricing.input);

        case "Largest Context":
          return b.context_window - a.context_window;

        case "Max Output":
          return b.max_tokens - a.max_tokens;

        case "Recommended":
        default:
          return (
            Number(b.tags?.includes("reasoning") ?? false) -
            Number(a.tags?.includes("reasoning") ?? false)
          );
      }
    });
  }, [models, normalizedSearch, provider, tag, sort]);

  /* ---------------------------------------------------------------------- */
  /* Reset pagination                                                        */
  /* ---------------------------------------------------------------------- */

  React.useEffect(() => {
    setPage(1);
  }, [normalizedSearch, provider, tag, sort]);

  /* ---------------------------------------------------------------------- */
  /* Pagination                                                              */
  /* ---------------------------------------------------------------------- */

  const totalPages = Math.max(
    1,
    Math.ceil(filteredModels.length / MODELS_PER_PAGE),
  );

  React.useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const startIndex = (page - 1) * MODELS_PER_PAGE;

  const endIndex = Math.min(
    startIndex + MODELS_PER_PAGE,
    filteredModels.length,
  );

  const paginatedModels = React.useMemo(
    () => filteredModels.slice(startIndex, endIndex),
    [filteredModels, startIndex, endIndex],
  );

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
    setPage(1);
  };

  /* ---------------------------------------------------------------------- */
  /* Model details                                                           */
  /* ---------------------------------------------------------------------- */

  const openDetails = (model: ModelData) => {
    setSelectedModel(model);
    setDetailsOpen(true);
  };

  const handleDetailsChange = (open: boolean) => {
    setDetailsOpen(open);

    if (!open) {
      window.setTimeout(() => {
        setSelectedModel(null);
      }, 200);
    }
  };

  /* ---------------------------------------------------------------------- */
  /* Render                                                                  */
  /* ---------------------------------------------------------------------- */

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
              <h1 className="text-xl font-semibold tracking-tight">Models</h1>

              <span className="rounded-full border bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                {models.length}
              </span>
            </div>

            <p className="mt-1 text-sm text-muted-foreground">
              Browse and compare AI models available in Vangrex
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
                onChange={(event) => setSearch(event.target.value)}
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
                    onClick={() => setSearch("")}
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
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {provider === "All" ? "Provider" : provider}

                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  {providerOptions.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => setProvider(item)}
                    >
                      <span className="flex-1">
                        {item === "All" ? "All providers" : item}
                      </span>

                      {provider === item && <Check className="ml-4 size-3.5" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Capability */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-9 items-center gap-2 rounded-md border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
                  >
                    {tag === "All" ? "Capability" : getLabel(tag)}

                    <ChevronDown className="size-3.5 text-muted-foreground" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="max-h-80 overflow-y-auto"
                >
                  {tagOptions.map((item) => (
                    <DropdownMenuItem key={item} onClick={() => setTag(item)}>
                      <span className="flex-1">
                        {item === "All" ? "All capabilities" : getLabel(item)}
                      </span>

                      {tag === item && <Check className="ml-4 size-3.5" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
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
                      onClick={() => setSort(item as SortOption)}
                    >
                      <span className="flex-1">{item}</span>

                      {sort === item && <Check className="ml-4 size-3.5" />}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Results count */}

          <AnimatePresence mode="wait">
            {(normalizedSearch || provider !== "All" || tag !== "All") && (
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
                  {filteredModels.length === 1 ? "model" : "models"} found
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

        {/* Table */}

        <div className="pb-8">
          {paginatedModels.length > 0 ? (
            <>
              <ModelTable models={paginatedModels} onInfo={openDetails} />

              <ModelPagination
                page={page}
                totalPages={totalPages}
                totalModels={filteredModels.length}
                startIndex={startIndex}
                endIndex={endIndex}
                onPageChange={setPage}
              />
            </>
          ) : (
            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              animate={{
                opacity: 1,
                y: 0,
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

              <h3 className="text-sm font-medium">No models found</h3>

              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                No models match your current search or filters.
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
        </div>
      </div>

      {/* Model details */}

      {selectedModel && (
        <ModelInfo
          model={selectedModel}
          open={detailsOpen}
          onOpenChange={handleDetailsChange}
        />
      )}
    </main>
  );
};
