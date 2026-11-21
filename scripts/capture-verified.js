const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const outDir = 'C:\\Users\\clerk\\.gemini\\antigravity\\brain\\95cce086-fb9c-4319-b1be-144ed48689ad\\screenshots';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9777',
    'about:blank',
  ]);

  await sleep(2000);
  const list = await (await fetch('http://127.0.0.1:9777/json')).json();
  const ws = new WebSocket(list[0].webSocketDebuggerUrl);
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
    await send('Emulation.setDeviceMetricsOverride', {
      width: t.width,
      height: t.height,
      deviceScaleFactor: t.dsf,
      mobile: t.mobile,
    });

    await send('Page.navigate', { url: 'http://localhost:3000' });
    await sleep(2500);

    // 1. Hero
    let shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-hero.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-hero.png`);

    // 2. About
    const aboutScroll = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('about');
        if (el) {
          el.scrollIntoView();
          return { found: true, y: window.scrollY, top: el.offsetTop };
        }
        return { found: false };
      })()`,
      returnByValue: true
    });
    console.log(`${t.name} about scroll:`, aboutScroll.result?.result?.value);
    await sleep(1000);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-about.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-about.png`);

    // 3. Services
    const servicesScroll = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('services');
        if (el) {
          el.scrollIntoView();
          return { found: true, y: window.scrollY, top: el.offsetTop };
        }
        return { found: false };
      })()`,
      returnByValue: true
    });
    console.log(`${t.name} services scroll:`, servicesScroll.result?.result?.value);
    await sleep(1000);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-services.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-services.png`);

    // 4. Works / Behind the Designs
    const worksScroll = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.getElementById('works');
        if (el) {
          el.scrollIntoView();
          return { found: true, y: window.scrollY, top: el.offsetTop };
        }
        return { found: false };
      })()`,
      returnByValue: true
    });
    console.log(`${t.name} works scroll:`, worksScroll.result?.result?.value);
    await sleep(1000);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-works.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-works.png`);

    // 5. Footer
    const footerScroll = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('footer');
        if (el) {
          el.scrollIntoView();
          return { found: true, y: window.scrollY, top: el.offsetTop };
        }
        return { found: false };
      })()`,
      returnByValue: true
    });
    console.log(`${t.name} footer scroll:`, footerScroll.result?.result?.value);
    await sleep(1000);
    shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${t.name}-footer.png`), Buffer.from(shot.result.data, 'base64'));
    console.log(`Saved ${t.name}-footer.png`);
  }

  ws.close();
  edge.kill();
  console.log('Finished capturing all!');
}

capture().catch(console.error);
