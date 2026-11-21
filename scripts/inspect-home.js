const fs = require('fs');
const html = fs.readFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/az-home.html', 'utf8');

console.log('Title:', html.match(/<title>([^<]+)<\/title>/)?.[1]);

// Let's check for "Creative Agency" and other texts from the mockup
console.log('Contains Creative Agency:', html.includes('Creative Agency'));
console.log('Contains Brands Forward:', html.includes('Brands Forward'));
console.log('Contains Partnering with:', html.includes('Partnering with'));
console.log('Contains Shaping Experiences:', html.includes('Shaping Experiences'));
console.log('Contains Behind the Designs:', html.includes('Behind the Designs'));

const assets = require('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/home-cdn-assets.json');
console.log('Assets count:', assets.length);
console.log('Asset sample:', assets.slice(0, 15));
