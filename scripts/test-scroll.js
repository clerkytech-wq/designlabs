const { spawn } = require('child_process');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function test() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    'http://localhost:3000',
  ]);

  await new Promise(r => setTimeout(r, 2000));
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
  await send('Runtime.enable');
  await new Promise(r => setTimeout(r, 1000));

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const el = document.getElementById('about');
      const services = document.getElementById('services');
      return {
        aboutTop: el ? el.offsetTop : null,
        servicesTop: services ? services.offsetTop : null,
        scrollY: window.scrollY,
        bodyHeight: document.body.scrollHeight
      };
    })()`,
    returnByValue: true
  });
  console.log('DOM info:', res.result?.result?.value);

  // Now test scrolling
  await send('Runtime.evaluate', {
    expression: `window.scrollTo(0, document.getElementById('about').offsetTop);`,
  });
  await new Promise(r => setTimeout(r, 500));

  const scrollRes = await send('Runtime.evaluate', {
    expression: `window.scrollY`,
    returnByValue: true
  });
  console.log('ScrollY after scrollTo about:', scrollRes.result?.result?.value);

  ws.close();
  edge.kill();
}

test().catch(console.error);
