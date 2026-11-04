// Run during the intro/build in a browser; scroll during the capture to include line tools.
export async function checkSwarmSync(duration = 4500) {
  const errors = [];
  const tools = new Set();
  const frameTimes = [];
  const start = performance.now();
  let previous = start;
  await new Promise((resolve) => {
    function sample(now) {
      frameTimes.push(now - previous);
      previous = now;
      const pens = [];
      document.querySelectorAll('.scroll-swarm__agent[data-busy="true"]').forEach((agent) => {
        const tool = agent.dataset.swarmTool;
        const cursor = agent.querySelector('.scroll-swarm__cursor');
        const svg = [...cursor.querySelectorAll('svg')].find((node) => getComputedStyle(node).display !== 'none');
        if (!svg) return;
        tools.add(tool);
        const anchor = ['arrow', 'duplicate'].includes(tool) ? [2, 1.5] : tool === 'pen' ? [2, 2] : [12, 12];
        const tip = new DOMPoint(...anchor).matrixTransform(svg.getScreenCTM());
        if (tool === 'pen') pens.push(tip);
        if (!['box', 'duplicate', 'resize'].includes(tool)) return;
        const frame = agent.querySelector('.scroll-swarm__draft');
        const rect = frame.getBoundingClientRect();
        if (+getComputedStyle(frame).opacity > 0.2 && rect.width > 8 && rect.height > 8) {
          errors.push(Math.hypot(tip.x - rect.right, tip.y - rect.bottom));
        }
      });
      document.querySelectorAll('[data-build-piece="line"][data-build-phase="drawing"]').forEach((line) => {
        const rect = line.getBoundingClientRect();
        if (pens.length && rect.width > 2) {
          errors.push(Math.min(...pens.map((tip) => Math.hypot(tip.x - rect.right, tip.y - rect.top - rect.height / 2))));
        }
      });
      if (now - start < duration) requestAnimationFrame(sample);
      else resolve();
    }
    requestAnimationFrame(sample);
  });
  const result = {
    samples: errors.length,
    maxErrorPx: Math.max(0, ...errors),
    tools: [...tools],
    averageFrameMs: frameTimes.slice(1).reduce((sum, value) => sum + value, 0) / (frameTimes.length - 1),
    framesOver33Ms: frameTimes.slice(1).filter((value) => value > 33).length,
  };
  if (!result.samples || result.maxErrorPx > 1.5) {
    throw new Error(`Cursor/frame sync failed: ${JSON.stringify(result)}`);
  }
  return result;
}
