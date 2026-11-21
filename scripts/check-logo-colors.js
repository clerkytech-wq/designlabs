const sharp = require('sharp');
const path = require('path');

async function testLogo() {
  const logoPath = path.join(__dirname, '../public/images/logo-designlabs.png');
  const { data, info } = await sharp(logoPath).raw().toBuffer({ resolveWithObject: true });
  
  // Find distinct non-transparent colors
  const colorMap = {};
  for (let i = 0; i < data.length; i += info.channels) {
    const a = info.channels === 4 ? data[i + 3] : 255;
    if (a > 50) {
      const r = Math.round(data[i] / 10) * 10;
      const g = Math.round(data[i + 1] / 10) * 10;
      const b = Math.round(data[i + 2] / 10) * 10;
      const key = `rgb(${r},${g},${b})`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }
  }
  
  const sorted = Object.entries(colorMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log('Top non-transparent colors in logo:', sorted);
}

testLogo().catch(err => console.error(err));
