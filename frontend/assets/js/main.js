import { initNavigation } from './navigation.js?v=landing-depth-2';
import { initPlayerModel } from './player-model.js?v=landing-story-4';
import { initProductExperience } from './product-experience.js?v=landing-story-26';
import { renderFixtures } from './render-fixtures.js?v=collection-fix-1';
import { initFaqAccordion } from './faq-accordion.js?v=faq-accordion-1';
import { initAudioPlayers } from './audio-player.js';
import { initStorySearch } from './story-filters.js?v=koel-overlay-1';

// Only initialization belongs here; interaction modules do not know about JSON.
initAudioPlayers();
initStorySearch();

initNavigation();
initProductExperience();
initPlayerModel();

document.querySelectorAll('[data-hk-open-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.hkOpenDialog);
    dialog.showModal();
    dialog.querySelector('input, [data-hk-close-dialog]')?.focus();
  });
});
document.querySelectorAll('[data-hk-close-dialog]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = button.closest('dialog');
    // An animated modal can defer dismissal while keeping its native focus trap.
    if (dialog.dispatchEvent(new Event('hk:request-close', { cancelable: true }))) dialog.close();
  });
});

try {
  await renderFixtures();
} catch (error) {
  const status = document.querySelector('[data-hk-data-status]');
  if (status) status.textContent = 'Preview collections could not load. Serve the frontend over HTTP and reload.';
  console.error('Hey Kahani fixture loading failed:', error);
}

initFaqAccordion();
