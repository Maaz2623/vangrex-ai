import { Model } from "@/features/models/components/model";
import type { ModelsResponse } from "@/features/models/types";

const ModelsPage = async () => {
  const response = await fetch("https://ai-gateway.vercel.sh/v1/models", {
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch models: ${response.status}`);
  }

  const data = (await response.json()) as ModelsResponse;

  console.log(data.data);

  return <Model models={data.data} />;
};

export default ModelsPage;
