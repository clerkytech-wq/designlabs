const sharp = require('sharp');

async function run() {
  const src = 'C:/Users/clerk/.gemini/antigravity/brain/95cce086-fb9c-4319-b1be-144ed48689ad/.user_uploaded/media_1795043869631_e9918a30.jpg';
  const meta = await sharp(src).metadata();
  console.log('Source:', meta.width, 'x', meta.height);

  // Upper 64% isolates strictly the "teerex" wordmark without the italic subtitle below it
  const cropH = Math.floor(meta.height * 0.64);
  const { data, info } = await sharp(src)
    .extract({ left: 0, top: 0, width: meta.width, height: cropH })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const lum = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    let alpha = 0;
    if (lum < 175) {
      alpha = Math.min(255, Math.max(0, Math.round(((175 - lum) / 140) * 255)));
    }
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
    data[i + 3] = alpha;
  }

  const outPath = 'public/images/logo-teerex-white.png';
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  console.log('Extracted white teerex logo:', outMeta.width, 'x', outMeta.height);
}

run().catch(console.error);
