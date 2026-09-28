import data from "./data.json";
import type { ModelData } from "./types";

export const models = data.data as ModelData[];

export type { ModelData };