import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, readConfig, statePath, deploymentPlan } from './project.mjs';

try {
  if (process.argv.length > 2) throw new Error('No target overrides are accepted. Update the confirmed handoff record instead.');
  const ci = process.env.WORKERS_CI === '1';
  let state;
  if (!ci) {
    try { state = JSON.parse(readFileSync(statePath, 'utf8')); }
    catch { throw new Error('Create the private maintainer record from maintainer-state.example.json first. See HANDOFF.md.'); }
  }
  const origin = ci ? '' : spawnSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).stdout?.trim();
  const plan = deploymentPlan({ config: readConfig(), origin, state, ci, accountOverride: process.env.CLOUDFLARE_ACCOUNT_ID });
  const env = { ...process.env };
  if (plan.accountId) env.CLOUDFLARE_ACCOUNT_ID = plan.accountId;
  const wrangler = resolve(root, 'node_modules/wrangler/bin/wrangler.js');
  if (!ci) {
    const check = spawnSync(process.execPath, [wrangler, 'whoami', '--json'], { cwd: root, env, encoding: 'utf8' });
    let user;
    try { user = JSON.parse(check.stdout); } catch { /* Give a concise sign-in checkpoint below. */ }
    if (check.status !== 0 || !user?.loggedIn || !user.accounts?.some(account => account.id === plan.accountId)) {
      throw new Error('Wrangler is not authenticated for the recorded SWAT account. Erinn must sign in or use the Cloudflare Git dashboard path.');
    }
    console.log('Verified the recorded SWAT account. Deploying only swat-watersports.');
  } else console.log('Workers Builds supplies this project’s authentication. Deploying only swat-watersports.');
  const result = spawnSync(process.execPath, [wrangler, 'deploy', '--name', plan.name], { cwd: root, env, stdio: 'inherit' });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} catch (error) {
  console.error(`STOP: ${error.message}`);
  process.exitCode = 1;
}
