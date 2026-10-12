**Version:** 1.5
**Last updated:** 2026-10-12

# Erinn and Claude: take over the SWAT website

**GitHub holds the files. Cloudflare publishes them. Dave keeps the domain.** Make an independent SWAT project in Erinn’s existing accounts. The built website, artwork, brand guide and deployment settings are already supplied.

Erinn can begin with [START-HERE.md](START-HERE.md). This file is the detailed execution guide for Claude. Work in order, reuse completed checkpoints, and distinguish a verified result from a prepared plan.

## What belongs where

| Item | SWAT arrangement |
|---|---|
| GitHub source | Erinn’s verified account/organization, repository `swat-watersports` |
| Cloudflare site | A separate Worker named `swat-watersports` in her verified account |
| Website files | Only this repository’s `public/` folder is served |
| Domain | Dave owns `swatwatersports.com`; confirm it in the registrar account |
| Maintenance | Erinn/Claude edit her copy, push to `main`, and verify automatic deployment |
| Existing Stuart Sailing | Its repository, project, domain, booking link and app permissions stay intact |

A template copy starts an independent project. Do not fork or simply clone Bridge Ninja’s repository and keep its write destination. A clone is the local working copy **after** Erinn’s own repository exists. Later Bridge Ninja template updates do not automatically change her site. [GitHub template guidance](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template).

## 0. Inspect tools and establish the correct accounts

**Claude executes:** read this guide, CLAUDE.md and CONTENT-CHECKLIST.md. Inspect available GitHub/Cloudflare connectors, browser and terminal capabilities. Read authenticated account identities; verify the intended owner with Erinn if ambiguous. Do not assume the GitHub owner must have her personal name: her existing organization can own a separate SWAT repository.

Stop if the connected identity is Bridge Ninja/Robby’s account. A connected Claude plugin is not proof that `gh` or Wrangler is authenticated locally. Use the existing available connection. If the needed operation is unavailable, prepare the exact dashboard action for Erinn rather than obtaining credentials from chat or setting up a new integration.

**Human action only if needed:** sign in through the normal service screen or approve its permission prompt.

After a local copy exists, create `.swat-private/maintainer-state.json` from `maintainer-state.example.json` **only if absent**. Fill known values from the authenticated services. Keep unknown fields blank. This ignored folder holds progress, account IDs, approvals, DNS backups and evidence links. Never commit it or place it under `public/`. Without local files, use equivalent private notes in Erinn’s environment, not a GitHub issue or public document.

After each checkpoint, record what was verified, the evidence and the exact next human action. Do not fill approval/completion flags yourself without evidence. Resume from that record next time.

## 1. Create Erinn’s independent GitHub copy

**Claude executes:** look for an existing `OWNER/swat-watersports` repository first. Reuse it only after checking its owner, contents and relationship to this SWAT project; do not overwrite unrelated work.

If none exists, create it from `robbyDAninja/swat-watersports-foundation`, using only the default branch. Visibility: Public. Name: `swat-watersports`. Owner: the verified Erinn account/organization. Use a connected template-creation operation if available.

Terminal alternative, only when GitHub CLI is authenticated as Erinn and `SWAT_OWNER` is set to the verified owner:

```sh
gh auth status
gh api user --jq .login
gh repo create "$SWAT_OWNER/swat-watersports" --public --template robbyDAninja/swat-watersports-foundation --clone
```

