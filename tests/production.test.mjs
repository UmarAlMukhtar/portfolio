import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { test } from 'node:test';
import { gzipSync } from 'node:zlib';

const dist = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', dist), 'utf8');

test('production metadata has real URLs and valid structured data', async () => {
  assert.doesNotMatch(html, /%VITE_[A-Z_]+%/);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(canonical).protocol, 'https:');
  const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
  assert.ok(sitemap.includes(`<loc>${canonical}</loc>`));
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    assert.equal(JSON.parse(match[1]).url, canonical);
  }
  const socialImage = new URL(html.match(/property="og:image" content="([^"]+)"/)[1]);
  assert.equal(socialImage.origin, new URL(canonical).origin);
  const image = await readFile(new URL(`.${socialImage.pathname}`, dist));
  assert.equal(image.subarray(1, 4).toString(), 'PNG', 'Social preview must be a raster PNG');
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
});

test('entry assets, project images, and resume are present', async () => {
  const entryAssets = [...html.matchAll(/(?:src|href)="(\/[^"#]+)"/g)]
    .map((match) => match[1]).filter((path) => !path.startsWith('//'));
  for (const path of [...entryAssets, '/images/project1.png', '/images/project2.png', '/images/project3.png', '/resume.pdf']) {
    assert.ok((await stat(new URL(`.${path}`, dist))).size > 0, path);
  }
  const resume = await readFile(new URL('resume.pdf', dist));
  assert.equal(resume.subarray(0, 5).toString(), '%PDF-');
});

test('compressed application stays within the lightweight payload budget', async () => {
  const files = await readdir(new URL('assets/', dist));
  const size = async (extension) => {
    const payloads = await Promise.all(files.filter((file) => file.endsWith(extension))
      .map(async (file) => gzipSync(await readFile(new URL(`assets/${file}`, dist))).length));
    assert.ok(payloads.length > 0);
    return payloads.reduce((total, bytes) => total + bytes, 0);
  };
  assert.ok(await size('.js') < 150 * 1024, 'JavaScript exceeds 150 KiB gzip');
  assert.ok(await size('.css') < 10 * 1024, 'CSS exceeds 10 KiB gzip');
});
