const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: 'laptop-1440px', width: 1440, height: 900 },
  { name: 'laptop-1024px', width: 1024, height: 768 },
  { name: 'tablet-768px', width: 768, height: 960 },
  { name: 'phone-390px', width: 390, height: 844 },
  { name: 'phone-360px', width: 360, height: 780 },
];

async function capture() {
  for (const vp of viewports) {
    const outFile = path.join(outDir, `${vp.name}.png`);
    const cmd = `"${edgePath}" --headless --disable-gpu --virtual-time-budget=3000 --hide-scrollbars --window-size=${vp.width},${vp.height} --screenshot="${outFile}" http://localhost:3000`;
    console.log(`Capturing ${vp.name} (${vp.width}x${vp.height})...`);
    try {
      execSync(cmd, { stdio: 'pipe', timeout: 20000 });
      console.log(`Saved ${outFile}`);
    } catch (e) {
      console.error(`Error on ${vp.name}:`, e.message);
    }
  }
  console.log('All screenshots completed!');
}

capture();
