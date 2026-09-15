(function () {
  var box = document.getElementById('lightbox');
  var video = document.getElementById('lb-video');
  if (!box || !video) return;

  function open(src, poster) {
    video.poster = poster || '';
    video.src = src;
    box.hidden = false;
    document.body.classList.add('lb-open');
    var p = video.play();
    if (p && p.catch) p.catch(function () {});
  }

  function close() {
    video.pause();
    video.removeAttribute('src');
    video.load();
    box.hidden = true;
    document.body.classList.remove('lb-open');
  }

  document.querySelectorAll('[data-video]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(el.getAttribute('data-video'), el.getAttribute('data-poster'));
    });
  });
  box.querySelectorAll('[data-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) close();
  });
})();

/* language switch: slide the thumb, then navigate; on arrival slide it into place */
(function () {
  var sw = document.querySelector('[data-langsw]');
  var root = document.documentElement;
  if (root.classList.contains('lang-arriving')) {
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.remove('lang-arriving'); }); });
  }
  if (!sw) return;
  /* back/forward cache restores the page with the thumb already moved: put it back on this page's language */
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    var zh = (root.getAttribute('lang') || '').indexOf('zh') === 0;
    sw.classList.toggle('is-zh', zh);
    sw.classList.toggle('is-en', !zh);
  });
  sw.addEventListener('click', function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
    var href = sw.getAttribute('href');
    sw.classList.toggle('is-en');
    sw.classList.toggle('is-zh');
    try { sessionStorage.setItem('langSlide', '1'); } catch (err) {}
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(function () { window.location.href = href; }, reduce ? 0 : 300);
  });
})();
