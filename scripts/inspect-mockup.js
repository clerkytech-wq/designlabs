const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function inspect() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9667',
    'about:blank',
  ]);

  await sleep(1500);
  const list = await (await fetch('http://127.0.0.1:9667/json')).json();
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

  const b64 = fs.readFileSync('public/images/portfolio-mockup-ref.jpg').toString('base64');
  const html = `<html><body><img id="ref" src="data:image/jpeg;base64,${b64}"></body></html>`;
  await send('Page.navigate', { url: 'data:text/html,' + encodeURIComponent(html) });
  await sleep(1000);

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const img = document.getElementById('ref');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let splitY = -1;
      for (let y = 0; y < canvas.height; y++) {
        const p = ctx.getImageData(50, y, 1, 1).data;
        if (p[0] > 230 && p[1] > 230 && p[2] > 230) {
          splitY = y;
          break;
        }
      }
      return {
        width: canvas.width,
        height: canvas.height,
        splitY
      };
    })()`,
    returnByValue: true
  });

  console.log('Analysis result:', res.result?.result?.value);
  ws.close();
  edge.kill();
}

inspect().catch(console.error);
