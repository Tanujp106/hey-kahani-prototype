const controllers = new WeakMap();
const EASE = 'cubic-bezier(.22, 1, .36, 1)';

/** Native modal semantics, with one temporary top-layer copy of the selected Koel. */
export function getKoelDialogMotion(dialog) {
  if (controllers.has(dialog)) return controllers.get(dialog);
  const panel = dialog.querySelector('[data-hk-koel-dialog-panel]');
  const art = dialog.querySelector('[data-hk-koel-dialog-art]');
  let origin, source, sourceVisibility, flight, flightRect;
  let animations = [], generation = 0, phase = 'closed', closing;
  let backdropPress = false;
  const reduced = () => globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = () => typeof panel?.animate === 'function' && typeof art?.animate === 'function';
  const visibleRect = node => {
    if (!node?.isConnected) return null;
    const rect = node.getBoundingClientRect();
    const view = dialog.ownerDocument.defaultView;
    return rect.width > 0 && rect.height > 0 && rect.left >= 0 && rect.top >= 0 &&
      rect.left + rect.width <= view.innerWidth && rect.top + rect.height <= view.innerHeight ? rect : null;
  };
  const projection = (from, to) =>
    `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;
  function animate(node, frames, options) {
    const animation = node.animate(frames, { easing: EASE, fill: 'both', ...options });
    // Cancellation is expected when Escape interrupts an entrance.
    animation.finished.catch(() => {});
    animations.push(animation);
  }
  function cancelAnimations() {
    animations.forEach(animation => animation.cancel());
    animations = [];
  }
  function removeFlight() {
    flight?.remove();
    flight = null;
    art.style.visibility = '';
  }
  function reset() {
    backdropPress = false;
    generation += 1;
    cancelAnimations();
    removeFlight();
    if (source) source.style.visibility = sourceVisibility;
    panel.style.opacity = '';
    dialog.dataset.hkMotionState = 'closed';
    phase = 'closed';
    closing = null;
  }
  function makeFlight() {
    flightRect = art.getBoundingClientRect();
    if (!flightRect.width || !flightRect.height) return false;
    flight = art.cloneNode(true);
    flight.removeAttribute?.('data-hk-koel-dialog-art');
    flight.className = 'hk-koel-dialog-coin hk-koel-flight';
    flight.setAttribute('aria-hidden', 'true');
    Object.assign(flight.style, {
      left: `${flightRect.left}px`, top: `${flightRect.top}px`,
      width: `${flightRect.width}px`, height: `${flightRect.height}px`, visibility: 'visible'
    });
    dialog.append(flight);
    art.style.visibility = 'hidden';
    return true;
  }
  function open(trigger) {
    if (dialog.open) return;
    origin = trigger;
    source = trigger?.querySelector('.hk-koel-coin-shell') || trigger;
    sourceVisibility = source?.style.visibility || '';
    const start = visibleRect(source);
    const token = ++generation;
    phase = 'opening';
    panel.scrollTop = 0;
    dialog.dataset.hkMotionState = reduced() ? 'opening-reduced' : 'opening';
    dialog.showModal();
    dialog.querySelector('[data-hk-close-dialog]')?.focus({ preventScroll: true });
    if (!canAnimate()) { phase = 'open'; return; }
    const travelling = !reduced() && start && makeFlight();
    if (travelling) {
      source.style.visibility = 'hidden';
      animate(flight, [{ transform: projection(start, flightRect) }, { transform: 'none' }], { duration: 440 });
    }
    animate(panel, [{ opacity: 0 }, { opacity: 1 }], { duration: reduced() ? 140 : 260, delay: travelling ? 80 : 0 });
    Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (token !== generation) return;
      removeFlight();
      cancelAnimations();
      phase = 'open';
      dialog.dataset.hkMotionState = 'open';
    });
  }
  function close({ returnToOrigin = true } = {}) {
    if (!dialog.open) return Promise.resolve();
    if (phase === 'closing') return closing;
    dialog.dispatchEvent(new Event('hk:koel-closing'));
    const token = ++generation;
    const currentTransform = flight ? getComputedStyle(flight).transform : 'none';
    const currentOpacity = phase === 'opening' ? getComputedStyle(panel).opacity : 1;
    cancelAnimations();
    phase = 'closing';
    dialog.dataset.hkMotionState = reduced() ? 'closing-reduced' : 'closing';
    if (!canAnimate()) { reset(); dialog.close(); return Promise.resolve(); }
    const end = returnToOrigin && !reduced() && visibleRect(source);
    if (end && (flight || makeFlight())) {
      animate(flight, [{ transform: currentTransform }, { transform: projection(end, flightRect) }], { duration: 280 });
    } else removeFlight();
    animate(panel, [{ opacity: currentOpacity }, { opacity: 0 }], { duration: reduced() ? 120 : 180 });
    closing = Promise.allSettled(animations.map(animation => animation.finished)).then(() => {
      if (token !== generation) return;
      reset();
      dialog.close();
      if (returnToOrigin && origin?.isConnected) origin.focus({ preventScroll: true });
    });
    return closing;
  }
  for (const type of ['cancel', 'hk:request-close']) {
    dialog.addEventListener(type, event => { event.preventDefault(); close(); });
  }
  const onBackdrop = event => {
    if (!dialog.open || event.target !== dialog) return false;
    const rect = panel.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX >= rect.left + rect.width ||
      event.clientY < rect.top || event.clientY >= rect.top + rect.height;
  };
  // Both ends must be on the backdrop: dragging a control outside isn't a tap.
  dialog.addEventListener('pointerdown', event => {
    backdropPress = event.button === 0 && event.isPrimary !== false && onBackdrop(event);
  });
  dialog.addEventListener('pointercancel', () => { backdropPress = false; });
  dialog.addEventListener('click', event => {
    const dismiss = backdropPress && onBackdrop(event);
    backdropPress = false;
    if (dismiss) close();
  });
  // A native close event is queued: don't let an old event reset a new opening.
  dialog.addEventListener('close', () => { if (!dialog.open) reset(); });
  const controller = { open, close };
  controllers.set(dialog, controller);
  return controller;
}
