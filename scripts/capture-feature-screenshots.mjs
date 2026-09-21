import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const debuggingPort = 9225;
const outputDir = path.resolve("screenshots");
const baseUrl = "http://127.0.0.1:4173/";

const targets = await fetch(`http://127.0.0.1:${debuggingPort}/json`).then((response) => response.json());
const page = targets.find((target) => target.type === "page");

if (!page) throw new Error("No Chrome page target is available.");

const socket = new WebSocket(page.webSocketDebuggerUrl);
const pending = new Map();
let nextId = 1;

function send(method, params = {}) {
  const id = nextId++;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id || !pending.has(message.id)) return;
  const { resolve, reject } = pending.get(message.id);
  pending.delete(message.id);
  if (message.error) reject(new Error(message.error.message));
  else resolve(message.result);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

await mkdir(outputDir, { recursive: true });
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: 1440,
  height: 1000,
  deviceScaleFactor: 1,
  mobile: false,
});

const shots = [
  { name: "feature-agents", selector: "#agents-heading", activeSelector: ".mobile-demo", delay: 1150 },
  { name: "feature-agent-builder", selector: "#task-heading", activeSelector: ".builder-demo", delay: 1050 },
  { name: "feature-run-replay", selector: "#handoff-heading", activeSelector: ".replay-demo", delay: 1250 },
  { name: "feature-workflow", selector: "#workflow-heading", activeSelector: ".multi-demo", delay: 1050 },
];

for (const shot of shots) {
  await send("Page.navigate", { url: baseUrl });
  await wait(2500);
  await send("Runtime.evaluate", {
    expression: `(() => {
      document.querySelector('.intro-veil')?.remove();
      const heading = document.querySelector(${JSON.stringify(shot.selector)});
      if (heading) window.scrollTo(0, window.scrollY + heading.getBoundingClientRect().top - 72);
      const demo = document.querySelector(${JSON.stringify(shot.activeSelector)});
      if (demo) demo.dispatchEvent(new PointerEvent('pointerenter', { bubbles: true, pointerType: 'mouse' }));
    })()`,
  });
  await wait(shot.delay);
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false,
  });
  await writeFile(path.join(outputDir, `${shot.name}.png`), Buffer.from(data, "base64"));
}

socket.close();
