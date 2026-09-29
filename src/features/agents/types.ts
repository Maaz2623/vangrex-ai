import type { ElementType } from "react";

export type Agent = {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: ElementType;
  image?: string;

  version: string;
  status: "Published" | "Draft";

  usage: string;
  model: string;

  tools: string[];
  capabilities: string[];

  createdAt: string;
  updatedAt: string;
};
