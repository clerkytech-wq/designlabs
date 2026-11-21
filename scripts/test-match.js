const fs = require('fs');
const sharp = require('sharp');

async function testMatch() {
  const list = [
    '66acaa996f93870fccd8bab6_IMG_1891.jpg',
    '66acaa99e26f81c6dcdfc4d4_IMG_1892.jpg',
    '66acaa9aed823c800c4b074a_IMG_1893.jpg',
    '66b1ee3e3628e0703f7a8531_IMG_1921.jpg'
  ];

  // We have card-1-fashion.jpg, card-2-cocktail.jpg, card-3-portrait.jpg
  for (const img of list) {
    const meta = await sharp('public/images/' + img).metadata();
    console.log(img, meta.width, meta.height);
  }
}
testMatch();
