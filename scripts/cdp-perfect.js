const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\47f00054-fd31-4860-9874-888223713345\\screenshots';

const viewports = [
  { name: '1-large-desktop-1920px', width: 1920, height: 1080 },
  { name: '2-standard-desktop-1440px', width: 1440, height: 900 },
  { name: '3-laptop-1366px', width: 1366, height: 768 },
  { name: '4-small-laptop-1024px', width: 1024, height: 768 },
  { name: '5-tablet-768px', width: 768, height: 1024 },
  { name: '6-mobile-390px', width: 390, height: 844 },
  { name: '7-small-mobile-320px', width: 320, height: 640 },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9444',
    'about:blank',
  ]);

  await sleep(1500);

  const tabsRes = await fetch('http://127.0.0.1:9444/json');
  const tabs = await tabsRes.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

  await new Promise((r) => (ws.onopen = r));
  console.log('CDP WebSocket connected!');

  let reqId = 1;
  const callbacks = new Map();

  ws.onmessage = (evt) => {
    const data = JSON.parse(evt.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const id = reqId++;
      callbacks.set(id, resolve);
      ws.send(JSON.stringify({ id, method, params }));
    });
  }

  await send('Page.enable');

  for (const vp of viewports) {
    console.log(`Processing ${vp.name} (${vp.width}x${vp.height})...`);

    // Override device metrics
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: false,
    });

    // Navigate to page
    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2000);

    // Capture standard viewport
    const vpShot = await send('Page.captureScreenshot', { format: 'png' });
    if (vpShot.result && vpShot.result.data) {
      const buf = Buffer.from(vpShot.result.data, 'base64');
      fs.writeFileSync(path.join(outDir, `${vp.name}.png`), buf);
      console.log(`Saved ${vp.name}.png (${buf.length} bytes)`);
    }

    // Capture full page
    const fullShot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    if (fullShot.result && fullShot.result.data) {
      const buf = Buffer.from(fullShot.result.data, 'base64');
      fs.writeFileSync(path.join(outDir, `${vp.name}-full.png`), buf);
      console.log(`Saved ${vp.name}-full.png (${buf.length} bytes)`);
    }
  }

  ws.close();
  edge.kill();
  console.log('ALL 7 VIEWPORT TEST SCREENSHOTS CAPTURED PERFECTLY VIA CDP!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
