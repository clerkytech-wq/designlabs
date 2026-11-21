const sharp = require('sharp');
const fs = require('fs');

async function buildUltraHero() {
  const w = 1920;
  const h = 1080;

  // 1. Create a high-res version of the user gradient (1920x1080)
  const gradPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794681256717_823c8145.png';
  const gradBuffer = await sharp(gradPath)
    .resize(w, h, { fit: 'fill' })
    .toBuffer();

  // 2. Prepare the high-res woman silhouette
  // In the original 704 x 398 hero, the woman spanned x ~ 180 to 480 (width ~ 300px), y from 50 to 398 (height ~ 348px)
  // In a 1920 x 1080 hero:
  // Proportionally, height is ~ 920px, width ~ 800px, centered slightly to the right of center (e.g. x: 580 to 1380)
  
  // Let's crop woman directly from hero-section-ref.jpg with high precision:
  // left: 180, top: 55, width: 320, height: 343
  const womanRaw = await sharp('public/images/hero-section-ref.jpg')
    .extract({ left: 180, top: 55, width: 320, height: 343 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const sw = womanRaw.info.width;
  const sh = womanRaw.info.height;
  const sData = womanRaw.data;

  // Create clean alpha mask for the cropped woman
  const womanCropAlpha = Buffer.alloc(sw * sh * 4);

  // Background color model along height:
  // y=0 in crop corresponds to y=55 in hero -> bg is approx [253, 110, 42]
  // y=340 in crop corresponds to y=395 in hero -> bg is approx [195, 65, 69]
  for (let y = 0; y < sh; y++) {
    const heroY = 55 + y;
    const t = y / sh;
    // Expected background color:
    const expBgR = 253 * (1 - t) + 195 * t;
    const expBgG = 110 * (1 - t) + 65 * t;
    const expBgB = 42 * (1 - t) + 69 * t;

    for (let x = 0; x < sw; x++) {
      const idx = (y * sw + x) * womanRaw.info.channels;
      const oIdx = (y * sw + x) * 4;

      let r = sData[idx];
      let g = sData[idx + 1];
      let b = sData[idx + 2];

      // Inpaint white text inside chest:
      // In cropped coordinates: hero x in [245..380] -> crop x in [65..200]
      // hero y in [225..278] -> crop y in [170..223]
      if (x >= 60 && x <= 200 && y >= 170 && y <= 225 && r > 180 && g > 180 && b > 180) {
        r = 20;
        g = 16;
        b = 39;
      }

      // Check distance from expected background
      const dR = r - expBgR;
      const dG = g - expBgG;
      const dB = b - expBgB;
      const dist = Math.sqrt(dR*dR + dG*dG + dB*dB);

      let alpha = 0;
      if (dist < 22) {
        alpha = 0;
      } else if (dist > 65) {
        alpha = 1.0;
      } else {
        alpha = (dist - 22) / 43;
      }

      // Sunglasses region in crop: x: 190..280, y: 55..120
      if (x >= 190 && x <= 285 && y >= 55 && y <= 125) {
        alpha = Math.max(alpha, 0.95);
      }
      // Cyan rim light on throat in crop: x: 155..265, y: 210..342
      if (x >= 155 && x <= 265 && y >= 210 && b > 45) {
        alpha = Math.max(alpha, 0.95);
      }

      womanCropAlpha[oIdx] = r;
      womanCropAlpha[oIdx + 1] = g;
      womanCropAlpha[oIdx + 2] = b;
      womanCropAlpha[oIdx + 3] = Math.round(alpha * 255);
    }
  }

  // Save the cropped woman PNG
  await sharp(womanCropAlpha, { raw: { width: sw, height: sh, channels: 4 } })
    .png()
    .toFile('public/images/woman-isolated.png');

  // Resize woman to high-res (target height ~880px, width ~820px)
  const womanHighRes = await sharp('public/images/woman-isolated.png')
    .resize(820, 880, { fit: 'contain', kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 0.9, m1: 1.0, m2: 2.0 })
    .png()
    .toBuffer();

  fs.writeFileSync('public/images/woman-silhouette-large.png', womanHighRes);

  // Composite woman onto gradient background at 1920 x 1080
  // Position woman: centered horizontally or slightly right of center (left: 550, top: 120)
  await sharp(gradBuffer)
    .composite([
      {
        input: womanHighRes,
        top: 1080 - 880, // flush with bottom of hero
        left: Math.round((1920 - 820) / 2) + 20, // slightly to the right of center like in mockup
      }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/images/hero-desktop-1920.jpg');

  console.log('Successfully built hero-desktop-1920.jpg and woman-silhouette-large.png!');
}

buildUltraHero().catch(console.error);
