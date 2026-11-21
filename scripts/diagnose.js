const { spawn } = require('child_process');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function diagnose() {
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9333',
    'http://localhost:3000',
  ]);

  await new Promise((r) => setTimeout(r, 2000));

  const listRes = await fetch('http://127.0.0.1:9333/json');
  const tabs = await listRes.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);

  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  function evaluate(expr) {
    return new Promise((resolve) => {
      const msgId = id++;
      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.id === msgId) resolve(msg.result);
      };
      ws.send(JSON.stringify({
        id: msgId,
        method: 'Runtime.evaluate',
        params: { expression: expr, returnByValue: true },
      }));
    });
  }

  // Set viewport to 390
  await new Promise((resolve) => {
    const msgId = id++;
    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id === msgId) resolve();
    };
    ws.send(JSON.stringify({
      id: msgId,
      method: 'Emulation.setDeviceMetricsOverride',
      params: { width: 390, height: 844, deviceScaleFactor: 1, mobile: true },
    }));
  });

  const res = await evaluate(`
    (() => {
      const results = [];
      const docW = document.documentElement.scrollWidth;
      const bodyW = document.body.scrollWidth;
      results.push('doc.scrollWidth: ' + docW + ', body.scrollWidth: ' + bodyW);

      const all = document.querySelectorAll('*');
      for (const el of all) {
        if (el.scrollWidth > 390 || el.offsetWidth > 390) {
          results.push(el.tagName + '.' + el.className.slice(0, 30) + ' -> scrollWidth=' + el.scrollWidth + ', offsetWidth=' + el.offsetWidth);
        }
      }
      return results;
    })()
  `);

  console.log('Diagnosis results:', res.result ? res.result.value : res);

  ws.close();
  edge.kill();
}

diagnose().catch(console.error);
