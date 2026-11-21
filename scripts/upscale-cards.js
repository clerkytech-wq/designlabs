const sharp = require('sharp');

async function upscaleCards() {
  const cards = [
    { in: 'card-1-fashion.jpg', out: 'card-1-highres.jpg' },
    { in: 'card-2-cocktail.jpg', out: 'card-2-highres.jpg' },
    { in: 'card-3-portrait.jpg', out: 'card-3-highres.jpg' }
  ];

  for (const c of cards) {
    await sharp('public/images/' + c.in)
      .resize(600, 705, { kernel: sharp.kernel.lanczos3 })
      .sharpen({ sigma: 1.0, m1: 1.0, m2: 2.0 })
      .jpeg({ quality: 95 })
      .toFile('public/images/' + c.out);
    console.log('Upscaled', c.out);
  }
}
upscaleCards();
