const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad';
const tempProfile = path.join(process.env.TEMP || 'C:\\temp', 'edge-profile-proj-' + Date.now());

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${tempProfile}`,
    '--remote-debugging-port=9782',
    'http://localhost:3000',
  ]);

  await sleep(3000);
  const list = await (await fetch('http://127.0.0.1:9782/json')).json();
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
    { name: 'desktop-1440', width: 1440, height: 960, mobile: false, dsf: 1 },
    { name: 'phone-390', width: 390, height: 844, mobile: true, dsf: 2 },
  ];

  for (const t of targets) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: t.dsf,
      mobile: t.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    await send('Runtime.evaluate', {
      expression: `document.getElementById('works').scrollIntoView({ behavior: 'instant', block: 'start' });`,
    });
    await sleep(800);

    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `new-projects-${t.name}.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved new-projects-${t.name}.png`);

    const projCheck = await send('Runtime.evaluate', {
      expression: `(() => {
        const works = document.getElementById('works');
        const link = works.querySelector('a');
        const track = link.parentElement;
        const maxScroll = track.scrollWidth - track.clientWidth;
        track.scrollLeft = maxScroll;
        return {
          firstHref: link.href,
          scrollWidth: track.scrollWidth,
          clientWidth: track.clientWidth,
          maxScroll,
          scrolledToEnd: track.scrollLeft,
          pageScrollWidth: document.documentElement.scrollWidth,
          pageClientWidth: document.documentElement.clientWidth,
        };
      })()`,
      returnByValue: true
    });
    console.log(`${t.name} check:`, projCheck.result?.result?.value);

    // Also capture tail-end screenshot on desktop to verify horizontal scroll to last project
    if (t.name === 'desktop-1440') {
      await sleep(400);
      shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, `new-projects-${t.name}-scrolled.png`), Buffer.from(shot.result.data, 'base64'));
      console.log(`Saved new-projects-${t.name}-scrolled.png`);
    }
  }

  ws.close();
  edge.kill();
  try {
    fs.rmSync(tempProfile, { recursive: true, force: true });
  } catch (e) {}
}

capture().catch(console.error);
