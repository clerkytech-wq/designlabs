const sharp = require('sharp');

async function prepareLogo() {
  const logoPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794681180996_5579f952.png';
  // Trim transparent edges
  const trimmed = await sharp(logoPath)
    .trim()
    .toFile('public/images/logo-designlabs.png');
  console.log('Trimmed logo saved:', trimmed);

  // Also save a standard logo.png in public
  await sharp(logoPath)
    .trim()
    .toFile('public/logo.png');
}

prepareLogo().catch(console.error);
