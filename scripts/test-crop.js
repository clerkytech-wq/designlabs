const sharp = require('sharp');

async function testCrop() {
  // Let's sample a few pixels or see if it's the exact design from the mockup!
  // In the mockup:
  // Top left: Montana
  // Center: Woman with sunglasses
  // Text: "Creative Agency"
  // Let's crop top 1000px and check
  const info = await sharp('public/images/66aa317d63dbaa6a0cb17b4a_Property_1=Home_2.png')
    .extract({ left: 0, top: 0, width: 2880, height: 1000 })
    .toFile('public/images/home-2-crop.jpg');
  console.log('Saved home-2-crop.jpg', info);
}
testCrop();
