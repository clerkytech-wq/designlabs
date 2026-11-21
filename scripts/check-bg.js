const sharp = require('sharp');

async function checkBg() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  function getPixel(x, y) {
    const idx = (y * info.width + x) * info.channels;
    return [data[idx], data[idx+1], data[idx+2]];
  }

  // Check background at x=50, y=50, 100, 200, 300, 380
  for (let y = 30; y <= 380; y += 50) {
    console.log('Left bg y=' + y + ':', getPixel(50, y));
  }
  for (let y = 30; y <= 380; y += 50) {
    console.log('Right bg y=' + y + ':', getPixel(650, y));
  }
}
checkBg();
