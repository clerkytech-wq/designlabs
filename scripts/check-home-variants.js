const fs = require('fs');

async function checkPages() {
  const pages = ['/home-1', '/home-2', '/home-3', '/home-v1', '/home-v2', '/home-v3', '/homepage-2', '/homepage-3', '/index', '/'];
  for (const p of pages) {
    try {
      const r = await fetch('https://az-montana.webflow.io' + p);
      console.log(p, r.status);
      if (r.status === 200) {
        const text = await r.text();
        if (text.includes('Creative Agency') || text.includes('Brands Forward')) {
          console.log('FOUND MATCH ON:', p);
        }
      }
    } catch(e) {}
  }
}
checkPages();
