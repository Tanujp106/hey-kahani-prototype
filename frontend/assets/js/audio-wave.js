/** Live continuous-wave visualizer from an HTML audio element (Web Audio Analyser). */

const graphs = new WeakMap();
const WIDTH = 320;
const HEIGHT = 64;
const MID = HEIGHT / 2;
const POINTS = 96;

const reducedMotion = () =>
  globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true;

function ensureGraph(audio) {
  let graph = graphs.get(audio);
  if (graph) return graph;
  const AudioCtx = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AudioCtx || typeof audio !== 'object') return null;
  const ctx = new AudioCtx();
  const source = ctx.createMediaElementSource(audio);
  const analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  analyser.smoothingTimeConstant = 0.82;
  source.connect(analyser);
  analyser.connect(ctx.destination);
  graph = {
    ctx,
    analyser,
    data: new Float32Array(analyser.fftSize),
  };
  graphs.set(audio, graph);
  return graph;
}

function buildPath(samples, collapse) {
  if (collapse > 0.98) return `M 0 ${MID} L ${WIDTH} ${MID}`;
  const amp = (1 - collapse) * (HEIGHT * 0.42);
  const step = Math.max(1, Math.floor(samples.length / POINTS));
  let d = '';
  for (let i = 0; i < POINTS; i += 1) {
    const index = Math.min(samples.length - 1, i * step);
    const y = MID - samples[index] * amp;
    const px = (i / (POINTS - 1)) * WIDTH;
    d += `${i === 0 ? 'M' : 'L'} ${px.toFixed(2)} ${y.toFixed(2)} `;
  }
  return d.trim();
}

/**
 * Bind a live wavelength path to an <audio> element.
 * @returns {{ setPlaying(boolean): void, destroy(): void }}
 */
export function bindAudioWave(audio, pathEl) {
  if (!audio || !pathEl) {
    return { setPlaying() {}, destroy() {} };
  }

  let playing = false;
  let collapse = 1;
  let frame = 0;
  let destroyed = false;
  let graph = null;

  const paintFlat = () => {
    pathEl.setAttribute('d', `M 0 ${MID} L ${WIDTH} ${MID}`);
  };
  paintFlat();

  const tick = () => {
    if (destroyed) return;
    const target = playing ? 0 : 1;
    const ease = reducedMotion() ? 1 : 0.14;
    collapse += (target - collapse) * ease;
    if (Math.abs(target - collapse) < 0.002) collapse = target;

    if (graph?.analyser) {
      graph.analyser.getFloatTimeDomainData(graph.data);
      pathEl.setAttribute('d', buildPath(graph.data, collapse));
    } else {
      paintFlat();
    }

    if (playing || collapse < 0.999) frame = globalThis.requestAnimationFrame(tick);
    else {
      frame = 0;
      paintFlat();
    }
  };

  const ensureRunning = () => {
    if (destroyed || frame) return;
    frame = globalThis.requestAnimationFrame(tick);
  };

  const setPlaying = async next => {
    playing = Boolean(next);
    if (playing) {
      graph = ensureGraph(audio);
      if (graph?.ctx?.state === 'suspended') {
        try { await graph.ctx.resume(); } catch { /* gesture/autoplay policy */ }
      }
    }
    ensureRunning();
  };

  const onPlay = () => { setPlaying(true); };
  const onPauseOrEnd = () => {
    if (audio.paused) setPlaying(false);
  };
  audio.addEventListener('play', onPlay);
  audio.addEventListener('pause', onPauseOrEnd);
  audio.addEventListener('ended', onPauseOrEnd);

  return {
    setPlaying,
    destroy() {
      destroyed = true;
      playing = false;
      if (frame) globalThis.cancelAnimationFrame(frame);
      frame = 0;
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPauseOrEnd);
      audio.removeEventListener('ended', onPauseOrEnd);
      paintFlat();
    },
  };
}

export const audioWaveGeometry = { WIDTH, HEIGHT, MID, POINTS, buildPath };
