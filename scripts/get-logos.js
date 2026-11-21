const fs = require('fs');

async function getLogos() {
  const url = 'https://cdn.prod.website-files.com/668e45daa5a9b2e423712e85/66a8ea899c031e267aa454b6_Group%20loho.svg';
  const r = await fetch(url);
  const text = await r.text();
  fs.writeFileSync('public/images/group-logos.svg', text);
  console.log('Downloaded group-logos.svg, length:', text.length);
}
getLogos();
