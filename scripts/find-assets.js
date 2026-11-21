const fs = require('fs');

async function run() {
  try {
    const r = await fetch('https://montana-template.webflow.io/');
    console.log('Status:', r.status);
    const html = await r.text();
    fs.writeFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/page.html', html);
    const regex = /https:\/\/[^'"\s\)\>]+?\.(?:png|jpg|jpeg|svg|webp)/gi;
    const matches = html.match(regex) || [];
    const unique = [...new Set(matches)];
    console.log('Found', unique.length, 'unique image assets');
    fs.writeFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/assets.json', JSON.stringify(unique, null, 2));
    console.log('Saved assets to assets.json');
  } catch (e) {
    console.error('Error:', e.message);
  }
}

run();
