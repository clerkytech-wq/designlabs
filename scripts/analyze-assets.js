const sharp = require('sharp');
const path = require('path');

async function analyze() {
  const gradientPath = path.join(__dirname, '../public/images/user-gradient.png');
  const logoPath = path.join(__dirname, '../public/images/designlabs-logo.png');

  const gradMeta = await sharp(gradientPath).metadata();
  console.log('Gradient metadata:', gradMeta);

  // Sample colors from top, middle, bottom of gradient
  const gradRaw = await sharp(gradientPath).raw().toBuffer({ resolveWithObject: true });
  const { data, info } = gradRaw;
  const width = info.width;
  const height = info.height;
  const channels = info.channels;

  function getColorAt(x, y) {
    const idx = (y * width + x) * channels;
    return {
      r: data[idx],
      g: data[idx + 1],
      b: data[idx + 2],
      hex: `#${data[idx].toString(16).padStart(2, '0')}${data[idx + 1].toString(16).padStart(2, '0')}${data[idx + 2].toString(16).padStart(2, '0')}`
    };
  }

  console.log('Top (0, 0):', getColorAt(Math.floor(width/2), 0));
  console.log('25% (y):', getColorAt(Math.floor(width/2), Math.floor(height * 0.25)));
  console.log('50% (y):', getColorAt(Math.floor(width/2), Math.floor(height * 0.5)));
  console.log('75% (y):', getColorAt(Math.floor(width/2), Math.floor(height * 0.75)));
  console.log('Bottom (y):', getColorAt(Math.floor(width/2), height - 1));

  const logoMeta = await sharp(logoPath).metadata();
  console.log('Logo metadata:', logoMeta);
}

analyze().catch(err => console.error(err));
