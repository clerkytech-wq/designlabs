const sharp = require('sharp');

async function cropWoman() {
  await sharp('public/images/hero-section-ref.jpg')
    .extract({ left: 160, top: 40, width: 360, height: 358 })
    .toFile('public/images/woman-crop.jpg');
  console.log('Saved woman-crop.jpg');
}
cropWoman();
