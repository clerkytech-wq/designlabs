const sharp = require('sharp');

async function checkImgs() {
  // Let's sample colors or thumbnail them to see what is in IMG_1891, 1892, 1921, 1893
  const files = ['66acaa996f93870fccd8bab6_IMG_1891.jpg', '66acaa99e26f81c6dcdfc4d4_IMG_1892.jpg', '66acaa9aed823c800c4b074a_IMG_1893.jpg', '66b1ee3e3628e0703f7a8531_IMG_1921.jpg'];
  for (const f of files) {
    const stat = await sharp('public/images/' + f).stats();
    console.log(f, 'Dominant color mean:', stat.channels.map(c => Math.round(c.mean)));
  }

  // Also check card-1, card-2, card-3 stats
  for (const c of ['card-1-fashion.jpg', 'card-2-cocktail.jpg', 'card-3-portrait.jpg']) {
    const stat = await sharp('public/images/' + c).stats();
    console.log(c, 'Dominant color mean:', stat.channels.map(c => Math.round(c.mean)));
  }
}
checkImgs();
