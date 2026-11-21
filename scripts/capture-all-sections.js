const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

const viewports = [
  { name: 'desktop-1440', width: 1440, height: 900, mobile: false, dsf: 1 },
  { name: 'phone-390', width: 390, height: 844, mobile: true, dsf: 2 },
];

const sections = [
  { id: 'hero', name: 'hero' },
  { id: 'about', name: 'about' },
  { id: 'services', name: 'services' },
  { id: 'works', name: 'works' },
];

async function captureAll() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9897',
    'http://localhost:3000',
  ]);

  await sleep(2500);
  const listRes = await fetch('http://127.0.0.1:9897/json');
  const list = await listRes.json();
  const pageTarget = list.find(t => t.type === 'page');
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

  for (const vp of viewports) {
    console.log(`Setting viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width: vp.width,
      height: vp.height,
      deviceScaleFactor: vp.dsf,
      mobile: vp.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2000);

    for (const sec of sections) {
      await send('Runtime.evaluate', {
        expression: `const el = document.getElementById('${sec.id}'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });`,
      });
      await sleep(600);

      const shot = await send('Page.captureScreenshot', { format: 'png' });
      if (shot.result && shot.result.data) {
        const buf = Buffer.from(shot.result.data, 'base64');
        fs.writeFileSync(path.join(outDir, `${vp.name}-${sec.name}.png`), buf);
        console.log(`Saved ${vp.name}-${sec.name}.png`);
      }
    }

    // Capture footer
    await send('Runtime.evaluate', {
      expression: `const el = document.querySelector('footer'); if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(600);

    const footerShot = await send('Page.captureScreenshot', { format: 'png' });
    if (footerShot.result && footerShot.result.data) {
      const buf = Buffer.from(footerShot.result.data, 'base64');
      fs.writeFileSync(path.join(outDir, `${vp.name}-footer.png`), buf);
      console.log(`Saved ${vp.name}-footer.png`);
    }
  }

  ws.close();
  edge.kill();
  console.log('All sections captured successfully!');
}

captureAll().catch(console.error);
