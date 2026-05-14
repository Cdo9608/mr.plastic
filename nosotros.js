/* ══════════════════════════════════════════
   NOSOTROS.JS — MR PLASTIC
══════════════════════════════════════════ */

/* ═══ CURSOR ═══ */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * 0.28;
  ry += (my - ry) * 0.28;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a, button, .nos-card, .nos-mvp__item, .nos-comp__list li').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
});
document.addEventListener('keydown',   () => { dot.style.display = 'none';  ring.style.display = 'none'; });
document.addEventListener('mousemove', () => { dot.style.display = '';      ring.style.display = ''; });


/* ═══ PROGRESS BAR ═══ */
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });


/* ═══ NAVBAR ═══ */
const nav      = document.getElementById('nav');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

// En nosotros no hay hero oscuro detrás, el navbar siempre es sólido
nav.classList.add('solid');
nav.classList.remove('top');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('menu-open', open);
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


/* ═══ BACK TO TOP ═══ */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ═══ SMOOTH SCROLL ═══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});


/* ═══ VIDEO PLACEHOLDER ═══
   Cuando tengas el ID de YouTube:
   1. Descomenta el iframe en nosotros.html
   2. Pon el ID aquí: const YT_ID = 'TU_ID';
════════════════════════════════════════ */
const videoPlay = document.getElementById('videoPlay');
if (videoPlay) {
  videoPlay.addEventListener('click', () => {
    // const YT_ID = 'TU_ID_AQUI';
    // const frame = document.getElementById('videoFrame');
    // frame.innerHTML = `<iframe src="https://www.youtube.com/embed/${YT_ID}?autoplay=1"
    //   allow="autoplay;encrypted-media" allowfullscreen
    //   style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe>`;
    const p = document.querySelector('#videoOverlay p');
    if (p) p.textContent = 'El video corporativo estará disponible muy pronto.';
  });
}