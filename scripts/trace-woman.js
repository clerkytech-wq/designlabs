const sharp = require('sharp');
const fs = require('fs');

async function inspectWomanContour() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  function getPixel(x, y) {
    const idx = (y * w + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }

  // Let's trace for each y from 60 to 397:
  // where the woman starts (leftmost dark pixel) and ends (rightmost dark/cyan pixel)
  console.log('Tracing woman profile:');
  for (let y = 70; y < 395; y += 15) {
    let minX = -1, maxX = -1;
    for (let x = 160; x < 520; x++) {
      const p = getPixel(x, y);
      const isWoman = (p[0] < 80 && p[1] < 70 && p[2] < 90) || 
                      (x >= 320 && p[2] > p[0] + 15 && p[2] > 60) || // cyan rim
                      (y >= 105 && y <= 175 && x >= 360 && x <= 465 && (p[0] < 140 || (p[0] > 180 && p[1] < 120))); // sunglasses
      if (isWoman) {
        if (minX === -1) minX = x;
        maxX = x;
      }
    }
    console.log(`y=${y}: minX=${minX}, maxX=${maxX}`);
  }
}
inspectWomanContour();
