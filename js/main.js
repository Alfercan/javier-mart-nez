/* ============================================================
   Javier Martínez Fisioterapeuta — Animaciones
   ============================================================ */

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────
   LOADER
────────────────────────────────────────────── */
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    gsap.to(loader, {
      opacity: 0, duration: 0.6, ease: 'power2.inOut',
      onComplete() {
        loader.style.display = 'none';
        document.body.classList.remove('loading');
        animateHeroIn();
      }
    });
  }, 2000);
}

/* ──────────────────────────────────────────────
   HERO
────────────────────────────────────────────── */
function animateHeroIn() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.to('.hero-badge',     { opacity: 1, y: 0, duration: 0.7 })
    .to('.hero-line',      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.3')
    .to('.hero-sub',       { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
    .to('.hero-actions',   { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-price-tag', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
    .to('.hero-photo-wrap',{ opacity: 1, y: 0, duration: 1.1, ease: 'power4.out' }, '-=0.9')
    .to('.hero-stat-1',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.5')
    .to('.hero-stat-2',    { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');
}

/* ──────────────────────────────────────────────
   NAVBAR
────────────────────────────────────────────── */
function initNavbar() {
  const navbar  = document.getElementById('navbar');
  const burger  = document.getElementById('burger');
  const navMenu = document.getElementById('nav-links');

  ScrollTrigger.create({
    start: 'top -50',
    onUpdate(self) {
      navbar.classList.toggle('scrolled', self.scroll() > 50);
    }
  });

  burger.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  navMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navMenu.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ──────────────────────────────────────────────
   CONTADOR ANIMADO
────────────────────────────────────────────── */
function initCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter() {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].val); }
        });
      }
    });
  });
}

/* ──────────────────────────────────────────────
   SCROLL ANIMATIONS
────────────────────────────────────────────── */
function initScrollAnimations() {

  /* Propuesta */
  gsap.to('.prop-item', {
    scrollTrigger: { trigger: '#propuesta', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  /* Servicios */
  document.querySelectorAll('.servicio-card').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 85%' },
      opacity: 1, y: 0, duration: 0.7,
      delay: (i % 2) * 0.12,
      ease: 'power3.out'
    });
  });

  /* Técnicas */
  document.querySelectorAll('.tecnica-item').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: '.tecnicas-grid', start: 'top 82%' },
      opacity: 1, y: 0, duration: 0.6,
      delay: i * 0.07,
      ease: 'power3.out'
    });
  });

  /* Proceso */
  gsap.to('.paso', {
    scrollTrigger: { trigger: '.proceso-steps', start: 'top 80%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  /* Patologías */
  gsap.to('.patologia-group', {
    scrollTrigger: { trigger: '.patologias-cols', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out'
  });

  /* Sobre mí */
  gsap.to('.sobre-photo', {
    scrollTrigger: { trigger: '#sobre-mi', start: 'top 80%' },
    opacity: 1, x: 0, duration: 1, ease: 'power3.out'
  });

  gsap.to('.sobre-text', {
    scrollTrigger: { trigger: '#sobre-mi', start: 'top 80%' },
    opacity: 1, x: 0, duration: 1, delay: 0.15, ease: 'power3.out'
  });

  /* Contacto */
  gsap.from('.cinfo-card', {
    scrollTrigger: { trigger: '.contacto-grid', start: 'top 82%' },
    opacity: 0, y: 20, duration: 0.6, stagger: 0.1, ease: 'power3.out'
  });

  gsap.to('.contacto-destacado', {
    scrollTrigger: { trigger: '.contacto-grid', start: 'top 82%' },
    opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out'
  });

  /* Section heads */
  document.querySelectorAll('.section-head').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 87%' },
      opacity: 0, y: 24, duration: 0.8, ease: 'power3.out'
    });
  });
}

/* ──────────────────────────────────────────────
   SMOOTH ANCHORS
────────────────────────────────────────────── */
function initSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });
}

/* ──────────────────────────────────────────────
   INIT
────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initCounters();
  initScrollAnimations();
  initSmoothLinks();
});
