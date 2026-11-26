/* The page's bottom layer changes with the section in view (26 Nov 2026): two fixed layers, the next
   section's picture fades in over the last. The title area shows the first section's. */
(function () {
  var V = '?v=4';
  var pics = { hero: 'hero', reaksi: 'reaksi', commander: 'commander', plane: 'plane', modes: 'modes', sumber: 'sumber', kota: 'kota', arena: 'arena', video: 'video', harga: 'harga' };
  var a = document.createElement('div'), b = document.createElement('div');
  a.className = b.className = 'bd';
  a.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-hidden', 'true');
  document.body.prepend(b); document.body.prepend(a);
  var front = a, cur = null;
  function show(id) {
    if (!pics[id] || id === cur) return;
    cur = id;
    var back = front === a ? b : a;
    back.style.backgroundImage = 'url(img/bg/' + pics[id] + '.webp' + V + ')';
    back.classList.add('on');
    front.classList.remove('on');
    front = back;
  }
  show('hero');
  // warm the cache so a fade never waits on the download
  Object.keys(pics).forEach(function (k) { var i = new Image(); i.src = 'img/bg/' + pics[k] + '.webp' + V; });
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) show(e.target.id); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  Object.keys(pics).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
})();
