/* Heroes: tap a hero card to see its rank path in #rankpath (R1 deploy, R2 pick a skill, R3 pick one of
   four jobs, R4 that job's ultimate in one of two forms). Sprites come from img/ranks/<hero>.png
   (one row per look, six idle frames); data from js/hero-data.js. */
(function () {
  var H = window.NT_HEROES, box = document.getElementById('rankpath');
  if (!H || !box) return;
  var byId = {};
  H.forEach(function (h) { byId[h.id] = h; });
  var cur = H[0], look = cur.jobs[0].id;

  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  // an animated sprite: the look's row of the hero's sheet, scaled by s (whole pixels)
  function spr(h, lk, s, cls) {
    var r = h.sprite.rows.indexOf(lk), w = h.sprite.w, ht = h.sprite.h;
    return '<i class="spr ' + (cls || '') + '" aria-hidden="true" style="--sw:' + w * s + 'px;--sh:' + ht * s + 'px;--sy:' + -r * ht * s +
      'px;background-image:url(img/ranks/' + h.id + '.png);background-size:' + w * 6 * s + 'px ' + ht * 6 * s + 'px"></i>';
  }
  // a looping preview clip from the game's Library (img/clips: s_<element>_<a|b>, u_<ultimate>)
  function clip(id, name) {
    return id ? '<img class="rp-clip" src="img/clips/' + id + '.webp" alt="' + esc(name) + ' preview" width="256" height="160" loading="lazy">' : '';
  }
  function bigScale(h) { return Math.max(2, Math.round(170 / h.sprite.h)); }

  function render() {
    var h = cur, job = h.jobs.filter(function (j) { return j.id === look; })[0] || h.jobs[0];
    var lookName = look === 'r1' ? 'Rank 1' : look === 'r2' ? 'Rank 2' : job.name;
    box.style.setProperty('--c', 'var(--' + h.el + ')');
    box.innerHTML =
      '<div class="rp-stage">' +
        '<div class="rp-figure">' + spr(h, look, bigScale(h), 'big') + '</div>' +
        '<p class="rp-look">' + esc(lookName) + '</p>' +
        '<h3>' + esc(h.name.toUpperCase()) + '</h3>' +
        '<p class="rp-title"><img src="img/el/' + h.el + '.svg" alt="" width="18" height="18">' + esc(h.title) + '</p>' +
        '<p class="rp-sig"><b>★ ' + esc(h.sig.name) + '</b>' + esc(h.sig.reaction) + ' ×2 · ult ×3 charge</p>' +
        '<div class="stats rp-stats"><div class="stat"><b>4</b><span>jobs</span></div><div class="stat"><b>8</b><span>ult forms</span></div><div class="stat"><b>Lv 20</b><span>max</span></div></div>' +
      '</div>' +
      '<ol class="rp-steps">' +
        '<li class="rp-step' + (look === 'r1' ? ' on' : '') + '"><b class="rk">R1</b>' +
          '<button type="button" class="rp-look-btn" data-look="r1" aria-pressed="' + (look === 'r1') + '">' + spr(h, 'r1', 2) + '</button>' +
          '<div class="rp-txt"><b>Deploy</b><span>Basic ' + esc(h.el) + ' attack</span></div></li>' +
        '<li class="rp-step' + (look === 'r2' ? ' on' : '') + '"><b class="rk">R2</b>' +
          '<button type="button" class="rp-look-btn" data-look="r2" aria-pressed="' + (look === 'r2') + '">' + spr(h, 'r2', 2) + '</button>' +
          '<div class="rp-txt"><b>Pick a skill</b><ul class="rp-skills">' + h.skills.map(function (s) {
            return '<li>' + clip(s.clip, s.name) + '<p><b>' + esc(s.name) + '</b><span>' + esc(s.desc) + '</span></p></li>';
          }).join('') + '</ul></div></li>' +
        '<li class="rp-step rp-jobs' + (look !== 'r1' && look !== 'r2' ? ' on' : '') + '"><b class="rk">R3</b>' +
          '<div class="rp-txt"><b>Pick a job</b><div class="rp-jobgrid">' + h.jobs.map(function (j) {
            return '<button type="button" class="rp-job" data-look="' + j.id + '" aria-pressed="' + (look === j.id) + '">' + spr(h, j.id, 2) +
              '<b>' + esc(j.name) + '</b><span>' + esc(j.cls) + ' · ' + esc(j.place) + '</span></button>';
          }).join('') + '</div></div></li>' +
        '<li class="rp-step rp-ult"><b class="rk">R4</b>' +
          '<div class="rp-txt"><b>Ultimate · ' + esc(job.name) + '</b>' +
          '<div class="rp-ultrow">' + clip(job.clip, job.ult) + '<div><p class="rp-ultname">' + esc(job.ult) + '</p><p class="rp-ultfx">' + esc(job.what) + ' · ' + esc(job.fx) + '</p></div></div>' +
          '<ul class="rp-chips alts">' + job.alts.map(function (a) { return '<li><b>' + esc(a) + '</b></li>'; }).join('') + '</ul></div></li>' +
      '</ol>';
  }

  // hero cards become buttons
  var cards = [].slice.call(document.querySelectorAll('.hero-card[data-hero]'));
  function pickHero(id, scroll) {
    cur = byId[id] || cur; look = cur.jobs[0].id;
    cards.forEach(function (c) { var on = c.getAttribute('data-hero') === cur.id; c.classList.toggle('on', on); c.setAttribute('aria-pressed', on); });
    render();
    if (scroll && box.getBoundingClientRect().top > innerHeight * 0.6) box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  cards.forEach(function (c) {
    c.setAttribute('role', 'button'); c.tabIndex = 0;
    c.addEventListener('click', function () { pickHero(c.getAttribute('data-hero'), true); });
    c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pickHero(c.getAttribute('data-hero'), true); } });
  });
  box.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-look]');
    if (!b) return;
    look = b.getAttribute('data-look'); render();
  });
  pickHero(cur.id, false);
})();
