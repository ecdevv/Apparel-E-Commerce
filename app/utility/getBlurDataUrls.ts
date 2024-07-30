import fs from 'fs';
import path from 'path';

// Find the file path of the JSON file and initialize the global cache variable
const jsonFilePath = path.join(process.cwd(), 'data', 'blurDataUrls.json');
let cachedBlurDataUrls: Record<string, string> | null = null;

export async function getBlurDataUrls(): Promise<Record<string, string>> {
  if (cachedBlurDataUrls) {
    return cachedBlurDataUrls;
  }

  if (!fs.existsSync(jsonFilePath)) {
    throw new Error(`JSON file not found: ${jsonFilePath}`);
  }
  
  const blurDataUrls = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
  cachedBlurDataUrls = blurDataUrls;
  return blurDataUrls;
}

export default getBlurDataUrls;