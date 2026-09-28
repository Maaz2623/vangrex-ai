export type ModelProvider =
  | "OpenAI"
  | "Amazon"
  | "Mistral"
  | "Meta"
  | "Anthropic";

export type ModelCapability =
  | "read"
  | "write"
  | "reasoning"
  | "vision"
  | "coding";

export type ModelRegion = "US" | "EU" | "Global";

export interface AIModel {
  id: string;
  name: string;
  provider: ModelProvider;
  model: string;

  // Model limits
  contextWindow: number;
  maxOutputTokens: number;

  // Pricing per 1M tokens
  pricing: {
    input: number;
    output: number;
    cachedInput?: number;
  };

  // Performance
  performance: {
    latency?: number; // seconds
    tokensPerSecond?: number;
  };

  // Capabilities
  capabilities: ModelCapability[];

  // Infrastructure / availability
  providers: string[];
  regions: ModelRegion[];

  // Metadata
  releaseDate: string;

  // Useful for UI
  featured?: boolean;
  popular?: boolean;
  status?: "available" | "beta" | "deprecated";
}

export const models: AIModel[] = [
  {
    id: "openai-o1",
    name: "OpenAI o1",
    provider: "OpenAI",
    model: "openai/o1",

    contextWindow: 200_000,
    maxOutputTokens: 100_000,

    pricing: {
      input: 15,
      output: 60,
      cachedInput: 7.5,
    },

    performance: {
      latency: 0.7,
      tokensPerSecond: 172,
    },

    capabilities: ["read", "reasoning"],

    providers: ["azure", "openai"],
    regions: ["Global"],

    releaseDate: "2024-12-05",
    featured: true,
    popular: true,
    status: "available",
  },

  {
    id: "amazon-nova-lite",
    name: "Amazon Nova Lite",
    provider: "Amazon",
    model: "amazon/nova-lite",

    contextWindow: 300_000,
    maxOutputTokens: 8_000,

    pricing: {
      input: 0.06,
      output: 0.24,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 168,
    },

    capabilities: [],

    providers: ["bedrock"],
    regions: ["EU"],

    releaseDate: "2024-12-03",
    status: "available",
  },

  {
    id: "amazon-nova-micro",
    name: "Amazon Nova Micro",
    provider: "Amazon",
    model: "amazon/nova-micro",

    contextWindow: 128_000,
    maxOutputTokens: 8_000,

    pricing: {
      input: 0.04,
      output: 0.14,
    },

    performance: {
      latency: 0.4,
    },

    capabilities: [],

    providers: ["bedrock"],
    regions: ["EU"],

    releaseDate: "2024-12-03",
    status: "available",
  },

  {
    id: "amazon-nova-pro",
    name: "Amazon Nova Pro",
    provider: "Amazon",
    model: "amazon/nova-pro",

    contextWindow: 300_000,
    maxOutputTokens: 8_000,

    pricing: {
      input: 0.8,
      output: 3.2,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 107,
    },

    capabilities: [],

    providers: ["bedrock"],
    regions: ["EU"],

    releaseDate: "2024-12-03",
    popular: true,
    status: "available",
  },

  {
    id: "mistral-3b",
    name: "Mistral 3B",
    provider: "Mistral",
    model: "mistral/mistral-3b",

    contextWindow: 131_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.1,
      output: 0.1,
      cachedInput: 0.01,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 71,
    },

    capabilities: ["read"],

    providers: ["mistral"],
    regions: ["Global"],

    releaseDate: "2024-10-16",
    status: "available",
  },

  {
    id: "mistral-8b",
    name: "Mistral 8B",
    provider: "Mistral",
    model: "mistral/mistral-8b",

    contextWindow: 262_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.15,
      output: 0.15,
      cachedInput: 0.02,
    },

    performance: {
      latency: 0.3,
      tokensPerSecond: 96,
    },

    capabilities: ["read"],

    providers: ["mistral"],
    regions: ["Global"],

    releaseDate: "2024-10-16",
    status: "available",
  },

  {
    id: "mistral-small",
    name: "Mistral Small",
    provider: "Mistral",
    model: "mistral/mistral-small",

    contextWindow: 262_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.15,
      output: 0.6,
      cachedInput: 0.02,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 165,
    },

    capabilities: ["read"],

    providers: ["mistral"],
    regions: ["Global"],

    releaseDate: "2024-09-17",
    status: "available",
  },

  {
    id: "meta-llama-3.1-8b",
    name: "Llama 3.1 8B",
    provider: "Meta",
    model: "meta/llama-3.1-8b",

    contextWindow: 128_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 0.02,
      output: 0.05,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 181,
    },

    capabilities: [],

    providers: ["bedrock", "novita"],
    regions: ["Global"],

    releaseDate: "2024-07-23",
    status: "available",
  },

  {
    id: "meta-llama-3.1-70b",
    name: "Llama 3.1 70B",
    provider: "Meta",
    model: "meta/llama-3.1-70b",

    contextWindow: 131_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 0.72,
      output: 0.72,
    },

    performance: {
      latency: 0.3,
      tokensPerSecond: 111,
    },

    capabilities: [],

    providers: ["bedrock", "deepinfra"],
    regions: ["Global"],

    releaseDate: "2024-07-23",
    popular: true,
    status: "available",
  },

  {
    id: "openai-gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    model: "openai/gpt-4o-mini",

    contextWindow: 128_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 0.15,
      output: 0.6,
      cachedInput: 0.08,
    },

    performance: {
      latency: 0.7,
      tokensPerSecond: 84,
    },

    capabilities: ["read"],

    providers: ["azure", "openai"],
    regions: ["Global"],

    releaseDate: "2024-07-18",
    popular: true,
    status: "available",
  },

  {
    id: "openai-gpt-4o-mini-fast",
    name: "GPT-4o Mini Fast",
    provider: "OpenAI",
    model: "openai/gpt-4o-mini-fast",

    contextWindow: 128_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 0.25,
      output: 1,
      cachedInput: 0.13,
    },

    performance: {
      latency: 0.5,
    },

    capabilities: ["read"],

    providers: ["openai"],
    regions: ["Global"],

    releaseDate: "2024-07-18",
    status: "available",
  },

  {
    id: "mistral-nemo",
    name: "Mistral Nemo",
    provider: "Mistral",
    model: "mistral/mistral-nemo",

    contextWindow: 131_000,
    maxOutputTokens: 131_000,

    pricing: {
      input: 0.02,
      output: 0.03,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 77,
    },

    capabilities: [],

    providers: ["deepinfra", "novita"],
    regions: ["Global"],

    releaseDate: "2024-07-18",
    status: "available",
  },

  {
    id: "mistral-codestral",
    name: "Codestral",
    provider: "Mistral",
    model: "mistral/codestral",

    contextWindow: 128_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.3,
      output: 0.9,
      cachedInput: 0.03,
    },

    performance: {
      latency: 0.4,
      tokensPerSecond: 113,
    },

    capabilities: ["read", "coding"],

    providers: ["mistral"],
    regions: ["Global"],

    releaseDate: "2024-05-29",
    status: "available",
  },

  {
    id: "openai-gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    model: "openai/gpt-4o",

    contextWindow: 128_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 2.5,
      output: 10,
      cachedInput: 1.25,
    },

    performance: {
      latency: 0.7,
      tokensPerSecond: 87,
    },

    capabilities: ["read", "vision"],

    providers: ["azure", "openai"],
    regions: ["Global"],

    releaseDate: "2024-05-13",
    featured: true,
    popular: true,
    status: "available",
  },

  {
    id: "openai-gpt-4o-fast",
    name: "GPT-4o Fast",
    provider: "OpenAI",
    model: "openai/gpt-4o-fast",

    contextWindow: 128_000,
    maxOutputTokens: 16_000,

    pricing: {
      input: 4.25,
      output: 17,
      cachedInput: 2.13,
    },

    performance: {
      latency: 0.6,
      tokensPerSecond: 9,
    },

    capabilities: ["read"],

    providers: ["openai"],
    regions: ["Global"],

    releaseDate: "2024-05-13",
    status: "available",
  },

  {
    id: "openai-gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    model: "openai/gpt-4-turbo",

    contextWindow: 128_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 10,
      output: 30,
    },

    performance: {
      latency: 0.8,
      tokensPerSecond: 40,
    },

    capabilities: [],

    providers: ["openai"],
    regions: ["Global"],

    releaseDate: "2024-04-09",
    status: "available",
  },

  {
    id: "anthropic-claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "Anthropic",
    model: "anthropic/claude-3-haiku",

    contextWindow: 200_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.25,
      output: 1.25,
      cachedInput: 0.03,
    },

    performance: {},

    capabilities: ["read", "write"],

    providers: ["bedrock", "vertex"],
    regions: ["Global"],

    releaseDate: "2024-03-13",
    status: "available",
  },

  {
    id: "openai-gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "OpenAI",
    model: "openai/gpt-3.5-turbo",

    contextWindow: 16_000,
    maxOutputTokens: 4_000,

    pricing: {
      input: 0.5,
      output: 1.5,
    },

    performance: {
      latency: 0.5,
    },

    capabilities: [],

    providers: [],
    regions: ["Global"],

    releaseDate: "2024-01-01",
    status: "available",
  },
];

