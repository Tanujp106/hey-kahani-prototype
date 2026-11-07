/* One shared player; product markup supplies the public audio URLs. */
(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pattern = [.2,.12,.35,.62,.42,.22,.7,.88,.74,.9,.55,.28,.16,.42,.64,.94,.72,.35,.8,1,.67,.86,.7,.4,.62,.9,.54,.3,.4,.2,.12,.5];
  let audio, graph, active, frame = 0, request = 0, wanted = false, graphAttempted = false;
  const svgNode = (tag, attributes) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [name, value] of Object.entries(attributes)) node.setAttribute(name, value);
    return node;
  };
  const cancelWave = () => {
    if (frame) window.cancelAnimationFrame(frame);
    frame = 0;
  };
  const setState = (entry, state) => {
    const playing = state === 'playing', loading = state === 'loading';
    const kind = entry.demo ? 'demo audio' : 'preview';
    entry.state = state;
    entry.button.classList.toggle('is-playing', playing);
    entry.button.setAttribute('aria-busy', String(loading));
    entry.button.setAttribute('aria-label', state === 'error' ? `Retry ${kind} for ${entry.title}`
      : state === 'unavailable' ? `Audio preview unavailable for ${entry.title}`
      : `${playing ? 'Pause' : loading ? 'Cancel' : 'Play'} ${kind} for ${entry.title}`);
    entry.triggers.forEach(trigger => trigger.setAttribute('aria-pressed', String(playing)));
    entry.label.textContent = playing ? (entry.demo ? 'Demo' : 'Pause')
      : loading ? 'Loading…' : state === 'error' ? 'Retry' : state === 'unavailable' ? 'No audio' : 'Preview';
    entry.icon.setAttribute('d', playing ? 'M6 4h4v16H6zm8 0h4v16h-4z' : 'M8 5v14l11-7z');
    entry.button.setAttribute('title', state === 'error' ? 'Audio could not play. Select to retry.'
      : entry.demo ? 'Design preview sample — not approved story audio.' : `Preview ${entry.title}`);
    entry.bars.forEach((bar, i) => { bar.style.transform = `scaleY(${pattern[i]})`; });
  };
  const paintWave = () => {
    frame = 0;
    if (!active || active.state !== 'playing' || motion.matches || !graph) return;
    graph.analyser.getByteTimeDomainData(graph.data);
    const chunk = graph.data.length / active.bars.length;
    active.bars.forEach((bar, i) => {
      let energy = 0, count = 0;
      for (let j = Math.floor(i * chunk); j < Math.floor((i + 1) * chunk); j++) {
        energy += ((graph.data[j] - 128) / 128) ** 2;
        count++;
      }
      bar.style.transform = `scaleY(${Math.min(1, .12 + Math.sqrt(energy / count) * 4)})`;
    });
    frame = window.requestAnimationFrame(paintWave);
  };
  const startWave = () => {
    cancelWave();
    if (graph && !motion.matches) frame = window.requestAnimationFrame(paintWave);
  };
  const prepareGraph = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!graphAttempted && AudioContext) {
      graphAttempted = true;
      let context, source;
      try {
        context = new AudioContext();
        const analyser = context.createAnalyser();
        analyser.fftSize = 256;
        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        graph = { context, analyser, data: new Uint8Array(analyser.fftSize) };
      } catch {
        // An optional visualizer must not silence otherwise playable audio.
        if (source && context) source.connect(context.destination);
      }
    }
    if (graph?.context.state === 'suspended') graph.context.resume().catch(() => {});
  };
  const reset = () => { cancelWave(); if (active) setState(active, 'idle'); };
  const fail = (entry, token) => {
    if (token !== request || entry !== active) return;
    wanted = false;
    audio.pause();
    cancelWave();
    setState(entry, 'error');
    active = null;
  };
  const ensureAudio = () => {
    if (audio) return;
    audio = new window.Audio();
    audio.preload = 'none';
    audio.crossOrigin = 'anonymous';
    audio.addEventListener('playing', () => {
      if (!active || !wanted || audio.paused) return;
      setState(active, 'playing'); startWave();
    });
    audio.addEventListener('waiting', () => {
      if (active && wanted) { cancelWave(); setState(active, 'loading'); }
    });
    audio.addEventListener('pause', () => {
      if (audio.paused) { wanted = false; reset(); }
    });
    audio.addEventListener('ended', () => {
      wanted = false; reset(); audio.currentTime = 0; active = null;
    });
    audio.addEventListener('error', () => { if (active) fail(active, request); });
  };
  const toggle = entry => {
    const token = ++request;
    if (active === entry && wanted) {
      wanted = false; audio.pause(); reset(); return;
    }
    if (active) { audio.pause(); reset(); }
    const root = entry.card.closest('[data-preview-src]');
    const src = entry.card.dataset.previewSrc || root?.dataset.previewSrc;
    entry.demo = !entry.card.dataset.previewSrc && root?.dataset.previewDemo === 'true';
    if (!src) { active = null; wanted = false; setState(entry, 'unavailable'); return; }
    ensureAudio();
    const changed = active !== entry || entry.src !== src;
    active = entry; entry.src = src; wanted = true;
    if (changed) { audio.src = src; audio.currentTime = 0; audio.load(); }
    setState(entry, 'loading');
    prepareGraph();
    try { Promise.resolve(audio.play()).catch(() => fail(entry, token)); }
    catch { fail(entry, token); }
  };
  document.querySelectorAll('[data-hk-koel]').forEach(card => {
    const button = card.querySelector('.hk-koel__preview');
    if (!button) return;
    const icon = svgNode('svg', { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'currentColor', 'aria-hidden': 'true' });
    const path = svgNode('path', {});
    icon.append(path);
    const label = document.createElement('span');
    const wave = svgNode('svg', { viewBox: '0 0 160 28', class: 'hk-koel__wave', 'aria-hidden': 'true' });
    const bars = pattern.map((_, i) => svgNode('rect', { x: i * 5 + 1, y: 2, width: 3, height: 24 }));
    wave.append(...bars);
    button.replaceChildren(icon, label, wave);
    const entry = { card, button, icon: path, label, bars, title: card.dataset.title || 'Koel',
      triggers: card.querySelectorAll('[data-hk-koel-preview]') };
    setState(entry, 'idle');
    entry.triggers.forEach(trigger => trigger.addEventListener('click', () => toggle(entry)));
  });
  motion.addEventListener?.('change', () => {
    if (active?.state === 'playing') { setState(active, 'playing'); startWave(); }
  });
  window.addEventListener('pagehide', () => {
    ++request; wanted = false; audio?.pause(); reset();
  });
})();
