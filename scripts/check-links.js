const fs = require('fs');
const html = fs.readFileSync('C:/Users/clerk/.gemini/antigravity/scratch/designlabs/scripts/az-montana.html', 'utf8');
const regex = /href="(\/[^"]+)"/g;
let match;
const links = new Set();
while ((match = regex.exec(html)) !== null) {
  links.add(match[1]);
}
console.log('Links:', [...links]);
