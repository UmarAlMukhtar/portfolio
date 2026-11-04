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

test('initial HTML contains the complete portfolio without requiring JavaScript or scrolling', () => {
  const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
  assert.match(body, /data-prerendered/);
  for (const text of ['FocusFlow', 'MatchUndo', 'OneSoft', 'Mulearn', 'mailto:umar1868807@gmail.com']) {
    assert.ok(body.includes(text), `${text} is missing from the initial response`);
  }
  for (const id of ['home', 'about', 'work', 'experience', 'contact']) {
    assert.ok(body.includes(`id="${id}"`), id);
  }
  assert.equal((body.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(body, /\binert(?:=|\s|>)/);
  assert.doesNotMatch(body, /intro-loader|<!--portfolio-content-->/);
  assert.ok(body.includes('data-build-state="ready"'));
  assert.match(html, /\.js #root\[data-prerendered\]/, 'Hide static markup before the animated app starts');
});

test('crawler discovery uses only the canonical document and real modification dates', async () => {
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  const sitemap = await readFile(new URL('sitemap.xml', dist), 'utf8');
  assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]), [canonical]);
  const modified = sitemap.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1];
  assert.equal(new Date(modified).toISOString().slice(0, 10), modified);
  const profileModified = html.match(/"dateModified": "([^"]+)"/)?.[1];
  assert.match(profileModified, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/);
  assert.ok(Number.isFinite(Date.parse(profileModified)));
  assert.equal(profileModified.slice(0, 10), modified);
  assert.doesNotMatch(sitemap, /<priority>|<changefreq>|<loc>[^<]*#/);
  for (const match of sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
    const image = new URL(match[1]);
    assert.equal(image.origin, new URL(canonical).origin);
    assert.ok((await stat(new URL(`.${image.pathname}`, dist))).size > 0);
  }
  const robots = await readFile(new URL('robots.txt', dist), 'utf8');
  assert.match(robots, /User-agent: \*/);
  assert.match(robots, /^Allow: \/$/m);
  assert.ok(robots.includes(`Sitemap: ${canonical}sitemap.xml`));
  assert.doesNotMatch(robots, /^Disallow: \/(?:\s|$|assets)/m);
});

test('profile structured data links the page, website, and visible social identity', () => {
  const data = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const person = data.find((item) => item['@type'] === 'Person');
  const website = data.find((item) => item['@type'] === 'WebSite');
  const profile = data.find((item) => item['@type'] === 'ProfilePage');
  assert.ok(profile);
  assert.equal(profile.mainEntity['@id'], person['@id']);
  assert.equal(profile.isPartOf['@id'], website['@id']);
  for (const url of person.sameAs) assert.ok(html.includes(`href="${url}"`), url);
  for (const field of ['og:image:width', 'og:image:height', 'og:image:type', 'og:locale']) {
    assert.ok(html.includes(`property="${field}"`), field);
  }
  assert.match(html, /name="twitter:image:alt"/);
});

test('the old production hostname redirects permanently without redirecting previews or the canonical host', async () => {
  const config = JSON.parse(await readFile(new URL('../vercel.json', import.meta.url), 'utf8'));
  const redirect = config.redirects.find((item) => item.source === '/:path*');
  assert.equal(redirect.permanent, true);
  assert.equal(redirect.destination, 'https://umaralmukhtar.dev/:path*');
  assert.deepEqual(redirect.has, [{ type: 'host', value: 'umaralmukhtar.vercel.app' }]);
  const homepage = config.redirects.find((item) => item.source === '/');
  assert.equal(homepage?.destination, 'https://umaralmukhtar.dev/');
  assert.equal(homepage.permanent, true);
  assert.deepEqual(homepage.has, redirect.has);
});
