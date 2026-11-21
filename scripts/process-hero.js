const sharp = require('sharp');
const fs = require('fs');

async function processHeroSilhouette() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Create an RGBA buffer for the extracted woman
  const out = Buffer.alloc(w * h * 4);

  // User gradient image
  const gradPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794681256717_823c8145.png';
  const gradResized = await sharp(gradPath).resize(w, h).raw().toBuffer({ resolveWithObject: true });
  const gData = gradResized.data;

  // Let's create two outputs:
  // 1. woman-transparent.png (woman with alpha channel, clean)
  // 2. hero-composite.jpg (woman on top of user's gradient)
  const comp = Buffer.alloc(w * h * 3);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * info.channels;
      const gIdx = (y * w + x) * gradResized.info.channels;
      const oIdx = (y * w + x) * 4;
      const cIdx = (y * w + x) * 3;

      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];

      // Check if this pixel is inside the woman's bounding region
      const inWomanRegion = (x >= 170 && x <= 500 && y >= 60 && y <= 397);

      // Check if pixel is white text ("Agency" or others)
      const isWhiteText = (r > 190 && g > 190 && b > 190);

      // Inpainting white text inside the woman's chest:
      // Woman's chest/neck covers x from 250 to 390, y from 225 to 275
      if (inWomanRegion && isWhiteText && x >= 240 && x <= 390 && y >= 225 && y <= 275) {
        // Inpaint with woman's dark indigo
        r = 20;
        g = 16;
        b = 39;
      }

      // Determine if pixel belongs to woman:
      // Woman characteristics:
      // 1. Dark silhouette: r < 100 && g < 80 && b < 100
      // 2. Sunglasses: in eye region (x: 370..470, y: 105..175) with orange/glow
      // 3. Cyan rim lighting: neck/chin (x: 340..450, y: 260..395) where b > r and b > 70
      // 4. Hair bun warm rim light: top/back edge
      
      const isDarkBody = (r < 80 && g < 70 && b < 90);
      const isCyanRim = (x >= 320 && x <= 460 && y >= 260 && b > r + 20 && b > 50);
      const isSunglasses = (x >= 370 && x <= 470 && y >= 105 && y <= 175);
      const isWarmHairRim = (x >= 170 && x <= 340 && y >= 60 && y <= 200 && r > 100 && r < 200 && g < 100);

      let isWoman = false;
      let alpha = 0;

      if (inWomanRegion) {
        if (isDarkBody) {
          isWoman = true;
          alpha = 255;
        } else if (isCyanRim) {
          isWoman = true;
          alpha = 255;
        } else if (isSunglasses && (r > 60 || g > 40 || b > 40)) {
          isWoman = true;
          alpha = 255;
        } else if (isWarmHairRim) {
          isWoman = true;
          alpha = 255;
        } else {
          // Check edge feathering
          if (r < 130 && g < 100 && b < 120) {
            isWoman = true;
            alpha = Math.max(0, Math.min(255, Math.round((130 - r) * 3)));
          }
        }
      }

      if (isWoman && alpha > 0) {
        out[oIdx] = r;
        out[oIdx + 1] = g;
        out[oIdx + 2] = b;
        out[oIdx + 3] = alpha;

        // Composite over user gradient
        const aNorm = alpha / 255;
        comp[cIdx] = Math.round(r * aNorm + gData[gIdx] * (1 - aNorm));
        comp[cIdx + 1] = Math.round(g * aNorm + gData[gIdx + 1] * (1 - aNorm));
        comp[cIdx + 2] = Math.round(b * aNorm + gData[gIdx + 2] * (1 - aNorm));
      } else {
        out[oIdx] = 0;
        out[oIdx + 1] = 0;
        out[oIdx + 2] = 0;
        out[oIdx + 3] = 0;

        comp[cIdx] = gData[gIdx];
        comp[cIdx + 1] = gData[gIdx + 1];
        comp[cIdx + 2] = gData[gIdx + 2];
      }
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } }).png().toFile('public/images/woman-cutout.png');
  await sharp(comp, { raw: { width: w, height: h, channels: 3 } }).jpeg({ quality: 95 }).toFile('public/images/hero-composite-gradient.jpg');
  console.log('Saved woman-cutout.png and hero-composite-gradient.jpg');
}

processHeroSilhouette().catch(console.error);
