import fs from 'fs';
import path from 'path';

let blurDataUrls: Record<string, string> | null = null;

const getBlurDataUrls = (): Record<string, string> => {
  if (!blurDataUrls) {
    const jsonFilePath = path.join(process.cwd(), 'data', 'blurDataUrls.json');
    blurDataUrls = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
  }
  return blurDataUrls as Record<string, string>;
};

export default getBlurDataUrls;