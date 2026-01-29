const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const imagesDir = path.join(publicDir, 'images');

// Supported image extensions
const imageExtensions = ['.jpg', '.jpeg', '.png'];

// Compression quality
const QUALITY = 80;

async function optimizeImage(filePath, relativePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!imageExtensions.includes(ext)) {
    return;
  }

  const fileName = path.basename(filePath, ext);
  const dirName = path.dirname(filePath);
  const webpPath = path.join(dirName, `${fileName}.webp`);

  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    console.log(`⏭️  Skipping ${relativePath} (WebP already exists)`);
    return;
  }

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    // Convert to WebP
    await sharp(filePath)
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const newStats = fs.statSync(webpPath);
    const newSize = newStats.size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✅ ${relativePath}`);
    console.log(`   ${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
  }
}

async function processDirectory(dir, baseDir = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      await processDirectory(fullPath, baseDir);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath, relativePath);
    }
  }
}

async function main() {
  console.log('🖼️  Starting image optimization...\n');

  // Process images directory
  if (fs.existsSync(imagesDir)) {
    console.log('📁 Processing images directory...');
    await processDirectory(imagesDir);
  }

  // Process logo.png in public root
  const logoPath = path.join(publicDir, 'logo.png');
  if (fs.existsSync(logoPath)) {
    console.log('\n📁 Processing public root...');
    await optimizeImage(logoPath, 'logo.png');
  }

  console.log('\n✨ Image optimization complete!');
}

main().catch(console.error);
