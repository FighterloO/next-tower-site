# Next Tower: game site

The site of Next Tower (Baihaqi Studio) at https://fighterloo.github.io/next-tower-site/ (repo FighterloO/next-tower-site).
Static: no build step. GitHub Pages serves `main` from the root. The studio site (FighterloO/fighterloo.github.io) links here.

```
index.html     the one page, in English (user, 5 Nov 2026)
privacy.html   Privacy Policy, in English (Google Play needs it): offline, no personal data, save on device, Google Play Billing
404.html       not found (noindex)
css/site.css   the game's HUD look: navy-purple panels in a gold bevel (App.svelte --hud-* tokens), Silkscreen
fonts/         Silkscreen Regular + Bold (OFL.txt), from the game (game/public/assets/fonts)
img/           screenshots captured from the running game in English (dev build, ?lang=en, 1920x1080, headless Chrome), as WebP
img/el/        the six pixel element icons (the game's ElementIcon.svelte, exported as SVG)
img/heroes/    hero portraits: first idle frame of each rank-4 job sprite (game/public/assets/sprites)
img/cmd/       commander faces (from the Markas Commander panel)
img/share.jpg  1200x630 share image
```

Preview locally: `python -m http.server 8770`, then open http://localhost:8770/.
After changing `css/site.css`, bump the `?v=` number where it is linked.

When things go live:
- Google Play: replace the two "Segera di Google Play" badges in `index.html` with a link to the store page.
- Trailer / gameplay: replace the two `.vid` placeholders in `#video` with the videos.
- Plane 4, Plane 5, Tower mode: swap the locked cards for screenshots.
