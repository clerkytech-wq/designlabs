const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';
const tempProfile = path.join(process.env.TEMP || 'C:\\temp', 'edge-profile-' + Date.now());

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    '--remote-debugging-port=9888',
    'http://localhost:3000',
  ]);

  await sleep(2500);
  const list = await (await fetch('http://127.0.0.1:9888/json')).json();
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
    { name: 'desktop-1440', width: 1440, height: 900, mobile: false, dsf: 1 },
    { name: 'phone-390', width: 390, height: 844, mobile: true, dsf: 2 },
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
    await sleep(2000);

    // 1. Hero
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-hero.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-hero.png`);

    // 2. About
    await send('Runtime.evaluate', {
      expression: `document.getElementById('about').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(800);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-about.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-about.png`);

    // 3. Services
    await send('Runtime.evaluate', {
      expression: `document.getElementById('services').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(800);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-services.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-services.png`);

    // 4. Works
    await send('Runtime.evaluate', {
      expression: `document.getElementById('works').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(800);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-works.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-works.png`);

    // 5. Footer
    await send('Runtime.evaluate', {
      expression: `document.querySelector('footer').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(800);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-footer.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-footer.png`);
  }

  ws.close();
  edge.kill();
  console.log('Done capturing all views!');
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch(e) {}
}

capture().catch(console.error);
