const sharp = require('sharp');
const fs = require('fs');

async function perfectHeroComposite() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // 1. Compute background color bg(y) for each row y:
  // Sample left edge x in [10..50] and right edge x in [650..690]
  const bg = [];
  for (let y = 0; y < h; y++) {
    let rSum = 0, gSum = 0, bSum = 0, count = 0;
    for (let x of [15, 20, 25, 30, 35, 40, 660, 665, 670, 675, 680]) {
      // Exclude text or anomalies
      const idx = (y * w + x) * info.channels;
      const r = data[idx], g = data[idx+1], b = data[idx+2];
      // background has r > 150, g > 50
      if (r > 150 && g > 50) {
        rSum += r;
        gSum += g;
        bSum += b;
        count++;
      }
    }
    if (count > 0) {
      bg.push([rSum / count, gSum / count, bSum / count]);
    } else {
      bg.push(bg[bg.length - 1] || [240, 80, 50]);
    }
  }

  // Load user's gradient
  const gradPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794681256717_823c8145.png';
  const gradResized = await sharp(gradPath).resize(w, h).raw().toBuffer({ resolveWithObject: true });
  const gData = gradResized.data;

  // Output buffer for woman with transparent background
  const womanAlpha = Buffer.alloc(w * h * 4);
  // Output buffer for final composited hero
  const finalComp = Buffer.alloc(w * h * 3);

  for (let y = 0; y < h; y++) {
    const [bgR, bgG, bgB] = bg[y];

    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * info.channels;
      const oIdx = (y * w + x) * 4;
      const cIdx = (y * w + x) * 3;
      const gIdx = (y * w + x) * gradResized.info.channels;

      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];

      const newBgR = gData[gIdx];
      const newBgG = gData[gIdx + 1];
      const newBgB = gData[gIdx + 2];

      // Is inside woman's approximate column span [180 .. 500]
      const inWomanCols = (x >= 180 && x <= 505 && y >= 65 && y <= 397);

      // Inpaint the white letters of "Agency" overlapping chest
      // Letters are white (r > 200, g > 200, b > 200) inside chest (x: 250..390, y: 228..278)
      if (inWomanCols && x >= 245 && x <= 390 && y >= 225 && y <= 278 && r > 180 && g > 180 && b > 180) {
        // Woman chest color is deep indigo
        r = 20;
        g = 16;
        b = 39;
      }

      // Check distance from expected background
      // Euclidean distance in RGB
      const dR = r - bgR;
      const dG = g - bgG;
      const dB = b - bgB;
      const dist = Math.sqrt(dR*dR + dG*dG + dB*dB);

      // Outside woman's region, anything is background (or web text to be replaced by live HTML)
      if (!inWomanCols) {
        // Pure user gradient
        finalComp[cIdx] = newBgR;
        finalComp[cIdx + 1] = newBgG;
        finalComp[cIdx + 2] = newBgB;
        womanAlpha[oIdx + 3] = 0;
        continue;
      }

      // Inside woman's region:
      // Threshold distance: if dist < 25, it's background
      // If dist > 70, it's 100% woman
      let alpha = 0;
      if (dist <= 25) {
        alpha = 0;
      } else if (dist >= 70) {
        alpha = 1.0;
      } else {
        alpha = (dist - 25) / 45;
      }

      // Special cases for sunglasses and chin
      const isSunglasses = (x >= 370 && x <= 465 && y >= 110 && y <= 180);
      if (isSunglasses) {
        // Sunglasses might have warm colors close to background
        // But sunglasses have dark frames and distinct glow
        if (r < 180 || b > 50 || (x >= 395 && x <= 455 && y >= 120 && y <= 165)) {
          alpha = Math.max(alpha, 0.95);
        }
      }

      // Cyan rim light on throat (b > 60 and b > r)
      const isCyanNeck = (x >= 335 && x <= 450 && y >= 265 && y <= 397 && b > 50);
      if (isCyanNeck) {
        alpha = Math.max(alpha, 0.95);
      }

      // Save to womanAlpha
      womanAlpha[oIdx] = r;
      womanAlpha[oIdx + 1] = g;
      womanAlpha[oIdx + 2] = b;
      womanAlpha[oIdx + 3] = Math.round(alpha * 255);

      // Composite onto new gradient
      finalComp[cIdx] = Math.round(r * alpha + newBgR * (1 - alpha));
      finalComp[cIdx + 1] = Math.round(g * alpha + newBgG * (1 - alpha));
      finalComp[cIdx + 2] = Math.round(b * alpha + newBgB * (1 - alpha));
    }
  }

  // Save at native and high-res
  await sharp(womanAlpha, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/woman-silhouette.png');

  await sharp(finalComp, { raw: { width: w, height: h, channels: 3 } })
    .jpeg({ quality: 98 })
    .toFile('public/images/hero-bg-gradient.jpg');

  // Also create a high-res 2x version for sharp rendering on retina / desktop screens
  await sharp('public/images/hero-bg-gradient.jpg')
    .resize(w * 2, h * 2, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 0.8, m2: 1.5 })
    .jpeg({ quality: 95 })
    .toFile('public/images/hero-bg-gradient-2x.jpg');

  // And high-res woman silhouette
  await sharp('public/images/woman-silhouette.png')
    .resize(w * 2, h * 2, { kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile('public/images/woman-silhouette-2x.png');

  console.log('Saved perfect hero composites!');
}

perfectHeroComposite().catch(console.error);
