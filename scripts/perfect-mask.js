const sharp = require('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/node_modules/sharp');
const fs = require('fs');

async function perfectMask() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  const contour = [
    [60,  318, 335],
    [70,  285, 350],
    [80,  208, 390],
    [90,  190, 402],
    [105, 185, 430],
    [115, 184, 462], // sunglasses tip
    [130, 189, 464],
    [145, 202, 464],
    [160, 212, 462],
    [175, 215, 460],
    [190, 217, 452],
    [205, 222, 453],
    [220, 232, 453], // chin
    [235, 258, 440], // under chin
    [250, 262, 422], // throat
    [265, 275, 405],
    [280, 290, 398],
    [295, 292, 393],
    [310, 285, 388],
    [325, 275, 384],
    [340, 258, 380],
    [355, 245, 376],
    [370, 232, 378],
    [385, 224, 398],
    [397, 215, 415]
  ];

  function getBounds(y) {
    if (y < contour[0][0]) return [0, 0];
    if (y >= contour[contour.length - 1][0]) {
      const last = contour[contour.length - 1];
      return [last[1], last[2]];
    }
    for (let i = 0; i < contour.length - 1; i++) {
      const p1 = contour[i];
      const p2 = contour[i + 1];
      if (y >= p1[0] && y <= p2[0]) {
        const t = (y - p1[0]) / (p2[0] - p1[0]);
        return [
          p1[1] * (1 - t) + p2[1] * t,
          p1[2] * (1 - t) + p2[2] * t
        ];
      }
    }
    return [0, 0];
  }

  const out = Buffer.alloc(w * h * 4);

  for (let y = 0; y < h; y++) {
    const [minX, maxX] = getBounds(y);

    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * info.channels;
      const oIdx = (y * w + x) * 4;

      if (minX === 0 && maxX === 0 || x < minX || x > maxX) {
        out[oIdx] = 0;
        out[oIdx + 1] = 0;
        out[oIdx + 2] = 0;
        out[oIdx + 3] = 0;
        continue;
      }

      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];

      const isSunglasses = (x >= 365 && x <= 464 && y >= 108 && y <= 178);

      // In the entire throat / upper chest region (y >= 210 and y <= 275):
      // Clean ALL text completely by setting the interior to the solid dark silhouette color!
      // Keep only the cyan rim on the right edge (x >= maxX - 12)
      if (y >= 210 && y <= 275) {
        if (x < maxX - 12) {
          r = 18;
          g = 15;
          b = 36;
        }
      }

      // Check if pixel is background orange bleeding in near the contour edge
      const isOrangeBgBleed = (r > 120 && g > 50 && r > b * 1.5);
      if (isOrangeBgBleed && !isSunglasses) {
        out[oIdx] = 0;
        out[oIdx + 1] = 0;
        out[oIdx + 2] = 0;
        out[oIdx + 3] = 0;
        continue;
      }

      let alpha = 255;
      const distFromEdge = Math.min(x - minX, maxX - x);
      if (distFromEdge <= 2) {
        alpha = Math.round((distFromEdge / 3) * 255);
      }

      out[oIdx] = r;
      out[oIdx + 1] = g;
      out[oIdx + 2] = b;
      out[oIdx + 3] = alpha;
    }
  }

  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/woman-clean-perfect.png');

  const trimmed = await sharp('public/images/woman-clean-perfect.png')
    .trim()
    .toFile('public/images/woman-clean-trimmed.png');

  await sharp('public/images/woman-clean-trimmed.png')
    .resize({ height: 900, kernel: sharp.kernel.lanczos3 })
    .png()
    .toFile('public/images/woman-silhouette-large.png');

  console.log('Saved 100% spotless woman silhouette!');
}

perfectMask().catch(console.error);
