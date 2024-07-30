import fs from 'fs';
import os from 'os';
import path from 'path';
import sharp from 'sharp';

/*
 * Generates the blur data URL of an image.
 * @param inputImagePath - The path of the image.
 * @returns The blurred data URL of the image.
 */
export async function generateBlurDataUrl(inputImagePath: string) {
  const inputFilePath = path.join(process.cwd(), 'public', inputImagePath);
  const tempDir = os.tmpdir();
  const outputImagePath = path.join(tempDir, 'blurred.jpg');

  // Check if the input file exists
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`Input file is missing: ${inputFilePath}`);
  }
  
  // Generate a small, blurred version of the image
  await sharp(inputFilePath)
    .resize(20) // Resize the image to a smaller size
    .blur(10)   // Apply a strong blur
    .toFile(outputImagePath);

  // Convert the blurred image to a Base64-encoded string
  const base64Image = fs.readFileSync(outputImagePath).toString('base64');
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;

  return dataUrl;
}