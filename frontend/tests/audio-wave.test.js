import test from 'node:test';
import assert from 'node:assert/strict';
import { audioWaveGeometry, bindAudioWave } from '../assets/js/audio-wave.js';

const { MID, WIDTH, buildPath } = audioWaveGeometry;

test('a collapsed wave is a single straight center line', () => {
  const samples = Float32Array.from({ length: 128 }, (_, i) => Math.sin(i / 8));
  assert.equal(buildPath(samples, 1), `M 0 ${MID} L ${WIDTH} ${MID}`);
});

test('an open wave follows the sample amplitudes', () => {
  const samples = Float32Array.from({ length: 128 }, (_, i) => (i % 2 === 0 ? 1 : -1));
  const path = buildPath(samples, 0);
  assert.match(path, /^M /);
  assert.doesNotMatch(path, new RegExp(`M 0 ${MID} L ${WIDTH} ${MID}`));
  assert.ok(path.includes('L '));
});

test('bindAudioWave paints a flat line and ignores missing nodes', () => {
  const noop = bindAudioWave(null, null);
  noop.setPlaying(true);
  noop.destroy();

  const attrs = {};
  const pathEl = { setAttribute(key, value) { attrs[key] = value; } };
  const audio = new EventTarget();
  audio.paused = true;
  const wave = bindAudioWave(audio, pathEl);
  assert.equal(attrs.d, `M 0 ${MID} L ${WIDTH} ${MID}`);
  wave.destroy();
});
