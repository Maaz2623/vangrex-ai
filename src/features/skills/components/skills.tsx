"use client";

import * as React from "react";

import { AnimatePresence, motion } from "motion/react";

import {
  BookOpen,
  Check,
  Copy,
  FileCode2,
  FileText,
  Plus,
  Search,
  Upload,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Skill = {
  id: string;
  name: string;
  description: string;
  updated: string;
  content: string;
};

const initialSkills: Skill[] = [
  {
    id: "skill_001",
    name: "Web Research",
    description:
      "Guidelines for researching the web, evaluating sources, and synthesizing reliable findings.",
    updated: "Today",
    content: `# Web Research

## Purpose

Research topics on the web and produce accurate, well-supported answers.

## Instructions

- Identify the user's actual research question.
- Prefer primary and authoritative sources.
- Cross-check important claims.
- Distinguish facts from opinions.
- Include relevant context and limitations.
- Cite sources when appropriate.`,
  },
  {
    id: "skill_002",
    name: "Code Generation",
    description:
      "Instructions for writing, refactoring, debugging, and reviewing production-ready code.",
    updated: "Today",
    content: `# Code Generation

## Purpose

Write clean, maintainable, production-ready code.

## Instructions

- Understand the existing architecture before making changes.
- Follow established project conventions.
- Prefer simple and composable solutions.
- Avoid unnecessary abstractions.
- Handle errors explicitly.
- Keep implementations type-safe.`,
  },
  {
    id: "skill_003",
    name: "Document Analysis",
    description:
      "A reusable methodology for reading, extracting, summarizing, and structuring information from documents.",
    updated: "Yesterday",
    content: `# Document Analysis

## Purpose

Analyze documents and transform unstructured information into useful structured output.

## Instructions

- Identify the document's purpose and structure.
- Extract relevant information.
- Preserve important context.
- Clearly distinguish source information from interpretation.
- Produce concise and structured summaries.`,
  },
  {
    id: "skill_004",
    name: "Data Analysis",
    description:
      "Instructions for analyzing datasets, identifying patterns, and communicating useful insights.",
    updated: "Yesterday",
    content: `# Data Analysis

## Purpose

Analyze data carefully and communicate meaningful findings.

## Instructions

- Inspect the dataset before analyzing it.
- Identify missing or inconsistent data.
- Validate assumptions.
- Look for meaningful patterns and relationships.
- Quantify findings whenever possible.
- Clearly communicate uncertainty.`,
  },
  {
    id: "skill_005",
    name: "Content Writing",
    description:
      "Writing guidelines for producing clear, polished, and consistent content across different formats.",
    updated: "Sep 27",
    content: `# Content Writing

## Purpose

Create clear, useful, and engaging written content.

## Instructions

- Understand the target audience.
- Establish the desired tone.
- Use clear and concise language.
- Structure information logically.
- Remove unnecessary repetition.
- Prefer concrete language over vague wording.`,
  },
  {
    id: "skill_006",
    name: "API Integration",
    description:
      "Guidelines for understanding API documentation, schemas, authentication, requests, and responses.",
    updated: "Sep 26",
    content: `# API Integration

## Purpose

Work with external APIs safely and consistently.

## Instructions

- Read the API documentation before implementation.
- Understand authentication requirements.
- Validate request and response schemas.
- Handle errors and rate limits.
- Keep secrets out of source code.
- Follow the API's documented conventions.`,
  },
];

type CreateSkillDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (skill: Skill) => void;
};

