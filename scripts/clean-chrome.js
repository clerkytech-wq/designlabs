const sharp = require('sharp');
const path = require('path');

async function cleanChrome() {
  const src = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\.user_uploaded\\media_1794740991575_2f1f4b48.jpg';
  const outPath = path.join(__dirname, '../public/images/about-chrome-sculpture.png');

  // Crop only the sculpture in upper right: left: 520, top: 40, width: 350, height: 340
  const crop = await sharp(src)
    .extract({ left: 520, top: 35, width: 350, height: 340 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = crop;
  const out = Buffer.alloc(info.width * info.height * 4);

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 3;
      const oidx = (y * info.width + x) * 4;

      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const brightness = (r + g + b) / 3;

      if (brightness < 32) {
        out[oidx] = 0;
        out[oidx + 1] = 0;
        out[oidx + 2] = 0;
        out[oidx + 3] = 0;
      } else if (brightness < 55) {
        const alpha = Math.round(((brightness - 32) / 23) * 255);
        out[oidx] = r;
        out[oidx + 1] = g;
        out[oidx + 2] = b;
        out[oidx + 3] = alpha;
      } else {
        out[oidx] = r;
        out[oidx + 1] = g;
        out[oidx + 2] = b;
        out[oidx + 3] = 255;
      }
    }
  }

  await sharp(out, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  }).png().toFile(outPath);

  console.log('Cleaned chrome sculpture saved successfully!');
}

cleanChrome().catch(console.error);
