"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Bot,
  Check,
  FileArchive,
  FileCode2,
  FileText,
  Package,
  Plus,
  Search,
  Shield,
  Upload,
  X,
  GitBranch,
  Activity,
  Globe,
  Lock,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

type Skill = {
  id: string;
  name: string;
  description: string;
  version: string;
  updated: string;
  agents: number;
  runs: number;
  lastUsed: string;
  published: boolean;
  fileCount: number;
  hasReferences: boolean;
  hasScripts: boolean;
  hasAssets: boolean;
};

const initialSkills: Skill[] = [
  {
    id: "skill_001",
    name: "Web Research",
    description:
      "Guidelines for researching the web, evaluating sources, and synthesizing reliable findings.",
    version: "1.2.0",
    updated: "Today",
    agents: 8,
    runs: 342,
    lastUsed: "12 min ago",
    published: true,
    fileCount: 4,
    hasReferences: true,
    hasScripts: false,
    hasAssets: false,
  },
  {
    id: "skill_002",
    name: "Code Generation",
    description:
      "Instructions for writing, refactoring, debugging, and reviewing production-ready code.",
    version: "2.0.1",
    updated: "Today",
    agents: 14,
    runs: 1284,
    lastUsed: "3 min ago",
    published: true,
    fileCount: 9,
    hasReferences: true,
    hasScripts: true,
    hasAssets: true,
  },
  {
    id: "skill_003",
    name: "Document Analysis",
    description:
      "A reusable methodology for reading, extracting, summarizing, and structuring information from documents.",
    version: "1.0.0",
    updated: "Yesterday",
    agents: 4,
    runs: 87,
    lastUsed: "2 hr ago",
    published: false,
    fileCount: 2,
    hasReferences: true,
    hasScripts: false,
    hasAssets: false,
  },
  {
    id: "skill_004",
    name: "Data Analysis",
    description:
      "Instructions for analyzing datasets, identifying patterns, and communicating useful insights.",
    version: "1.1.0",
    updated: "Yesterday",
    agents: 6,
    runs: 213,
    lastUsed: "5 hr ago",
    published: true,
    fileCount: 6,
    hasReferences: true,
    hasScripts: true,
    hasAssets: false,
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
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [version, setVersion] = React.useState("1.0.0");
  const [folderName, setFolderName] = React.useState("");
  const [fileCount, setFileCount] = React.useState(0);
  const [hasSkillFile, setHasSkillFile] = React.useState(false);
  const [hasReferences, setHasReferences] = React.useState(false);
  const [hasScripts, setHasScripts] = React.useState(false);
  const [hasAssets, setHasAssets] = React.useState(false);
  const [publish, setPublish] = React.useState(false);
  const [error, setError] = React.useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const reset = () => {
    setName("");
    setDescription("");
    setVersion("1.0.0");
    setFolderName("");
    setFileCount(0);
    setHasSkillFile(false);
    setHasReferences(false);
    setHasScripts(false);
    setHasAssets(false);
    setPublish(false);
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

  const handleFolder = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) {
      return;
    }

    const skillFile = files.find((file) =>
      file.name.toLowerCase().endsWith("skill.md"),
    );

    if (!skillFile) {
      setError(
        "This folder does not contain a SKILL.md file. A valid skill must have SKILL.md as its entry point.",
      );
      setHasSkillFile(false);
      return;
    }

    const firstPath = files[0].webkitRelativePath;
    const rootFolder = firstPath?.split("/")[0] ?? "skill";

    const hasReferencesFolder = files.some((file) =>
      file.webkitRelativePath.toLowerCase().includes("/references/"),
    );

    const hasScriptsFolder = files.some((file) =>
      file.webkitRelativePath.toLowerCase().includes("/scripts/"),
    );

    const hasAssetsFolder = files.some((file) =>
      file.webkitRelativePath.toLowerCase().includes("/assets/"),
    );

    setFolderName(rootFolder);
    setFileCount(files.length);
    setHasSkillFile(true);
    setHasReferences(hasReferencesFolder);
    setHasScripts(hasScriptsFolder);
    setHasAssets(hasAssetsFolder);
    setError("");

    if (!name) {
      setName(
        rootFolder
          .replace(/[-_]+/g, " ")
          .replace(/\b\w/g, (character) => character.toUpperCase()),
      );
    }
  };

  const handleCreate = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Give your skill a name.");
      return;
    }

    if (!hasSkillFile) {
      setError("Upload a skill folder containing SKILL.md.");
      return;
    }

    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      setError("Version must use semantic versioning, for example 1.0.0.");
      return;
    }

    const skill: Skill = {
      id: `skill_${Date.now()}`,
      name: trimmedName,
      description:
        description.trim() || "Reusable knowledge for your AI agents.",
      version,
      updated: "Just now",
      agents: 0,
      runs: 0,
      lastUsed: "Never",
      published: publish,
      fileCount,
      hasReferences,
      hasScripts,
      hasAssets,
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
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-skill-title"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div>
              <h2 id="create-skill-title" className="text-sm font-semibold">
                Add skill
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Upload a complete skill package for your agents.
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

          {/* Body */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="space-y-5">
              {/* Skill identity */}
              <div className="grid gap-4 sm:grid-cols-[1fr_160px]">
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
                    htmlFor="skill-version"
                    className="flex items-center gap-1.5 text-xs font-medium"
                  >
                    <GitBranch className="size-3.5 text-muted-foreground" />
                    Version
                  </label>

                  <Input
                    id="skill-version"
                    value={version}
                    onChange={(event) => setVersion(event.target.value)}
                    placeholder="1.0.0"
                    className="h-9 font-mono"
                  />
                </div>
              </div>

              {/* Description */}
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
                  placeholder="What does this skill teach your agents?"
                  className="h-9"
                />
              </div>

              {/* Upload */}
              <div className="space-y-2">
                <label className="text-xs font-medium">Skill package</label>

                <input
                  ref={fileInputRef}
                  type="file"
                  // @ts-expect-error webkitdirectory is supported by browsers
                  webkitdirectory=""
                  multiple
                  onChange={handleFolder}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex min-h-[190px] w-full flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 px-6 text-center transition-colors hover:bg-muted/40"
                >
                  <div className="mb-4 flex size-11 items-center justify-center rounded-full border bg-background shadow-sm">
                    {hasSkillFile ? (
                      <Check className="size-4" />
                    ) : (
                      <Upload className="size-4 text-muted-foreground" />
                    )}
                  </div>

                  {hasSkillFile ? (
                    <>
                      <p className="text-sm font-medium">{folderName}</p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {fileCount} files · SKILL.md detected
                      </p>

                      <p className="mt-3 text-[11px] text-muted-foreground">
                        Click to replace package
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Upload skill folder</p>

                      <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
                        Select the complete skill directory containing SKILL.md
                        and any supporting files.
                      </p>
                    </>
                  )}
                </button>
              </div>

              {/* Package structure */}
              {hasSkillFile && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border"
                >
                  <div className="border-b px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Package className="size-3.5 text-muted-foreground" />
                      <span className="text-xs font-medium">
                        Package contents
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-px bg-border sm:grid-cols-4">
                    <div className="bg-background px-4 py-3">
                      <FileCode2 className="size-3.5 text-muted-foreground" />
                      <p className="mt-2 text-xs font-medium">SKILL.md</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        Entry point
                      </p>
                    </div>

                    <div className="bg-background px-4 py-3">
                      <FileText className="size-3.5 text-muted-foreground" />
                      <p className="mt-2 text-xs font-medium">References</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {hasReferences ? "Included" : "None"}
                      </p>
                    </div>

                    <div className="bg-background px-4 py-3">
                      <Activity className="size-3.5 text-muted-foreground" />
                      <p className="mt-2 text-xs font-medium">Scripts</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {hasScripts ? "Included" : "None"}
                      </p>
                    </div>

                    <div className="bg-background px-4 py-3">
                      <FileArchive className="size-3.5 text-muted-foreground" />
                      <p className="mt-2 text-xs font-medium">Assets</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground">
                        {hasAssets ? "Included" : "None"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Versioning */}
              <div className="rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <GitBranch className="size-3.5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium">Versioning</p>

                    <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                      Skills use semantic versions. Create a new version when
                      you change the instructions or supporting files.
                    </p>
                  </div>
                </div>
              </div>

              {/* Publish */}
              <button
                type="button"
                onClick={() => setPublish((value) => !value)}
                className="flex w-full items-start gap-3 rounded-xl border p-4 text-left transition-colors hover:bg-muted/30"
              >
                <div
                  className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${
                    publish ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  {publish ? (
                    <Globe className="size-3.5" />
                  ) : (
                    <Lock className="size-3.5 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">
                    {publish ? "Publish skill" : "Keep private"}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    {publish
                      ? "Make this skill available for use outside your private workspace."
                      : "Keep the skill private to your workspace and connected agents."}
                  </p>
                </div>

                <div
                  className={`mt-1 flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    publish ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <div
                    className={`size-4 rounded-full bg-background shadow-sm transition-transform ${
                      publish ? "translate-x-4" : ""
                    }`}
                  />
                </div>
              </button>

              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive"
                >
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-5 py-3">
            <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
              <Shield className="size-3.5" />
              Skill contents remain private
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
                {publish ? "Create & publish" : "Create skill"}
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
          initial={{ opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border bg-background shadow-2xl"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b px-5 py-4">
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                <FileCode2 className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="truncate text-sm font-semibold">
                    {skill.name}
                  </h2>

                  <span className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                    v{skill.version}
                  </span>

                  {skill.published ? (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      <Globe className="size-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-[10px] font-medium text-muted-foreground">
                      <Lock className="size-3" />
                      Private
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Content */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5">
            <div className="space-y-5">
              {/* Usage */}
              <section>
                <div className="mb-3 flex items-center gap-2">
                  <Activity className="size-3.5 text-muted-foreground" />
                  <h3 className="text-xs font-medium">Usage</h3>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Bot className="size-3.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        Agents
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-semibold">{skill.agents}</p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <Activity className="size-3.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        Runs
                      </span>
                    </div>

                    <p className="mt-2 text-lg font-semibold">
                      {skill.runs.toLocaleString()}
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <div className="flex items-center gap-2">
                      <GitBranch className="size-3.5 text-muted-foreground" />
                      <span className="text-[10px] text-muted-foreground">
                        Version
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-sm font-semibold">
                      {skill.version}
                    </p>
                  </div>
                </div>
              </section>

              {/* About */}
              <section className="rounded-xl border p-4">
                <div className="flex items-start gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FileText className="size-3.5 text-muted-foreground" />
                  </div>

                  <div>
                    <h3 className="text-xs font-medium">About this skill</h3>

                    <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
                      {skill.description}
                    </p>

                    <p className="mt-3 text-[11px] leading-5 text-muted-foreground">
                      This skill provides specialized knowledge that connected
                      agents can use when performing relevant tasks. Its
                      internal instructions and supporting resources are kept
                      private.
                    </p>
                  </div>
                </div>
              </section>

              {/* Package */}
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Package className="size-3.5 text-muted-foreground" />
                    <h3 className="text-xs font-medium">Skill package</h3>
                  </div>

                  <span className="text-[10px] text-muted-foreground">
                    {skill.fileCount} files
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border">
                  <div className="flex items-center gap-3 border-b px-4 py-3">
                    <FileCode2 className="size-4 text-muted-foreground" />

                    <div className="min-w-0">
                      <p className="text-xs font-medium">SKILL.md</p>
                      <p className="text-[10px] text-muted-foreground">
                        Skill entry point
                      </p>
                    </div>

                    <Check className="ml-auto size-3.5" />
                  </div>

                  {skill.hasReferences && (
                    <div className="flex items-center gap-3 border-b px-4 py-3">
                      <FileText className="size-4 text-muted-foreground" />
                      <span className="text-xs">references/</span>
                    </div>
                  )}

                  {skill.hasScripts && (
                    <div className="flex items-center gap-3 border-b px-4 py-3">
                      <Activity className="size-4 text-muted-foreground" />
                      <span className="text-xs">scripts/</span>
                    </div>
                  )}

                  {skill.hasAssets && (
                    <div className="flex items-center gap-3 px-4 py-3">
                      <FileArchive className="size-4 text-muted-foreground" />
                      <span className="text-xs">assets/</span>
                    </div>
                  )}
                </div>
              </section>

              {/* Privacy */}
              <div className="flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
                <Shield className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                <div>
                  <p className="text-xs font-medium">
                    Skill contents are private
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-muted-foreground">
                    Agents can use this skill when connected, but its underlying
                    instructions and files aren't exposed in this view.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t px-5 py-3">
            <span className="text-[11px] text-muted-foreground">
              Last used {skill.lastUsed}
            </span>

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
        skill.description.toLowerCase().includes(normalizedSearch),
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
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="flex items-center justify-between gap-4"
          >
            <div className="min-w-0">
              <h1 className="text-xl font-semibold tracking-tight">Skills</h1>

              <p className="mt-1 text-sm text-muted-foreground">
                Reusable capabilities for your AI agents
              </p>
            </div>

            <button
              type="button"
              onClick={() => setCreateOpen(true)}
              className="inline-flex h-9 shrink-0 items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">Add skill</span>
            </button>
          </motion.div>

          <Separator />

          {/* Search */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search skills..."
                className="h-10 pl-9"
              />
            </div>

            {normalizedSearch && (
              <p className="text-xs text-muted-foreground">
                {filteredSkills.length}{" "}
                {filteredSkills.length === 1 ? "skill" : "skills"}
              </p>
            )}
          </div>

          {/* Cards */}
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
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{
                        duration: 0.18,
                        delay: index * 0.035,
                        ease: "easeOut",
                      }}
                      type="button"
                      onClick={() => setSelectedSkill(skill)}
                      className="group flex min-h-[190px] flex-col rounded-xl border bg-background p-4 text-left transition-colors hover:bg-muted/40"
                    >
                      {/* Top */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                          <FileCode2 className="size-4 text-muted-foreground transition-colors group-hover:text-foreground" />
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-muted px-2 py-1 font-mono text-[10px] font-medium text-muted-foreground">
                            v{skill.version}
                          </span>

                          {skill.published ? (
                            <Globe className="size-3.5 text-muted-foreground" />
                          ) : (
                            <Lock className="size-3.5 text-muted-foreground" />
                          )}
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

                      {/* Statistics */}
                      <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <Bot className="size-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">
                              Agents
                            </span>
                          </div>

                          <p className="mt-1 text-xs font-semibold">
                            {skill.agents}
                          </p>
                        </div>

                        <div className="rounded-lg bg-muted/50 px-3 py-2">
                          <div className="flex items-center gap-1.5">
                            <Activity className="size-3 text-muted-foreground" />
                            <span className="text-[10px] text-muted-foreground">
                              Runs
                            </span>
                          </div>

                          <p className="mt-1 text-xs font-semibold">
                            {skill.runs.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                        <span>Updated {skill.updated}</span>

                        <span className="transition-colors group-hover:text-foreground">
                          View details
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              ) : (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-xl border border-dashed px-6 text-center">
                  <div className="mb-4 flex size-10 items-center justify-center rounded-full bg-muted">
                    <Search className="size-4 text-muted-foreground" />
                  </div>

                  <h3 className="text-sm font-medium">No skills found</h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    No skills match "{search}".
                  </p>

                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="mt-4 text-xs font-medium text-primary hover:underline"
                  >
                    Clear search
                  </button>
                </div>
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
