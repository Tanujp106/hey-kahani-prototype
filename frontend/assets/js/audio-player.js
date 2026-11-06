import { bindAudioWave } from './audio-wave.js?v=koel-wave-1';

const formatTime = seconds => {
  const total = Number.isFinite(seconds) && seconds > 0 ? Math.floor(seconds) : 0;
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
};

/** Attach to markup rendered by either static fixtures or Liquid. No data imports. */
export function initAudioPlayers(scope = document) {
  let active = null;
  scope.querySelectorAll('[data-hk-audio]').forEach(root => {
    const audio = root.querySelector('audio');
    const part = key => root.querySelector(`[data-hk-audio-${key}]`);
    const toggle = part('toggle'), seek = part('seek'), label = part('label');
    const elapsed = part('elapsed'), duration = part('duration'), status = part('status');
    const wavePath = root.querySelector('[data-hk-audio-wave-path]');
    const iconPlay = root.querySelector('[data-hk-audio-icon-play]');
    const iconPause = root.querySelector('[data-hk-audio-icon-pause]');
    const wave = bindAudioWave(audio, wavePath);
    const state = { audio, pending: false, stop: null, wave };
    const usableDuration = () => Number.isFinite(audio.duration) && audio.duration > 0;
    const paint = playing => {
      toggle?.setAttribute('aria-pressed', String(playing));
      toggle?.setAttribute('aria-label', playing ? 'Pause sample' : 'Play sample');
      if (label) label.textContent = playing ? 'Pause sample' : 'Play sample';
      if (iconPlay) iconPlay.hidden = playing;
      if (iconPause) iconPause.hidden = !playing;
      wave.setPlaying(playing);
    };
    const progress = () => {
      if (elapsed) elapsed.textContent = formatTime(audio.currentTime);
      if (duration) duration.textContent = formatTime(audio.duration);
      if (!seek) return;
      seek.max = usableDuration() ? String(audio.duration) : '0';
      seek.value = String(audio.currentTime || 0);
      seek.setAttribute('aria-valuetext', `${formatTime(audio.currentTime)} of ${formatTime(audio.duration)}`);
    };
    state.stop = () => {
      state.pending = false;
      audio.pause();
      if (Number.isFinite(audio.currentTime)) audio.currentTime = 0;
      paint(false); progress();
      if (status) status.textContent = 'Ready to listen';
      wave.setPlaying(false);
    };
    paint(false); progress();
    if (seek) seek.disabled = true;
    if (!audio.getAttribute('src') && !audio.querySelector?.('source[src]')) {
      if (toggle) toggle.disabled = true;
      if (status) status.textContent = 'Sample unavailable — approved audio coming soon.';
      return;
    }
    if (toggle) toggle.disabled = false;
    if (status) status.textContent = 'Ready to listen';
    toggle?.addEventListener('click', async () => {
      if (!audio.paused || state.pending) {
        state.pending = false;
        if (active === state) active = null;
        audio.pause(); paint(false);
        if (status) status.textContent = 'Paused';
        return;
      }
      if (active && active !== state) active.stop();
      active = state; state.pending = true;
      if (status) status.textContent = 'Loading sample…';
      try {
        await audio.play();
        if (active !== state) { audio.pause(); paint(false); return; }
        state.pending = false;
        paint(!audio.paused);
        if (status) status.textContent = audio.paused ? 'Paused' : 'Playing';
      } catch {
        state.pending = false;
        if (active !== state) return;
        active = null; paint(false);
        if (status) status.textContent = 'Could not play this sample. Please try again.';
      }
    });
    audio.addEventListener('play', () => {
      if (active !== state) { audio.pause(); paint(false); return; }
      paint(true);
      if (status) status.textContent = 'Playing';
    });
    audio.addEventListener('pause', () => paint(false));
    audio.addEventListener('loadedmetadata', () => {
      if (seek) seek.disabled = !usableDuration();
      progress();
    });
    audio.addEventListener('durationchange', () => {
      if (seek) seek.disabled = !usableDuration();
      progress();
    });
    audio.addEventListener('timeupdate', progress);
    audio.addEventListener('ended', () => {
      if (active === state) active = null;
      state.pending = false; paint(false); progress();
      if (status) status.textContent = 'Sample finished. Listen again?';
    });
    audio.addEventListener('error', () => {
      if (active === state) active = null;
      state.pending = false; audio.pause(); paint(false);
      if (seek) seek.disabled = true;
      if (status) status.textContent = 'Sample unavailable. Please try again later.';
    });
    seek?.addEventListener('input', () => {
      if (!usableDuration()) return;
      const value = Number(seek.value);
      if (Number.isFinite(value)) audio.currentTime = Math.max(0, Math.min(audio.duration, value));
      progress();
    });
  });
}
