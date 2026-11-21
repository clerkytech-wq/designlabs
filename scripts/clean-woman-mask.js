const sharp = require('sharp');
const fs = require('fs');

async function cleanWomanSilhouette() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Key contour points [y, minX, maxX]
  const contour = [
    [60,  310, 340],
    [70,  280, 355],
    [80,  200, 395],
    [90,  185, 405],
    [105, 180, 435],
    [115, 178, 465],
    [130, 185, 466],
    [145, 198, 466],
    [160, 208, 465],
    [175, 211, 465],
    [190, 213, 455],
    [205, 218, 455],
    [220, 228, 455],
    [235, 255, 450],
    [250, 258, 432],
    [265, 272, 412],
    [280, 288, 403],
    [295, 292, 398],
    [310, 285, 395],
    [325, 275, 390],
    [340, 258, 385],
    [355, 245, 380],
    [370, 232, 382],
    [385, 224, 402],
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

  // Create clean 4-channel image
  const out = Buffer.alloc(w * h * 4);

  // Background color model along height:
  // y=30: [252, 120, 45], y=390: [195, 65, 69]
  for (let y = 0; y < h; y++) {
    const [minX, maxX] = getBounds(y);
    const t = y / h;
    const bgR = 252 * (1 - t) + 195 * t;
    const bgG = 120 * (1 - t) + 65 * t;
    const bgB = 45 * (1 - t) + 69 * t;

    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * info.channels;
      const oIdx = (y * w + x) * 4;

      let r = data[idx];
      let g = data[idx + 1];
      let b = data[idx + 2];

      // If outside contour bounds, it's 100% transparent!
      if (minX === 0 && maxX === 0 || x < minX - 10 || x > maxX + 10) {
        out[oIdx] = 0;
        out[oIdx + 1] = 0;
        out[oIdx + 2] = 0;
        out[oIdx + 3] = 0;
        continue;
      }

      // Check distance from edge
      const isInsideCore = (x >= minX + 6 && x <= maxX - 6);
      const isNearEdge = !isInsideCore && (x >= minX - 8 && x <= maxX + 8);

      // Inpaint white text inside the woman:
      // In core area, if pixel is bright text (r > 150 && g > 150 && b > 150)
      // Replace with woman's dark indigo
      const isWhiteText = (r > 140 && g > 140 && b > 140);
      if (isInsideCore && isWhiteText) {
        r = 20;
        g = 16;
        b = 39;
      }

      let alpha = 255;
      if (isNearEdge) {
        // Calculate feathering based on distance to edge and color difference from background
        const dR = r - bgR, dG = g - bgG, dB = b - bgB;
        const dist = Math.sqrt(dR*dR + dG*dG + dB*dB);
        
        if (dist < 20) {
          alpha = 0;
        } else if (dist > 70) {
          alpha = 255;
        } else {
          alpha = Math.round(((dist - 20) / 50) * 255);
        }

        // Keep cyan rim lighting and sunglasses strong
        if (b > 50 && b > r) alpha = Math.max(alpha, 240);
        if (y >= 110 && y <= 175 && x >= 370 && x <= 465) alpha = Math.max(alpha, 240);
      }

      out[oIdx] = r;
      out[oIdx + 1] = g;
      out[oIdx + 2] = b;
      out[oIdx + 3] = alpha;
    }
  }

  // Save the clean woman cutout PNG
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png()
    .toFile('public/images/woman-silhouette-clean.png');

  // Crop tight to the silhouette
  const trimmed = await sharp('public/images/woman-silhouette-clean.png')
    .trim()
    .toFile('public/images/woman-silhouette-tight.png');
  console.log('Trimmed woman dimensions:', trimmed);

  // Resize trimmed woman to 900px height for ultra-crisp display
  await sharp('public/images/woman-silhouette-tight.png')
    .resize({ height: 900, kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.8, m1: 0.8, m2: 1.5 })
    .png()
    .toFile('public/images/woman-silhouette-large.png');

  console.log('Successfully generated clean woman silhouette with NO ghost text!');
}

cleanWomanSilhouette().catch(console.error);
