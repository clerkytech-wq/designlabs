const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad';
const tempProfile = path.join(process.env.TEMP || 'C:\\temp', 'edge-profile-hero-' + Date.now());

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    '--remote-debugging-port=9833',
    'http://localhost:3000',
  ]);

  await sleep(3000);
  const list = await (await fetch('http://127.0.0.1:9833/json')).json();
  const pageTarget = list.find(t => t.type === 'page') || list[0];
  const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);

  let id = 1;
  const callbacks = new Map();
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.id && callbacks.has(data.id)) {
      callbacks.get(data.id)(data);
      callbacks.delete(data.id);
    }
  };

  function send(method, params = {}) {
    return new Promise(resolve => {
      const msgId = id++;
      callbacks.set(msgId, resolve);
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Page.enable');
  await send('Runtime.enable');

  const targets = [
    { name: 'new-hero-desktop-1440', width: 1440, height: 960, mobile: false, dsf: 1 },
    { name: 'new-hero-phone-390', width: 390, height: 844, mobile: true, dsf: 2 },
  ];

  for (const t of targets) {
    console.log(`Setting up ${t.name}...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: t.dsf,
      mobile: t.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(3000);

    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}.png`);

    if (t.name === 'new-hero-desktop-1440') {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, 220);` });
      await sleep(500);
      const brandsShot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, `hero-brands-desktop-1440.png`), Buffer.from(brandsShot.result.data, 'base64'));
      console.log(`Saved hero-brands-desktop-1440.png`);
    }

    const metrics = await send('Runtime.evaluate', {
      expression: `({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth })`,
      returnByValue: true
    });
    console.log(`${t.name} metrics:`, metrics.result?.result?.value);
  }

  ws.close();
  edge.kill();
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (e) {}
}

capture().catch(console.error);
