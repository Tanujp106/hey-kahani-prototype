import { getKoelDialogMotion } from './koel-dialog-motion.js?v=koel-backdrop-1';

/* 6+6+4 needs 16 items; with 15 Koels the pedestal tapers as 6 / 5 / 4. */
const DESKTOP_TIERS = [6, 5, 4];
const MOBILE_TIERS = [3, 3, 3, 3, 3];
const MOBILE_QUERY = '(max-width: 750px)';
/** Design-preview stand-in until approved Koel excerpts exist. Not story audio. */
const PREVIEW_SAMPLE_SRC = 'assets/audio/preview-sample.mp3';

/** Stable design-preview amounts (USD cents) until Shopify prices exist. Not approved. */
const PREVIEW_PRICE_MINOR = [899, 999, 1099, 1299, 1499, 1799];

const previewPriceMinor = handle => {
  let hash = 0;
  for (const char of String(handle || '')) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return PREVIEW_PRICE_MINOR[hash % PREVIEW_PRICE_MINOR.length];
};

const priceLabel = product => {
  if (Number.isInteger(product.priceMinor) && product.currency) {
    return new Intl.NumberFormat('en', { style: 'currency', currency: product.currency })
      .format(product.priceMinor / 100);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(previewPriceMinor(product.handle) / 100);
};

const seriesLabel = handle => {
  if (!handle) return null;
  return handle.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

/** Honest overlay copy only — never invent story claims. */
const koelDescription = product => {
  if (product.metadata?.description) return product.metadata.description;
  const series = seriesLabel(product.metadata?.seriesHandle);
  if (series) return `${series} series. Story details pending confirmation.`;
  return 'Story details pending confirmation.';
};

const stopDialogAudio = dialog => {
  const audio = dialog?.querySelector('[data-hk-koel-dialog-audio-el]');
  if (!audio) return;
  audio.pause();
  if (Number.isFinite(audio.currentTime)) audio.currentTime = 0;
};

const fillArt = (target, product) => {
  target.replaceChildren();
  if (typeof target.removeAttribute === 'function') target.removeAttribute('style');
  else if (target.style) target.style.background = '';
  const image = product.images?.[0];
  if (image?.src) {
    const img = document.createElement('img');
    img.src = image.src;
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    target.append(img);
    const artworkScale = image.discArtworkScale;
    if (Number.isFinite(artworkScale)) target.style.setProperty('--hk-art-scale', String(artworkScale));
    return;
  }
  // Image-only faces: no on-coin typography when artwork is missing.
  target.style.background =
    'radial-gradient(circle at 35% 30%, #f4efe6 0%, #d7c4a4 48%, #b89a72 100%)';
};

function openKoelDialog(product, dialog, origin) {
  if (!dialog) return;
  const title = dialog.querySelector('[data-hk-koel-dialog-title]');
  const desc = dialog.querySelector('[data-hk-koel-dialog-desc]');
  const price = dialog.querySelector('[data-hk-koel-dialog-price]');
  const art = dialog.querySelector('[data-hk-koel-dialog-art]');
  const audio = dialog.querySelector('[data-hk-koel-dialog-audio-el]');
  const root = dialog.querySelector('[data-hk-audio]');
  title.textContent = product.title;
  if (desc) desc.textContent = koelDescription(product);
  if (price) price.textContent = priceLabel(product);
  fillArt(art, product);
  const approvedSrc = product.metadata?.previewSrc || '';
  const previewSrc = approvedSrc || PREVIEW_SAMPLE_SRC;
  audio.setAttribute('src', previewSrc);
  stopDialogAudio(dialog);
  const status = root?.querySelector('[data-hk-audio-status]');
  const toggle = root?.querySelector('[data-hk-audio-toggle]');
  const label = root?.querySelector('[data-hk-audio-label]');
  if (toggle) toggle.disabled = false;
  if (label) label.textContent = 'Play sample';
  if (status) {
    status.textContent = approvedSrc
      ? 'Ready to listen'
      : 'Design preview sample — not approved story audio.';
  }
  getKoelDialogMotion(dialog).open(origin);
}

function coinButton(product) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'hk-shop-koel';
  button.id = `koel-${product.handle}`;
  button.dataset.hkKoelCoin = product.handle;
  button.dataset.hkSearchItem = '';
  button.dataset.hkSearchText = product.title;
  button.dataset.hkSearchTitle = product.title;
  if (product.metadata?.coinTone) button.dataset.coinTone = product.metadata.coinTone;

  const shell = document.createElement('span');
  shell.className = 'hk-koel-coin-shell';
  shell.setAttribute('aria-hidden', 'true');
  const edge = document.createElement('span');
  edge.className = 'hk-koel-coin-edge';
  // Closely spaced cross-sections form a continuous edge, rather than two
  // disconnected front/back circles. No filter on this 3D subtree: it flattens it.
  for (let depth = 1; depth <= 12; depth += 1) {
    const layer = document.createElement('span');
    layer.style.setProperty('--hk-edge-depth', String(depth));
    edge.append(layer);
  }
  const face = document.createElement('span');
  face.className = 'hk-koel-coin-face';
  const artwork = document.createElement('span');
  artwork.className = 'hk-koel-coin-art';
  // Crop source artboards inside the physical face without modifying media.
  fillArt(artwork, product);
  face.append(artwork);
  const shine = document.createElement('span');
  shine.className = 'hk-koel-coin-shine';
  const rim = document.createElement('span');
  rim.className = 'hk-koel-coin-rim';
  shell.append(edge, face, shine, rim);

  const label = document.createElement('span');
  label.className = 'hk-koel-coin-label';
  label.textContent = product.title;

  button.append(shell, label);
  button.setAttribute('aria-label', `Open ${product.title}`);
  return button;
}

function tierPattern() {
  return globalThis.matchMedia(MOBILE_QUERY).matches ? MOBILE_TIERS : DESKTOP_TIERS;
}

function paintShop(root, products) {
  const pattern = tierPattern();
  root.replaceChildren();
  let cursor = 0;
  pattern.forEach((count, index) => {
    const slice = products.slice(cursor, cursor + count);
    cursor += count;
    if (!slice.length) return;
    const tier = document.createElement('div');
    tier.className = 'hk-koel-tier';
    tier.style.setProperty('--hk-tier-cols', String(count));
    tier.setAttribute('role', 'presentation');
    tier.dataset.hkKoelTier = String(index + 1);
    tier.append(...slice.map(coinButton));
    root.append(tier);
  });
}

/** Render pedestal tiers and wire the play-first Koel overlay. */
export function initKoelShop({ products, shopRoot, dialog } = {}) {
  const root = shopRoot || document.querySelector('[data-hk-koel-shop]');
  const overlay = dialog || document.getElementById('koel-dialog');
  if (!root || !products?.length) return () => {};

  const render = () => paintShop(root, products);
  render();

  const onClick = event => {
    const coin = event.target.closest('[data-hk-koel-coin]');
    if (!coin || !root.contains(coin)) return;
    const product = products.find(item => item.handle === coin.dataset.hkKoelCoin);
    if (product) openKoelDialog(product, overlay, coin);
  };
  root.addEventListener('click', onClick);

  const onClose = () => stopDialogAudio(overlay);
  overlay?.addEventListener('close', onClose);
  overlay?.addEventListener('hk:koel-closing', onClose);
  const motion = overlay ? getKoelDialogMotion(overlay) : null;

  const media = globalThis.matchMedia(MOBILE_QUERY);
  const onBreakpoint = () => render();
  media.addEventListener('change', onBreakpoint);

  const onShop = async () => {
    stopDialogAudio(overlay);
    await motion.close({ returnToOrigin: false });
    const cart = document.getElementById('cart-dialog');
    cart?.showModal();
    cart?.querySelector('[data-hk-close-dialog]')?.focus();
  };
  const shopButton = overlay?.querySelector('[data-hk-koel-dialog-shop]');
  shopButton?.addEventListener('click', onShop);

  return () => {
    root.removeEventListener('click', onClick);
    overlay?.removeEventListener('close', onClose);
    overlay?.removeEventListener('hk:koel-closing', onClose);
    shopButton?.removeEventListener('click', onShop);
    media.removeEventListener('change', onBreakpoint);
  };
}

export function openKoelFromSearch(handle, products, dialog) {
  const product = products.find(item => item.handle === handle);
  if (product) openKoelDialog(product, dialog || document.getElementById('koel-dialog'), document.getElementById(`koel-${handle}`));
}
