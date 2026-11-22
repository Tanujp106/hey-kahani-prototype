/* Product gallery and purchase controls for the Player and Koel pages. Product identity and price stay in the shared markup. */
(() => {
  const addPlayer = document.querySelector('[data-hk-player-add]');
  document.querySelectorAll('[data-hk-player-add-sticky]').forEach((button) => {
    button.addEventListener('click', () => addPlayer?.click());
    button.hidden = false;
  });

  const bag = document.querySelector('#bag-dialog');
  if (addPlayer && bag) {
    document.querySelectorAll('[data-hk-player-buy-now]').forEach((button) => {
      button.addEventListener('click', () => {
        if (bag.open) return;
        addPlayer.click();
        bag.showModal();
      });
      button.hidden = false;
    });
  }

  const buybar = document.querySelector('.hk-pdp-buybar');
  const footer = document.querySelector('#footer');
  if (buybar && footer && 'IntersectionObserver' in window) {
    const visibleFooterParts = new Set();
    const observer = new window.IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) visibleFooterParts.add(target);
        else visibleFooterParts.delete(target);
      }
      buybar.hidden = visibleFooterParts.size > 0;
    });
    const wave = footer.previousElementSibling;
    if (wave?.classList.contains('hk-waves')) observer.observe(wave);
    observer.observe(footer);
  }

  const gallery = document.querySelector('[data-hk-gallery]');
  if (!gallery) return;
  let image = gallery.querySelector('[data-hk-gallery-image]');
  const caption = gallery.querySelector('[data-hk-gallery-caption]');
  const status = gallery.querySelector('[data-hk-gallery-status]');
  const dots = Array.from(gallery.querySelectorAll('[data-hk-gallery-dot]'));
  if (!image || !dots.length) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const easing = 'cubic-bezier(0.22, 1, 0.36, 1)';
  let selected = 0;
  let requested = 0;
  let request = 0;

  const updateSelection = () => {
    const { caption: description } = dots[selected].dataset;
    if (caption) caption.textContent = description;
    if (status) status.textContent = `Image ${selected + 1} of ${dots.length}: ${description}`;
    dots.forEach((dot, at) => {
      dot.setAttribute('aria-pressed', String(at === selected));
    });
  };

  const selectImage = async (index, focus = false) => {
    const next = (index + dots.length) % dots.length;
    const forward = index > requested;
    const repeated = next === requested;
    if (!repeated) request++;
    requested = next;
    const currentRequest = request;
    dots.forEach((dot, at) => { dot.tabIndex = at === next ? 0 : -1; });
    if (focus) dots[next].focus();
    if (next === selected || repeated) return;

    const media = dots[next].dataset;
    const incoming = image.cloneNode(false);
    incoming.removeAttribute('fetchpriority');
    incoming.src = media.src;
    incoming.alt = media.alt;
    incoming.dataset.kind = media.kind;
    try {
      if (incoming.decode) await incoming.decode();
    } catch {
      if (currentRequest === request) selectImage(selected, document.activeElement === dots[next]);
      return;
    }
    if (currentRequest !== request || next === selected) return;

    const outgoing = image;
    outgoing.after(incoming);
    outgoing.removeAttribute('data-hk-gallery-image');
    outgoing.setAttribute('aria-hidden', 'true');
    image = incoming;
    selected = next;
    updateSelection();

    if (!outgoing.animate) {
      outgoing.remove();
      return;
    }
    // Slide: the new photo enters from the side you are moving toward; the old one leaves the other way.
    const duration = reducedMotion.matches ? 160 : 520;
    if (reducedMotion.matches) {
      const opacity = getComputedStyle(outgoing).opacity;
      outgoing.animate([{ opacity }, { opacity: 0 }], { duration, easing, fill: 'forwards' })
        .addEventListener('finish', () => outgoing.remove(), { once: true });
      incoming.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing, fill: 'backwards' });
      return;
    }
    const stageWidth = outgoing.parentElement?.clientWidth;
    const distance = stageWidth ? `${stageWidth}px` : '110%';
    const sign = forward ? '-' : '';
    const opposite = forward ? '' : '-';
    outgoing.animate([{ transform: 'none' }, { transform: `translateX(${sign}${distance})` }], { duration, easing, fill: 'forwards' })
      .addEventListener('finish', () => outgoing.remove(), { once: true });
    incoming.animate([{ transform: `translateX(${opposite}${distance})` }, { transform: 'none' }], { duration, easing, fill: 'backwards' });
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => selectImage(index));
    dot.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = requested + 1;
      if (event.key === 'ArrowLeft') next = requested - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = dots.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      return selectImage(next, true);
    });
  });
  gallery.querySelectorAll('[data-hk-gallery-step]').forEach((button) => {
    button.addEventListener('click', () => selectImage(requested + Number(button.dataset.hkGalleryStep)));
  });
  const stage = gallery.querySelector('.hk-pdp-gallery__stage');
  let touchStart;
  stage?.addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'touch') return;
    touchStart = event.isPrimary && !event.target.closest('button')
      ? { id: event.pointerId, x: event.clientX, y: event.clientY }
      : null;
  }, { passive: true });
  stage?.addEventListener('pointercancel', () => { touchStart = null; });
  stage?.addEventListener('pointerup', (event) => {
    if (!touchStart || event.pointerId !== touchStart.id) return;
    const dx = event.clientX - touchStart.x;
    const dy = event.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < 44 || Math.abs(dx) <= Math.abs(dy) * 1.25) return;
    return selectImage(requested + (dx < 0 ? 1 : -1));
  }, { passive: true });
  gallery.querySelectorAll('[data-hk-gallery-controls]').forEach((controls) => { controls.hidden = false; });

  const zoom = document.querySelector('dialog.hk-pdp-zoom');
  const zoomButton = document.querySelector('[data-hk-gallery-zoom]');
  const zoomImage = zoom?.querySelector('img');
  if (zoomImage && zoomButton) {
    let zoomAnimation;
    zoomButton.hidden = false;
    zoomButton.addEventListener('click', () => {
      if (zoom.open) return;
      zoomAnimation?.cancel();
      const origin = image.getBoundingClientRect();
      zoomImage.src = image.currentSrc || image.src;
      zoomImage.alt = image.alt;
      zoomImage.width = image.naturalWidth || 800;
      zoomImage.height = image.naturalHeight || 800;
      zoom.showModal();

      if (!zoomImage.animate) return;
      const target = zoomImage.getBoundingClientRect();
      if (reducedMotion.matches || !origin.width || !origin.height || !target.width || !target.height) {
        zoomAnimation = zoomImage.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: 'ease-out', fill: 'backwards' });
        return;
      }
      const widthRatio = origin.width / target.width;
      const heightRatio = origin.height / target.height;
      const scale = image.dataset.kind === 'product'
        ? Math.min(widthRatio, heightRatio)
        : Math.max(widthRatio, heightRatio);
      const x = origin.left + origin.width / 2 - target.left - target.width / 2;
      const y = origin.top + origin.height / 2 - target.top - target.height / 2;
      zoomAnimation = zoomImage.animate([
        { transform: `translate(${x}px, ${y}px) scale(${scale})` },
        { transform: 'none' },
      ], { duration: 440, easing, fill: 'backwards' });
    });
  }
  dots[0].tabIndex = 0;
  updateSelection();
})();
