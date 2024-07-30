const fs = require('fs');
const os = require('os');
const path = require('path');
const sharp = require('sharp');

/*
 * Generates the blur data URL of an image.
 * Will be running this at build time.
 * @param inputImagePath - The path of the image.
 * @returns The blurred data URL of the image.
 */

// Get the path to the images directory and the list of excluded directories
const imagesDirectory = path.join(process.cwd(), 'public', 'images');
const excludedDirectories = ['favicon'];

async function generateBlurDataUrl(inputImagePath: string) {
  const inputFilePath = path.join(process.cwd(), 'public', inputImagePath);
  const tempDir = os.tmpdir();
  const outputImagePath = path.join(tempDir, 'blurred.jpg');

  // Check if the input file exists
  if (!fs.existsSync(inputFilePath)) {
    throw new Error(`Input file is missing: ${inputFilePath}`);
  }

  await sharp(inputFilePath)
    .resize({ width: 500, withoutEnlargement: true }) // Resize the image to a smaller dimension first (adjust as necessary)
    .toFile(outputImagePath);
  
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

// Get all image files in the images directory
async function getAllImageFiles(dir: string): Promise<string[]> {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded directories
    if (stat.isDirectory() && excludedDirectories.includes(file)) {
      continue;
    }

    if (stat && stat.isDirectory()) {
      results = results.concat(await getAllImageFiles(filePath));
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      results.push(path.relative(imagesDirectory, filePath).replace(/\\+/g, '/'));
    }
  }

  return results;
}

// Script to run at build time to generate the blur data URLs
async function generateAllBlurDataUrls() {
  const blurDataUrls: Record<string, string> = {};

  const imageFiles = await getAllImageFiles(imagesDirectory);

  for (const file of imageFiles) {
    const imagePath = path.join('/images', file).replace(/\\+/g, '/');
    const blurDataUrl = await generateBlurDataUrl(imagePath);
    blurDataUrls[imagePath] = blurDataUrl;
  }

  // Save to a temporary JSON file
  fs.writeFileSync(
    path.join(process.cwd(), 'data', 'blurDataUrls.json'),
    JSON.stringify(blurDataUrls, null, 2)
  );
}

generateAllBlurDataUrls().catch(console.error);