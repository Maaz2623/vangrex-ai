import fs from "node:fs/promises";
import path from "node:path";

const URL = "https://ai-gateway.vercel.sh/v1/models";

async function main() {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch models: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  const filePath = path.join(process.cwd(), "src/features/models/data.json");

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");

  console.log(`Synced ${data.data.length} models.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
