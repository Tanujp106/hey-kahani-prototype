/* Scrollable sections use native overflow; controls and filtering are progressive enhancements. */
(() => {
  // Measure the live header so the hero clears it even when controls or copy wrap.
  const announcement = document.querySelector?.('.hk-announcement');
  const navigation = document.querySelector?.('.hk-nav');
  if (announcement && navigation && document.documentElement) {
    const syncHeaderSize = () => {
      document.documentElement.style.setProperty('--hk-announcement-height', `${announcement.getBoundingClientRect().height}px`);
      document.documentElement.style.setProperty('--hk-navigation-height', `${navigation.getBoundingClientRect().height}px`);
    };
    syncHeaderSize();
    window.addEventListener('resize', syncHeaderSize);
    if ('ResizeObserver' in window) {
      const observer = new window.ResizeObserver(syncHeaderSize);
      observer.observe(announcement);
      observer.observe(navigation);
    }
  }
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-hk-rail]').forEach((section) => {
    const track = section.querySelector('[data-hk-rail-track]');
    if (!track) return;
    const previous = section.querySelector('[data-hk-rail-prev]');
    const next = section.querySelector('[data-hk-rail-next]');
    const dotList = section.querySelector('[data-hk-rail-dots]');
    const dots = dotList ? Array.from(dotList.querySelectorAll('[data-hk-rail-dot]')) : [];
    const featureCards = dots.length ? Array.from(track.children).filter((card) => card.classList.contains('hk-feature')) : [];
    const motion = () => (reducedMotion.matches ? 'auto' : 'smooth');
    const stepSize = () => {
      const card = featureCards[0];
      if (!card) return track.clientWidth * 0.85;
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      return card.offsetWidth + gap;
    };
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
      if (!dots.length) return;
      const size = stepSize();
      const index = size > 0 ? Math.min(dots.length - 1, Math.max(0, Math.round(track.scrollLeft / size))) : 0;
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
    };
    const scroll = (direction) => {
      track.scrollBy({ left: direction * stepSize(), behavior: motion() });
    };
    previous?.addEventListener('click', () => scroll(-1));
    next?.addEventListener('click', () => scroll(1));
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: index * stepSize(), behavior: motion() });
      });
    });
    if (dotList && featureCards.length) dotList.hidden = false;
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
    // Keep the full catalogue height so a shorter filter cannot move the waves or the page.
    if (filters.length && cards.length && track.style && typeof track.getBoundingClientRect === 'function') {
      const lockCatalogueHeight = () => {
        const hidden = cards.map((card) => card.hidden);
        cards.forEach((card) => { card.hidden = false; });
        track.style.minHeight = '0px';
        const height = Math.ceil(track.getBoundingClientRect().height);
        track.style.minHeight = `${height}px`;
        cards.forEach((card, index) => { card.hidden = hidden[index]; });
      };
      lockCatalogueHeight();
      window.addEventListener('resize', lockCatalogueHeight);
      window.addEventListener('load', lockCatalogueHeight);
    }
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
