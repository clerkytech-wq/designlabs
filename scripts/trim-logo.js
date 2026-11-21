const sharp = require('sharp');
const path = require('path');

async function processLogo() {
  const logoPath = path.join(__dirname, '../public/images/designlabs-logo.png');
  const trimmedPath = path.join(__dirname, '../public/images/designlabs-logo-trimmed.png');

  const image = sharp(logoPath);
  const trimmed = await image.trim().toFile(trimmedPath);
  console.log('Trimmed logo metadata:', trimmed);
}

processLogo().catch(err => console.error(err));
