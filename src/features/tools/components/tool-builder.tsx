"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";

import {
  Check,
  Code2,
  FileOutput,
  Globe,
  Info,
  Layers3,
  Plus,
  Save,
  Settings2,
  Trash2,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Section =
  | "overview"
  | "instructions"
  | "inputs"
  | "outputs"
  | "capabilities"
  | "execution";

type InputField = {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
};

type OutputField = {
  id: string;
  name: string;
  type: string;
  description: string;
  required: boolean;
};

type Capability = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
};

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const sections: {
  id: Section;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "overview",
    label: "Overview",
    description: "Identity and purpose",
    icon: Info,
  },
  {
    id: "instructions",
    label: "Instructions",
    description: "Agent behavior",
    icon: FileOutput,
  },
  {
    id: "inputs",
    label: "Inputs",
    description: "Input schema",
    icon: Code2,
  },
  {
    id: "outputs",
    label: "Outputs",
    description: "Output schema",
    icon: Layers3,
  },
  {
    id: "capabilities",
    label: "Capabilities",
    description: "Tool permissions",
    icon: Zap,
  },
  {
    id: "execution",
    label: "Execution",
    description: "Runtime settings",
    icon: Settings2,
  },
];

const initialInputs: InputField[] = [
  {
    id: "query",
    name: "query",
    type: "string",
    description: "The research question to investigate.",
    required: true,
  },
];

const initialOutputs: OutputField[] = [
  {
    id: "answer",
    name: "answer",
    type: "string",
    description: "The final research response.",
    required: true,
  },
  {
    id: "sources",
    name: "sources",
    type: "array",
    description: "Sources used during the research process.",
    required: false,
  },
];

const initialCapabilities: Capability[] = [
  {
    id: "web.search",
    name: "web.search",
    description: "Search the web for relevant information.",
    enabled: true,
  },
  {
    id: "web.fetch",
    name: "web.fetch",
    description: "Fetch and read web pages.",
    enabled: true,
  },
  {
    id: "files.read",
    name: "files.read",
    description: "Read files available to the agent.",
    enabled: false,
  },
  {
    id: "files.write",
    name: "files.write",
    description: "Create or modify files.",
    enabled: false,
  },
  {
    id: "code.execute",
    name: "code.execute",
    description: "Execute code in a sandbox.",
    enabled: false,
  },
  {
    id: "github.read",
    name: "github.read",
    description: "Read repositories and source files.",
    enabled: false,
  },
];

/* -------------------------------------------------------------------------- */
/* Main Dialog                                                                */
/* -------------------------------------------------------------------------- */

