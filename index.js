/* ══════════════════════════════════════════
   INDEX.JS — MR PLASTIC
══════════════════════════════════════════ */

/* ══════════════════════════════════════════
   CURSOR — rápido: dot inmediato, ring lag reducido
══════════════════════════════════════════ */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  // Dot sigue el mouse de forma inmediata (sin lag)
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});

// Ring con lag reducido: factor 0.28 (era 0.12 antes — más del doble de velocidad)
(function animRing() {
  rx += (mx - rx) * 0.28;
  ry += (my - ry) * 0.28;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .hero__stat, .tb-item').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
});
document.addEventListener('keydown',   () => { dot.style.display = 'none';  ring.style.display = 'none'; });
document.addEventListener('mousemove', () => { dot.style.display = '';      ring.style.display = ''; });


/* ══════════════════════════════════════════
   BARRA DE PROGRESO
══════════════════════════════════════════ */
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });


/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const nav      = document.getElementById('nav');
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 60;
  nav.classList.toggle('solid', scrolled);
  nav.classList.toggle('top',   !scrolled);
}, { passive: true });

burger.addEventListener('click', () => {
  const open  = navLinks.classList.toggle('open');
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
    burger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});


/* ══════════════════════════════════════════
   CARRUSEL HERO
══════════════════════════════════════════ */
const slides   = document.querySelectorAll('.hero__slide');
const dots     = document.querySelectorAll('.hero__dot');
const btnPrev  = document.getElementById('heroPrev');
const btnNext  = document.getElementById('heroNext');
let   current  = 0;
let   autoTimer = null;
const INTERVAL  = 5000;

function goToSlide(index) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function nextSlide() { goToSlide(current + 1); }
function prevSlide() { goToSlide(current - 1); }

function startAuto() { stopAuto(); autoTimer = setInterval(nextSlide, INTERVAL); }
function stopAuto()  { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }

btnNext.addEventListener('click', () => { nextSlide(); startAuto(); });
btnPrev.addEventListener('click', () => { prevSlide(); startAuto(); });
dots.forEach(d => {
  d.addEventListener('click', () => { goToSlide(parseInt(d.dataset.index)); startAuto(); });
});

// Swipe móvil
let touchStartX = 0;
const carousel = document.getElementById('heroCarousel');
carousel.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
carousel.addEventListener('touchend',   e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 40) { dx < 0 ? nextSlide() : prevSlide(); startAuto(); }
}, { passive: true });

document.querySelector('.hero').addEventListener('mouseenter', stopAuto);
document.querySelector('.hero').addEventListener('mouseleave', startAuto);
startAuto();


/* ══════════════════════════════════════════
   STATS COUNTER
══════════════════════════════════════════ */
function counter(el, target) {
  let start = 0;
  const step = target / 60;
  const iv = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.round((1 - Math.pow(1 - start / target, 3)) * target);
    if (start >= target) { el.textContent = target; clearInterval(iv); }
  }, 1600 / 60);
}

let statsRan = false;
new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !statsRan) {
    statsRan = true;
    setTimeout(() => {
      counter(document.getElementById('s-years'), 5);
      counter(document.getElementById('s-projs'), 100);
      counter(document.getElementById('s-resp'),  48);
      counter(document.getElementById('s-sect'),  4);
    }, 400);
  }
}, { threshold: .2 }).observe(document.querySelector('.hero'));


/* ══════════════════════════════════════════
   BACK TO TOP
══════════════════════════════════════════ */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ══════════════════════════════════════════
   SMOOTH SCROLL
══════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
  });
});