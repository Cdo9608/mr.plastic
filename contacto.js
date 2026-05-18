/* ══════════════════════════════════════════
   CONTACTO.JS — MR PLASTIC S.A.C.
   Cursor, navbar, scroll, FAQ y formulario
══════════════════════════════════════════ */

/* ══ CURSOR ══ */
const dot  = document.getElementById('cur-dot');
const ring = document.getElementById('cur-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + 'px';
  dot.style.top  = my + 'px';
});
(function animRing() {
  rx += (mx - rx) * .12;
  ry += (my - ry) * .12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();
document.addEventListener('keydown', e => {
  if (e.key === 'Tab') { dot.style.display = 'none'; ring.style.display = 'none'; }
});
document.addEventListener('mousemove', () => {
  dot.style.display = ''; ring.style.display = '';
});

/* ══ HOVER CURSOR ══ */
document.querySelectorAll('a, button, .asesor-card, .faq-question, .form-input, .form-select, .form-textarea').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
});


/* ══ PROGRESS BAR ══ */
const prog = document.getElementById('prog');
window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  prog.style.width = pct + '%';
}, { passive: true });


/* ══ NAVBAR BURGER ══ */
const burger   = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  document.documentElement.classList.toggle('menu-open', open);
  const spans = burger.querySelectorAll('span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px,5px)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)';
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


/* ══ BACK TO TOP ══ */
const btt = document.getElementById('btt');
window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 400), { passive: true });
btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


/* ══ SMOOTH SCROLL ══ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 130, behavior: 'smooth' });
  });
});


/* ══ REVEAL ON SCROLL ══ */
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); revObs.unobserve(e.target); }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });
document.querySelectorAll('.rv').forEach(el => revObs.observe(el));


/* ══ FAQ TOGGLE ══ */
function toggleFaq(btn) {
  const item   = btn.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}


/* ══ FORMULARIO → WHATSAPP ══ */
function enviarFormulario(e) {
  e.preventDefault();
  const nombre   = document.getElementById('nombre').value.trim();
  const empresa  = document.getElementById('empresa').value.trim();
  const email    = document.getElementById('email').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const sector   = document.getElementById('sector').value;
  const producto = document.getElementById('producto').value;
  const mensaje  = document.getElementById('mensaje').value.trim();

  const texto =
    `Hola Lucy, me pongo en contacto a través del formulario de MR PLASTIC:\n\n` +
    `👤 Nombre: ${nombre}\n` +
    (empresa ? `🏢 Empresa: ${empresa}\n` : '') +
    `📧 Email: ${email}\n` +
    `📱 Teléfono: ${telefono}\n` +
    `🏭 Sector: ${sector}\n` +
    `📦 Producto: ${producto}\n\n` +
    `📝 Consulta:\n${mensaje}`;

  window.open(`https://wa.me/51923302538?text=${encodeURIComponent(texto)}`, '_blank');
}