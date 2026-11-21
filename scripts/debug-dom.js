const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function debug() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    'about:blank',
  ]);

  await sleep(1500);
  const list = await (await fetch('http://127.0.0.1:9333/json')).json();
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });

  await send('Page.navigate', { url: 'http://localhost:3000' });
  await sleep(2500);

  const evalRes = await send('Runtime.evaluate', {
    expression: `(() => {
      try {
        const nav = document.querySelector('nav');
        if (!nav) return { error: 'no nav' };
        const inner = nav.firstElementChild;
        const items = Array.from(inner.children).map(c => ({
          tag: c.tagName,
          width: c.offsetWidth,
          height: c.offsetHeight,
          left: c.offsetLeft,
          text: (c.innerText || '').slice(0, 30)
        }));
        return {
          windowWidth: window.innerWidth,
          navWidth: nav.offsetWidth,
          innerWidth: inner.offsetWidth,
          items
        };
      } catch (err) {
        return { error: err.message, stack: err.stack };
      }
    })()`,
    returnByValue: true
  });

  console.log('Result:', JSON.stringify(evalRes, null, 2));

  ws.close();
  edge.kill();
}

debug().catch(console.error);
