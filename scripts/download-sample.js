const fs = require('fs');

async function downloadSample() {
  const urls = [
    'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66acaa996f93870fccd8bab6_IMG_1891.jpg',
    'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66acaa99e26f81c6dcdfc4d4_IMG_1892.jpg',
    'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66b1ee3e3628e0703f7a8531_IMG_1921.jpg',
    'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66acaa9aed823c800c4b074a_IMG_1893.jpg',
    'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66aa317d63dbaa6a0cb17b4a_Property%201%3DHome%202.png',
  ];
  for (const u of urls) {
    try {
      const name = u.split('/').pop().replace(/%20/g, '_').replace(/%3D/g, '=');
      const r = await fetch(u);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/public/images/' + name, buf);
      console.log('Downloaded:', name, buf.length);
    } catch (e) {
      console.error('Error downloading:', u, e.message);
    }
  }
}
downloadSample();
