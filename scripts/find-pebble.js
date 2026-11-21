const sharp = require('sharp');
const path = require('path');

async function findPebbleWidth() {
  const footerLogoPath = path.join(__dirname, '../public/images/logo-designlabs-footer.png');
  const { data, info } = await sharp(footerLogoPath).raw().toBuffer({ resolveWithObject: true });

  // For each column x from 0 to 350, count non-transparent terracotta pixels
  const colCounts = [];
  for (let x = 0; x < 350; x++) {
    let count = 0;
    for (let y = 0; y < info.height; y++) {
      const idx = (y * info.width + x) * info.channels;
      const a = info.channels === 4 ? data[idx + 3] : 255;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      if (a > 30 && r > 140 && g < 100 && b < 50) {
        count++;
      }
    }
    colCounts.push({ x, count });
  }

  // Find where count drops to 0 after being positive
  let passedPebble = false;
  let pebbleEnd = 0;
  for (let i = 20; i < colCounts.length; i++) {
    if (colCounts[i].count === 0 && colCounts[i-1].count > 0) {
      pebbleEnd = colCounts[i-1].x;
      break;
    }
  }

  console.log('Pebble ends at x =', pebbleEnd);

  const markPath = path.join(__dirname, '../public/images/logo-mark-terracotta.png');
  await sharp(footerLogoPath)
    .extract({ left: 0, top: 0, width: pebbleEnd + 1, height: info.height })
    .trim()
    .toFile(markPath);

  const meta = await sharp(markPath).metadata();
  console.log('Saved isolated pebble mark:', meta);
}

findPebbleWidth().catch(console.error);
