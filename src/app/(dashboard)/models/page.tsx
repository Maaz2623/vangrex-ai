import { models } from "@/features/models";
import { Model } from "@/features/models/components/model";

const ModelsPage = async () => {
  return <Model models={models} />;
};

export default ModelsPage;