export function ToolBuilderDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const isMobile = useIsMobile();

  const [activeSection, setActiveSection] = React.useState<Section>("overview");

  const [toolName, setToolName] = React.useState("Web Researcher");

  const [description, setDescription] = React.useState(
    "Research a topic using multiple web sources and produce a structured answer with citations.",
  );

  const [category, setCategory] = React.useState("Research");

  const [version, setVersion] = React.useState("1.0.0");

  const [instructions, setInstructions] = React.useState(
    `1. Understand the user's research question.
2. Search multiple relevant sources.
3. Fetch and inspect the most useful sources.
4. Compare information across sources.
5. Produce a clear and structured answer.
6. Include the relevant sources used during the research.`,
  );

  const [inputs, setInputs] = React.useState<InputField[]>(initialInputs);

  const [outputs, setOutputs] = React.useState<OutputField[]>(initialOutputs);

  const [capabilities, setCapabilities] =
    React.useState<Capability[]>(initialCapabilities);

  const [aiPrompt, setAiPrompt] = React.useState("");

  const [isGenerating, setIsGenerating] = React.useState(false);

  const [isSaving, setIsSaving] = React.useState(false);

  const [isPublished, setIsPublished] = React.useState(false);

  /* ------------------------------------------------------------------------ */
  /* Reset                                                                    */
  /* ------------------------------------------------------------------------ */

  React.useEffect(() => {
    if (!open) {
      setActiveSection("overview");
      setAiPrompt("");
      setIsGenerating(false);
    }
  }, [open]);

  /* ------------------------------------------------------------------------ */
  /* Inputs                                                                    */
  /* ------------------------------------------------------------------------ */

  const updateInput = (id: string, field: Partial<InputField>) => {
    setInputs((current) =>
      current.map((input) =>
        input.id === id
          ? {
              ...input,
              ...field,
            }
          : input,
      ),
    );
  };

  const removeInput = (id: string) => {
    setInputs((current) => current.filter((input) => input.id !== id));
  };

  const addInput = () => {
    setInputs((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "newInput",
        type: "string",
        description: "",
        required: false,
      },
    ]);
  };

  /* ------------------------------------------------------------------------ */
  /* Outputs                                                                   */
  /* ------------------------------------------------------------------------ */

  const updateOutput = (id: string, field: Partial<OutputField>) => {
    setOutputs((current) =>
      current.map((output) =>
        output.id === id
          ? {
              ...output,
              ...field,
            }
          : output,
      ),
    );
  };

  const removeOutput = (id: string) => {
    setOutputs((current) => current.filter((output) => output.id !== id));
  };

  const addOutput = () => {
    setOutputs((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "newOutput",
        type: "string",
        description: "",
        required: false,
      },
    ]);
  };

  /* ------------------------------------------------------------------------ */
  /* Capabilities                                                              */
  /* ------------------------------------------------------------------------ */

  const toggleCapability = (id: string) => {
    setCapabilities((current) =>
      current.map((capability) =>
        capability.id === id
          ? {
              ...capability,
              enabled: !capability.enabled,
            }
          : capability,
      ),
    );
  };

  /* ------------------------------------------------------------------------ */
  /* AI Assistant                                                              */
  /* ------------------------------------------------------------------------ */

  const handleAiCommand = async () => {
    if (!aiPrompt.trim() || isGenerating) return;

    setIsGenerating(true);

    await new Promise((resolve) => setTimeout(resolve, 900));

    const prompt = aiPrompt.toLowerCase();

    if (
      prompt.includes("concise") ||
      prompt.includes("shorter") ||
      prompt.includes("brief")
    ) {
      setInstructions(
        `1. Understand the user's research question.
2. Search relevant sources.
3. Verify the important information.
4. Produce a concise answer with citations.`,
      );
    }

    if (prompt.includes("source") || prompt.includes("sources")) {
      setOutputs((current) => {
        const exists = current.some((output) => output.name === "sources");

        if (exists) return current;

        return [
          ...current,
          {
            id: crypto.randomUUID(),
            name: "sources",
            type: "array",
            description: "Sources used during the research process.",
            required: false,
          },
        ];
      });
    }

    if (prompt.includes("web")) {
      setCapabilities((current) =>
        current.map((capability) =>
          capability.id === "web.search" || capability.id === "web.fetch"
            ? {
                ...capability,
                enabled: true,
              }
            : capability,
        ),
      );
    }

    if (prompt.includes("file") || prompt.includes("files")) {
      setCapabilities((current) =>
        current.map((capability) =>
          capability.id === "files.read"
            ? {
                ...capability,
                enabled: true,
              }
            : capability,
        ),
      );
    }

    setAiPrompt("");
    setIsGenerating(false);
  };

  /* ------------------------------------------------------------------------ */
  /* Save / Publish                                                            */
  /* ------------------------------------------------------------------------ */

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSaving(false);
  };

  const handlePublish = async () => {
    if (isPublished) return;

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsPublished(true);
  };

  /* ------------------------------------------------------------------------ */
  /* Section renderer                                                          */
  /* ------------------------------------------------------------------------ */

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return (
          <OverviewSection
            toolName={toolName}
            setToolName={setToolName}
            description={description}
            setDescription={setDescription}
            category={category}
            setCategory={setCategory}
            version={version}
            setVersion={setVersion}
          />
        );

      case "instructions":
        return (
          <InstructionsSection
            value={instructions}
            onChange={setInstructions}
          />
        );

      case "inputs":
        return (
          <InputsSection
            inputs={inputs}
            onAdd={addInput}
            onRemove={removeInput}
            onUpdate={updateInput}
          />
        );

      case "outputs":
        return (
          <OutputsSection
            outputs={outputs}
            onAdd={addOutput}
            onRemove={removeOutput}
            onUpdate={updateOutput}
          />
        );

      case "capabilities":
        return (
          <CapabilitiesSection
            capabilities={capabilities}
            onToggle={toggleCapability}
          />
        );

      case "execution":
        return <ExecutionSection />;

      default:
        return null;
    }
  };

  /* ------------------------------------------------------------------------ */
  /* Shared content                                                            */
  /* ------------------------------------------------------------------------ */

  const content = (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Mobile navigation */}
      <div className="shrink-0 border-b md:hidden">
        <ScrollArea className="w-full">
          <div className="flex w-max min-w-full gap-1 px-3 py-2">
            {sections.map((section) => {
              const Icon = section.icon;
              const active = activeSection === section.id;

              return (
                <Button
                  key={section.id}
                  variant={active ? "secondary" : "ghost"}
                  size="sm"
                  className={`
                    h-8
                    shrink-0
                    rounded-lg
                    px-2.5
                    text-xs
                    ${active ? "shadow-sm" : "text-muted-foreground"}
                  `}
                  onClick={() => setActiveSection(section.id)}
                >
                  <Icon className="mr-1.5 size-3.5 shrink-0" />
                  {section.label}
                </Button>
              );
            })}
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden w-[230px] shrink-0 border-r md:flex md:flex-col">
          <ScrollArea className="flex-1">
            <div className="p-3">
              <div className="mb-3 border-b px-2 pb-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Tool builder
                </p>

                <p className="mt-1 text-[11px] leading-4 text-muted-foreground">
                  Configure how your tool behaves and what it can access.
                </p>
              </div>

              <nav className="space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active = activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className="
                        relative
                        flex
                        w-full
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        py-2.5
                        text-left
                        transition-colors
                        hover:bg-muted/60
                      "
                    >
                      {active && (
                        <motion.div
                          layoutId="tool-builder-section"
                          className="absolute inset-0 rounded-xl bg-muted"
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                          }}
                        />
                      )}

                      <div
                        className={`
                          relative
                          z-10
                          flex
                          size-8
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          ${
                            active
                              ? "bg-background shadow-sm"
                              : "bg-transparent"
                          }
                        `}
                      >
                        <Icon
                          className={`
                            size-3.5
                            ${
                              active
                                ? "text-foreground"
                                : "text-muted-foreground"
                            }
                          `}
                        />
                      </div>

                      <div className="relative z-10 min-w-0">
                        <p
                          className={`
                            text-xs
                            ${
                              active
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                            }
                          `}
                        >
                          {section.label}
                        </p>

                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground/70">
                          {section.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </ScrollArea>
        </aside>

        {/* Editor */}
        <main className="min-w-0 flex-1">
          <ScrollArea className="h-full">
            <div
              className="
                mx-auto
                w-full
                max-w-3xl
                px-5
                pb-36
                pt-6
                sm:px-8
                sm:pt-8
              "
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{
                    opacity: 0,
                    y: 8,
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
                    duration: 0.16,
                    ease: "easeOut",
                  }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </ScrollArea>
        </main>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------------ */
  /* Header                                                                    */
  /* ------------------------------------------------------------------------ */

  const headerContent = (
    <div className="flex min-h-[68px] items-center justify-between gap-4 px-4 sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0 rounded-lg"
          onClick={() => onOpenChange(false)}
        >
          <X className="size-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {isMobile ? (
              <DrawerTitle className="truncate text-sm font-semibold">
                {toolName || "Create tool"}
              </DrawerTitle>
            ) : (
              <DialogTitle className="truncate text-sm font-semibold">
                {toolName || "Create tool"}
              </DialogTitle>
            )}

            <Badge
              variant="secondary"
              className="hidden rounded-md px-1.5 py-0 text-[9px] font-medium sm:inline-flex"
            >
              v{version}
            </Badge>
          </div>

          {isMobile ? (
            <DrawerDescription className="sr-only">
              Configure your Vangrex tool.
            </DrawerDescription>
          ) : (
            <DialogDescription className="sr-only">
              Configure your Vangrex tool.
            </DialogDescription>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="hidden rounded-lg sm:flex"
          onClick={handleSave}
          disabled={isSaving}
        >
          <Save className="mr-2 size-3.5" />
          {isSaving ? "Saving..." : "Save draft"}
        </Button>

        <Button
          size="sm"
          className="rounded-lg px-4"
          onClick={handlePublish}
          disabled={isPublished}
        >
          {isPublished ? (
            <>
              <Check className="mr-1.5 size-3.5" />
              Published
            </>
          ) : (
            "Publish"
          )}
        </Button>
      </div>
    </div>
  );

  /* ------------------------------------------------------------------------ */
  /* Mobile Drawer                                                             */
  /* ------------------------------------------------------------------------ */

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          className="
            flex
            h-[94dvh]
            max-h-[94dvh]
            flex-col
            gap-0
            overflow-hidden
            rounded-t-2xl
            p-0
          "
        >
          <DrawerHeader className="shrink-0 border-b p-0">
            {headerContent}
          </DrawerHeader>

          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  /* ------------------------------------------------------------------------ */
  /* Desktop Dialog                                                            */
  /* ------------------------------------------------------------------------ */

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="
          flex
          h-[94dvh]
          w-[calc(100vw-24px)]
          max-w-[1120px]
          flex-col
          gap-0
          overflow-hidden
          rounded-2xl
          border
          bg-background
          p-0
          shadow-2xl
        "
      >
        <DialogHeader className="shrink-0 border-b p-0">
          {headerContent}
        </DialogHeader>

        {content}
      </DialogContent>
    </Dialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Overview                                                                   */
/* -------------------------------------------------------------------------- */

function OverviewSection({
  toolName,
  setToolName,
  description,
  setDescription,
  category,
  setCategory,
  version,
  setVersion,
}: {
  toolName: string;
  setToolName: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  version: string;
  setVersion: (value: string) => void;
}) {
  return (
    <SectionShell
      eyebrow="Tool configuration"
      title="Overview"
      description="Define the identity and purpose of your tool."
    >
      <div className="space-y-6">
        <Field
          label="Name"
          description="A short, recognizable name for this tool."
        >
          <Input
            value={toolName}
            onChange={(event) => setToolName(event.target.value)}
            placeholder="Web Researcher"
            className="h-10 rounded-lg"
          />
        </Field>

        <Field
          label="Description"
          description="Explain what this tool does and when an agent should use it."
        >
          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Describe what this tool does..."
            className="min-h-28 resize-none rounded-lg"
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="Category"
            description="Used to organize your tool library."
          >
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-10 rounded-lg">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Research">Research</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Automation">Automation</SelectItem>
                <SelectItem value="Data">Data</SelectItem>
                <SelectItem value="Productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field
            label="Version"
            description="Published versions are immutable."
          >
            <Input
              value={version}
              onChange={(event) => setVersion(event.target.value)}
              placeholder="1.0.0"
              className="h-10 rounded-lg"
            />
          </Field>
        </div>

        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
              <WandSparkles className="size-4" />
            </div>

            <div>
              <p className="text-xs font-medium">Tool identity</p>

              <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                This information helps agents understand what your tool does and
                when it should be used.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Instructions                                                               */
/* -------------------------------------------------------------------------- */

function InstructionsSection({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <SectionShell
      eyebrow="Behavior"
      title="Instructions"
      description="Tell the agent how this tool should operate."
    >
      <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <Code2 className="size-3.5 text-muted-foreground" />

            <span className="text-xs font-medium">Execution instructions</span>
          </div>

          <Badge variant="secondary" className="rounded-md text-[10px]">
            Markdown
          </Badge>
        </div>

        <Textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            min-h-[420px]
            resize-none
            rounded-none
            border-0
            bg-transparent
            font-mono
            text-sm
            leading-6
            shadow-none
            focus-visible:ring-0
          "
        />
      </div>

      <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
        <Info className="mt-0.5 size-3.5 shrink-0" />

        <p>
          Keep instructions focused on the tool&apos;s objective, workflow,
          constraints, and expected behavior.
        </p>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Inputs                                                                     */
/* -------------------------------------------------------------------------- */

function InputsSection({
  inputs,
  onAdd,
  onRemove,
  onUpdate,
}: {
  inputs: InputField[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: Partial<InputField>) => void;
}) {
  return (
    <SectionShell
      eyebrow="Schema"
      title="Inputs"
      description="Define the data an agent must provide when calling this tool."
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="rounded-lg"
        >
          <Plus className="mr-2 size-3.5" />
          Add input
        </Button>
      }
    >
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {inputs.map((input, index) => (
            <motion.div
              layout
              key={input.id}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              className="rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-[10px] font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <p className="text-sm font-medium">Input</p>

                    <p className="text-xs text-muted-foreground">
                      {input.name || "Unnamed input"}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(input.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={input.name}
                    onChange={(event) =>
                      onUpdate(input.id, {
                        name: event.target.value,
                      })
                    }
                    className="h-9 rounded-lg"
                  />
                </Field>

                <Field label="Type">
                  <Select
                    value={input.type}
                    onValueChange={(value) =>
                      onUpdate(input.id, {
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="string">string</SelectItem>
                      <SelectItem value="number">number</SelectItem>
                      <SelectItem value="boolean">boolean</SelectItem>
                      <SelectItem value="array">array</SelectItem>
                      <SelectItem value="object">object</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Description">
                  <Input
                    value={input.description}
                    onChange={(event) =>
                      onUpdate(input.id, {
                        description: event.target.value,
                      })
                    }
                    placeholder="What is this input used for?"
                    className="h-9 rounded-lg"
                  />
                </Field>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5">
                <div>
                  <p className="text-xs font-medium">Required</p>

                  <p className="text-[11px] text-muted-foreground">
                    The agent must provide this value.
                  </p>
                </div>

                <Switch
                  checked={input.required}
                  onCheckedChange={(checked) =>
                    onUpdate(input.id, {
                      required: checked,
                    })
                  }
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {inputs.length === 0 && (
          <EmptySchema
            title="No inputs"
            description="Add an input to define what your tool accepts."
            onClick={onAdd}
          />
        )}
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Outputs                                                                    */
/* -------------------------------------------------------------------------- */

function OutputsSection({
  outputs,
  onAdd,
  onRemove,
  onUpdate,
}: {
  outputs: OutputField[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: Partial<OutputField>) => void;
}) {
  return (
    <SectionShell
      eyebrow="Schema"
      title="Outputs"
      description="Define the structured result this tool returns to an agent."
      action={
        <Button
          variant="outline"
          size="sm"
          onClick={onAdd}
          className="rounded-lg"
        >
          <Plus className="mr-2 size-3.5" />
          Add output
        </Button>
      }
    >
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {outputs.map((output, index) => (
            <motion.div
              layout
              key={output.id}
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.98,
              }}
              className="rounded-xl border bg-card p-4 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-muted text-[10px] font-semibold">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div>
                    <p className="text-sm font-medium">Output</p>

                    <p className="text-xs text-muted-foreground">
                      {output.name || "Unnamed output"}
                    </p>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-lg text-muted-foreground hover:text-destructive"
                  onClick={() => onRemove(output.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name">
                  <Input
                    value={output.name}
                    onChange={(event) =>
                      onUpdate(output.id, {
                        name: event.target.value,
                      })
                    }
                    className="h-9 rounded-lg"
                  />
                </Field>

                <Field label="Type">
                  <Select
                    value={output.type}
                    onValueChange={(value) =>
                      onUpdate(output.id, {
                        type: value,
                      })
                    }
                  >
                    <SelectTrigger className="h-9 rounded-lg">
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="string">string</SelectItem>
                      <SelectItem value="number">number</SelectItem>
                      <SelectItem value="boolean">boolean</SelectItem>
                      <SelectItem value="array">array</SelectItem>
                      <SelectItem value="object">object</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Description">
                  <Input
                    value={output.description}
                    onChange={(event) =>
                      onUpdate(output.id, {
                        description: event.target.value,
                      })
                    }
                    placeholder="Describe this output..."
                    className="h-9 rounded-lg"
                  />
                </Field>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2.5">
                <div>
                  <p className="text-xs font-medium">Required</p>

                  <p className="text-[11px] text-muted-foreground">
                    The tool should always return this value.
                  </p>
                </div>

                <Switch
                  checked={output.required}
                  onCheckedChange={(checked) =>
                    onUpdate(output.id, {
                      required: checked,
                    })
                  }
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {outputs.length === 0 && (
          <EmptySchema
            title="No outputs"
            description="Add an output to define what your tool returns."
            onClick={onAdd}
          />
        )}
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Capabilities                                                               */
/* -------------------------------------------------------------------------- */

function CapabilitiesSection({
  capabilities,
  onToggle,
}: {
  capabilities: Capability[];
  onToggle: (id: string) => void;
}) {
  const enabledCount = capabilities.filter(
    (capability) => capability.enabled,
  ).length;

  return (
    <SectionShell
      eyebrow="Permissions"
      title="Capabilities"
      description="Control which Vangrex capabilities this tool is allowed to use."
    >
      <div className="mb-4 flex items-center justify-between rounded-xl border bg-muted/20 px-4 py-3">
        <div>
          <p className="text-xs font-medium">Enabled capabilities</p>

          <p className="mt-0.5 text-[11px] text-muted-foreground">
            Only enabled capabilities are available at runtime.
          </p>
        </div>

        <Badge variant="secondary" className="rounded-md text-[10px]">
          {enabledCount} / {capabilities.length}
        </Badge>
      </div>

      <div className="space-y-2">
        {capabilities.map((capability) => (
          <motion.div
            layout
            key={capability.id}
            className={`
              flex
              items-center
              justify-between
              gap-4
              rounded-xl
              border
              p-4
              transition-colors
              ${capability.enabled ? "bg-card shadow-sm" : "bg-muted/20"}
            `}
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className={`
                  flex
                  size-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  ${capability.enabled ? "bg-muted" : "bg-muted/50"}
                `}
              >
                {capability.id.startsWith("web") ? (
                  <Globe className="size-4" />
                ) : capability.id.startsWith("code") ? (
                  <Code2 className="size-4" />
                ) : (
                  <Layers3 className="size-4" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate font-mono text-xs font-medium">
                  {capability.name}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {capability.description}
                </p>
              </div>
            </div>

            <Switch
              checked={capability.enabled}
              onCheckedChange={() => onToggle(capability.id)}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-xl border border-dashed p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

          <div>
            <p className="text-xs font-medium">Capability permissions</p>

            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              Capabilities define what the tool can actually access or execute.
              Keep permissions limited to what the tool requires.
            </p>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Execution                                                                  */
/* -------------------------------------------------------------------------- */

function ExecutionSection() {
  return (
    <SectionShell
      eyebrow="Runtime"
      title="Execution"
      description="Configure how Vangrex should execute this tool."
    >
      <div className="space-y-6">
        <Field
          label="Execution type"
          description="The runtime strategy used to execute this tool."
        >
          <Select defaultValue="agent">
            <SelectTrigger className="h-10 rounded-lg">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="agent">Agent</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Model"
          description="The model responsible for following the tool instructions."
        >
          <Select defaultValue="vangrex-default">
            <SelectTrigger className="h-10 rounded-lg">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="vangrex-default">Vangrex Default</SelectItem>

              <SelectItem value="fast">Vangrex Fast</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field
          label="Timeout"
          description="Maximum execution time before the tool is stopped."
        >
          <Select defaultValue="60">
            <SelectTrigger className="h-10 rounded-lg">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="30">30 seconds</SelectItem>

              <SelectItem value="60">60 seconds</SelectItem>

              <SelectItem value="120">120 seconds</SelectItem>

              <SelectItem value="300">5 minutes</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <div className="rounded-xl border bg-muted/20 p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background">
              <Zap className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Agent execution</p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Vangrex will provide the tool instructions, inputs, and approved
                capabilities to the execution model.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared Components                                                          */
/* -------------------------------------------------------------------------- */

function SectionShell({
  eyebrow,
  title,
  description,
  action,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight">{title}</h2>

          <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </div>

        {action}
      </div>

      <Separator className="my-6" />

      {children}
    </section>
  );
}

function Field({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div>
        <label className="text-xs font-medium">{label}</label>

        {description && (
          <p className="mt-0.5 text-[11px] leading-5 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
}

function EmptySchema({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-12 text-center">
      <div className="flex size-10 items-center justify-center rounded-xl bg-muted">
        <Code2 className="size-4 text-muted-foreground" />
      </div>

      <p className="mt-3 text-sm font-medium">{title}</p>

      <p className="mt-1 max-w-sm text-xs text-muted-foreground">
        {description}
      </p>

      <Button
        variant="outline"
        size="sm"
        className="mt-4 rounded-lg"
        onClick={onClick}
      >
        <Plus className="mr-2 size-3.5" />
        Add
      </Button>
    </div>
  );
}
