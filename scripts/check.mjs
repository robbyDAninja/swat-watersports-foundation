import { readFileSync, existsSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, readConfig, deploymentPlan } from './project.mjs';

try {
  if (Number(process.versions.node.split('.')[0]) < 22) throw new Error('Use Node.js 22 or later for the maintainer tools.');
  deploymentPlan({ config: readConfig(), ci: true });
  const required = ['START-HERE.md', 'HANDOFF.md', 'CLAUDE.md', 'CONTENT-CHECKLIST.md', 'brand/SWAT-Watersports-Brand-Guide.pdf',
    'public/index.html', 'public/styles.css', 'public/app.js', 'public/site-config.js', 'public/_headers', 'public/robots.txt'];
  for (const path of required) if (!existsSync(resolve(root, path))) throw new Error(`Missing ${path}`);
  const html = readFileSync(resolve(root, 'public/index.html'), 'utf8');
  if (!/<title>SWAT Watersports\b/.test(html)) throw new Error('The homepage must identify SWAT Watersports.');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
  if (new Set(ids).size !== ids.length) throw new Error('The page contains duplicate element IDs.');
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const path = match[1];
    if (path.startsWith('#') && !ids.includes(path.slice(1))) throw new Error(`Broken section link ${path}`);
    if (path.startsWith('/')) {
      const absolute = resolve(root, 'public', path.slice(1).split(/[?#]/)[0]);
      if (!absolute.startsWith(resolve(root, 'public') + sep) || !existsSync(absolute)) throw new Error(`Missing local asset ${path}`);
    }
  }
  for (const path of ['public/app.js', 'public/site-config.js']) {
    if (spawnSync(process.execPath, ['--check', resolve(root, path)]).status !== 0) throw new Error(`JavaScript syntax error: ${path}`);
  }
  const tracked = spawnSync('git', ['ls-files', '-z'], { cwd: root, encoding: 'utf8' });
  if (tracked.status === 0) {
    const forbidden = tracked.stdout.split('\0').find(path => /^(?:\.swat-private\/|\.env(?:\.|$)|\.dev\.vars(?:\.|$)|review\/)/.test(path));
    if (forbidden) throw new Error(`Private material must not be tracked: ${forbidden}`);
  }
  console.log('PASS: SWAT project, public folder, handoff files, page assets, anchors, JavaScript and private-file exclusion.');
  console.log('This checks the source. Account ownership, DNS, email and human approval are separate checkpoints.');
} catch (error) {
  console.error(`STOP: ${error.message}`);
  process.exitCode = 1;
}
