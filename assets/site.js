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
