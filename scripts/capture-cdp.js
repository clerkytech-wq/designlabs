const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const viewports = [
  { name: '1-large-desktop-1920px', width: 1920, height: 1080, mobile: false },
  { name: '2-standard-desktop-1440px', width: 1440, height: 900, mobile: false },
  { name: '3-laptop-1366px', width: 1366, height: 768, mobile: false },
  { name: '4-small-laptop-1024px', width: 1024, height: 768, mobile: false },
  { name: '5-tablet-768px', width: 768, height: 1024, mobile: true },
  { name: '6-mobile-390px', width: 390, height: 844, mobile: true },
  { name: '7-small-mobile-320px', width: 320, height: 640, mobile: true },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9222',
    'about:blank',
  ]);

  await sleep(1500);

  const listRes = await fetch('http://127.0.0.1:9222/json');
  const tabs = await listRes.json();
  const wsUrl = tabs[0].webSocketDebuggerUrl;
  console.log('Connected to CDP at:', wsUrl);

  const ws = new WebSocket(wsUrl);

  let id = 1;
  const pending = new Map();

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  };

  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      pending.set(msgId, (res) => {
        resolve(res);
      });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  if (ws.readyState !== 1) {
    await new Promise((resolve) => {
      ws.onopen = resolve;
    });
  }
  console.log('WebSocket open!');

  await send('Page.enable');

  for (const vp of viewports) {
    console.log(`Setting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: 1,
      mobile: vp.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(1800);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    if (shot.result && shot.result.data) {
      const buf = Buffer.from(shot.result.data, 'base64');
      const outFile = path.join(outDir, `${vp.name}.png`);
      fs.writeFileSync(outFile, buf);
      console.log(`Saved ${outFile}`);
    }

    const fullShot = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
    });
    if (fullShot.result && fullShot.result.data) {
      const buf = Buffer.from(fullShot.result.data, 'base64');
      const outFile = path.join(outDir, `${vp.name}-fullpage.png`);
      fs.writeFileSync(outFile, buf);
      console.log(`Saved fullpage ${outFile}`);
    }
  }

  ws.close();
  edge.kill();
  console.log('ALL SCREENSHOTS CAPTURED WITH PERFECTION!');
}

run().catch((e) => {
  console.error('CDP error:', e);
  process.exit(1);
});
