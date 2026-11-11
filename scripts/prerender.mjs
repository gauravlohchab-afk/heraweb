// Static prerender: renders every route to HTML (with its own <head> and JSON-LD)
// so treatment content is in the initial HTML for search engines and AI crawlers.
// Also writes 404.html and sitemap.xml. Runs after both Vite builds (see package.json).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');

const { render, staticRoutes, getPageMeta, buildLlmsTxt } = await import(pathToFileURL(path.join(serverDir, 'entry-server.js')).href);
const { SITE_URL } = await import(pathToFileURL(path.join(root, 'src/data/site.js')).href);
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

function page(url) {
  const { html, head } = render(url);
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root" data-path="${url}">${html}</div>`);
}

for (const url of staticRoutes) {
  const file = path.join(dist, url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(url));
  console.log('prerendered', url);
}

fs.writeFileSync(path.join(dist, '404.html'), page('/404/').replace(' data-path="/404/"', ''));

const today = new Date().toISOString().slice(0, 10);
// Canonical, indexable pages only, each with its social image as an image entry.
const entries = staticRoutes
  .map((u) => ({ u, meta: getPageMeta(u) }))
  .filter(({ meta }) => !meta.noindex)
  .map(({ u, meta }) => {
    const img = meta.image ? `\n    <image:image><image:loc>${SITE_URL}${meta.image}</image:loc></image:image>` : '';
    return `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>${img}\n  </url>`;
  });
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// Plain-text summary for AI assistants (https://llmstxt.org).
fs.writeFileSync(path.join(dist, 'llms.txt'), buildLlmsTxt());

fs.rmSync(serverDir, { recursive: true, force: true });
console.log(`wrote ${staticRoutes.length} pages, 404.html, sitemap.xml and llms.txt`);
