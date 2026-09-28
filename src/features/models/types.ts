export interface ModelData {
  id: string;
  name: string;
  owned_by: string;

  type: string;

  description?: string;

  context_window: number;
  max_tokens: number;

  knowledge?: string;

  created?: number;
  released?: number;

  pricing: {
    input: string;
    output: string;
  };

  modalities: {
    input: string[];
    output: string[];
  };

  tags: string[];

  supported_parameters: string[];
}
