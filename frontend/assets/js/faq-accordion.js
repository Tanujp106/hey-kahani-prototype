const DURATION_MS = 320;
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function panelOf(details) {
  return details.querySelector('.hk-faq-panel');
}

function clearPanelInline(panel) {
  if (!panel) return;
  panel.style.height = '';
  panel.style.overflow = '';
  panel.style.transition = '';
}

function whenHeightSettles(panel, onDone) {
  let settled = false;
  const finish = () => {
    if (settled) return;
    settled = true;
    panel.removeEventListener('transitionend', onEnd);
    onDone();
  };
  const onEnd = (event) => {
    if (event.target !== panel || event.propertyName !== 'height') return;
    finish();
  };
  panel.addEventListener('transitionend', onEnd);
  window.setTimeout(finish, DURATION_MS + 80);
}

function animateOpen(details) {
  const panel = panelOf(details);
  if (!panel || details.classList.contains('is-animating')) return;

  details.classList.add('is-animating');
  details.open = true;
  panel.style.overflow = 'hidden';
  panel.style.height = '0px';
  panel.style.transition = 'none';
  void panel.offsetHeight;

  panel.style.transition = `height ${DURATION_MS}ms ${EASE}`;
  panel.style.height = `${panel.scrollHeight}px`;

  whenHeightSettles(panel, () => {
    clearPanelInline(panel);
    details.classList.remove('is-animating');
  });
}

function animateClose(details) {
  const panel = panelOf(details);
  if (!details.open || details.classList.contains('is-closing')) return;

  details.classList.add('is-animating', 'is-closing');

  if (!panel) {
    details.open = false;
    details.classList.remove('is-animating', 'is-closing');
    return;
  }

  panel.style.overflow = 'hidden';
  panel.style.height = `${panel.scrollHeight}px`;
  panel.style.transition = 'none';
  void panel.offsetHeight;

  panel.style.transition = `height ${DURATION_MS}ms ${EASE}`;
  panel.style.height = '0px';

  whenHeightSettles(panel, () => {
    details.open = false;
    clearPanelInline(panel);
    details.classList.remove('is-animating', 'is-closing');
  });
}

function closeOthers(list, keep) {
  list.querySelectorAll('details[open]').forEach((item) => {
    if (item === keep) return;
    if (prefersReducedMotion()) {
      item.open = false;
      item.classList.remove('is-animating', 'is-closing');
      clearPanelInline(panelOf(item));
      return;
    }
    animateClose(item);
  });
}

/** Single-open FAQ accordion with height animation. Native toggle if motion is reduced. */
export function initFaqAccordion(root = document) {
  const list = root.querySelector('[data-hk-faqs]');
  if (!list || list.dataset.hkFaqMotion === '1') return;
  list.dataset.hkFaqMotion = '1';

  list.addEventListener('click', (event) => {
    const summary = event.target.closest('summary');
    if (!summary || !list.contains(summary)) return;

    const details = summary.closest('details');
    if (!(details instanceof HTMLDetailsElement)) return;

    event.preventDefault();

    if (prefersReducedMotion()) {
      const willOpen = !details.open;
      closeOthers(list, details);
      details.open = willOpen;
      return;
    }

    if (details.open) {
      animateClose(details);
      return;
    }

    closeOthers(list, details);
    animateOpen(details);
  });
}
