/* Product-media enhancement only. Product identity and price stay in the shared markup. */
(() => {
  const primaryBuy = document.querySelector('[data-hk-player-add]');
  document.querySelectorAll('[data-hk-player-buy]').forEach((button) => {
    button.addEventListener('click', () => primaryBuy?.click());
    button.hidden = false;
  });

  const gallery = document.querySelector('[data-hk-gallery]');
  if (!gallery) return;
  const image = gallery.querySelector('[data-hk-gallery-image]');
  const caption = gallery.querySelector('[data-hk-gallery-caption]');
  const status = gallery.querySelector('[data-hk-gallery-status]');
  const thumbs = Array.from(gallery.querySelectorAll('[data-hk-gallery-thumb]'));
  if (!image || !thumbs.length) return;
  let selected = 0;

  const selectImage = (index, focus = false) => {
    selected = (index + thumbs.length) % thumbs.length;
    const media = thumbs[selected].dataset;
    image.src = media.src;
    image.alt = media.alt;
    image.dataset.kind = media.kind;
    if (caption) caption.textContent = media.caption;
    if (status) status.textContent = `Image ${selected + 1} of ${thumbs.length}: ${media.caption}`;
    thumbs.forEach((thumb, at) => {
      thumb.setAttribute('aria-pressed', String(at === selected));
      thumb.tabIndex = at === selected ? 0 : -1;
    });
    if (focus) thumbs[selected].focus();
  };

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener('click', () => selectImage(index));
    thumb.addEventListener('keydown', (event) => {
      let next;
      if (event.key === 'ArrowRight') next = selected + 1;
      if (event.key === 'ArrowLeft') next = selected - 1;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = thumbs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      selectImage(next, true);
    });
  });
  gallery.querySelectorAll('[data-hk-gallery-step]').forEach((button) => {
    button.addEventListener('click', () => selectImage(selected + Number(button.dataset.hkGalleryStep)));
  });
  gallery.querySelectorAll('[data-hk-gallery-controls]').forEach((controls) => { controls.hidden = false; });

  const zoom = document.querySelector('#player-zoom');
  const zoomButton = document.querySelector('[data-hk-gallery-zoom]');
  if (zoom && zoomButton) {
    zoomButton.hidden = false;
    zoomButton.addEventListener('click', () => {
      const zoomImage = zoom.querySelector('img');
      zoomImage.src = image.src;
      zoomImage.alt = image.alt;
      zoom.showModal();
    });
  }
  selectImage(0);
})();