const CreateSkillDialog = ({
  open,
  onOpenChange,
  onCreate,
}: CreateSkillDialogProps) => {
  const [mode, setMode] = React.useState<"write" | "upload">("write");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [content, setContent] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const [error, setError] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = () => {
    setMode("write");
    setName("");
    setDescription("");
    setContent("");
    setFileName("");
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      reset();
    }

    onOpenChange(value);
  };

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension !== "md" && extension !== "mdx") {
      setError("Please upload a .md or .mdx file.");
      return;
    }

    try {
      const text = await file.text();

      setFileName(file.name);
      setContent(text);
      setError("");

      if (!name) {
        const fileBaseName = file.name.replace(/\.(md|mdx)$/i, "");

        setName(
          fileBaseName
            .replace(/[-_]+/g, " ")
            .replace(/\b\w/g, (character) => character.toUpperCase()),
        );
      }
    } catch {
      setError("Unable to read this file.");
    }
  };

  const handleCreate = () => {
    const trimmedName = name.trim();
    const trimmedContent = content.trim();

    if (!trimmedName) {
      setError("Give your skill a name.");
      return;
    }

    if (!trimmedContent) {
      setError("Add some Markdown or MDX content.");
      return;
    }

    const skill: Skill = {
      id: `skill_${Date.now()}`,
      name: trimmedName,
      description:
        description.trim() || "Reusable knowledge for your AI agents.",
      updated: "Just now",
      content: trimmedContent,
    };

    onCreate(skill);
    handleOpenChange(false);
  };

  if (!open) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            handleOpenChange(false);
          }
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 8,
            scale: 0.98,
          }}
          transition={{
            duration: 0.18,
            ease: "easeOut",
          }}
          className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-skill-title"
        >
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div>
              <h2 id="create-skill-title" className="text-sm font-semibold">
                Create skill
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Create reusable knowledge that your agents can use.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="border-b px-5 pt-4">
            <div className="flex h-9 w-fit items-center rounded-lg bg-muted p-1">
              <button
                type="button"
                onClick={() => {
                  setMode("write");
                  setError("");
                }}
                className={`inline-flex h-7 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors ${
                  mode === "write"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <FileText className="size-3.5" />
                Write
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("upload");
                  setError("");
                }}
                className={`inline-flex h-7 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors ${
                  mode === "upload"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Upload className="size-3.5" />
                Upload
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="skill-name" className="text-xs font-medium">
                    Name
                  </label>

                  <Input
                    id="skill-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Web Research"
                    className="h-9"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="skill-description"
                    className="text-xs font-medium"
                  >
                    Description
                  </label>

                  <Input
                    id="skill-description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="What does this skill teach?"
                    className="h-9"
                  />
                </div>
              </div>

              {mode === "write" ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="skill-content"
                      className="text-xs font-medium"
                    >
                      Skill content
                    </label>

                    <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <FileCode2 className="size-3" />
                      Markdown / MDX
                    </span>
                  </div>

                  <textarea
                    id="skill-content"
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                    placeholder={`# Web Research

## Purpose

Describe what this skill teaches the agent.

## Instructions

- First instruction
- Second instruction
- Third instruction`}
                    spellCheck={false}
                    className="min-h-[360px] w-full resize-y rounded-lg border bg-muted/20 px-4 py-3 font-mono text-xs leading-6 outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-1 focus:ring-ring"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-xs font-medium">MDX file</label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".md,.mdx,text/markdown,text/x-markdown"
                    onChange={handleFile}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center transition-colors hover:bg-muted/40"
                  >
                    <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-muted">
                      <Upload className="size-4 text-muted-foreground" />
                    </div>

                    {fileName ? (
                      <>
                        <p className="text-sm font-medium">{fileName}</p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Click to replace the file
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-medium">
                          Upload a Markdown or MDX file
                        </p>

                        <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                          Drop your skill file here or click to browse your
                          computer.
                        </p>
                      </>
                    )}
                  </button>

                  {content && (
                    <div className="rounded-lg border bg-muted/20">
                      <div className="flex items-center gap-2 border-b px-3 py-2">
                        <FileCode2 className="size-3.5 text-muted-foreground" />

                        <span className="text-[11px] font-medium">Preview</span>
                      </div>

                      <pre className="max-h-48 overflow-auto p-3 font-mono text-[11px] leading-5 text-muted-foreground">
                        {content}
                      </pre>
                    </div>
                  )}
                </div>
              )}

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{
                      opacity: 0,
                      y: -3,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -3,
                    }}
                    className="text-xs text-destructive"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center justify-between border-t px-5 py-3">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <BookOpen className="size-3.5" />
              Reusable agent knowledge
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="h-8 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreate}
                className="h-8 rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Create skill
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

type SkillInfoDialogProps = {
  skill: Skill | null;
  onClose: () => void;
};

