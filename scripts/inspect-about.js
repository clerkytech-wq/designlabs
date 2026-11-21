const sharp = require('sharp');
const path = require('path');

async function inspectAboutInspiration() {
  const imgPath = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\.user_uploaded\\media_1794740991575_2f1f4b48.jpg';
  const meta = await sharp(imgPath).metadata();
  console.log('About inspiration meta:', meta);
}

inspectAboutInspiration().catch(console.error);
