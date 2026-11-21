const sharp = require('sharp');

async function run() {
  const src = 'C:/Users/clerk/.gemini/antigravity/brain/95cce086-fb9c-4319-b1be-144ed48689ad/.user_uploaded/media_1795045024614_acde8ec3.png';
  const meta = await sharp(src).metadata();
  console.log('Source:', meta.width, 'x', meta.height);

  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // White bg -> alpha 0; Black logo -> pure white (255, 255, 255) with clean anti-aliased alpha
  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    const alpha = lum < 235 ? Math.min(255, Math.max(0, Math.round(((235 - lum) / 215) * 255))) : 0;
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = alpha;
  }

  const outPath = 'public/images/logo-kinsocial-white.png';
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  console.log('Extracted white kin social logo:', outMeta.width, 'x', outMeta.height);
}

run().catch(console.error);
