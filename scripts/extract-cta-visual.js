const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function extractVisual() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9555',
    'about:blank',
  ]);

  await sleep(1500);
  const list = await (await fetch('http://127.0.0.1:9555/json')).json();
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
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; background: #000; overflow: hidden; }
        </style>
      </head>
      <body>
        <canvas id="cvs"></canvas>
        <script>
          const img = new Image();
          img.onload = () => {
            const cvs = document.getElementById('cvs');
            // The mockup is 925 x 1024.
            // Bottom image is located approximately at x: 480 to 905, y: 560 to 970
            const cropX = 480;
            const cropY = 560;
            const cropW = 425;
            const cropH = 410;
            cvs.width = cropW;
            cvs.height = cropH;
            const ctx = cvs.getContext('2d');
            ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
            window.isDone = true;
          };
          img.src = 'data:image/jpeg;base64,${b64}';
        </script>
      </body>
    </html>
  `;

  await send('Page.navigate', { url: 'data:text/html,' + encodeURIComponent(html) });
  await sleep(1500);

  const res = await send('Runtime.evaluate', {
    expression: `(() => {
      const cvs = document.getElementById('cvs');
      return cvs.toDataURL('image/jpeg', 0.95);
    })()`,
    returnByValue: true
  });

  if (res.result?.result?.value) {
    const dataUrl = res.result.result.value;
    const base64Data = dataUrl.replace(/^data:image\/jpeg;base64,/, '');
    fs.writeFileSync('public/images/cta-motion-visual.jpg', Buffer.from(base64Data, 'base64'));
    console.log('Successfully saved public/images/cta-motion-visual.jpg');
  } else {
    console.log('Error extracting visual:', res);
  }

  ws.close();
  edge.kill();
}

extractVisual().catch(console.error);
