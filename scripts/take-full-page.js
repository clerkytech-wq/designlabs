const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\47f00054-fd31-4860-9874-888223713345\\screenshots';

const fullPages = [
  { name: '1-desktop-1920px-full', width: 1920, height: 2200 },
  { name: '2-desktop-1440px-full', width: 1440, height: 2100 },
  { name: '3-laptop-1366px-full', width: 1366, height: 2000 },
  { name: '4-small-laptop-1024px-full', width: 1024, height: 2000 },
  { name: '5-tablet-768px-full', width: 768, height: 2200 },
  { name: '6-mobile-390px-full', width: 390, height: 2400 },
  { name: '7-small-mobile-320px-full', width: 320, height: 2400 },
];

for (const fp of fullPages) {
  const outFile = path.join(outDir, `${fp.name}.png`);
  const cmd = `"${edgePath}" --headless --disable-gpu --virtual-time-budget=3000 --hide-scrollbars --window-size=${fp.width},${fp.height} --screenshot="${outFile}" http://localhost:3000`;
  console.log(`Capturing ${fp.name}...`);
  try {
    execSync(cmd, { stdio: 'pipe', timeout: 15000 });
    console.log(`Saved ${outFile}`);
  } catch (e) {
    console.error(`Error on ${fp.name}:`, e.message);
  }
}
console.log('All full-page screenshots completed!');
