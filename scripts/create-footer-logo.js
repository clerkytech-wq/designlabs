const sharp = require('sharp');
const path = require('path');

async function createFooterLogo() {
  const logoPath = path.join(__dirname, '../public/images/logo-designlabs.png');
  const footerLogoPath = path.join(__dirname, '../public/images/logo-designlabs-footer.png');

  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });

  // Target color: #ba3d03 -> r: 186, g: 61, b: 3
  // In the original logo, the mark is yellowish/golden: r > 200, g is 170-220, b is 80-140
  // White text is r > 230, g > 230, b > 230
  const out = Buffer.from(data);

  for (let i = 0; i < out.length; i += info.channels) {
    const a = info.channels === 4 ? out[i + 3] : 255;
    if (a > 10) {
      const r = out[i];
      const g = out[i + 1];
      const b = out[i + 2];

      // Check if it's the golden/amber mark (not white text)
      // For white text: r, g, b are all close to each other (low saturation)
      // For the golden mark: r > 180, g > 140, b < 170, and (r - b) > 50
      const isGoldenMark = (r - b > 40) || (g - b > 30);

      if (isGoldenMark) {
        // Compute relative brightness/intensity to preserve smooth anti-aliased edges
        const intensity = (r * 0.299 + g * 0.587 + b * 0.114) / 200;
        const factor = Math.min(Math.max(intensity, 0.4), 1.2);

        out[i] = Math.min(255, Math.round(186 * factor));
        out[i + 1] = Math.min(255, Math.round(61 * factor));
        out[i + 2] = Math.min(255, Math.round(3 * factor));
      }
    }
  }

  await sharp(out, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    }
  }).png().toFile(footerLogoPath);

  console.log('Created logo-designlabs-footer.png successfully!');
}

createFooterLogo().catch(console.error);
