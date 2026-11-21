const sharp = require('sharp');

async function sliceLogos() {
  const refPath = 'C:/Users/clerk/.gemini/antigravity/brain/47f00054-fd31-4860-9874-888223713345/.user_uploaded/media_1794680976345_0a20ac7e.jpg';
  // Logos grid is roughly:
  // x: from 120 to 616 (width ~496, 4 columns -> ~124px each)
  // y: Row 1 is y ~ 490 to 535 (~45px)
  //    Row 2 is y ~ 535 to 580 (~45px)
  
  const colW = 122;
  const startX = 124;
  const r1Y = 490, r2Y = 535, rowH = 45;

  for (let c = 0; c < 4; c++) {
    await sharp(refPath)
      .extract({ left: startX + c * colW, top: r1Y, width: colW, height: rowH })
      .toFile(`public/images/client-logo-r1-c${c+1}.png`);
    await sharp(refPath)
      .extract({ left: startX + c * colW, top: r2Y, width: colW, height: rowH })
      .toFile(`public/images/client-logo-r2-c${c+1}.png`);
  }
  console.log('Saved 8 client logo slices!');
}
sliceLogos();
