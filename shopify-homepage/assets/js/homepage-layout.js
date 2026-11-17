/* Scrollable sections use native overflow; controls and filtering are progressive enhancements. */
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-hk-rail]').forEach((section) => {
    const track = section.querySelector('[data-hk-rail-track]');
    if (!track) return;
    const previous = section.querySelector('[data-hk-rail-prev]');
    const next = section.querySelector('[data-hk-rail-next]');
    const syncControls = () => {
      const maximum = Math.max(0, track.scrollWidth - track.clientWidth);
      if (previous) {
        previous.hidden = maximum < 2;
        previous.disabled = track.scrollLeft <= 2;
      }
      if (next) {
        next.hidden = maximum < 2;
        next.disabled = track.scrollLeft >= maximum - 2;
      }
    };
    const scroll = (direction) => {
      track.scrollBy({ left: direction * track.clientWidth * .85, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
    };
    previous?.addEventListener('click', () => scroll(-1));
    next?.addEventListener('click', () => scroll(1));
    track.addEventListener('scroll', syncControls, { passive: true });
    track.addEventListener('keydown', (event) => {
      if (event.target !== track) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        scroll(event.key === 'ArrowLeft' ? -1 : 1);
      }
      if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        track.scrollTo({ left: event.key === 'Home' ? 0 : track.scrollWidth, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
      }
    });

    const filters = Array.from(section.querySelectorAll('[data-hk-koel-filter]'));
    const cards = Array.from(track.querySelectorAll('[data-hk-koel]'));
    const status = section.querySelector('[data-hk-filter-status]');
    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        const selected = filter.dataset.hkKoelFilter;
        filters.forEach((button) => {
          const active = button === filter;
          button.classList.toggle('is-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        let visible = 0;
        cards.forEach((card) => {
          const show = selected === 'all' || card.dataset.collection === selected;
          if (!show) card.querySelector('.hk-koel__preview.is-playing, .hk-koel__preview[aria-busy="true"]')?.click();
          card.hidden = !show;
          if (show) visible += 1;
        });
        track.scrollTo({ left: 0, behavior: 'auto' });
        if (status) status.textContent = `${visible} ${visible === 1 ? 'Koel' : 'Koels'} shown${selected === 'all' ? '' : ` in ${filter.textContent.trim()}`}.`;
        syncControls();
      });
    });
    if ('ResizeObserver' in window) new window.ResizeObserver(syncControls).observe(track);
    window.addEventListener('resize', syncControls);
    syncControls();
  });

  // In-page navigation closes the existing desktop menu as well as the mobile drawer.
  document.querySelectorAll('.hk-nav a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const panel = document.querySelector('[data-hk-mega-panel]');
      panel?.classList.remove('is-open');
      panel?.setAttribute('aria-hidden', 'true');
      document.querySelector('.hk-nav')?.classList.remove('is-mega-open');
      document.querySelectorAll('[data-hk-mega-trigger]').forEach((trigger) => {
        trigger.classList.remove('is-active');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  });
})();
