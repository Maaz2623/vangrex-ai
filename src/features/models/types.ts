// features/models/types.ts

export type ModelType =
  | "language"
  | "embedding"
  | "reranking"
  | "image"
  | "audio"
  | "video"
  | "other";

export type ModelData = {
  id: string;
  object: "model";

  name: string;
  description: string;

  owned_by: string;

  type: ModelType;

  created: number;
  released: number;
  knowledge?: string;

  context_window: number;
  max_tokens: number;

  modalities: {
    input: string[];
    output: string[];
  };

  pricing: {
    input: string;
    output: string;
    input_cache_read?: string;
    input_cache_write?: string;
  };

  tags: string[];

  supported_parameters: string[];

  supported_specifications: string[];

  reasoning_options: {
    effort?: string;
    [key: string]: unknown;
  }[];

  temperature: boolean;

  zdr: "all" | "some" | "none";

  no_training: "all" | "some" | "none";
};

export type ModelsResponse = {
  object: "list";
  data: ModelData[];
};
