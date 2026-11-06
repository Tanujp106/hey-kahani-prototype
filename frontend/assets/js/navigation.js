const instances = new WeakMap();

/** Responsive disclosure navigation; no theme, fixture or commerce dependency. */
export function initNavigation(scope = document) {
  const header = scope.matches?.('[data-hk-header]') ? scope : scope.querySelector('[data-hk-header]');
  const nav = header?.querySelector('[data-hk-nav]');
  const toggle = header?.querySelector('[data-hk-nav-toggle]');
  if (!header || !nav || !toggle) return () => {};
  if (instances.has(header)) return instances.get(header);
  const ownerDocument = header.ownerDocument || document;
  const desktop = window.matchMedia('(min-width: 961px)');
  let open = false;

  function setOpen(next, restoreFocus = false) {
    open = !desktop.matches && next;
    nav.hidden = !desktop.matches && !open;
    toggle.hidden = desktop.matches;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    header.classList.toggle('hk-navigation-open', open);
    if (restoreFocus && !desktop.matches) toggle.focus();
  }
  const sync = () => setOpen(false);
  const toggleMenu = () => {
    setOpen(!open);
    if (open) nav.querySelector('a')?.focus();
  };
  function headerClick(event) {
    // Delegation survives replacement of fixture links by Liquid or static data.
    if (event.target.closest('a, [data-hk-open-dialog]')) setOpen(false);
  }
  function keydown(event) {
    if (event.key === 'Escape' && open) setOpen(false, true);
  }
  function outsidePointer(event) {
    if (open && !header.contains(event.target)) setOpen(false);
  }

  toggle.addEventListener('click', toggleMenu);
  header.addEventListener('click', headerClick);
  ownerDocument.addEventListener('keydown', keydown);
  ownerDocument.addEventListener('pointerdown', outsidePointer);
  desktop.addEventListener('change', sync);
  sync();

  function cleanup() {
    toggle.removeEventListener('click', toggleMenu);
    header.removeEventListener('click', headerClick);
    ownerDocument.removeEventListener('keydown', keydown);
    ownerDocument.removeEventListener('pointerdown', outsidePointer);
    desktop.removeEventListener('change', sync);
    nav.hidden = false;
    toggle.hidden = true;
    header.classList.remove('hk-navigation-open');
    instances.delete(header);
  }
  instances.set(header, cleanup);
  return cleanup;
}
