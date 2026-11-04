import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const [{ default: NavBar }, { default: Portfolio }, { default: Footer }] = await Promise.all([
    server.ssrLoadModule('/src/components/NavBar.jsx'),
    server.ssrLoadModule('/src/sections/Portfolio.jsx'),
    server.ssrLoadModule('/src/sections/Footer.jsx'),
  ]);
  const markup = renderToStaticMarkup(createElement('div', {
    className: 'portfolio-page',
    'data-theme': 'light',
    'data-build-state': 'ready',
  }, createElement(NavBar, { theme: 'light' }), createElement(Portfolio), createElement(Footer)));
  const file = new URL('../dist/index.html', import.meta.url);
  const html = await readFile(file, 'utf8');
  assert.ok(html.includes('<!--portfolio-content-->'), 'Missing prerender placeholder');
  await writeFile(file, html.replace('<!--portfolio-content-->', () => markup));
  console.log('Prerendered portfolio content into dist/index.html');
} finally {
  await server.close();
}
