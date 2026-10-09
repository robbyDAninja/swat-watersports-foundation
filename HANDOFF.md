**Version:** 1.3
**Last updated:** 2026-10-09

# Erinn’s SWAT website handoff

## The short version

**GitHub keeps the website files. Cloudflare puts them online. Dave's domain gives visitors the address.**

Use your existing GitHub and Cloudflare accounts. Make a separate SWAT project in each. Dave keeps his domain registration. You maintain the website and guide him through the domain change. He does not need a GitHub account for this arrangement.

This checklist is for you and your Claude. Work through one part at a time. You can get a working Cloudflare preview before touching Dave's domain.

## 1. Make your own website copy

- [ ] Sign into your GitHub account. Open [Bridge Ninja’s SWAT template](https://github.com/robbyDAninja/swat-watersports-foundation), or go directly to [Create your own copy](https://github.com/robbyDAninja/swat-watersports-foundation/generate).
- [ ] Choose **Use this template → Create a new repository**. Set the owner to your account and the name to **swat-watersports**. Use **Public** for the simple agreed handoff. Create it.
- [ ] Confirm your copy contains `public/`, `wrangler.jsonc`, `package.json`, this handoff and `CLAUDE.md` at the top level.
- [ ] Open or clone that copy in the Claude environment you use for website work. Confirm Claude can read these files and that it is working in your SWAT copy.

**Checkpoint:** the address begins with your GitHub account name. This is your independent copy, not an edit to Stuart Sailing or Bridge Ninja's template.

If you start from the ZIP instead: unzip it, create an empty `swat-watersports` repository in your account, and have Claude upload/commit the contents at the repository's top level. Do not upload the ZIP as the website itself.

## 2. Put your copy on Cloudflare

- [ ] Sign into your Cloudflare account and select the correct account. Open **Workers & Pages** and create an application using **Connect to Git / Import a repository**. Interface wording may change; choose the GitHub-backed **Worker**, not a Pages project.
- [ ] If prompted, connect your GitHub account and allow Cloudflare access to the SWAT repository. Select your copy.
- [ ] Use these settings:

| Setting | Value |
|---|---|
| Project / Worker name | `swat-watersports` |
| Production branch | `main` |
| Root directory | Leave blank: the project is at the repository root |
| Build command | Leave blank: there is no website build step |
| Deploy command | `npx wrangler deploy` |
| Static files | Already set to `./public` in `wrangler.jsonc` |

- [ ] Keep the normal Workers Builds authentication that Cloudflare offers. You do not need Dave's API key pasted into Claude for this account arrangement.
- [ ] Deploy, wait for success, and open the generated `workers.dev` address. Save that address privately in your maintenance notes.
- [ ] Check the logo, photos, pricing, mobile menu, questions, and phone/text links. Check the background video and its pause/play button; visitors who prefer reduced motion should start on the photo. A computer may offer a phone app; a phone is the better contact-link test.

**Checkpoint:** your Cloudflare account serves the SWAT draft at its own preview address. Dave's domain is still untouched.

## 3. Make one small edit

- [ ] Ask Claude to change one harmless sentence in `public/index.html`, show the change, and check phone/mobile layout.
- [ ] Commit and push that change to `main` in **your** SWAT repository.
- [ ] Check Cloudflare's build/deployment history. Open your preview and verify the new words appear.

**Checkpoint:** you can change the site without Bridge Ninja operating the accounts. If the deployment fails, keep the last working site and inspect the build error before changing settings.

## 4. Get Dave’s final details

- [ ] Work through [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md): prices, phone/contact recipient, activities, meeting places, requirements and weather policy.
- [ ] Get the clearer map if you want it on the page. The current page uses location-planning text instead of an unverified map.
- [ ] If a SWAT product is ready in the booking service, get its exact public URL. Enter it in `public/site-config.js` as `bookingUrl`. Update fallback HTML links and the booking FAQ too. Test that it opens **SWAT** and the correct product.

Until that link exists, **Call to book** and **Send a text** are the working contact path. The website does not take bookings or payments by itself.

## 5. Connect Dave’s domain when you are ready to launch

**Dave keeps owning the address. Cloudflare becomes its directory of internet records.** The free Workers custom-domain route needs an active Cloudflare domain zone in the same account as the Worker. If Dave's DNS is already on Cloudflare in another account, inspect that situation with Claude before changing anything.

- [ ] Confirm the exact domain, registrar, current nameservers and whether the domain is already in another Cloudflare account. The flyer says `swatwatersports.com`; Namecheap is an unverified recollection.
- [ ] Save the existing DNS records and current nameservers privately. Record website, email and verification records. Confirm Cloudflare's imported list is complete; restore anything missing **before** switching nameservers. Email records include MX and any SPF, DKIM and DMARC records.
- [ ] In **your Cloudflare account**, add Dave's domain using the Free plan. Note the two exact nameservers Cloudflare assigns to that domain.
- [ ] With Dave's authorization, check whether registrar DNSSEC is enabled. If so, follow Cloudflare's migration instructions to disable the old DNSSEC/DS setting before the switch; otherwise the domain may stop resolving.
- [ ] Dave signs into his registrar. If it is Namecheap: **Domain List → Manage → Nameservers → Custom DNS**. Replace the old nameserver entries with the two exact entries Cloudflare supplied and save. This is a nameserver setting change, not a guessed CNAME or TXT record.
- [ ] Wait for Cloudflare to show the domain as **Active**. Allow for propagation; do not change unrelated records while waiting.
- [ ] Open your SWAT Worker: **Settings → Domains & Routes → Add → Custom Domain**. Add `swatwatersports.com`, then `www.swatwatersports.com` if both addresses should open the site. Cloudflare manages the Worker DNS records and certificates.
- [ ] If an old website record conflicts with a custom domain, have Claude identify the exact conflict and preserve a rollback record before replacing it. Keep unrelated email records.
- [ ] Verify both addresses open the SWAT site over HTTPS. Test existing email delivery too. If DNSSEC was disabled, follow Cloudflare's documented re-enable steps after activation.

**Checkpoint:** the website works at Dave's address and existing email still works. There is no domain transfer and no need to recreate Dave's domain registration.

The exact record list depends on Dave's current setup. Do not assume a fixed number of changes. If anything fails, use the saved records and prior nameservers to plan the appropriate rollback; allow for propagation again.

## 6. Remove draft settings and check the launch

After Dave approves the page:

- [ ] Set `reviewMode: false` in `public/site-config.js` to hide the draft banner.
- [ ] Remove the `noindex, nofollow` robots meta tag from `public/index.html`.
- [ ] Remove only the `X-Robots-Tag: noindex, nofollow` line from `public/_headers`; keep the other headers.
- [ ] Change `public/robots.txt` to `User-agent: *` followed by `Allow: /`.
- [ ] Commit/push; confirm the live page has the approved details, correct links and no draft banner. Verify the live robots/header settings too.
- [ ] Test on a phone: menu opens/closes, pricing is readable, questions open, and call/text point to the intended person. Test online booking if added.
- [ ] Save the GitHub URL, Cloudflare project, domain/registrar, recovery method and backup instructions in your **private** maintenance notes. Keep account recovery information out of the public repository.

## Everyday maintenance

Ask Claude for a specific change, review the result, commit/push, and check the live page. To undo a content mistake, revert the relevant commit and let Cloudflare redeploy. Keep a downloadable repository backup. Review the business phone, rates, policies and booking link whenever Dave changes them.

The simple static site can use free hosting; domain renewal and any separate booking-service subscription remain separate. [Cloudflare static-assets pricing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/).

## Replace the opening video later

- Use footage you own or have permission to use on this website. A public YouTube video is not automatically available for reuse.
- The current review hero is a muted YouTube reference embed, with a source credit. It is another Malibu, not Dave’s boat. Do not describe it as SWAT footage. Its availability depends on YouTube.
- For a local replacement, give Claude Dave’s own or cleared landscape footage. Export a silent H.264 MP4, about 10–15 seconds, with a small file size and fast-start playback, plus a matching still.
- Ask Claude to replace the iframe/API playback in `public/index.html` and `public/app.js` with a local `<video>` and update its crop in `public/styles.css`. Add the MP4/still in `public/assets/` and update the asset index. Keep the still visible without JavaScript and when motion/playback is unavailable.
- When the remote embed is removed, remove the YouTube script/frame permissions from `public/_headers` and its source-credit link; preserve the other security/review headers.
- Check desktop and phone framing, readable text, pause/play, and reduced-motion behavior. Commit/push and verify the deployed version.

## Copy this into Claude

> I maintain Dave Bender's SWAT Watersports site. Read README.md, CLAUDE.md, HANDOFF.md and CONTENT-CHECKLIST.md in my SWAT repository. First tell me which checklist checkpoint I am at. Walk me through one step at a time using my existing GitHub and Cloudflare accounts. Keep SWAT separate from Stuart Sailing. Verify the target account before deployment. Do not change Dave's nameservers until we have backed up and checked all DNS and email records and he has authorized the switch. Do not request API keys in chat or invent missing business facts. Show me how to make one small edit and verify it redeploys.

## Current provider references

Instructions checked October 8, 2026. Claude should refresh these if the screens change: [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [GitHub connection](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/), [Cloudflare nameserver setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/), [Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Namecheap nameservers](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/).

| Version | Date | Change |
|---|---|---|
| 1.3 | 2026-10-09 | Documented the credited Malibu reference embed and exact local-footage replacement steps. |
| 1.2 | 2026-10-08 | Added video verification and plain-language media replacement instructions. |
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |

| 1.1 | 2026-10-08 | Added the exact template and copy links for Erinn. |