Run creation from a separate working folder, outside Stuart Sailing’s checkout. If the repository already exists, clone her copy instead with `gh repo clone "$SWAT_OWNER/swat-watersports"`. Do not create a nested Git repository inside Stuart Sailing. [GitHub CLI](https://cli.github.com/manual/gh_repo_create).

**Browser alternative:** [Create your copy](https://github.com/robbyDAninja/swat-watersports-foundation/generate), select the verified owner, name `swat-watersports`, Public, and create. If Claude cannot operate that screen, Erinn completes this one action.

**Verify:** the new repository URL belongs to the intended owner, is independent, has `public/`, brand/, scripts/, this guide and wrangler.jsonc at the top level, and uses `main`. A local checkout’s `git remote -v` must point to her copy. Save the URL/owner privately. If using a ZIP fallback, put the extracted contents at the repository root; do not upload the ZIP as the website.

## 2. Check the copied source

With a terminal, use Node.js 22 or later in the SWAT checkout:

```sh
npm ci
npm run handoff:check
npm test
npm run check
```

These commands install the pinned deployment tool, verify source and guards, and dry-run deployment. They do not publish or change DNS. `npm run dev` provides an optional local preview. Keep `wrangler.jsonc` in its current plain-JSON syntax and `assets.directory` set to `./public`.

If Claude only has remote tools, inspect the equivalent files and let Workers Builds run the included source check. Do not describe unrun commands as passed.

## 3. Publish SWAT in Erinn’s Cloudflare and connect automatic updates

**Default route:** use Workers Builds. First inspect whether a Worker named `swat-watersports` already exists in Erinn’s account. Reuse it only after confirming its purpose, existing domains and current source; obtain approval before replacing a live site. Do not overwrite an unrelated name collision. In Erinn’s Cloudflare account, open Workers & Pages and create/import a **Worker connected to GitHub**. Select **her SWAT copy**, not Stuart Sailing or Bridge Ninja’s template.

| Setting | Exact value |
|---|---|
| Worker name | `swat-watersports` |
| Repository | The verified `OWNER/swat-watersports` copy |
| Production branch | `main` |
| Root directory | Blank / repository root |
| Build command | `npm run handoff:check` (source verification, no website compilation) |
| Deploy command | `npm run deploy` |
| Static assets | Already `./public` in wrangler.jsonc |

The current build image supplies a compatible Node.js runtime and installs the locked dependencies automatically; leave dependency installation enabled. [Build image](https://developers.cloudflare.com/workers/ci-cd/builds/build-image/).

Keep Cloudflare’s managed Workers Builds authentication. No Dave API key or new GitHub Actions secrets are needed. The script recognizes Cloudflare’s documented `WORKERS_CI=1` environment and deploys explicitly to `swat-watersports`. [Build settings and authentication](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

When adding the SWAT repository to the existing Cloudflare GitHub App, **retain its current Stuart Sailing repository access**. Add SWAT to the selected set; do not replace the set or uninstall/reinstall the shared app. [GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/).

**Human action only if needed:** select the correct Cloudflare account or approve the GitHub connection/access prompt. Claude can prepare the screen and settings first.

**Optional terminal first deployment:** if Wrangler is already authenticated for Erinn, fill `github.owner` and `cloudflare.accountId` in the private state from verified account data, then run `npm run deploy`. The wrapper checks the local Git destination and Cloudflare membership and sets the recorded account explicitly. It refuses the original Bridge Ninja template, conflicting account selection, another Worker name or a served private folder. Do not override the wrapper to get around a failed check. If CLI authentication is unavailable, use the Git dashboard route. A CLI deployment alone is **not** an automatic Git connection: connect that existing SWAT Worker through its Build settings afterward.

**Verify:** record her actual `workers.dev` URL, successful build/commit and project/account identity. Open it on a phone and desktop. Check the logo, menu, pricing, FAQ, call/text, hero playback/pause and static fallback. Call/text checks need only inspect/open the expected phone app; do not initiate an unsolicited call or message.

```sh
npm run verify:live -- https://HER-SWAT-PREVIEW.workers.dev --draft --match-local
```

Claude substitutes the real address. Save the verifier output privately. It checks served files and draft settings; browser/video behavior needs the separate visual check. Dave’s domain remains untouched.

## 4. Prove Erinn can maintain it

Make one harmless **review-banner wording** edit in her copy, show the diff, commit/push to `main`, and check the automatic build. Verify the changed words on her preview and rerun the live check. Record the before/after, commit and successful deployment. Keep prices, phone and brand slogans unchanged for this demonstration.

**Checkpoint:** her account owns the source and site, and an edit redeploys automatically without Bridge Ninja’s credentials. If a build fails, inspect it and preserve the last working deployment; do not remove the shared GitHub App or alter Stuart Sailing.

## 5. Prepare the domain and email move before requesting the cutover

Confirm the exact domain, registrar access, current nameservers, DNSSEC and any existing Cloudflare zone/account. The flyer names `swatwatersports.com`. An October 12 public lookup showed Namecheap nameservers and its email-forwarding MX records; this does not reveal whether forwarding aliases are actually used. Re-read the current setup.

**Claude prepares:** a private export/screenshots of all existing DNS settings, aliases/catch-all destinations, current nameservers and rollback notes. Compare the complete provider inventory with Cloudflare’s imports; public DNS lookups cannot enumerate every record. Preserve mail/verification records and URL-forwarding behavior, not only website A/CNAME records. Confirm who can authorize the change.

Add the SWAT domain on the Free plan in the **same Cloudflare account as the SWAT Worker**, keeping existing records in place while the zone is pending. Record the exact assigned nameserver pair. If already active in this account, do not repeat the move. If active in a different Cloudflare account, stop to prepare that specific migration rather than create duplicate zones blindly.

### Namecheap forwarding check

If Dave uses Namecheap Free Email Forwarding, copying its MX records alone is insufficient: that service is for Namecheap DNS. Inventory aliases and any catch-all under Domain → Redirect Email. If none are used, record that confirmation and skip a forwarding migration. [Namecheap forwarding requirements](https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding/).

If used, prepare an owner-approved replacement. For simple inbound forwarding, Cloudflare Email Routing can send the same aliases to existing inboxes; it is not a new mailbox or an outbound-email setup. Add/verify the destination inboxes, then onboard the SWAT domain and recreate the recorded aliases/catch-all with the generated mail records. Use the current Email Service → Email Routing screens. Preserve unrelated sender authentication, and do not add a second SPF record. [Cloudflare routing steps](https://developers.cloudflare.com/email-service/get-started/route-emails/).

Complete as much staging as the pending zone permits. If activation is required, prepare the exact post-activation steps and agree the cutover sequence with the operator. Do not switch nameservers while an actively used forwarding service has no agreed replacement plan. Test each alias from an inbox **different from its destination**, then confirm arrival. For a different mail provider, preserve its actual records and confirm its requirements instead; do not enable Cloudflare routing over it.

### Present the exact human change

Once DNS/mail preparations and the switch are approved, give Erinn/Dave this filled-in checklist:

- Domain and registrar: the confirmed values.
- Old nameservers and DNS backup: private rollback reference.
- New nameserver 1 and 2: exactly what her Cloudflare zone assigned, never sample names.
- DNSSEC: current result and any necessary old-DS removal before the switch.
- Email: aliases confirmed unused, or the agreed replacement sequence and operator.
- Next screen and action: the registrar’s nameserver setting only.

If registrar DNSSEC is enabled, follow the documented old-DNSSEC removal before the move; re-enable with Cloudflare’s new DS details after activation. A public empty DS response does not replace checking the registrar. [Cloudflare full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/).

**Human action:** Erinn, if authorized by Dave, or Dave signs into Namecheap → Domain List → Manage → Nameservers → CustomDNS. Replace the old pair with the exact Cloudflare pair and save using the green checkmark. This changes the nameserver setting, not guessed CNAME/TXT records. Dave keeps registration/renewals at his registrar. [Namecheap’s instructions](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/).

## 6. Attach Dave’s address and confirm continuity

After the zone is Active, Claude can use its supported Cloudflare tools to add SWAT Custom Domains, or prepare **SWAT Worker → Settings → Domains & Routes → Add → Custom Domain** for Erinn. Add the confirmed bare domain and `www` hostname. Cloudflare creates their Worker records/certificates. Inspect and back up any conflicting website record before replacing it; preserve unrelated records. [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).

Record the approved exact hostnames in wrangler.jsonc so future deployments retain the intended setup:

```json
"routes": [
  { "pattern": "swatwatersports.com", "custom_domain": true },
  { "pattern": "www.swatwatersports.com", "custom_domain": true }
]
```

This is a **fragment to add only after the domain is confirmed and the cutover approved**. Keep all other configuration; do not paste it as the whole file or add wildcard/Stuart Sailing routes. Verify both HTTPS addresses, phone layout and any existing email/forwarding. Recheck Stuart Sailing’s public site and existing build connection to confirm they remain intact. Save receipts; do not infer email success from a DNS lookup.

## 7. Publish approved details and remove the draft settings

Work through CONTENT-CHECKLIST.md with Dave/Erinn. Confirm prices, contact recipient, activities and requirements. The clearer map and exact SWAT booking-product URL can be supplied later; call/text is the working path now. Do not use Stuart Sailing’s booking destination. Review the credited Malibu reference hero: it is another boat/location, YouTube-dependent, and can be replaced with owned/cleared local footage following CLAUDE.md.

Once Dave/Erinn approve the page for launch, Claude prepares one commit containing all four changes:

1. `public/site-config.js`: `reviewMode: false`.
2. `public/index.html`: remove its robots meta tag containing noindex.
3. `public/_headers`: remove only the X-Robots-Tag noindex line; retain security headers.
4. `public/robots.txt`: `User-agent: *` and `Allow: /`.

Show the diff, push in her copy, confirm the build and run:

```sh
npm run verify:live -- https://swatwatersports.com --launch --match-local
npm run verify:live -- https://www.swatwatersports.com --launch --match-local
```

Use her confirmed domain if different. The verifier checks actual served settings/assets, not business approval or email delivery. Inspect the browser, menu/FAQ, call/text, optional booking and hero/fallback too. Do not announce launch or send test messages to others without the operator’s authorization.

## Finish, backup and everyday updates

Record separately: **Bridge Ninja package ready**, **Erinn’s copy/preview/edit verified**, and **Dave’s domain/email launch verified**. Prepared instructions are not proof of the later two checkpoints.

Save a private handoff receipt containing the real repository, account/project, preview/domain addresses, current commit, DNS/alias backup, actual checks, approvals, unresolved inputs and next action. Recovery information stays in the account’s normal secure system, not these public files. Keep a source ZIP and the included brand guide. Another maintainer can later redeploy the independent source; Dave retains the domain.

For later edits: show a small diff, commit/push, inspect the automatic build, and verify the live result. Revert the relevant Git commit for content mistakes. For domain problems, use the recorded DNS/forwarding plan; reversing nameservers also takes propagation time and must account for DNSSEC/email changes. Do not delete the working zone, unrelated records or Stuart Sailing as a troubleshooting shortcut.

Robby’s review preview is a review link, not Erinn’s live hosting. After her own copy is verified, agree any preview retirement with Robby. The static site fits free hosting; domain renewal, existing Claude and separate booking/mailbox services remain separate. [Static-assets pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).

## Stop only at a real human dependency

If a step needs sign-in, an access prompt, missing owner facts or cutover/launch approval, first prepare the permitted work. Then report **completed checkpoint, prepared result, exact human action and what resumes next**. Leave a private progress record. Do not repeatedly ask for already supplied authority, restart from scratch, invent success, expand support/booking scope or request secrets in chat.

Provider steps refreshed October 12, 2026. Refresh their official references if screens or tools differ. CLI/connector availability varies; use the real supported operation and verify it.

| Version | Date | Change |
|---|---|---|
| 1.5 | 2026-10-12 | Clarified existing-Worker reuse and compatible automatic dependency/runtime setup after the handoff rehearsal. |
| 1.4 | 2026-10-12 | Rebuilt as a resumable Claude execution guide with independent-copy checks, guarded publishing, DNS/email preparation, explicit human steps and launch receipts. |
| 1.3 | 2026-10-09 | Documented the credited Malibu reference embed and exact local-footage replacement steps. |
| 1.2 | 2026-10-08 | Added video verification and plain-language media replacement instructions. |
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |

| 1.1 | 2026-10-08 | Added the exact template and copy links for Erinn. |
