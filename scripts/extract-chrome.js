const sharp = require('sharp');
const path = require('path');

async function extractChromeArt() {
  const src = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\.user_uploaded\\media_1794740991575_2f1f4b48.jpg';
  const outPath = path.join(__dirname, '../public/images/about-chrome-sculpture.png');

  // Crop top-right corner
  // width: 874, height: 1024
  // The chrome sculpture is roughly x: 450..874, y: 0..480
  const crop = await sharp(src)
    .extract({ left: 450, top: 0, width: 424, height: 480 })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { data, info } = crop;
  const out = Buffer.alloc(info.width * info.height * 4);

  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const brightness = (r + g + b) / 3;

    // Dark background in mockup is ~rgb(20, 20, 20)
    // Chrome has highlights > 60 up to 255
    if (brightness < 32) {
      // background
      out[j] = 0;
      out[j + 1] = 0;
      out[j + 2] = 0;
      out[j + 3] = 0;
    } else if (brightness < 60) {
      // smooth falloff
      const alpha = Math.round(((brightness - 32) / 28) * 255);
      out[j] = r;
      out[j + 1] = g;
      out[j + 2] = b;
      out[j + 3] = alpha;
    } else {
      out[j] = r;
      out[j + 1] = g;
      out[j + 2] = b;
      out[j + 3] = 255;
    }
  }

  await sharp(out, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    }
  }).png().toFile(outPath);

  console.log('Saved about-chrome-sculpture.png!');
}

extractChromeArt().catch(console.error);
