/* Koel product template. One page renders every Koel: ?koel=<handle> picks a record from the
   embedded #hk-koel-catalog. In Shopify the product template renders the same markup from the
   product, so this script only fills slots; it does not own prices or story metadata.
   It runs before the shared scripts, so preview, bag, gallery and rails bind to the result. */
(() => {
  const source = document.getElementById('hk-koel-catalog');
  if (!source) return;
  let catalog;
  try { catalog = JSON.parse(source.textContent); } catch { return; }
  const koels = Array.isArray(catalog.koels) ? catalog.koels : [];
  if (!koels.length) return;

  const requested = new URLSearchParams(window.location.search).get('koel');
  const koel = koels.find((entry) => entry.handle === requested) || koels[0];
  const imageUrl = (entry) => `${catalog.assetBase}${entry.image}`;
  const iconFor = (entry) => `#hk-lucide-${catalog.collections?.[entry.collection]?.icon || 'disc'}`;
  const price = (entry) => (Number.isInteger(entry.priceMinor) ? `$${(entry.priceMinor / 100).toFixed(2)}` : '');
  const artAlt = `${koel.title} Koel story disc artwork`;
  const image = imageUrl(koel);

  document.title = `${koel.title} · Koel story disc · Hey Kahani`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',
    `${koel.title} is a Koel story disc for the Kahani Player. ${koel.tagline} Screen-free South Asian stories for ages 3–6.`);

  // Product containers carry the record the shared bag script reads.
  document.querySelectorAll('[data-hk-koel-product]').forEach((product) => {
    Object.assign(product.dataset, { collection: koel.collection, title: koel.title, meta: koel.meta, image });
    product.querySelectorAll('[data-hk-koel-price]').forEach((el) => {
      el.textContent = price(koel);
      el.dataset.priceKind = koel.priceKind || 'mock';
    });
  });

  const fields = {
    title: koel.title,
    collection: koel.collection,
    tagline: koel.tagline,
    summary: koel.summary,
    runtime: koel.runtime || 'To be confirmed',
  };
  document.querySelectorAll('[data-hk-koel-field]').forEach((el) => {
    const value = fields[el.dataset.hkKoelField];
    if (value) el.textContent = value;
  });
  document.querySelectorAll('[data-hk-koel-icon]').forEach((use) => use.setAttribute('href', iconFor(koel)));

  // Gallery: the first image is the Koel itself; the lifestyle photos are shared.
  document.querySelectorAll('[data-hk-koel-art]').forEach((el) => {
    if (el.tagName === 'IMG') {
      el.src = image;
      el.alt = artAlt;
      el.width = koel.imageSize || 1254;
      el.height = koel.imageSize || 1254;
    } else {
      el.dataset.src = image;
      el.dataset.alt = artAlt;
    }
  });
  const zoomImage = document.querySelector('#koel-zoom img');
  if (zoomImage) zoomImage.src = image;

  const description = document.querySelector('[data-hk-koel-description]');
  if (description && Array.isArray(koel.description) && koel.description.length) {
    description.replaceChildren(...koel.description.map((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      return p;
    }));
  }

  // Track list: shown when the record has tracks; otherwise the empty note stays.
  const tracks = document.querySelector('[data-hk-koel-tracks]');
  const tracksEmpty = document.querySelector('[data-hk-koel-tracks-empty]');
  if (tracks && Array.isArray(koel.tracks) && koel.tracks.length) {
    tracks.replaceChildren(...koel.tracks.map((track) => {
      const li = document.createElement('li');
      const name = document.createElement('span');
      name.textContent = track.title;
      li.append(name);
      if (track.duration) {
        const time = document.createElement('span');
        time.className = 'hk-kpdp-tracks__time';
        time.textContent = track.duration;
        li.append(time);
      }
      return li;
    }));
    tracks.hidden = false;
    if (tracksEmpty) tracksEmpty.hidden = true;
    const tracksMeta = document.querySelector('[data-hk-koel-tracks-meta]');
    if (tracksMeta) {
      tracksMeta.textContent = [`${koel.tracks.length} tracks`, koel.runtime].filter(Boolean).join(' · ');
      tracksMeta.hidden = false;
    }
  }

  // More Koels: the same collection first, then the rest, never the current Koel.
  const rail = document.querySelector('[data-hk-koel-rail]');
  const template = document.getElementById('hk-koel-card-template');
  if (rail && template) {
    const others = koels.filter((entry) => entry.handle !== koel.handle);
    others.sort((a, b) => Number(b.collection === koel.collection) - Number(a.collection === koel.collection));
    rail.replaceChildren(...others.map((entry) => {
      const card = template.content.firstElementChild.cloneNode(true);
      Object.assign(card.dataset, { collection: entry.collection, title: entry.title, meta: entry.meta, image: imageUrl(entry) });
      card.querySelector('[data-card="collection"]').textContent = entry.collection;
      card.querySelector('[data-card="title"]').textContent = entry.title;
      card.querySelector('.hk-koel__badge-icon use').setAttribute('href', iconFor(entry));
      const priceEl = card.querySelector('[data-hk-koel-price]');
      priceEl.textContent = price(entry);
      priceEl.dataset.priceKind = entry.priceKind || 'mock';
      const poster = card.querySelector('.hk-koel__poster');
      poster.href = `?koel=${encodeURIComponent(entry.handle)}`;
      poster.setAttribute('aria-label', `View ${entry.title}`);
      const img = poster.querySelector('img');
      img.src = imageUrl(entry);
      img.width = entry.imageSize || 1254;
      img.height = entry.imageSize || 1254;
      return card;
    }));
  }
})();
