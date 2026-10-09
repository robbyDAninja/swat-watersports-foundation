**Version:** 1.4
**Last updated:** 2026-10-08

# SWAT Watersports website

A simple website for Dave Bender, prepared by Bridge Ninja for Erinn to maintain. It uses plain HTML, CSS and JavaScript, with Cloudflare Workers serving the files. There is no custom server, booking system, database or website build step.

[Open the review website](https://swat-watersports-revision-20261008.robby-121.workers.dev/) · [Make your own GitHub copy](https://github.com/robbyDAninja/swat-watersports-foundation/generate)

**This is a review draft.** Confirm the business details in [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md) before launching on Dave's domain.

- **Brand guide: [four-page PDF](brand/SWAT-Watersports-Brand-Guide.pdf)** and [editable client guide](brand/Brand-Guide.md) from the existing review kit.
- **Erinn: start with [HANDOFF.md](HANDOFF.md).** It walks through making your own GitHub copy, connecting Cloudflare, and later connecting Dave's domain.
- **Claude: read [CLAUDE.md](CLAUDE.md).** It identifies the editable files and the launch checks.
- **Dave: review the activities, prices, phone number and meeting arrangements.** Erinn handles the website tools.

Recommended arrangement: Dave owns his domain and business; Erinn maintains a separate SWAT repository and Cloudflare project in her existing accounts. SWAT stays separate from Stuart Sailing. A copy made from this template is independent; later template changes do not automatically change Erinn's copy.

For a local preview, install Node.js LTS, run `npm ci`, then `npm run dev`. Open the address Wrangler prints. `npm run check` validates the deployment configuration without publishing. `npm run deploy` publishes to the Cloudflare account currently signed in, so check `npx wrangler whoami` first.

The site is deliberately marked **noindex** during review. The handoff lists every setting to change at launch. All font, image and video files are local; the site sends no inquiry forms or analytics events. Call/text links open the visitor's phone or messaging app.

## Brand wording

The colorful supplied logo appears in the header. “Life is better behind the boat.” is the main tagline, “Wake. Ride. Repeat.” introduces the rides and “Your wake. Your way.” heads group outings. Keep these in their separate roles so the page stays clear.

## Hero video

The full-width opening uses a silent 12-second loop from real SWAT rider footage. Visitors can pause it. Reduced-motion and data-saving preferences start with the still image instead; the photo also works without JavaScript or when video cannot play. The footage is decorative and does not show the boat from outside.

Erinn can replace `public/assets/hero-loop.mp4` and `public/assets/hero-poster.jpg` later. Use your own footage or footage with verified website-use permission. See the replacement checklist in [HANDOFF.md](HANDOFF.md).

## File map

| File | What to change |
|---|---|
| public/index.html | Words, activity details, prices, FAQ answers and photo descriptions |
| public/styles.css | Colors, fonts, spacing and phone/tablet layout |
| public/site-config.js | Public phone, optional SWAT booking link and review banner switch |
| public/app.js | Mobile menu, contact links and hero playback |
| public/assets/ | Supplied logos, real SWAT photos/video and licensed font |
| wrangler.jsonc | Cloudflare project name and public folder |
| package.json / package-lock.json | Pinned deployment tool, not a website framework |

Logo artwork remains raster source; these files are not vector or embroidery masters. The three photos are stills from SWAT footage, not a promise about every available activity. Contact details and activities come from the supplied flyer; rates come from the forwarded website draft.

| Version | Date | Change |
|---|---|---|
| 1.4 | 2026-10-08 | Added a local silent hero loop, motion/fallback behavior and media replacement pointers. |
| 1.3 | 2026-10-08 | Recorded the colorful header logo and supplied tagline placements in the website. |
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |

| 1.1 | 2026-10-08 | Linked the existing brand-guide exports included with this source handoff. |

| 1.2 | 2026-10-08 | Linked the separate review preview and Bridge Ninja template-copy entry point. |
