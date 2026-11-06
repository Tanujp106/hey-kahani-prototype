const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));

/** One shared media scene. Liquid supplies img sources; native scroll supplies time. */
export function initProductExperience(scope = document) {
  const story = scope.querySelector('#experience');
  if (!story || !story.querySelector('[data-hk-story-stage]') || !Element.prototype.animate) return;
  const panels = [...story.querySelectorAll('[data-hk-story-panel]')];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const narrow = window.matchMedia('(max-width: 850px)');
  const fineHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  let animations = [];
  let koelAnimations = [];
  let starts = [];
  let pending = null;
  let previous = '';
  let activeDock = 0;
  let dockPose = null;
  let homePoses = [];
  let koelLayers = [];
  let scrollOwnsKoels = true;
  let dockAt = 1;
  let mobile = false;
  let offsets = [0, 0.25, 0.5, 0.75, 1];
  let captionAt = { choose: 0.25, tap: 0.5, listen: 0.75 };
  let activeCaption = null;
  let captionLeaveTimer = null;

  const pose = (x, y, scale, rotation = 0, tilt = 0) =>
    `translate(-50%, -50%) translate3d(${x * window.innerWidth}px, ${y * window.innerHeight}px, 0) rotateX(${tilt}deg) rotateZ(${rotation}deg) scale(${scale})`;

  const track = (list, element, keyframes) => {
    if (!element || !keyframes?.length) return;
    const animation = element.animate(keyframes, { duration: 1000, fill: 'both', easing: 'linear' });
    animation.pause();
    animation.currentTime = 0;
    list.push(animation);
  };

  function clearKoelInline() {
    koelLayers.forEach(layer => {
      layer.style.transition = 'none';
      layer.style.opacity = '';
      layer.style.transform = '';
      layer.style.width = '';
      layer.style.height = '';
      layer.classList.remove('is-docked', 'is-koel-pickable');
    });
  }

  function placeDockWaves(visible) {
    const waves = story.querySelector('[data-hk-dock-waves]');
    if (!waves) return;
    if (!visible || !dockPose) {
      waves.style.opacity = '';
      waves.style.transform = '';
      return;
    }
    // Sit at the plate contact: rings expand downward toward the speaker band.
    waves.style.transform = pose(dockPose[0], dockPose[1] + (mobile ? 0.03 : 0.04), 1, 0, 0);
    waves.style.opacity = '1';
  }

  function releaseKoelInteraction() {
    story.classList.remove('is-koel-docked');
    placeDockWaves(false);
    koelLayers.forEach(layer => {
      layer.classList.remove('is-docked', 'is-koel-pickable');
      layer.removeAttribute('role');
      layer.removeAttribute('aria-label');
      layer.removeAttribute('aria-pressed');
      layer.tabIndex = -1;
    });
  }

  function mixPose(from, to, t) {
    return from.map((value, index) => value + (to[index] - value) * t);
  }

  function arcPose(from, to, t) {
    const mid = mixPose(from, to, t);
    const lift = Math.sin(Math.PI * clamp(t)) * (mobile ? 0.1 : 0.14);
    mid[1] -= lift;
    mid[2] *= 1 + 0.1 * Math.sin(Math.PI * clamp(t));
    mid[3] = mid[3] * (1 - t) + to[3] * t;
    mid[4] = mid[4] * (1 - t) + to[4] * t;
    return mid;
  }

  function markKoelInteractive() {
    koelLayers.forEach((layer, index) => {
      layer.classList.toggle('is-docked', index === activeDock);
      layer.classList.add('is-koel-pickable');
      layer.tabIndex = 0;
      layer.setAttribute('role', 'button');
      layer.setAttribute(
        'aria-label',
        index === activeDock ? 'Koel on the Player' : `Place Koel ${index + 1} on the Player`
      );
      layer.setAttribute('aria-pressed', index === activeDock ? 'true' : 'false');
    });
    story.classList.add('is-koel-docked');
    placeDockWaves(true);
  }

  function applyDockLayout() {
    if (!dockPose || homePoses.length !== koelLayers.length) return;
    koelLayers.forEach((layer, index) => {
      layer.getAnimations?.().forEach(animation => animation.cancel());
      layer.style.transition = 'none';
      layer.style.transform = pose(...(index === activeDock ? dockPose : homePoses[index]));
      layer.style.opacity = '1';
    });
    markKoelInteractive();
  }

  function flyKoel(layer, from, to) {
    layer.getAnimations?.().forEach(animation => animation.cancel());
    layer.style.transition = 'none';
    layer.style.opacity = '1';
    if (reduced.matches) {
      layer.style.transform = pose(...to);
      return Promise.resolve();
    }
    const animation = layer.animate(
      [
        { transform: pose(...from), offset: 0 },
        { transform: pose(...arcPose(from, to, 0.4)), offset: 0.4 },
        { transform: pose(...arcPose(from, to, 0.75)), offset: 0.72 },
        { transform: pose(...to), offset: 1 }
      ],
      { duration: 780, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'forwards' }
    );
    return animation.finished.catch(() => {}).finally(() => {
      layer.style.transform = pose(...to);
      animation.cancel();
    });
  }

  function selectDock(index) {
    if (scrollOwnsKoels || index === activeDock || !koelLayers[index] || !dockPose) return;
    const previous = activeDock;
    const outgoing = koelLayers[previous];
    const incoming = koelLayers[index];
    const fromHome = homePoses[index];
    const toHome = homePoses[previous];
    if (!outgoing || !incoming || !fromHome || !toHome) return;
    activeDock = index;
    markKoelInteractive();
    Promise.all([
      flyKoel(outgoing, dockPose, toHome),
      flyKoel(incoming, fromHome, dockPose)
    ]);
  }

  function risingSteps(arrive) {
    const a = clamp(arrive);
    const steps = [0, clamp(Math.min(a * 0.7, a - 0.08)), clamp(Math.min(a - 0.03, a - 0.01)), a];
    for (let i = 1; i < steps.length; i += 1) {
      if (steps[i] <= steps[i - 1]) steps[i] = Math.min(0.98, steps[i - 1] + 0.002);
    }
    return steps;
  }

  function buildKoelAnimations() {
    koelAnimations.forEach(animation => animation.cancel());
    koelAnimations = [];
    const hold = Math.max(0, dockAt - 0.14);
    const liftAt = Math.max(hold + 0.02, dockAt - 0.07);
    const landAt = Math.max(liftAt + 0.02, dockAt);
    const settleAt = Math.min(1, landAt + 0.04);

    koelLayers.forEach((layer, index) => {
      const home = homePoses[index];
      if (!home) return;
      const offRight = [
        home[0] + (mobile ? 0.38 : 0.32),
        home[1] + 0.36,
        home[2] * 0.9,
        home[3] + 14,
        Math.max(18, home[4] - 4)
      ];
      const midRise = [
        home[0] + (mobile ? 0.14 : 0.12),
        home[1] + 0.14,
        home[2] * 0.96,
        home[3] + 5,
        home[4]
      ];
      const arrive = offsets[1] + (offsets[2] - offsets[1]) * (0.28 + index * 0.18);
      const [o0, o1, o2, o3] = risingSteps(Math.min(arrive, hold - 0.02));
      const frames = [
        { offset: o0, transform: pose(...offRight), opacity: 0 },
        { offset: o1, transform: pose(...offRight), opacity: 0 },
        { offset: o2, transform: pose(...midRise), opacity: 1 },
        { offset: o3, transform: pose(...home), opacity: 1 },
        { offset: hold, transform: pose(...home), opacity: 1 }
      ];

      if (index === activeDock && dockPose) {
        frames.push(
          { offset: liftAt, transform: pose(...arcPose(home, dockPose, 0.45)), opacity: 1 },
          { offset: landAt, transform: pose(...dockPose), opacity: 1 },
          { offset: settleAt, transform: pose(...dockPose), opacity: 1 },
          { offset: 1, transform: pose(...dockPose), opacity: 1 }
        );
      } else {
        frames.push({ offset: 1, transform: pose(...home), opacity: 1 });
      }

      for (let i = 1; i < frames.length; i += 1) {
        if (frames[i].offset <= frames[i - 1].offset) {
          frames[i].offset = Math.min(1, frames[i - 1].offset + 0.002);
        }
      }
      frames[frames.length - 1].offset = 1;
      track(koelAnimations, layer, frames);
    });
  }

  function enterDockMode() {
    if (!scrollOwnsKoels) return;
    scrollOwnsKoels = false;
    koelAnimations.forEach(animation => animation.cancel());
    koelAnimations = [];
    applyDockLayout();
  }

  function leaveDockMode(progressTime) {
    if (scrollOwnsKoels) return;
    scrollOwnsKoels = true;
    clearKoelInline();
    releaseKoelInteraction();
    buildKoelAnimations();
    for (const animation of koelAnimations) animation.currentTime = progressTime;
  }

  function update() {
    pending = null;
    if (!animations.length && scrollOwnsKoels && !koelAnimations.length) return;
    const storyBox = story.getBoundingClientRect();
    const top = storyBox.top;
    const range = starts.length > 1 ? starts.at(-1) - starts[0] : 0;
    const progress = range > 0 ? clamp((-top - starts[0]) / range) : 0;
    const app = typeof document.getElementById === 'function' ? document.getElementById('app') : null;
    const appTop = typeof app?.getBoundingClientRect === 'function' ? app.getBoundingClientRect().top : Infinity;
    // As soon as the app enters the viewport, lift the sticky stage with it so
    // the speaker section scrolls away instead of staying pinned underneath.
    const exitShift = appTop < window.innerHeight ? Math.min(0, appTop - window.innerHeight) : 0;
    const stateKey = `${progress.toFixed(4)}:${Math.round(exitShift)}`;
    if (stateKey === previous) return;
    previous = stateKey;
    story.dataset.hkStoryProgress = progress.toFixed(4);
    const stageEl = story.querySelector('[data-hk-story-stage]');
    if (stageEl) {
      stageEl.style.transform = exitShift ? `translate3d(0, ${exitShift}px, 0)` : '';
    }
    const time = progress * 1000;
    for (const animation of animations) animation.currentTime = time;

    const theater = progress >= captionAt.choose && exitShift > -window.innerHeight + 1;
    story.classList.toggle('is-story-theater', theater);
    story.classList.toggle('is-story-exit', exitShift < 0);
    setActiveCaption(exitShift < -window.innerHeight * 0.55 ? null : captionForProgress(progress));

    // Keep scroll ownership through the dock flight, then freeze for tap-to-swap.
    if (exitShift < -window.innerHeight * 0.35 || progress < dockAt + 0.02) {
      leaveDockMode(time);
      for (const animation of koelAnimations) animation.currentTime = time;
      if (exitShift >= -window.innerHeight * 0.35 && progress >= dockAt - 0.02) {
        story.classList.add('is-koel-docked');
        placeDockWaves(true);
      } else {
        story.classList.remove('is-koel-docked');
        placeDockWaves(false);
      }
    } else {
      enterDockMode();
    }
  }

  function setActiveCaption(name) {
    const next = name && name !== 'intro' ? name : null;
    if (next === activeCaption) return;
    const captions = [...story.querySelectorAll('[data-hk-caption]')];
    if (!captions.length) {
      activeCaption = next;
      return;
    }
    if (captionLeaveTimer) {
      clearTimeout(captionLeaveTimer);
      captionLeaveTimer = null;
    }
    captions.forEach(caption => {
      const match = next && caption.dataset.hkCaption === next;
      const wasActive = caption.classList.contains('is-active');
      if (match) {
        caption.classList.remove('is-leaving');
        caption.classList.add('is-active');
        return;
      }
      if (wasActive) {
        caption.classList.remove('is-active');
        caption.classList.add('is-leaving');
      } else {
        caption.classList.remove('is-leaving');
      }
    });
    captionLeaveTimer = setTimeout(() => {
      captions.forEach(caption => {
        if (!caption.classList.contains('is-active')) caption.classList.remove('is-leaving');
      });
      captionLeaveTimer = null;
    }, reduced.matches ? 200 : 560);
    activeCaption = next;
  }

  function captionForProgress(progress) {
    if (progress < captionAt.choose) return 'intro';
    if (progress < captionAt.tap) return 'choose';
    if (progress < captionAt.listen) return 'tap';
    return 'listen';
  }

  function schedule() {
    if (pending === null) pending = requestAnimationFrame(update);
  }

  function fittedSize(layer) {
    const media = layer.matches?.('img') ? layer : layer.querySelector('img');
    if (!media) return { width: Math.max(layer.clientWidth, 1), height: Math.max(layer.clientHeight, 1) };
    const ratio = (media.naturalWidth || Number(media.getAttribute('width')) || 1) /
      (media.naturalHeight || Number(media.getAttribute('height')) || 1);
    const width = Math.max(1, Math.min(layer.clientWidth || 160, (layer.clientHeight || 160) * ratio));
    return { width, height: width / ratio };
  }

  function rebuild() {
    if (pending !== null) cancelAnimationFrame(pending);
    pending = null;
    animations.forEach(animation => animation.cancel());
    koelAnimations.forEach(animation => animation.cancel());
    animations = [];
    koelAnimations = [];
    clearKoelInline();
    releaseKoelInteraction();
    story.classList.remove('is-scroll-story', 'is-koel-docked', 'is-story-theater', 'is-story-exit');
    const stageReset = story.querySelector('[data-hk-story-stage]');
    if (stageReset) stageReset.style.transform = '';
    setActiveCaption(null);
    previous = '';
    scrollOwnsKoels = true;
    const openingOffset = Math.max(0, story.getBoundingClientRect().top + window.scrollY);
    story.style.setProperty('--hk-opening-offset', `${openingOffset}px`);
    if (reduced.matches || window.innerHeight < 560) return;
    story.classList.add('is-scroll-story');
    const top = story.getBoundingClientRect().top;
    const panelStarts = panels.map(panel => panel.getBoundingClientRect().top - top);
    const lastPanel = panels.at(-1);
    const lastBox = typeof lastPanel?.getBoundingClientRect === 'function' ? lastPanel.getBoundingClientRect() : null;
    // Progress must run through the listen spacer, not stop when it begins —
    // otherwise the third caption never gets a real scroll beat.
    const listenSpan = Math.max(
      window.innerHeight * 0.85,
      (lastBox && Number.isFinite(lastBox.bottom) ? lastBox.bottom - top : panelStarts.at(-1)) - panelStarts.at(-1)
    );
    const progressEnd = panelStarts.at(-1) + listenSpan;
    starts = [panelStarts[0], progressEnd];
    const range = progressEnd - panelStarts[0];
    if (range <= 0 || panelStarts.length < 4) return;
    const stop = index => clamp((panelStarts[index] - panelStarts[0]) / range);
    const chooseAt = stop(1);
    const tapAt = stop(2);
    const listenAt = stop(3);
    captionAt = { choose: chooseAt, tap: tapAt, listen: listenAt };
    // Player recenters by choose; stays put for equal choose / tap / listen beats.
    offsets = [0, chooseAt * 0.55, chooseAt, tapAt, listenAt];
    dockAt = tapAt;
    mobile = narrow.matches;
    const playerImage = story.querySelector('[data-hk-story-layer="player"]');
    koelLayers = [...story.querySelectorAll('[data-hk-koel]')];
    if (!playerImage || !koelLayers.length) return;
    activeDock = Math.min(activeDock, koelLayers.length - 1);

    const heroCopy = story.querySelector('[data-hk-hero-copy]');
    const stageEl = story.querySelector('[data-hk-story-stage]');
    const copyRect = typeof heroCopy?.getBoundingClientRect === 'function' ? heroCopy.getBoundingClientRect() : null;
    const stageRect = typeof stageEl?.getBoundingClientRect === 'function' ? stageEl.getBoundingClientRect() : null;
    const stageH = Math.round(stageRect?.height || window.innerHeight);
    // One volumetric Player size for hero + theater — fill the stage column,
    // not the short hero-copy block (that left the layout looking empty).
    const captionBand = mobile ? 150 : 180;
    const playerBox = Math.max(
      mobile ? 320 : 420,
      Math.round(Math.min(stageH * (mobile ? 0.72 : 0.84), stageH - captionBand))
    );
    story.style.setProperty('--hk-player-box', `${playerBox}px`);
    story.style.setProperty('--hk-caption-band', `${captionBand}px`);

    const playerSize = fittedSize(playerImage);
    const artworkWidth = Number(koelLayers[0].dataset.hkArtworkWidth || 0.78);
    const playerScale = 1;
    // Keep theater captions under the taller Player without starving volume.
    const centeredPlayer = [0, mobile ? -0.18 : -0.14, playerScale, mobile ? -4 : -5];
    let introY = mobile ? -0.04 : 0;
    if (copyRect && stageRect && stageRect.height > 0) {
      const copyMid = (copyRect.top + copyRect.bottom) / 2;
      const stageMid = (stageRect.top + stageRect.bottom) / 2;
      introY = (copyMid - stageMid) / window.innerHeight;
    }
    const anchorX = Number(playerImage.dataset.hkDockX || 0.5);
    const anchorY = Number(playerImage.dataset.hkDockY || 0.32);
    const plateWidth = Number(playerImage.dataset.hkDockWidth || 0.44);
    const viewer = playerImage.querySelector?.('[data-hk-product-model]');
    const modelReady = viewer?.parentElement?.classList.contains('is-model-ready');
    const center = modelReady && viewer.queryHotspot?.('hotspot-dock')?.canvasPosition;
    const left = modelReady && viewer.queryHotspot?.('hotspot-dock-left')?.canvasPosition;
    const right = modelReady && viewer.queryHotspot?.('hotspot-dock-right')?.canvasPosition;
    const projected = [center?.x, center?.y, left?.x, left?.y, right?.x, right?.y].every(Number.isFinite);
    const plateX = projected ? center.x - playerImage.clientWidth / 2 : (anchorX - 0.5) * playerSize.width;
    const plateY = projected ? center.y - playerImage.clientHeight / 2 : (anchorY - 0.5) * playerSize.height;
    const platePixels = projected ? Math.hypot(right.x - left.x, right.y - left.y) : playerSize.width * plateWidth;
    // Diameter ≈ 70% of the visible speaker body width (not the full CSS box).
    const playerCssWidth = playerBox;
    const speakerBodyWidth = playerCssWidth * 0.48;
    const koelTarget = Math.max(110, Math.round(speakerBodyWidth * 0.7));
    story.style.setProperty('--hk-koel-box', `${koelTarget}px`);
    koelLayers.forEach(layer => {
      layer.style.width = `${koelTarget}px`;
      layer.style.height = `${koelTarget}px`;
    });
    // Floating poses use scale 1 so CSS/inline size is the visual diameter.
    // Docked scale shrinks that same box onto the plate.
    let dockScale = platePixels * centeredPlayer[2] / (koelTarget * artworkWidth);
    if (!Number.isFinite(dockScale) || dockScale <= 0) dockScale = 0.45;
    dockScale = clamp(dockScale, 0.28, 0.95);
    dockPose = [
      centeredPlayer[0] + plateX * centeredPlayer[2] / window.innerWidth,
      centeredPlayer[1] + plateY * centeredPlayer[2] / window.innerHeight,
      dockScale,
      0,
      66
    ];

    const float = (x, y, rotation, tilt, depth = 1) => [x, y, depth, rotation, tilt];
    homePoses = mobile
      ? [
          float(0.3, 0.12, -8, 28, 1),
          float(0.34, 0.0, 6, 26, 0.98),
          float(0.32, -0.12, -4, 30, 0.96),
          float(0.36, -0.22, 10, 24, 0.94)
        ]
      : [
          float(0.3, 0.14, -10, 30, 1),
          float(0.34, 0.02, 8, 28, 0.98),
          float(0.32, -0.1, -6, 32, 0.96),
          float(0.36, -0.2, 12, 26, 0.94)
        ];

    const introPlayer = mobile
      ? [0, introY, playerScale, -6]
      : [0.12, introY, playerScale, -6];
    const midPlayer = [
      introPlayer[0] + (centeredPlayer[0] - introPlayer[0]) * 0.65,
      introPlayer[1] + (centeredPlayer[1] - introPlayer[1]) * 0.65,
      playerScale,
      introPlayer[3] + (centeredPlayer[3] - introPlayer[3]) * 0.65
    ];
    const player = [introPlayer, midPlayer, centeredPlayer, centeredPlayer, centeredPlayer];
    const shadowDrop = mobile ? 0.14 : 0.18;
    track(animations, playerImage, player.map((values, i) => ({
      offset: offsets[i],
      transform: pose(...values),
      opacity: 1
    })));
    track(animations, story.querySelector('[data-hk-story-layer="shadow"]'), player.map((values, i) => ({
      offset: offsets[i],
      transform: pose(values[0], values[1] + shadowDrop, values[2] * 0.92),
      opacity: 0.65
    })));

    buildKoelAnimations();
    update();
  }

  function bindKoelControls() {
    story.querySelectorAll('[data-hk-koel]').forEach(layer => {
      if (layer.dataset.hkKoelBound) return;
      layer.dataset.hkKoelBound = '1';
      const shell = layer.querySelector('[data-hk-koel-hover]');
      let frame = null;
      const activate = () => {
        const index = Number(layer.dataset.hkKoel);
        if (Number.isFinite(index)) selectDock(index);
      };
      layer.addEventListener('click', activate);
      layer.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          activate();
        }
      });
      if (!shell) return;
      shell.addEventListener('pointermove', event => {
        if (reduced.matches || !fineHover.matches || !story.classList.contains('is-koel-docked')) return;
        if (layer.classList.contains('is-docked')) return;
        const box = shell.getBoundingClientRect();
        const x = clamp((event.clientX - box.left) / box.width * 2 - 1, -1, 1);
        const y = clamp((event.clientY - box.top) / box.height * 2 - 1, -1, 1);
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          // Parent tilt; the coin layer owns idle drift and hover flip.
          shell.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 8}deg) translate3d(0, -0.2rem, 0.15rem)`;
        });
      });
      shell.addEventListener('pointerleave', () => {
        if (frame) cancelAnimationFrame(frame);
        shell.style.transform = '';
      });
    });
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', rebuild);
  reduced.addEventListener('change', rebuild);
  story.addEventListener('hk:model-layout', rebuild);
  document.fonts?.ready.then(rebuild);
  story.querySelectorAll('[data-hk-product-image]').forEach(image => image.addEventListener('load', rebuild));
  bindKoelControls();
  rebuild();
}
