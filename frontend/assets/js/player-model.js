const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/** A reusable GLB presentation layer. Product data supplies only the model URL. */
export function initPlayerModel(scope = document, loadViewer = () => import('../vendor/model-viewer/model-viewer.min.js')) {
  const viewer = scope.querySelector('[data-hk-product-model]');
  if (!viewer) return;
  const visual = viewer.closest('[data-hk-player-visual]');
  const story = viewer.closest('#experience');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let ready = false;
  let started = false;
  let pending = null;
  let lastOrbit = '';
  let observer;
  let layoutTimer;

  const progress = () => Number(story?.dataset.hkStoryProgress || 0);

  function orbit(theta, phi) {
    const value = `${theta.toFixed(2)}deg ${phi.toFixed(2)}deg auto`;
    if (value !== lastOrbit) {
      viewer.cameraOrbit = value;
      lastOrbit = value;
    }
  }

  function frame() {
    pending = null;
    if (!ready) return;
    visual.classList.remove('is-model-interactive');
    viewer.removeAttribute('camera-controls');
    viewer.tabIndex = -1;
    // A real camera turns around the mesh as it moves into the explanation.
    // At the dock the view is frontal, so its top plate and Koel stay aligned.
    const theta = 20 * (1 - clamp(progress() * 3, 0, 1));
    orbit(theta, 66);
  }

  function schedule() {
    if (pending === null) pending = requestAnimationFrame(frame);
  }

  function fail() {
    ready = false;
    visual.classList.remove('is-model-ready', 'is-model-interactive');
    viewer.removeAttribute('camera-controls');
    viewer.setAttribute('aria-hidden', 'true');
    viewer.tabIndex = -1;
    story?.dispatchEvent(new Event('hk:model-layout'));
  }

  viewer.addEventListener('load', () => {
    ready = true;
    visual.classList.add('is-model-ready');
    viewer.removeAttribute('aria-hidden');
    schedule();
    story?.dispatchEvent(new Event('hk:model-layout'));
  });
  viewer.addEventListener('error', fail);
  viewer.addEventListener('camera-change', () => {
    // Recalibrate after the camera settles; never rebuild the scroll timeline
    // on every WebGL frame while someone is scrolling.
    clearTimeout(layoutTimer);
    if (ready) layoutTimer = setTimeout(() => story?.dispatchEvent(new Event('hk:model-layout')), 120);
  });
  window.addEventListener('scroll', schedule, { passive: true });
  reduced.addEventListener('change', () => { lastOrbit = ''; schedule(); });

  async function start() {
    if (started) return;
    started = true;
    observer?.disconnect();
    try {
      await loadViewer();
      viewer.setAttribute('src', viewer.dataset.modelSrc);
    } catch (error) {
      fail();
      console.warn('The 3D Player could not load; using the product image.', error);
    }
  }
  // One homepage instance, with no renderer/download on image-based product cards.
  if ('IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) start();
    }, { rootMargin: '200px' });
    observer.observe(viewer);
  } else start();
  // Fixtures may hydrate the URL before or after the viewer script has loaded.
  viewer.addEventListener('hk:model-source', () => {
    if (started) viewer.setAttribute('src', viewer.dataset.modelSrc);
  });
}
