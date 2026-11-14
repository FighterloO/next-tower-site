# Next Tower: game site

The site of Next Tower (Baihaqi Studio) at https://fighterloo.github.io/next-tower-site/ (repo FighterloO/next-tower-site).
Static: no build step. GitHub Pages serves `main` from the root. The studio site (FighterloO/fighterloo.github.io) links here.

```
index.html       the one page, in English (user, 5 Nov 2026); content matches the Play Store listing (13 Nov 2026):
                 6 heroes, 15 reactions, 5 commanders, 5 planes / 35 days, Rift Tower, puzzles, 10 minigames, town, price
privacy.html     Privacy Policy (Google Play needs it): no personal data, save on device, optional cloud save (Play Games)
404.html         not found (noindex)
sitemap.xml      index + privacy, with lastmod: submit it in Search Console for the next-tower-site property
robots.txt       points to the sitemap (crawlers only read the host root's robots.txt, the studio site's, which lists it too)
site.webmanifest name, colours, icons
favicon.ico, favicon-48x48/96x96/192x192.png, apple-touch-icon.png, icon-512.png
                 the Next Tower logo: the crystal on its rock (next-tower-preview/icon/web/next-tower-logo-*.png,
                 user, 13 Nov 2026); img/icon-192.png (nav + footer) is the same. Never the store "design B" icon
css/site.css     the game's HUD look: navy-purple panels in a gold bevel (App.svelte --hud-* tokens), Silkscreen
fonts/           Silkscreen Regular + Bold (OFL.txt), from the game (game/public/assets/fonts)
img/             WebP: store screenshots without the caption band (next-tower-preview/screenshots/raw):
                 reaction-steam, cmd-sniper, cmd-kage, town, plane-map; plane4/plane5 (empty arena captures);
                 the rest captured from the game in English on 5 Nov 2026 (arena-*, plane1-3, ultimate, commander)
img/el/          the six pixel element icons (the game's ElementIcon.svelte, exported as SVG)
img/heroes/      hero portraits: first idle frame of each rank-4 job sprite
img/cmd/         commander faces (the game's 24 px cmd_*.png icons x4.5 on the panel colour)
img/share.jpg    1200x630 share image (the English feature graphic)
media/combat-loop.mp4  the top: 15 s of combat cut from the English trailer (ultimates 30.25-41.75 s, Frost Wall 23.3-24.5 s,
                 Plasma Burst 25.75-28.1 s), 960x540 H.264 CRF 27, muted; img/combat-poster.webp is its first frame.
                 Plays only while on screen; reduced motion shows the poster
img/ranks/       one sheet per hero: rows r1, r2, then its four jobs, six idle frames each (3/4 view, feet on one
                 line), cut from game/public/assets_steep/sprites/hero_<id>_*.png and static.json
js/hero-data.js  the heroes' skills, jobs, classes, ultimates and their two forms, in English, from game/src/lib/game/
                 heroes.js and elements.js (ESKILL, JOB_LIST, ULTS, ULT_SHORT, ULT_ALTS, signature reactions)
js/heroes.js     tap a hero card: #rankpath shows R1 deploy, R2 its two skills, R3 its four jobs (tap one), R4 that
                 job's ultimate and its two forms; the big sprite follows the picked look
media/menu.mp3   the music button (bottom left): the game's menu theme (game/public/assets/music/menu.ogg, "Calm Lullaby For
                 Irish Harp" by MountainDweller, Pixabay Content License), MP3 96 kbps; off until pressed, credited in the footer
```

Preview locally: serve the folder above this one (`python -m http.server 8770` in `D:\next game`), then open
http://localhost:8770/next-tower-site/ (the 404 page uses /next-tower-site/ paths).
After changing `css/site.css`, bump the `?v=` number where it is linked (index, privacy, 404).
After changing a page, update its `<lastmod>` in `sitemap.xml`.

When things go live:
- Trailer: `data-yt` on `#trailer` in `index.html` holds the YouTube id (now `kN2SQPyae_0`, https://youtu.be/kN2SQPyae_0);
  the poster becomes a play button that loads the video (youtube-nocookie). Empty it to show COMING SOON.
- Google Play: replace the two "Coming soon to Google Play" badges in `index.html` with a link to the store page.
