"use client";

import * as React from "react";

import { motion } from "motion/react";

import { Check, Sparkles, Zap } from "lucide-react";

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

import { useIsMobile } from "@/hooks/use-mobile";
import { Agent } from "../types";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type AgentCardProps = {
  agent: Agent;
  index?: number;
  onOpen?: (agent: Agent) => void;
};

/* -------------------------------------------------------------------------- */
/* Agent Avatar                                                               */
/* -------------------------------------------------------------------------- */

function AgentAvatar({
  agent,
  size = "large",
}: {
  agent: Agent;
  size?: "large" | "small";
}) {
  const Icon = agent.icon;

  if (agent.image) {
    return (
      <div
        className={[
          "overflow-hidden rounded-full border-4 border-background bg-muted shadow-xl",
          size === "large" ? "size-24" : "size-12",
        ].join(" ")}
      >
        <img
          src={agent.image}
          alt={agent.name}
          className="size-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={[
        "flex items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-muted to-muted/50 shadow-xl",
        size === "large" ? "size-24" : "size-12",
      ].join(" ")}
    >
      <Icon
        className={
          size === "large" ? "size-9 text-foreground" : "size-5 text-foreground"
        }
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Detail Item                                                                */
/* -------------------------------------------------------------------------- */

function DetailItem({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 p-3.5">
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>

      <p
        className={[
          "mt-1 truncate text-xs font-medium",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent Details                                                              */
/* -------------------------------------------------------------------------- */

function AgentDetails({
  agent,
  compact = false,
}: {
  agent: Agent;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "space-y-5" : "space-y-6"}>
      {/* Identity */}
      <div className="flex items-center gap-3">
        <AgentAvatar agent={agent} size="small" />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-semibold">{agent.name}</h3>

            <span
              className={[
                "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                agent.status === "Published"
                  ? "border-foreground/10 bg-foreground/[0.04]"
                  : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400",
              ].join(" ")}
            >
              {agent.status}
            </span>
          </div>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {agent.category}
          </p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs font-medium">About this agent</h4>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {agent.description}
        </p>
      </div>

      {/* Details */}
      <div className="overflow-hidden rounded-xl border bg-muted/[0.18]">
        <div className="grid grid-cols-2 divide-x divide-y">
          <DetailItem label="Model" value={agent.model} />
          <DetailItem label="Version" value={`v${agent.version}`} />
          <DetailItem label="Usage" value={agent.usage} />
          <DetailItem label="Agent ID" value={agent.id} mono />
        </div>
      </div>

      {/* Tools */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium">Tools</h4>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Tools available during execution.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {agent.tools.map((tool) => (
            <span
              key={tool}
              className="inline-flex items-center gap-1.5 rounded-lg border bg-muted/30 px-2.5 py-1.5 text-[11px] text-muted-foreground"
            >
              <Check className="size-3 text-foreground" />
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Capabilities */}
      <div className="space-y-3">
        <div>
          <h4 className="text-xs font-medium">Capabilities</h4>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Permissions available to this agent.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {agent.capabilities.map((capability) => (
            <span
              key={capability}
              className="inline-flex items-center rounded-lg border bg-muted/30 px-2.5 py-1.5 font-mono text-[10px] text-muted-foreground"
            >
              {capability}
            </span>
          ))}
        </div>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Created
          </p>

          <p className="mt-1 text-xs font-medium">{agent.createdAt}</p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
            Last updated
          </p>

          <p className="mt-1 text-xs font-medium">{agent.updatedAt}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent Information                                                          */
/* -------------------------------------------------------------------------- */

function AgentInfo({
  agent,
  open,
  onOpenChange,
}: {
  agent: Agent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  const content = <AgentDetails agent={agent} compact={isMobile} />;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="border-b! px-5 pb-4 text-left">
            <DrawerTitle className="text-base">{agent.name}</DrawerTitle>

            <DrawerDescription className="text-xs">
              Agent configuration, tools, model, and capabilities.
            </DrawerDescription>
          </DrawerHeader>

          <div className="max-h-[78vh] overflow-y-auto px-5 py-5">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5 text-left">
          <DialogTitle className="text-base">{agent.name}</DialogTitle>

          <DialogDescription className="text-xs">
            Agent configuration, tools, model, and capabilities.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[75vh] overflow-y-auto px-6 py-6">{content}</div>
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Agent Card                                                                 */
/* -------------------------------------------------------------------------- */

export function AgentCard({ agent, index = 0, onOpen }: AgentCardProps) {
  const [infoOpen, setInfoOpen] = React.useState(false);

  const handleOpen = () => {
    onOpen?.(agent);
  };

  return (
    <>
      <motion.article
        layout
        initial={{
          opacity: 0,
          y: 12,
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
          duration: 0.24,
          delay: index * 0.04,
          ease: "easeOut",
        }}
        whileHover={{
          y: -3,
        }}
        className="group relative"
      >
        <div
          role="button"
          tabIndex={0}
          onClick={handleOpen}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleOpen();
            }
          }}
          aria-label={`View ${agent.name} information`}
          className="relative cursor-pointer overflow-hidden rounded-2xl border bg-background transition-shadow duration-300 hover:shadow-xl hover:shadow-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:hover:shadow-black/30"
        >
          {/* ---------------------------------------------------------------- */}
          {/* Cover                                                            */}
          {/* ---------------------------------------------------------------- */}

          <div className="relative h-36 overflow-hidden bg-muted">
            {agent.image ? (
              <>
                <img
                  src={agent.image}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/50" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted/70 to-background" />

                <div className="absolute -right-8 -top-12 size-40 rounded-full bg-foreground/[0.04] blur-2xl" />

                <div className="absolute -bottom-16 -left-8 size-40 rounded-full bg-foreground/[0.05] blur-2xl" />
              </>
            )}

            {/* Decorative category label */}
            <div className="absolute left-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                <Sparkles className="size-2.5" />
                {agent.category}
              </span>
            </div>

            {/* Status */}
            <div className="absolute right-4 top-4">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                <span
                  className={[
                    "size-1.5 rounded-full",
                    agent.status === "Published"
                      ? "bg-emerald-400"
                      : "bg-amber-400",
                  ].join(" ")}
                />

                {agent.status}
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Profile content                                                  */}
          {/* ---------------------------------------------------------------- */}

          <div className="relative px-5 pb-5">
            {/* Centered avatar */}
            <div className="-mt-12 flex justify-center">
              <motion.div
                initial={false}
                whileHover={{
                  scale: 1.04,
                }}
                transition={{
                  duration: 0.2,
                }}
              >
                <AgentAvatar agent={agent} />
              </motion.div>
            </div>

            {/* Name */}
            <div className="mt-3 text-center">
              <div className="flex items-center justify-center gap-1.5">
                <h3 className="text-sm font-semibold tracking-tight">
                  {agent.name}
                </h3>

                {agent.status === "Published" && (
                  <span className="flex size-4 items-center justify-center rounded-full bg-foreground text-background">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                )}
              </div>

              <p className="mt-1 text-xs text-muted-foreground">
                {agent.category}
              </p>
            </div>

            {/* Description */}
            <p className="mx-auto mt-3 line-clamp-2 max-w-sm text-center text-xs leading-5 text-muted-foreground">
              {agent.description}
            </p>

            {/* Stats */}
            <div className="mt-5 grid grid-cols-3 divide-x rounded-xl border bg-muted/[0.18] py-3">
              <div className="text-center">
                <p className="text-xs font-semibold">{agent.usage}</p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Usage
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs font-semibold">{agent.model}</p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Model
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs font-semibold">{agent.tools.length}</p>

                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  Tools
                </p>
              </div>
            </div>

            {/* Tool preview */}
            <div className="mt-4 flex min-w-0 items-center justify-center gap-1.5 overflow-hidden">
              {agent.tools.slice(0, 2).map((tool) => (
                <span
                  key={tool}
                  className="inline-flex max-w-[130px] items-center gap-1 rounded-full border bg-background px-2.5 py-1 text-[10px] text-muted-foreground"
                >
                  <Zap className="size-2.5 shrink-0" />

                  <span className="truncate">{tool}</span>
                </span>
              ))}

              {agent.tools.length > 2 && (
                <span className="text-[10px] text-muted-foreground">
                  +{agent.tools.length - 2}
                </span>
              )}
            </div>

            {/* Click hint */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] font-medium text-muted-foreground transition-colors group-hover:text-foreground">
              <span>View agent details</span>

              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                →
              </span>
            </div>
          </div>
        </div>
      </motion.article>

      {/* Responsive information surface */}
      <AgentInfo agent={agent} open={infoOpen} onOpenChange={setInfoOpen} />
    </>
  );
}
