const sharp = require('sharp');
const path = require('path');

async function extractMark() {
  const footerLogoPath = path.join(__dirname, '../public/images/logo-designlabs-footer.png');
  const markPath = path.join(__dirname, '../public/images/logo-mark-terracotta.png');

  // Find width of the mark (where the non-white pixels are)
  const { data, info } = await sharp(footerLogoPath).raw().toBuffer({ resolveWithObject: true });

  let maxX = 0;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * info.channels;
      const a = info.channels === 4 ? data[idx + 3] : 255;
      if (a > 30) {
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        // If it's the terracotta mark: r is high, g is ~60, b is low
        if (r > 150 && g < 100 && b < 40) {
          if (x > maxX) maxX = x;
        }
      }
    }
  }

  console.log('Mark right edge x:', maxX);

  // Extract mark
  await sharp(footerLogoPath)
    .extract({ left: 0, top: 0, width: maxX + 5, height: info.height })
    .trim()
    .toFile(markPath);

  console.log('Saved logo-mark-terracotta.png!');
}

extractMark().catch(console.error);
