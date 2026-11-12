// Weng Sun Engineering v2 — accordion, entrances, coupon → WhatsApp
(function () {
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // --- process accordion ---
  var panels = Array.prototype.slice.call(document.querySelectorAll('.acc__panel'));
  if (panels.length) {
    var open = function (target) {
      panels.forEach(function (p) {
        var on = p === target;
        if (on) { p.setAttribute('open-panel', ''); }
        else { p.removeAttribute('open-panel'); }
        p.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
    };
    panels.forEach(function (p) {
      p.addEventListener('click', function () {
        if (p.hasAttribute('open-panel')) return; // open panel stays open
        open(p);
      });
    });
  }

  // --- entrances: heading, then text, then picture ---
  var rvs = Array.prototype.slice.call(document.querySelectorAll('.rv'));
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    rvs.forEach(function (el) { io.observe(el); });
  } else {
    rvs.forEach(function (el) { el.classList.add('on'); });
  }

  // --- archival loop: play only while on screen ---
  var vids = document.querySelectorAll('video[loop]');
  if (vids.length && 'IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { v.play().catch(function () {}); }
        else { v.pause(); }
      });
    }, { threshold: 0.3 });
    vids.forEach(function (v) { vio.observe(v); });
  }

  // --- coupon → pre-filled WhatsApp message ---
  var form = document.querySelector('[data-wa]');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var num = form.getAttribute('data-wa');
      var val = function (n) { var f = form.querySelector('[name="' + n + '"]'); return f ? f.value.trim() : ''; };
      var consent = form.querySelector('[name="consent"]');
      if (consent && !consent.checked) { ev.stopPropagation(); consent.focus(); return; }
      var who = val('name') + (val('company') ? ' (' + val('company') + ')' : '');
      var type = val('type');
      var phone = val('phone');
      var msg = 'Hi Weng Sun Engineering, I\'m ' + (who || 'enquiring') + (phone ? ' (' + phone + ')' : '') + '.\n\n' +
        (type ? 'Machine type: ' + type + '\n\n' : '') +
        'Task to automate: ' + (val('task') || '(will explain)');
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
    });
  }

  // --- phone nav: keep topbar links wrapping neatly ---
  var topbar = document.querySelector('.topbar__links');
  if (topbar && window.matchMedia('(max-width: 700px)').matches) {
    topbar.style.fontSize = '14px';
  }
})();