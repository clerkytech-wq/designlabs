const sharp = require('sharp');
const refPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794680976345_0a20ac7e.jpg';

async function extractLogosGrid() {
  // In the 736 x 976 reference image:
  // Hero is y=16 to 414.
  // Partnering with Global Leaders is around y=460.
  // The logos grid is around y=490 to 580.
  // Let's crop y=440 to 600, x=100 to 636
  await sharp(refPath).extract({ left: 100, top: 440, width: 536, height: 160 }).toFile('public/images/logos-grid-ref.jpg');
  console.log('Saved logos-grid-ref.jpg');
}
extractLogosGrid();
