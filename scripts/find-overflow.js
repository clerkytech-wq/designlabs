const { spawn } = require('child_process');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

async function check() {
  const edge = spawn(edgePath, [
    '--headless',
    '--disable-gpu',
    '--remote-debugging-port=9455',
    'about:blank',
  ]);
  await new Promise((r) => setTimeout(r, 1500));
  const tabs = await (await fetch('http://127.0.0.1:9455/json')).json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 1;
  function send(method, params = {}) {
    return new Promise((resolve) => {
      const msgId = id++;
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if (msg.id === msgId) resolve(msg.result);
      };
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await send('Page.navigate', { url: 'http://localhost:3000' });
  await new Promise((r) => setTimeout(r, 2000));

  const res = await send('Runtime.evaluate', {
    expression: `
      (() => {
        const docW = document.documentElement.scrollWidth;
        const issues = [];
        document.querySelectorAll('*').forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.right > 390.5 || el.scrollWidth > 390.5) {
            issues.push({
              tag: el.tagName,
              cls: el.className ? String(el.className).slice(0, 45) : '',
              right: Math.round(rect.right),
              width: Math.round(rect.width),
              scrollW: el.scrollWidth,
              text: el.innerText ? el.innerText.slice(0, 30).replace(/\\n/g, ' ') : ''
            });
          }
        });
        return { docW, windowW: window.innerWidth, issuesCount: issues.length, sampleIssues: issues.slice(0, 15) };
      })()
    `,
    returnByValue: true,
  });

  console.log('Result:', JSON.stringify(res.result.value, null, 2));
  ws.close();
  edge.kill();
}
check().catch(console.error);
