import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { root } from './project.mjs';

try {
  const args = process.argv.slice(2);
  const modes = args.filter(x => x === '--draft' || x === '--launch');
  if (!args[0] || modes.length !== 1 || args.slice(1).some(x => !['--draft', '--launch', '--match-local'].includes(x))) {
    throw new Error('Usage: npm run verify:live -- https://YOUR-SWAT-ADDRESS --draft|--launch [--match-local]');
  }
  const base = new URL(args[0]);
  if (base.protocol !== 'https:' || base.username || base.password || base.search || base.hash || !['', '/'].includes(base.pathname)) {
    throw new Error('Use the HTTPS homepage address with no credentials, path, query or fragment.');
  }
  if (/(^|\.)stuartsailing\.com$/i.test(base.hostname)) throw new Error('This check is for SWAT, not Stuart Sailing.');
  const files = new Map();
  async function get(path) {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } });
    if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
    const final = new URL(response.url);
    if (final.hostname.replace(/^www\./, '') !== base.hostname.replace(/^www\./, '')) throw new Error(`${path} redirects to a different site.`);
    const data = Buffer.from(await response.arrayBuffer());
    files.set(path, data);
    return { response, data, text: data.toString('utf8') };
  }
  const page = await get('/');
  if (!/<title>SWAT Watersports\b/.test(page.text)) throw new Error('This address does not serve the SWAT homepage.');
  const settings = await get('/site-config.js');
  const robots = await get('/robots.txt');
  const review = settings.text.match(/\breviewMode\s*:\s*(true|false)\b/)?.[1];
  if (!review) throw new Error('Cannot read reviewMode from the public settings.');
  const metaNoindex = /<meta\b(?=[^>]*name=["']robots["'])(?=[^>]*content=["'][^"']*noindex)[^>]*>/i.test(page.text);
  const headerNoindex = /\bnoindex\b/i.test(page.response.headers.get('x-robots-tag') || '');
  const blockRobots = /^\s*Disallow:\s*\/\s*$/im.test(robots.text);
  const draft = modes[0] === '--draft';
  if (draft && (review !== 'true' || !metaNoindex || !headerNoindex || !blockRobots)) throw new Error('Draft settings disagree: check reviewMode, robots meta, X-Robots-Tag and robots.txt.');
  if (!draft && (review !== 'false' || metaNoindex || headerNoindex || blockRobots || !/^\s*Allow:\s*\/\s*$/im.test(robots.text))) {
    throw new Error('Launch settings still contain draft restrictions or lack Allow: / in robots.txt.');
  }
  if (page.response.headers.get('x-content-type-options')?.toLowerCase() !== 'nosniff' || !page.response.headers.get('content-security-policy')) {
    throw new Error('Expected website response headers are missing.');
  }
  const assetPaths = [...new Set([...page.text.matchAll(/\b(?:src|href)="(\/[^"?#]+)"/g)].map(x => x[1]))];
  for (const path of assetPaths) if (!files.has(path)) await get(path);
  const phone = settings.text.match(/\bphoneE164\s*:\s*['"](\+\d{7,15})['"]/)?.[1];
  if (!phone || !page.text.includes(`tel:${phone}`) || !page.text.includes(`sms:${phone}`)) throw new Error('The settings and fallback phone/text links disagree.');
  if (args.includes('--match-local')) {
    for (const [path, data] of files) {
      const local = resolve(root, 'public', path === '/' ? 'index.html' : path.slice(1));
      if (!data.equals(readFileSync(local))) throw new Error(`The live ${path} differs from this source copy.`);
    }
  }
  console.log(JSON.stringify({ checkedAt: new Date().toISOString(), url: base.href, mode: draft ? 'draft' : 'launch', passed: true,
    matchesLocal: args.includes('--match-local'), files: [...files].map(([path, data]) => ({ path, sha256: createHash('sha256').update(data).digest('hex') })),
    limits: 'Does not verify browser playback, business approval, DNS inventory, registrar ownership or email delivery. Follow HANDOFF.md.' }, null, 2));
} catch (error) {
  console.error(`STOP: ${error.message}`);
  process.exitCode = 1;
}
