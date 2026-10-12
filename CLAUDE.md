**Version:** 1.1
**Last updated:** 2026-10-12

# Instructions for SWAT’s maintainer assistant

Read `START-HERE.md`, `README.md`, `HANDOFF.md`, and `CONTENT-CHECKLIST.md` before working. This is SWAT Watersports, Dave Bender's business, maintained by Erinn. Keep it separate from Stuart Sailing's website and booking products.

## Execute the handoff

- Detect the actual connected account/tool capabilities. An authenticated connector does not authenticate the CLI. Complete authorized independent-copy/preview preparation; ask only at real sign-in, permission, owner-fact or cutover/launch dependencies. Prepare the exact human action before stopping.
- Use an independent template-generated `OWNER/swat-watersports` copy. Clone that copy into a separate folder. Reuse a matching existing copy without overwriting unrelated work. Never write to `stuartsailing/website` or change Stuart Sailing’s Cloudflare project/domain for this handoff. Add SWAT to existing Git app permissions while retaining prior repositories.
- Keep progress, account IDs, approval evidence and DNS/alias backups in ignored `.swat-private/` or equivalent private notes. Initialize from `maintainer-state.example.json` only if absent, resume from existing evidence and never invent completion/approval flags. No credentials belong in that record.
- Run the provided source/guard/live checks when tools support them. Local `npm run deploy` verifies the recorded Git origin and Cloudflare account and uses an explicit SWAT name; Workers Builds supplies its selected project authentication. A direct CLI deployment does not prove automatic Git updates. Verify one visible review-banner edit through the connected build.
- Before nameserver changes, compare complete provider DNS, check forwarding aliases/catch-all and prepare any necessary mail-service replacement. Public MX records do not reveal used aliases. Namecheap Free Email Forwarding depends on its DNS; copying MX alone is insufficient when moving to Cloudflare. Never switch before a confirmed inventory and approved working cutover plan.
- Launch needs final page/business approval, both HTTPS hostnames, draft restrictions removed and actual existing email delivery checked. Keep package readiness, Erinn deployment and production launch as separate evidence stages.

## Work here

- Plain HTML/CSS/vanilla JavaScript. Deploy only `public/` through Workers Static Assets. Preserve the simple setup; add a framework or service only if Erinn explicitly requests it.
- `public/index.html` owns the words and prices. `public/site-config.js` owns public phone/booking settings. Keep its phone values and the HTML fallback links/text consistent so visitors with JavaScript disabled can still contact the business.
- Use the colorful supplied logo on the website. Keep original logos/photos unchanged. Display headings use Georgia for continuity with the supplied layout; body/UI use local Inter with its OFL license. No remote font dependency.
- Rates are draft source values. Ask Dave/Erinn to confirm changes to business prices, service boundaries, group capacity, rider requirements, safety/licensing claims and cancellation policies. Do not fill missing details with guesses.
- The actual SWAT booking-product link is missing. Until supplied, call/text actions work. Never substitute a Stuart Sailing booking product. A confirmed HTTPS URL in `bookingUrl` changes the booking buttons; also update the no-JavaScript fallback links and the booking FAQ.
- There is no inquiry form, CRM, payment collection or analytics integration. Add those only as separately requested work.
- Check current Cloudflare documentation before account/DNS instructions. Nameserver migration needs a DNS inventory; it is not simply a CNAME from Namecheap to a workers.dev URL.
- Never put credentials, API keys, account identifiers, private correspondence, sales material, customer data or conversation transcripts in this public repository. Ask the human to sign in through their normal account screen.
- Use the existing credited YouTube reference embed or an owned/cleared replacement; do not download around access restrictions or describe the reference as Dave’s boat. If replacing it locally, retain motion controls/fallback and remove unnecessary remote CSP origins afterward.
- Make a small reviewable change, inspect desktop/mobile and keyboard behavior, then commit the intended files. Explain what changed and how to reverse it. Do not claim the live site updated until the deployment and URL are checked.
- Markdown edits: bump the version/date, append a changelog entry and update the relevant INDEX in the same change. Every folder with four or more content files needs an INDEX. Pulse: Weekly while this is a draft; review these instructions after launch.

## Finish line

Erinn's own copy deploys to her Cloudflare preview; she makes one visible edit and sees it redeploy. Dave confirms business details. Production launch additionally requires her active Cloudflare domain zone, correct hostnames, DNS/email verification, and the launch checklist. A working Bridge Ninja preview does not establish those later steps.

| Version | Date | Change |
|---|---|---|
| 1.1 | 2026-10-12 | Added execution/resume boundaries, independent-copy and guarded deploy checks, forwarding-aware DNS and separate launch proof. |
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |
