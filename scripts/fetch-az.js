const fs = require('fs');

async function run() {
  const r = await fetch('https://az-montana.webflow.io/');
  console.log('Status:', r.status);
  const html = await r.text();
  fs.writeFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/az-montana.html', html);
  const regex = /https:\/\/cdn\.prod\.website-files\.com\/[^\s\"\'\)\>]+?\.(?:png|jpg|jpeg|svg|webp)/gi;
  const matches = [...new Set(html.match(regex) || [])];
  console.log('Found', matches.length, 'CDN assets');
  fs.writeFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/cdn-assets.json', JSON.stringify(matches, null, 2));
}

run().catch(console.error);
