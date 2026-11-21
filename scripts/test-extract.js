const sharp = require('sharp');

async function testExtraction() {
  const { data, info } = await sharp('public/images/hero-section-ref.jpg').raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;

  // Let's create an alpha mask where the woman is opaque (255) and the orange background is transparent (0)
  // Let's analyze pixels:
  // For each pixel (r, g, b):
  // Background in the original is orange: r is high (180..255), g is (60..140), b is low (20..60).
  // The woman is dark indigo: r is low (10..50), g is low (10..40), b is (20..60).
  // What about sunglasses? They are orange/red/yellow: r is (200..255), g is (80..180), b is (20..80).
  // But sunglasses are inside the woman's face area (x: 360..460, y: 110..180)!
  // What about the woman's neck cyan rim lighting? r is (20..80), g is (120..200), b is (150..230).
  
  console.log('Hero dimensions:', w, h);
}
testExtraction();
