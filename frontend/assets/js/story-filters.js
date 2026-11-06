/** Search uses rendered DOM records; Shopify can supply identical hooks. */
export function initStorySearch(scope = document) {
  const form = scope.querySelector('[data-hk-search-form]');
  const output = scope.querySelector('[data-hk-search-results]');
  if (!form || !output) return;
  const input = form.querySelector('input[type="search"]');
  const search = () => {
    const query = input.value.trim().toLocaleLowerCase();
    output.replaceChildren();
    if (!query) return;
    const cards = [...scope.querySelectorAll('[data-hk-search-item]')];
    if (!cards.length) {
      output.textContent = 'Koel data is unavailable. Please reload the preview.';
      return;
    }
    const matches = cards.filter(card => (card.dataset.hkSearchText || '').toLocaleLowerCase().includes(query));
    if (!matches.length) {
      output.textContent = 'No matching Koels. Try Daily Life or Festivals.';
      return;
    }
    for (const card of matches) {
      const link = document.createElement('button');
      link.type = 'button';
      link.className = 'hk-text-button';
      link.textContent = card.dataset.hkSearchTitle || card.dataset.hkSearchText;
      link.addEventListener('click', () => {
        form.closest('dialog')?.close();
        card.click();
      });
      output.append(link);
    }
  };
  form.addEventListener('submit', event => { event.preventDefault(); search(); });
  input.addEventListener('input', search);
}
