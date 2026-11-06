import { initKoelShop } from './koel-shop.js?v=koel-wave-4';

const node = (tag, className, text) => {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text != null) element.textContent = text;
  return element;
};

async function loadJSON(name) {
  const response = await fetch(new URL(`../../data/${name}.json`, import.meta.url));
  if (!response.ok) throw new Error(`Fixture request failed: ${name} (${response.status})`);
  return response.json();
}

/** Static-only adapter. Replace with Liquid loops, leaving interaction hooks intact. */
export async function renderFixtures() {
  const [site, products] = await Promise.all(['site', 'products'].map(loadJSON));
  // A Liquid section can emit the same img tags from a selected product/media field.
  document.querySelectorAll('[data-hk-product-image]').forEach(image => {
    const product = products.find(item => item.handle === image.dataset.hkProductImage);
    const media = product?.images?.[0];
    if (media?.src) image.src = media.src;
  });
  // Liquid can supply a selected product.media model source through this hook.
  document.querySelectorAll('[data-hk-product-model]').forEach(viewer => {
    const product = products.find(item => item.handle === viewer.dataset.hkProductModel);
    if (product?.metadata?.modelSrc) {
      viewer.dataset.modelSrc = product.metadata.modelSrc;
      viewer.dispatchEvent(new Event('hk:model-source'));
    }
  });
  document.querySelector('[data-hk-announcement]').textContent = site.announcement;
  const nav = document.querySelector('[data-hk-nav]');
  nav?.replaceChildren(...site.navigation.map(item => {
    const link = node('a', '', item.label); link.href = item.href; return link;
  }));

  const selectedProducts = site.featuredKoels
    .map(handle => products.find(item => item.handle === handle))
    .filter(Boolean);
  const shopRoot = document.querySelector('[data-hk-koel-shop]');
  if (shopRoot) initKoelShop({ products: selectedProducts, shopRoot });

  document.querySelector('[data-hk-faqs]')?.replaceChildren(...site.faqs.map(faq => {
    const details = node('details');
    const summary = node('summary', '');
    const toggle = node('span', 'hk-faq-toggle');
    toggle.setAttribute('aria-hidden', 'true');
    summary.append(document.createTextNode(faq.question), toggle);
    const panel = node('div', 'hk-faq-panel');
    const panelInner = node('div', 'hk-faq-panel-inner');
    panelInner.append(node('p', '', faq.answer));
    panel.append(panelInner);
    details.append(summary, panel);
    return details;
  }));
  document.querySelector('[data-hk-support-links]')?.replaceChildren(...site.supportLinks.map(item => {
    if (!item.href) {
      const pending = node('span', '', `${item.label} (pending)`); return pending;
    }
    const link = node('a', '', item.label); link.href = item.href; return link;
  }));
  const status = document.querySelector('[data-hk-data-status]');
  if (status) status.textContent = '';
  return { site, products, featuredKoels: selectedProducts };
}
