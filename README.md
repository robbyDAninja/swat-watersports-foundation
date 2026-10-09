**Version:** 1.5
**Last updated:** 2026-10-09

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

The site is deliberately marked **noindex** during review. The handoff lists every setting to change at launch. Fonts and artwork are local. The optional reference video uses YouTube’s privacy-enhanced embedded player and contacts YouTube when loaded; this is a separate external dependency. The site sends no inquiry forms or its own analytics events. Call/text links open the visitor's phone or messaging app.

## Brand wording

The colorful supplied logo appears in the header. “Life is better behind the boat.” is the main tagline, “Wake. Ride. Repeat.” introduces the rides and “Your wake. Your way.” heads group outings. Keep these in their separate roles so the page stays clear.

## Hero video

The review opening uses a muted 12-second segment of Bridge Marina’s 1999 Malibu Sportster drone footage through YouTube’s normal embedded player. It is reference footage of another boat/location, not Dave’s boat. A source link appears in the hero. Visitors can pause it; reduced-motion/data-saving preferences and no JavaScript retain the local water graphic. YouTube availability and playback restrictions can affect the embed.

The previous rider-loop files have been removed from the current template. For launch, prefer Dave’s own exterior footage or a clean file with verified website-use permission. See [HANDOFF.md](HANDOFF.md) for replacing this reference embed with a local MP4.

## File map

| File | What to change |
|---|---|
| public/index.html | Words, activity details, prices, FAQ answers and photo descriptions |
| public/styles.css | Colors, fonts, spacing and phone/tablet layout |
| public/site-config.js | Public phone, optional SWAT booking link and review banner switch |
| public/app.js | Mobile menu, contact links and hero playback |
| public/assets/ | Supplied logos, real SWAT photos, local water fallback and licensed font |
| wrangler.jsonc | Cloudflare project name and public folder |
| package.json / package-lock.json | Pinned deployment tool, not a website framework |

Logo artwork remains raster source; these files are not vector or embroidery masters. The three photos are stills from SWAT footage, not a promise about every available activity. Contact details and activities come from the supplied flyer; rates come from the forwarded website draft.

| Version | Date | Change |
|---|---|---|
| 1.5 | 2026-10-09 | Replaced the rejected rider hero with a credited Malibu reference embed; documented external playback and replacement boundaries. |
| 1.4 | 2026-10-08 | Added a local silent hero loop, motion/fallback behavior and media replacement pointers. |
| 1.3 | 2026-10-08 | Recorded the colorful header logo and supplied tagline placements in the website. |
| 1.0 | 2026-10-08 | Created the SWAT review foundation and written maintainer handoff. |

| 1.1 | 2026-10-08 | Linked the existing brand-guide exports included with this source handoff. |

| 1.2 | 2026-10-08 | Linked the separate review preview and Bridge Ninja template-copy entry point. |
