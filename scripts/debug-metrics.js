const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function debug() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9876',
    'http://localhost:3000',
  ]);

  await sleep(2500);
  const listRes = await fetch('http://127.0.0.1:9876/json');
  const list = await listRes.json();
  console.log('Targets:', list.map(t => ({ url: t.url, type: t.type })));
  
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });

  await sleep(1000);

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      const nav = document.querySelector('nav');
      const inner = nav ? nav.firstElementChild : null;
      const logo = inner ? inner.children[0] : null;
      const links = inner ? inner.children[1] : null;
      const cta = inner ? inner.children[2] : null;
      return {
        windowInnerWidth: window.innerWidth,
        windowOuterWidth: window.outerWidth,
        bodyScrollWidth: document.body.scrollWidth,
        navScrollWidth: nav ? nav.scrollWidth : 0,
        innerOffsetWidth: inner ? inner.offsetWidth : 0,
        innerScrollWidth: inner ? inner.scrollWidth : 0,
        logo: logo ? { left: logo.offsetLeft, width: logo.offsetWidth } : null,
        links: links ? { left: links.offsetLeft, width: links.offsetWidth } : null,
        cta: cta ? { left: cta.offsetLeft, width: cta.offsetWidth, right: cta.offsetLeft + cta.offsetWidth } : null,
      };
    })()`,
    returnByValue: true
  });

  console.log('Layout metrics at 390px:', evalRes.result.result.value);

  ws.close();
  edge.kill();
}

debug().catch(console.error);
