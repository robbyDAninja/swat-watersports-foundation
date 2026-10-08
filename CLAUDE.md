**Version:** 1.0
**Last updated:** 2026-10-08

# Instructions for SWAT’s maintainer assistant

Read `README.md`, `HANDOFF.md`, and `CONTENT-CHECKLIST.md` before working. This is SWAT Watersports, Dave Bender's business, maintained by Erinn. Keep it separate from Stuart Sailing's website and booking products.

## Work here

- Plain HTML/CSS/vanilla JavaScript. Deploy only `public/` through Workers Static Assets. Preserve the simple setup; add a framework or service only if Erinn explicitly requests it.
- `public/index.html` owns the words and prices. `public/site-config.js` owns public phone/booking settings. Keep its phone values and the HTML fallback links/text consistent so visitors with JavaScript disabled can still contact the business.
- Use the colorful supplied logo on the website. Keep original logos/photos unchanged. Display headings use Georgia for continuity with the supplied layout; body/UI use local Inter with its OFL license. No remote font dependency.
- Rates are draft source values. Ask Dave/Erinn to confirm changes to business prices, service boundaries, group capacity, rider requirements, safety/licensing claims and cancellation policies. Do not fill missing details with guesses.
- The actual SWAT booking-product link is missing. Until supplied, call/text actions work. Never substitute a Stuart Sailing booking product. A confirmed HTTPS URL in `bookingUrl` changes the booking buttons; also update the no-JavaScript fallback links and the booking FAQ.
- There is no inquiry form, CRM, payment collection or analytics integration. Add those only as separately requested work.
- Check current Cloudflare documentation before account/DNS instructions. Nameserver migration needs a DNS inventory; it is not simply a CNAME from Namecheap to a workers.dev URL.
- Never put credentials, API keys, account identifiers, private correspondence, sales material, customer data or conversation transcripts in this public repository. Ask the human to sign in through their normal account screen.
- Make a small reviewable change, inspect desktop/mobile and keyboard behavior, then commit the intended files. Explain what changed and how to reverse it. Do not claim the live site updated until the deployment and URL are checked.
- Markdown edits: bump the version/date, append a changelog entry and update the relevant INDEX in the same change. Every folder with four or more content files needs an INDEX. Pulse: Weekly while this is a draft; review these instructions after launch.

## Finish line

Erinn's own copy deploys to her Cloudflare preview; she makes one visible edit and sees it redeploy. Dave confirms business details. Production launch additionally requires her active Cloudflare domain zone, correct hostnames, DNS/email verification, and the launch checklist. A working Bridge Ninja preview does not establish those later steps.

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |
