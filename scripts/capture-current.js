const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: 'laptop-1440px', width: 1440, height: 900, mobile: false },
  { name: 'mobile-phone-390px', width: 390, height: 844, mobile: true },
  { name: 'compact-phone-360px', width: 360, height: 780, mobile: true },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function run() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9455',
    'about:blank',
  ]);

  await sleep(1500);

  const tabsRes = await fetch('http://127.0.0.1:9455/json');
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

    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 2,
      mobile: vp.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2000);

    // Viewport screenshot (Hero view)
    const vpShot = await send('Page.captureScreenshot', { format: 'png' });
    if (vpShot.result && vpShot.result.data) {
      const buf = Buffer.from(vpShot.result.data, 'base64');
      fs.writeFileSync(path.join(outDir, `${vp.name}-hero.png`), buf);
      console.log(`Saved ${vp.name}-hero.png (${buf.length} bytes)`);
    }

    // Full page screenshot
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
  console.log('ALL SCREENSHOTS CAPTURED SUCCESSFULLY!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