export const modelFilters = {
  providers: ["All", "OpenAI", "Anthropic", "Mistral", "Meta", "Amazon"],

  capabilities: ["All", "Reasoning", "Vision", "Coding", "Read", "Write"],

  regions: ["All", "US", "EU", "Global"],

  sort: [
    "Recommended",
    "Newest",
    "Price: Low to High",
    "Price: High to Low",
    "Fastest",
    "Largest Context",
  ],
} as const;

export function filterModels(
  models: AIModel[],
  filters: {
    search?: string;
    provider?: string;
    capability?: string;
    region?: string;
  },
) {
  return models.filter((model) => {
    const search = filters.search?.toLowerCase().trim();

    const matchesSearch =
      !search ||
      model.name.toLowerCase().includes(search) ||
      model.model.toLowerCase().includes(search) ||
      model.provider.toLowerCase().includes(search);

    const matchesProvider =
      !filters.provider ||
      filters.provider === "All" ||
      model.provider === filters.provider;

    const matchesCapability =
      !filters.capability ||
      filters.capability === "All" ||
      model.capabilities.includes(
        filters.capability.toLowerCase() as ModelCapability,
      );

    const matchesRegion =
      !filters.region ||
      filters.region === "All" ||
      model.regions.includes(filters.region as ModelRegion);

    return (
      matchesSearch && matchesProvider && matchesCapability && matchesRegion
    );
  });
}
