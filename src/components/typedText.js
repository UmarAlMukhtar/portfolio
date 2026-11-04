// Keep the existing text nodes and links so React can resume owning them after the build.
export function prepareTypedText(target) {
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  const nodes = [];
  const carets = [];
  const range = document.createRange();
  const bounds = target.getBoundingClientRect();
  const size = { width: target.style.width, height: target.style.height };
  let node;
  let length = 0;
  let shown = -1;
  let active = false;
  let locked = false;
  while ((node = walker.nextNode())) {
    const original = node.data;
    const glyphs = [...original.matchAll(/\s+|[^\s]/gu)];
    const characters = glyphs.map(([glyph]) => /\s/u.test(glyph) ? " " : glyph);
    nodes.push({ node, original, characters, start: length });
    glyphs.forEach((glyph) => {
      range.setStart(node, glyph.index + glyph[0].length);
      range.collapse(true);
      const rect = range.getBoundingClientRect();
      carets.push({ x: rect.left + window.scrollX, y: rect.top + rect.height * 0.65 + window.scrollY });
    });
    length += characters.length;
  }
  const finishText = () => {
    if (!active) return;
    nodes.forEach(({ node: text, original }) => { text.data = original; });
    active = false;
  };
  const releaseSize = () => {
    if (!locked) return;
    target.style.width = size.width;
    target.style.height = size.height;
    locked = false;
  };
  return {
    length,
    start() {
      target.style.width = `${bounds.width}px`;
      target.style.height = `${bounds.height}px`;
      active = locked = true;
      nodes.forEach(({ node: text }) => { text.data = ""; });
    },
    render(count) {
      if (!active) return null;
      count = Math.max(0, Math.min(length, Math.floor(count)));
      if (count === shown) return null;
      shown = count;
      nodes.forEach(({ node: text, characters, start }) => {
        const value = characters.slice(0, Math.max(0, count - start)).join("");
        if (text.data !== value) text.data = value;
      });
      return carets[Math.max(0, count - 1)];
    },
    finishText,
    releaseSize,
    restore() { finishText(); releaseSize(); },
  };
}
