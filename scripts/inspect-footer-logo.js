const sharp = require('sharp');
const path = require('path');

async function inspectFooterLogo() {
  const footerLogoPath = path.join(__dirname, '../public/images/logo-designlabs-footer.png');
  const { data, info } = await sharp(footerLogoPath).raw().toBuffer({ resolveWithObject: true });

  const colorMap = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const a = info.channels === 4 ? data[i + 3] : 255;
    if (a > 50) {
      const r = Math.round(data[i] / 15) * 15;
      const g = Math.round(data[i + 1] / 15) * 15;
      const b = Math.round(data[i + 2] / 15) * 15;
      const key = `rgb(${r},${g},${b})`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
  }

  const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 10);
  console.log('Top colors in footer logo:', sorted);
}

inspectFooterLogo().catch(console.error);
