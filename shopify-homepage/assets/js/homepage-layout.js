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
    let dots = [];
    let stops = [];
    let activeDot;
    const motion = () => (reducedMotion.matches ? 'auto' : 'smooth');
    const maximumScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
    const syncControls = () => {
      if (!previous && !next && !dots.length) return;
      const maximum = maximumScroll();
      if (previous) {
        previous.hidden = maximum < 2;
        previous.disabled = track.scrollLeft <= 2;
      }
      if (next) {
        next.hidden = maximum < 2;
        next.disabled = track.scrollLeft >= maximum - 2;
      }
      if (!dots.length) return;
      const nearest = stops.findIndex((left, index) => (
        index === stops.length - 1 || track.scrollLeft < (left + stops[index + 1]) / 2
      ));
      const current = dots[nearest];
      if (current !== activeDot) {
        activeDot?.removeAttribute('aria-current');
        current.setAttribute('aria-current', 'true');
        activeDot = current;
      }
    };

    const updatePagination = () => {
      if (dotList) {
        const maximum = maximumScroll();
        const slides = Array.from(track.children).filter((slide) => !slide.hidden);
        stops = [];
        if (maximum >= 2 && slides.length > 1) {
          // Measure each slide from the first so rail insets and gaps are respected.
          const start = slides[0].getBoundingClientRect().left;
          stops.push(0);
          for (const slide of slides.slice(1)) {
            const left = slide.getBoundingClientRect().left - start;
            if (left >= maximum - 2) break;
            if (left > stops[stops.length - 1] + 2) stops.push(left);
          }
          // Several cards can share the final reachable scroll position.
          stops.push(maximum);
        }
        if (dots.length !== stops.length) {
          dots = stops.map((_, index) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'hk-carousel-dot';
            dot.setAttribute('aria-label', `Go to position ${index + 1} of ${stops.length}`);
            dot.setAttribute('aria-controls', track.id);
            dot.addEventListener('click', () => track.scrollTo({ left: stops[index], behavior: motion() }));
            return dot;
          });
          dotList.replaceChildren(...dots);
        }
        dotList.hidden = dots.length < 2;
      }
      syncControls();
    };

    const scroll = (direction) => {
      if (!stops.length) {
        track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: motion() });
        return;
      }
      const left = direction > 0
        ? stops.find((stop) => stop > track.scrollLeft + 2)
        : stops.findLast((stop) => stop < track.scrollLeft - 2);
      if (left !== undefined) track.scrollTo({ left, behavior: motion() });
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
        track.scrollTo({ left: event.key === 'Home' ? 0 : maximumScroll(), behavior: motion() });
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
        updatePagination();
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
    if ('ResizeObserver' in window) new window.ResizeObserver(updatePagination).observe(track);
    window.addEventListener('resize', updatePagination);
    updatePagination();
  });

  document.querySelectorAll('[data-hk-quote-ticker]').forEach((section) => {
    const track = section.querySelector('[data-hk-rail-track]');
    const toggle = section.querySelector('[data-hk-quote-toggle]');
    if (!track || !toggle) return;
    const cards = Array.from(track.children);
    if (cards.length < 2) return;

    const hoverPointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const speed = 42; // Pixels per second at every card width.
    let copies = [];
    let distance = 0;
    let frame = 0;
    let lastTime;
    let position;
    let visible = !('IntersectionObserver' in window);
    let hovered = false;
    let focused = false;
    let paused = false;
    let touching = false;
    let resumeTimer = 0;

    const tick = (time) => {
      if (lastTime === undefined) position = Math.max(track.scrollLeft, 0) % distance;
      else position = (position + Math.min(time - lastTime, 50) * speed / 1000) % distance;
      track.scrollLeft = position;
      lastTime = time;
      frame = window.requestAnimationFrame(tick);
    };
    const syncPlayback = () => {
      const shouldPlay = !reducedMotion.matches && distance > 0 && visible
        && !hovered && !focused && !paused && !touching && !resumeTimer;
      if (shouldPlay && !frame) frame = window.requestAnimationFrame(tick);
      if (!shouldPlay && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
        lastTime = undefined;
      }
    };
    const measure = () => {
      // The first copy starts one full set and its closing gap past the original.
      distance = copies.length ? copies[0].getBoundingClientRect().left - cards[0].getBoundingClientRect().left : 0;
      syncPlayback();
    };
    const syncPreference = () => {
      if (reducedMotion.matches) {
        copies.forEach(copy => copy.remove());
        copies = [];
        track.classList.remove('is-ticking');
      } else if (!copies.length) {
        copies = cards.map(card => {
          const copy = card.cloneNode(true);
          copy.setAttribute('aria-hidden', 'true');
          copy.inert = true;
          return copy;
        });
        track.append(...copies);
        track.classList.add('is-ticking');
      }
      toggle.hidden = !copies.length;
      measure();
    };
    const setPaused = (value) => {
      if (reducedMotion.matches || paused === value) return;
      paused = value;
      toggle.textContent = paused ? 'Resume stories' : 'Pause stories';
      syncPlayback();
    };
    const waitForScroll = () => {
      if (reducedMotion.matches) return;
      window.clearTimeout(resumeTimer);
      resumeTimer = window.setTimeout(() => {
        resumeTimer = 0;
        syncPlayback();
      }, 300);
      syncPlayback();
    };
    const endTouch = (event) => {
      if (event.targetTouches.length) return;
      touching = false;
      waitForScroll();
    };
    toggle.addEventListener('click', () => setPaused(!paused));
    track.addEventListener('focus', () => { focused = track.matches(':focus-visible'); syncPlayback(); });
    track.addEventListener('blur', () => { focused = false; syncPlayback(); });
    track.addEventListener('pointerenter', (event) => {
      if (event.pointerType === 'touch' || !hoverPointer.matches) return;
      hovered = true;
      syncPlayback();
    });
    track.addEventListener('pointerleave', (event) => {
      if (event.pointerType === 'touch') return;
      hovered = false;
      syncPlayback();
    });
    track.addEventListener('touchstart', () => {
      touching = true;
      syncPlayback();
    }, { passive: true });
    track.addEventListener('touchend', endTouch, { passive: true });
    track.addEventListener('touchcancel', endTouch, { passive: true });
    track.addEventListener('scroll', () => {
      // A swipe can keep moving after the user's finger leaves the screen.
      if (resumeTimer) waitForScroll();
    }, { passive: true });
    track.addEventListener('wheel', (event) => {
      if (event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) waitForScroll();
    }, { passive: true });
    if ('IntersectionObserver' in window) {
      new window.IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
      }).observe(track);
    }
    if ('ResizeObserver' in window) new window.ResizeObserver(measure).observe(track);
    else window.addEventListener('resize', measure);
    reducedMotion.addEventListener?.('change', syncPreference);
    syncPreference();
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
