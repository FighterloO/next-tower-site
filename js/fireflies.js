/* Fireflies over the page (26 Nov 2026, user: "ada animasi entah kunang2"): a canvas at a third of the
   window's size, scaled up pixelated, so every firefly is a real pixel blob: a bright core, a plus-shaped
   glow round it, blinking slowly while it wanders. Off for reduced motion; paused while the tab hides. */
(function () {
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var K = 3; // window px per canvas px
  var c = document.createElement('canvas');
  c.className = 'flies';
  c.setAttribute('aria-hidden', 'true');
  document.body.appendChild(c);
  var x = c.getContext('2d');
  var W = 0, H = 0, flies = [], last = 0, run = true;
  var COLS = [['#fff7b0', '#d8ff6a', 'rgba(190,255,90,'], ['#fff0d0', '#ffd25a', 'rgba(255,200,80,'], ['#e8fbff', '#9fe8ff', 'rgba(140,220,255,']];
  function size() {
    W = Math.ceil(innerWidth / K);
    H = Math.ceil(innerHeight / K);
    c.width = W;
    c.height = H;
    var n = Math.round(Math.min(26, Math.max(10, (W * H) / 3200)));
    while (flies.length < n) flies.push(fly());
    flies.length = n;
  }
  function fly() {
    var col = COLS[Math.random() < 0.7 ? 0 : Math.random() < 0.6 ? 1 : 2];
    return { x: Math.random() * W, y: Math.random() * H, a: Math.random() * 6.28, s: 3 + Math.random() * 5, t: Math.random() * 10, p: 2.5 + Math.random() * 3, col: col };
  }
  function px(px_, py_, fill) {
    x.fillStyle = fill;
    x.fillRect(px_, py_, 1, 1);
  }
  // 30 frames a second, and still while the page scrolls (the scroll keeps its frames to itself)
  var scrolling = 0;
  addEventListener('scroll', function () { scrolling = performance.now(); }, { passive: true });
  function frame(now) {
    if (!run) return;
    requestAnimationFrame(frame);
    if (now - (last || 0) < 32 || now - scrolling < 160) return;
    var dt = Math.min(0.05, (now - (last || now)) / 1000);
    last = now;
    x.clearRect(0, 0, W, H);
    for (var i = 0; i < flies.length; i++) {
      var f = flies[i];
      f.t += dt;
      f.a += (Math.random() - 0.5) * 2.2 * dt;
      f.x += Math.cos(f.a) * f.s * dt;
      f.y += Math.sin(f.a) * f.s * dt * 0.7 - 0.6 * dt;
      if (f.x < -4) f.x = W + 4; else if (f.x > W + 4) f.x = -4;
      if (f.y < -4) f.y = H + 4; else if (f.y > H + 4) f.y = -4;
      // blink: mostly lit, a slow dim now and then
      var b = 0.5 + 0.5 * Math.sin((f.t / f.p) * 6.28);
      b = b * b;
      if (b < 0.06) continue;
      var X = Math.round(f.x), Y = Math.round(f.y);
      x.globalAlpha = 0.35 * b;
      px(X - 2, Y, f.col[2] + '1)'); px(X + 2, Y, f.col[2] + '1)'); px(X, Y - 2, f.col[2] + '1)'); px(X, Y + 2, f.col[2] + '1)');
      x.globalAlpha = 0.7 * b;
      px(X - 1, Y, f.col[1]); px(X + 1, Y, f.col[1]); px(X, Y - 1, f.col[1]); px(X, Y + 1, f.col[1]);
      x.globalAlpha = b;
      px(X, Y, f.col[0]);
    }
    x.globalAlpha = 1;
  }
  addEventListener('resize', size);
  document.addEventListener('visibilitychange', function () {
    run = !document.hidden;
    if (run) { last = 0; requestAnimationFrame(frame); }
  });
  size();
  requestAnimationFrame(frame);
})();
