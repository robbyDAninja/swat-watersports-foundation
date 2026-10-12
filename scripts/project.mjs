import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
export const workerName = 'swat-watersports';
export const statePath = resolve(root, '.swat-private/maintainer-state.json');
export const readConfig = () => JSON.parse(readFileSync(resolve(root, 'wrangler.jsonc'), 'utf8'));

export function deploymentPlan({ config, origin, state, ci = false, accountOverride = '' }) {
  if (config.name !== workerName || config.assets?.directory !== './public' || config.main || config.assets?.run_worker_first || config.account_id || config.route) {
    throw new Error('This deploy command only accepts the SWAT static project named swat-watersports, serving ./public.');
  }
  for (const route of config.routes || []) {
    const hostname = route?.pattern || '';
    if (!route.custom_domain || !/^[a-z0-9.-]+$/i.test(hostname) || /(^|\.)stuartsailing\.com$/i.test(hostname)) {
      throw new Error('Only exact SWAT Custom Domains are allowed. No wildcard or Stuart Sailing routes.');
    }
  }
  if (ci) return { name: workerName, accountId: null };
  if (!state?.github?.owner || !/^[a-z0-9-]+$/i.test(state.github.owner) || !/^[a-f0-9]{32}$/i.test(state.cloudflare?.accountId || '')) {
    throw new Error('First fill the GitHub owner and verified Cloudflare account ID in .swat-private/maintainer-state.json. See HANDOFF.md.');
  }
  if (state.github.owner.toLowerCase() === 'robbydaninja') {
    throw new Error('Make Erinn’s independent GitHub copy first. This command does not deploy Bridge Ninja’s template.');
  }
  const match = origin?.match(/^(?:https:\/\/github\.com\/|git@github\.com:)([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (!match || match[1].toLowerCase() !== state.github.owner.toLowerCase() || match[2] !== workerName) {
    throw new Error('The Git origin must be the recorded owner’s swat-watersports repository.');
  }
  const accountId = state.cloudflare.accountId;
  if (accountOverride && accountOverride !== accountId) throw new Error('The Cloudflare account environment disagrees with the recorded SWAT account.');
  for (const route of config.routes || []) {
    if (!state.domain?.name || ![state.domain.name, `www.${state.domain.name}`].includes(route.pattern)) {
      throw new Error('The Custom Domains must match the domain confirmed in the private handoff record.');
    }
  }
  return { name: workerName, accountId };
}
