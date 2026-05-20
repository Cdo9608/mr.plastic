/* ══════════════════════════════════════════
   PRODUCTOS.JS — MR PLASTIC S.A.C.
   Lógica de filtros, modal de imagen y scroll
══════════════════════════════════════════ */

/* ══ FILTROS ══ */
(function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.producto-card');
  const categories = document.querySelectorAll('.productos-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Estado activo del botón
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      if (filter === 'all') {
        // Mostrar todo
        cards.forEach(c => { c.classList.remove('hidden'); c.classList.add('in'); });
        categories.forEach(cat => cat.classList.remove('hidden'));
      } else {
        // Ocultar/mostrar cards
        cards.forEach(c => {
          if (c.dataset.category === filter) {
            c.classList.remove('hidden');
          } else {
            c.classList.add('hidden');
          }
        });

        // Ocultar categorías vacías
        categories.forEach(cat => {
          const hasVisible = cat.querySelector(`.producto-card[data-category="${filter}"]`);
          cat.classList.toggle('hidden', !hasVisible);
        });

        // Scroll suave a la primera categoría visible
        const firstVisible = document.querySelector('.productos-category:not(.hidden)');
        if (firstVisible) {
          // Forzar clase 'in' en todas las cards visibles del filtro activo
          // (necesario en móvil cuando el IntersectionObserver no las alcanzó)
          firstVisible.querySelectorAll(`.producto-card[data-category="${filter}"]`).forEach(c => {
            c.classList.add('in');
          });

          setTimeout(() => {
            const top = firstVisible.getBoundingClientRect().top + window.scrollY - 140;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 60);
        }
      }
    });
  });
})();


/* ══ MODAL DE IMAGEN ══ */
(function initModal() {
  const overlay = document.getElementById('detalle-modal');
  if (!overlay) return;

  const modalImg = document.getElementById('detalle-modal-img');
  const modalCap = document.getElementById('detalle-modal-cap');
  const modalDots = document.getElementById('detalle-modal-dots');

  let currentImages = [];
  let currentIndex = 0;

  // Recoger todas las imágenes de una card cuando se hace click
  document.querySelectorAll('.producto-image img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () {
      // En esta versión cada card tiene una imagen; si hubiera más se podrían agrupar.
      const card = this.closest('.producto-card');
      const imgs = card.querySelectorAll('.producto-image img');
      currentImages = Array.from(imgs).map(i => ({ src: i.src, alt: i.alt }));
      currentIndex = 0;
      renderModal();
      overlay.classList.add('open');
    });
  });

  function renderModal() {
    const { src, alt } = currentImages[currentIndex];
    modalImg.src = src;
    modalImg.alt = alt;
    if (modalCap) modalCap.textContent = alt;

    // Dots
    if (modalDots) {
      modalDots.innerHTML = '';
      currentImages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = 'dm-dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => { currentIndex = i; renderModal(); });
        modalDots.appendChild(dot);
      });
      modalDots.style.display = currentImages.length > 1 ? 'flex' : 'none';
    }

    // Ocultar flechas si solo hay una imagen
    const prev = overlay.querySelector('.dm-prev');
    const next = overlay.querySelector('.dm-next');
    if (prev) prev.style.display = currentImages.length > 1 ? 'flex' : 'none';
    if (next) next.style.display = currentImages.length > 1 ? 'flex' : 'none';
  }

  // Navegación
  window.navDetalle = function (dir) {
    currentIndex = (currentIndex + dir + currentImages.length) % currentImages.length;
    renderModal();
  };

  // Cerrar
  window.cerrarDetalleModal = function () {
    overlay.classList.remove('open');
  };

  // Teclado
  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') cerrarDetalleModal();
    if (e.key === 'ArrowRight') navDetalle(1);
    if (e.key === 'ArrowLeft') navDetalle(-1);
  });
})();


/* ══ REVEAL ON SCROLL (heredado del sitio principal) ══ */
(function initReveal() {
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll('.rv, .rv-l, .rv-r, .producto-card').forEach(el => {
    el.classList.add('rv');
    revObs.observe(el);
  });
})();


/* ══ HOVER CURSOR ══ */
(function initCursorHover() {
  document.querySelectorAll('.filter-btn, .btn-cotizar, .producto-card, .dm-close, .dm-nav').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('is-hovering'));
  });
})();