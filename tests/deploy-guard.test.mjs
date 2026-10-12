import test from 'node:test';
import assert from 'node:assert/strict';
import { deploymentPlan } from '../scripts/project.mjs';

const config = { name: 'swat-watersports', assets: { directory: './public' } };
const state = { github: { owner: 'example-maintainer' }, cloudflare: { accountId: 'a'.repeat(32) }, domain: { name: 'example-swat.test' } };
const origin = 'https://github.com/example-maintainer/swat-watersports.git';
test('correct independent copy produces an explicit SWAT account and target', () => {
  assert.deepEqual(deploymentPlan({ config, state, origin }), { name: 'swat-watersports', accountId: 'a'.repeat(32) });
});
test('a different repository owner stops deployment', () => {
  assert.throws(() => deploymentPlan({ config, state, origin: 'https://github.com/another-maintainer/swat-watersports.git' }), /Git origin/);
});
test('the original template cannot be deployed through the maintainer command', () => {
  assert.throws(() => deploymentPlan({ config, state: { ...state, github: { owner: 'robbyDAninja' } }, origin: 'https://github.com/robbyDAninja/swat-watersports-foundation.git' }), /independent GitHub copy/);
});
test('ambient account selection cannot silently override the verified account', () => {
  assert.throws(() => deploymentPlan({ config, state, origin, accountOverride: 'b'.repeat(32) }), /disagrees/);
});
test('a missing account record stops before any network mutation', () => {
  assert.throws(() => deploymentPlan({ config, origin }), /verified Cloudflare account ID/);
});
test('a different Worker or served private folder is rejected in CI too', () => {
  assert.throws(() => deploymentPlan({ config: { ...config, name: 'stuart-sailing' }, ci: true }), /SWAT static project/);
  assert.throws(() => deploymentPlan({ config: { ...config, assets: { directory: './' } }, ci: true }), /SWAT static project/);
});
test('Stuart Sailing and wildcard routes are rejected', () => {
  for (const pattern of ['stuartsailing.com', 'www.stuartsailing.com', 'example-swat.test/*']) {
    assert.throws(() => deploymentPlan({ config: { ...config, routes: [{ pattern, custom_domain: true }] }, state, origin }), /exact SWAT/);
  }
});
test('local custom domains must match the privately confirmed domain', () => {
  assert.throws(() => deploymentPlan({ config: { ...config, routes: [{ pattern: 'another-business.test', custom_domain: true }] }, state, origin }), /domain confirmed/);
});
test('Workers Builds can use its supplied authentication without private local notes', () => {
  assert.deepEqual(deploymentPlan({ config, ci: true }), { name: 'swat-watersports', accountId: null });
});

test('account IDs and legacy single routes cannot be inherited in the portable config', () => {
  assert.throws(() => deploymentPlan({ config: { ...config, account_id: 'b'.repeat(32) }, ci: true }), /SWAT static project/);
  assert.throws(() => deploymentPlan({ config: { ...config, route: 'stuartsailing.com/*' }, ci: true }), /SWAT static project/);
});