const SkillInfoDialog = ({ skill, onClose }: SkillInfoDialogProps) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setCopied(false);
  }, [skill]);

  const handleCopy = async () => {
    if (!skill) {
      return;
    }

    try {
      await navigator.clipboard.writeText(skill.content);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      // Clipboard access can be unavailable in some environments.
    }
  };

  if (!skill) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 12,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 8,
            scale: 0.98,
          }}
          transition={{
            duration: 0.18,
            ease: "easeOut",
          }}
          className="flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="skill-info-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <FileCode2 className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2
                    id="skill-info-title"
                    className="truncate text-sm font-semibold"
                  >
                    {skill.name}
                  </h2>

                  <span className="inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                    <FileCode2 className="size-3" />
                    MDX
                  </span>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Close"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between border-b px-5 py-2.5">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <BookOpen className="size-3.5" />
              Skill knowledge
            </div>

            <span className="text-[11px] text-muted-foreground">
              Updated {skill.updated}
            </span>
          </div>

          {/* Content */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="overflow-hidden rounded-xl border bg-muted/20">
              <div className="flex items-center justify-between border-b bg-muted/30 px-3 py-2">
                <div className="flex items-center gap-2">
                  <FileCode2 className="size-3.5 text-muted-foreground" />

                  <span className="text-[11px] font-medium">
                    {skill.name}.mdx
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-[10px] font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  {copied ? (
                    <>
                      <Check className="size-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="size-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <pre className="max-h-[55vh] overflow-auto p-5 font-mono text-xs leading-6 text-foreground/90">
                <code>{skill.content}</code>
              </pre>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end border-t px-5 py-3">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-md bg-primary px-3.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export const Skills = () => {
  const [search, setSearch] = React.useState("");
  const [skills, setSkills] = React.useState<Skill[]>(initialSkills);

  const [createOpen, setCreateOpen] = React.useState(false);

  const [selectedSkill, setSelectedSkill] = React.useState<Skill | null>(null);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredSkills = React.useMemo(() => {
    if (!normalizedSearch) {
      return skills;
    }

    return skills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(normalizedSearch) ||
        skill.description.toLowerCase().includes(normalizedSearch) ||
        skill.content.toLowerCase().includes(normalizedSearch),
    );
  }, [normalizedSearch, skills]);

  const handleCreateSkill = (skill: Skill) => {
    setSkills((current) => [skill, ...current]);
  };

  return (
    <>
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
              <h1 className="text-xl font-semibold tracking-tight">Skills</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Reusable knowledge for your AI agents
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="size-4" />

              <span className="hidden sm:inline">Create skill</span>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.2,
              delay: 0.05,
            }}
          >
            <Separator />
          </motion.div>

          {/* Search */}
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
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills..."
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

            <AnimatePresence mode="wait">
              {normalizedSearch && (
                <motion.p
                  key={filteredSkills.length}
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
                  className="text-xs text-muted-foreground"
                >
                  {filteredSkills.length}{" "}
                  {filteredSkills.length === 1 ? "skill" : "skills"}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Skill library */}
          <div className="pb-8">
            <AnimatePresence mode="popLayout">
              {filteredSkills.length > 0 ? (
                <motion.div
                  layout
                  className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredSkills.map((skill, index) => (
                    <motion.button
                      key={skill.id}
                      layout
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
                      transition={{
                        duration: 0.18,
                        delay: index * 0.035,
                        ease: "easeOut",
                      }}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="group flex min-h-[158px] flex-col rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/40"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                          <FileCode2 className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </div>

                        <div className="flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                          <FileCode2 className="size-3" />
                          MDX
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mt-4 min-w-0">
                        <h3 className="truncate text-sm font-medium">
                          {skill.name}
                        </h3>

                        <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted-foreground">
                          {skill.description}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto flex items-center justify-between pt-4 text-[11px] text-muted-foreground">
                        <span>{skill.updated}</span>

                        <span className="transition-colors group-hover:text-foreground">
                          Open skill
                        </span>
                      </div>
                    </motion.button>
                  ))}
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

                  <h3 className="text-sm font-medium">No skills found</h3>

                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    No skills match{" "}
                    <span className="font-medium text-foreground">
                      "{search}"
                    </span>
                    .
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 text-xs font-medium text-primary hover:underline"
                  >
                    Clear search
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <CreateSkillDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreate={handleCreateSkill}
      />

      <SkillInfoDialog
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </>
  );
};
