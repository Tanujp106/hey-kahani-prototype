(() => {
  const menuBtn = document.querySelector("[data-hk-menu]");
  const drawer = document.querySelector("[data-hk-drawer]");
  const bagBtn = document.querySelectorAll("[data-hk-open-bag]");
  const searchBtn = document.querySelectorAll("[data-hk-open-search]");
  const bagDialog = document.querySelector("#bag-dialog");
  const searchDialog = document.querySelector("#search-dialog");
  const koelDialog = document.querySelector("#koel-dialog");
  const koelCards = document.querySelectorAll("[data-hk-koel]");
  const closeButtons = document.querySelectorAll("[data-hk-close-dialog]");
  const searchInput = document.querySelector("[data-hk-search-input]");
  const bagCountEls = document.querySelectorAll(".hk-nav__bag-count");
  const bagEmpty = bagDialog?.querySelector("[data-hk-bag-empty]");
  const bagList = bagDialog?.querySelector("[data-hk-bag-list]");
  const bagFoot = bagDialog?.querySelector("[data-hk-bag-foot]");
  const bagTotal = bagDialog?.querySelector("[data-hk-bag-total]");

  const dialogTitle = koelDialog?.querySelector("[data-hk-koel-title]");
  const dialogMeta = koelDialog?.querySelector("[data-hk-koel-meta]");
  const dialogImage = koelDialog?.querySelector("[data-hk-koel-image]");
  const dialogAdd = koelDialog?.querySelector("[data-hk-koel-dialog-add]");

  /** @type {{ key: string, title: string, meta: string, image: string, price: number, qty: number }[]} */
  const bagItems = [];
  let activeKoel = null;

  const parsePrice = (value) => {
    const amount = Number.parseFloat(String(value || "").replace(/[^0-9.]/g, ""));
    return Number.isFinite(amount) ? amount : 0;
  };

  const formatPrice = (amount) => `$${amount.toFixed(2)}`;

  const readKoel = (card) => {
    const priceEl = card?.querySelector?.("[data-hk-koel-price]");
    const priceLabel = priceEl?.textContent?.trim() || "$0.00";
    const title = card?.dataset?.title || "Koel";
    const image = card?.dataset?.image || "";
    return {
      key: `${title}::${image}`,
      title,
      meta: card?.dataset?.meta || "",
      image,
      price: parsePrice(priceLabel),
    };
  };

  const bagUnitCount = () => bagItems.reduce((sum, item) => sum + item.qty, 0);

  const bagSubtotal = () =>
    bagItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const updateBagChrome = () => {
    const count = bagUnitCount();
    bagCountEls.forEach((el) => {
      el.textContent = String(count);
    });
    document.querySelectorAll("[data-hk-open-bag]").forEach((btn) => {
      btn.setAttribute("aria-label", `Open bag, ${count} item${count === 1 ? "" : "s"}`);
    });

    if (!bagEmpty || !bagList) return;
    const empty = bagItems.length === 0;
    bagEmpty.hidden = !empty;
    bagList.hidden = empty;
    if (bagFoot) bagFoot.hidden = empty;
    if (bagTotal) bagTotal.textContent = formatPrice(bagSubtotal());

    bagList.replaceChildren();
    bagItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "hk-bag-list__item";
      li.innerHTML = `
        <img src="" width="72" height="72" alt="">
        <div class="hk-bag-list__copy">
          <strong></strong>
          <span class="hk-bag-list__meta"></span>
          <div class="hk-bag-list__row">
            <div class="hk-bag-list__qty" role="group" aria-label="Quantity">
              <button type="button" data-hk-bag-qty="-1" aria-label="Decrease quantity">−</button>
              <span data-hk-bag-qty-value></span>
              <button type="button" data-hk-bag-qty="1" aria-label="Increase quantity">+</button>
            </div>
            <span class="hk-bag-list__price"></span>
            <button type="button" class="hk-bag-list__remove" data-hk-bag-remove aria-label="Remove from bag">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M9 7V5h6v2m-7 3v8m4-8v8m4-8v8M6 7l1 13h10l1-13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>`;
      const img = li.querySelector("img");
      img.src = item.image;
      img.alt = "";
      li.querySelector("strong").textContent = item.title;
      li.querySelector(".hk-bag-list__meta").textContent = item.meta;
      li.querySelector("[data-hk-bag-qty-value]").textContent = String(item.qty);
      li.querySelector(".hk-bag-list__price").textContent = formatPrice(item.price * item.qty);
      li.querySelectorAll("[data-hk-bag-qty]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const delta = Number(btn.getAttribute("data-hk-bag-qty")) || 0;
          const next = item.qty + delta;
          if (next <= 0) {
            const at = bagItems.findIndex((entry) => entry.key === item.key);
            if (at >= 0) bagItems.splice(at, 1);
          } else {
            item.qty = next;
          }
          updateBagChrome();
        });
      });
      li.querySelector("[data-hk-bag-remove]")?.addEventListener("click", () => {
        const at = bagItems.findIndex((entry) => entry.key === item.key);
        if (at >= 0) bagItems.splice(at, 1);
        updateBagChrome();
      });
      bagList.appendChild(li);
    });
  };

  const koelBagIcon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8zm3-3a3 3 0 0 1 6 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const koelBagCheckIcon =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.5 12.5 10 17l8.5-9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  const bagSnackbar = document.querySelector("[data-hk-snackbar]");
  const bagSnackbarMessage = bagSnackbar?.querySelector("[data-hk-snackbar-message]");
  let bagSnackbarTimer;

  const showBagConfirmation = (title) => {
    if (!bagSnackbar || !bagSnackbarMessage) return;
    window.clearTimeout(bagSnackbarTimer);
    bagSnackbarMessage.textContent = `${title} added to bag`;
    bagSnackbar.classList.add("is-visible");
    bagSnackbarTimer = window.setTimeout(() => {
      bagSnackbar.classList.remove("is-visible");
      bagSnackbarMessage.textContent = "";
    }, 3500);
  };

  const addKoelToBag = (koel, trigger) => {
    if (!koel?.title) return;
    const existing = bagItems.find((item) => item.key === koel.key);
    if (existing) existing.qty += 1;
    else bagItems.push({ ...koel, qty: 1 });
    updateBagChrome();
    showBagConfirmation(koel.title);
    if (trigger) {
      trigger.classList.add("is-added");
      trigger.setAttribute("aria-label", "Added to bag");
      trigger.innerHTML = `${koelBagCheckIcon}<span class="hk-koel__add-label">Added to bag</span>`;
      window.setTimeout(() => {
        trigger.classList.remove("is-added");
        trigger.setAttribute("aria-label", "Add to bag");
        trigger.innerHTML = `${koelBagIcon}<span class="hk-koel__add-label">Add to bag</span>`;
      }, 1200);
    }
  };

  const openKoelPreview = (card) => {
    if (!koelDialog || !dialogTitle || !dialogMeta || !dialogImage || !card) return;
    activeKoel = readKoel(card);
    dialogTitle.textContent = activeKoel.title;
    dialogMeta.textContent = activeKoel.meta;
    dialogImage.src = activeKoel.image;
    dialogImage.alt = `${activeKoel.title} artwork`;
    koelDialog.showModal();
  };

  const announcementList = document.querySelector("[data-hk-announcement]");
  const announcementItems = announcementList
    ? Array.from(announcementList.querySelectorAll("li"))
    : [];
  if (announcementItems.length > 1) {
    let announcementIndex = Math.max(
      0,
      announcementItems.findIndex((item) => item.classList.contains("is-active"))
    );
    announcementItems.forEach((item, index) => {
      item.classList.toggle("is-active", index === announcementIndex);
    });
    window.setInterval(() => {
      announcementItems[announcementIndex].classList.remove("is-active");
      announcementIndex = (announcementIndex + 1) % announcementItems.length;
      announcementItems[announcementIndex].classList.add("is-active");
    }, 2500);
  }

  const nav = document.querySelector(".hk-nav");
  const hero = document.querySelector(".hk-hero");
  if (nav && hero) {
    const updateNavSurface = () => {
      nav.classList.toggle("is-scrolled", hero.getBoundingClientRect().bottom <= nav.offsetHeight);
    };
    window.addEventListener("scroll", updateNavSurface, { passive: true });
    window.addEventListener("resize", updateNavSurface);
    updateNavSurface();
  }

  const navFloat = document.querySelector(".hk-nav__float");
  const megaPanel = document.querySelector("[data-hk-mega-panel]");
  const megaTriggers = Array.from(document.querySelectorAll("[data-hk-mega-trigger]"));
  const megaSets = Array.from(document.querySelectorAll("[data-hk-mega-set]"));
  const fineHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const desktopNav = window.matchMedia("(min-width: 900px)");
  let activeMegaKey = "";
  let megaCloseTimer = 0;

  const syncMegaNavSurface = () => {
    if (!nav) return;
    nav.classList.toggle("is-mega-open", Boolean(megaPanel?.classList.contains("is-open")));
  };

  const setMegaFeature = (set, item) => {
    if (!set || !item) return;
    const image = item.getAttribute("data-image") || "";
    const label = item.getAttribute("data-label") || item.textContent.trim();
    const href = item.getAttribute("href") || "#";
    const titleEl = set.querySelector("[data-hk-mega-title]");
    const imageEl = set.querySelector("[data-hk-mega-image]");
    const ctaEl = set.querySelector("[data-hk-mega-cta]");
    if (titleEl) titleEl.textContent = label;
    if (imageEl && image) {
      imageEl.src = image;
      imageEl.alt = label;
    }
    if (ctaEl) ctaEl.setAttribute("href", href);
    set.querySelectorAll("[data-hk-mega-item]").forEach((link) => {
      link.classList.toggle("is-active", link === item);
    });
  };

  const showMegaSet = (key) => {
    megaSets.forEach((set) => {
      const isActive = set.getAttribute("data-hk-mega-set") === key;
      set.classList.toggle("is-active", isActive);
      if (isActive) {
        const active =
          set.querySelector("[data-hk-mega-item].is-active") ||
          set.querySelector("[data-hk-mega-item]");
        setMegaFeature(set, active);
      }
    });
    megaTriggers.forEach((trigger) => {
      const isActive = trigger.getAttribute("data-hk-mega-trigger") === key;
      trigger.classList.toggle("is-active", isActive);
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
    activeMegaKey = key;
  };

  const openMega = (key) => {
    if (!megaPanel || !desktopNav.matches) return;
    showMegaSet(key);
    megaPanel.classList.add("is-open");
    megaPanel.setAttribute("aria-hidden", "false");
    syncMegaNavSurface();
  };

  const closeMega = () => {
    if (!megaPanel) return;
    megaPanel.classList.remove("is-open");
    megaPanel.setAttribute("aria-hidden", "true");
    megaTriggers.forEach((trigger) => {
      trigger.classList.remove("is-active");
      trigger.setAttribute("aria-expanded", "false");
    });
    activeMegaKey = "";
    syncMegaNavSurface();
  };

  const cancelMegaClose = () => {
    window.clearTimeout(megaCloseTimer);
  };

  const scheduleMegaClose = () => {
    cancelMegaClose();
    megaCloseTimer = window.setTimeout(() => closeMega(), 180);
  };

  if (fineHover && megaPanel && navFloat) {
    megaTriggers.forEach((trigger) => {
      const key = trigger.getAttribute("data-hk-mega-trigger");
      trigger.addEventListener("mouseenter", () => {
        if (!desktopNav.matches || !key) return;
        cancelMegaClose();
        openMega(key);
      });
      trigger.addEventListener("focus", () => {
        if (!desktopNav.matches || !key) return;
        cancelMegaClose();
        openMega(key);
      });
    });

    document.querySelectorAll("[data-hk-mega-dismiss]").forEach((link) => {
      link.addEventListener("mouseenter", () => {
        if (!desktopNav.matches) return;
        cancelMegaClose();
        closeMega();
      });
      link.addEventListener("focus", () => {
        if (!desktopNav.matches) return;
        cancelMegaClose();
        closeMega();
      });
    });

    megaPanel.addEventListener("mouseenter", cancelMegaClose);
    navFloat.addEventListener("mouseleave", () => {
      if (!desktopNav.matches) return;
      scheduleMegaClose();
    });

    megaSets.forEach((set) => {
      set.querySelectorAll("[data-hk-mega-item]").forEach((link) => {
        link.addEventListener("mouseenter", () => setMegaFeature(set, link));
        link.addEventListener("focus", () => setMegaFeature(set, link));
      });
    });

    megaPanel.querySelector("[data-hk-mega-close]")?.addEventListener("click", () => {
      const lastTrigger = megaTriggers.find(
        (trigger) => trigger.getAttribute("data-hk-mega-trigger") === activeMegaKey
      );
      closeMega();
      lastTrigger?.focus();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMega();
    });

    desktopNav.addEventListener("change", () => {
      if (!desktopNav.matches) closeMega();
    });
  }

  menuBtn?.addEventListener("click", () => {
    const open = drawer?.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  drawer?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      drawer.classList.remove("is-open");
      menuBtn?.setAttribute("aria-expanded", "false");
    });
  });

  bagBtn.forEach((btn) => {
    btn.addEventListener("click", () => bagDialog?.showModal());
  });

  searchBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      searchDialog?.showModal();
      window.requestAnimationFrame(() => searchInput?.focus());
    });
  });

  koelCards.forEach((card) => {
    card.querySelectorAll("[data-hk-koel-add]").forEach((btn) => {
      btn.addEventListener("click", () => addKoelToBag(readKoel(card), btn));
    });
  });

  dialogAdd?.addEventListener("click", () => {
    addKoelToBag(activeKoel || readKoel(koelCards[0]), dialogAdd);
    koelDialog?.close();
  });

  updateBagChrome();

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      dialog?.close();
    });
  });

  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const faqRoot = document.querySelector("[data-hk-faq]");
  if (faqRoot) {
    const faqItems = Array.from(faqRoot.querySelectorAll("details")).map((details) => {
      const summary = details.querySelector("summary");
      const panel = details.querySelector(".hk-faq__panel");
      const content = details.querySelector(".hk-faq__content");
      if (!summary || !panel || !content) return null;

      let animating = false;
      let endListener = null;
      let fallbackTimer = 0;

      const setExpanded = (open) => {
        details.open = open;
        details.classList.toggle("is-open", open);
        summary.setAttribute("aria-expanded", open ? "true" : "false");
      };

      const stopWaiting = () => {
        if (endListener) {
          panel.removeEventListener("transitionend", endListener);
          endListener = null;
        }
        if (fallbackTimer) {
          window.clearTimeout(fallbackTimer);
          fallbackTimer = 0;
        }
      };

      const afterHeight = (done) => {
        stopWaiting();
        endListener = (event) => {
          if (event.target !== panel || event.propertyName !== "height") return;
          stopWaiting();
          done();
        };
        panel.addEventListener("transitionend", endListener);
        fallbackTimer = window.setTimeout(() => {
          stopWaiting();
          done();
        }, 350);
      };

      // Lock a pixel height with transitions off so auto → px never interpolates.
      const setHeightInstant = (value) => {
        panel.style.transition = "none";
        panel.style.height = value;
        panel.offsetHeight;
        panel.style.transition = "";
      };

      const close = ({ instant = false } = {}) => {
        if (!details.open && !details.classList.contains("is-closing")) {
          return Promise.resolve();
        }

        if (instant || reduceMotion) {
          stopWaiting();
          details.classList.remove("is-closing");
          setExpanded(false);
          setHeightInstant("0px");
          animating = false;
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          animating = true;
          details.classList.add("is-closing");
          setHeightInstant(`${panel.scrollHeight}px`);
          panel.style.height = "0px";
          afterHeight(() => {
            details.classList.remove("is-closing");
            setExpanded(false);
            animating = false;
            resolve();
          });
        });
      };

      const open = () => {
        if (details.open) return Promise.resolve();

        if (reduceMotion) {
          stopWaiting();
          details.classList.remove("is-closing");
          setExpanded(true);
          setHeightInstant("auto");
          animating = false;
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          animating = true;
          setExpanded(true);
          setHeightInstant("0px");
          panel.style.height = `${panel.scrollHeight}px`;
          afterHeight(() => {
            setHeightInstant("auto");
            animating = false;
            resolve();
          });
        });
      };

      setExpanded(false);
      panel.style.height = "0px";

      return { details, summary, close, open, isAnimating: () => animating };
    }).filter(Boolean);

    faqItems.forEach((item) => {
      item.summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (faqItems.some((entry) => entry.isAnimating())) return;

        if (item.details.open) {
          item.close();
          return;
        }

        faqItems
          .filter((entry) => entry !== item)
          .forEach((entry) => entry.close());
        item.open();
      });
    });
  }

  const howRoot = document.querySelector("[data-hk-how]");
  if (howRoot) {
    const howTabs = Array.from(howRoot.querySelectorAll("[data-hk-how-tab]"));
    const howPanels = Array.from(howRoot.querySelectorAll("[data-hk-how-panel]"));
    const howStage = howRoot.querySelector("[data-hk-how-stage]");
    let howIndex = Math.max(
      0,
      howPanels.findIndex((panel) => panel.classList.contains("is-active"))
    );
    let howBusy = false;
    let howLeaveTimer = 0;

    const syncHowHeight = () => {
      if (!howStage) return;
      let max = 0;
      howPanels.forEach((panel) => {
        max = Math.max(max, panel.scrollHeight);
      });
      const active = howPanels[howIndex];
      if (active) max = Math.max(max, active.getBoundingClientRect().height);
      if (max > 0) howStage.style.minHeight = `${Math.ceil(max)}px`;
    };

    const setHowIndex = (nextIndex) => {
      if (!howPanels.length) return;
      const next = ((nextIndex % howPanels.length) + howPanels.length) % howPanels.length;
      if (next === howIndex) return;

      if (howBusy) {
        howPanels.forEach((panel) => panel.classList.remove("is-leaving"));
        howBusy = false;
      }

      const prev = howIndex;
      const wrapNext = prev === howPanels.length - 1 && next === 0;
      const wrapPrev = prev === 0 && next === howPanels.length - 1;
      howRoot.dataset.hkHowDir = wrapPrev || (!wrapNext && next < prev) ? "prev" : "next";

      const leaving = howPanels[prev];
      const entering = howPanels[next];

      howBusy = true;
      howIndex = next;

      howTabs.forEach((tab, i) => {
        const active = i === next;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", active ? "true" : "false");
        tab.tabIndex = active ? 0 : -1;
      });

      howPanels.forEach((panel, i) => {
        const active = i === next;
        panel.querySelectorAll("a, button").forEach((el) => {
          if (active) el.removeAttribute("tabindex");
          else el.setAttribute("tabindex", "-1");
        });
      });

      if (howLeaveTimer) window.clearTimeout(howLeaveTimer);

      leaving.classList.remove("is-active");
      leaving.classList.add("is-leaving");
      leaving.setAttribute("aria-hidden", "true");

      entering.classList.remove("is-leaving");
      entering.classList.add("is-active");
      entering.setAttribute("aria-hidden", "false");

      window.requestAnimationFrame(syncHowHeight);

      const duration = reduceMotion ? 180 : 420;
      howLeaveTimer = window.setTimeout(() => {
        leaving.classList.remove("is-leaving");
        howBusy = false;
        howLeaveTimer = 0;
        syncHowHeight();
      }, duration);
    };

    howTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setHowIndex(Number(tab.dataset.hkHowTab));
      });

      tab.addEventListener("keydown", (event) => {
        const key = event.key;
        if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Home" && key !== "End") {
          return;
        }
        event.preventDefault();
        if (key === "Home") {
          setHowIndex(0);
          howTabs[0]?.focus();
          return;
        }
        if (key === "End") {
          setHowIndex(howPanels.length - 1);
          howTabs[howPanels.length - 1]?.focus();
          return;
        }
        const delta = key === "ArrowRight" ? 1 : -1;
        const target = (howIndex + delta + howPanels.length) % howPanels.length;
        setHowIndex(target);
        howTabs[target]?.focus();
      });
    });

    howPanels.forEach((panel, i) => {
      const active = i === howIndex;
      panel.querySelectorAll("a, button").forEach((el) => {
        if (active) el.removeAttribute("tabindex");
        else el.setAttribute("tabindex", "-1");
      });
    });

    syncHowHeight();
    window.addEventListener("resize", syncHowHeight);
  }

  if (!reduceMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll(".hk-reveal").forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".hk-reveal").forEach((el) => el.classList.add("is-in"));
  }

  const stripTicker = document.querySelector("[data-hk-strip-ticker]");
  const stripList = stripTicker?.querySelector(".hk-strip__usps");
  if (stripTicker && stripList) {
    const stripEdge = stripTicker.parentElement?.querySelector(".hk-strip__edge");
    stripList.querySelectorAll("p").forEach((phrase) => {
      if (phrase.dataset.hkSplit === "true") return;
      const chars = Array.from(phrase.textContent);
      phrase.textContent = "";
      chars.forEach((char) => {
        const glyph = document.createElement("span");
        glyph.className = "hk-strip__glyph";
        glyph.textContent = char === " " ? "\u00a0" : char;
        phrase.appendChild(glyph);
      });
      phrase.dataset.hkSplit = "true";
    });
    stripList.querySelectorAll(".hk-strip__icon").forEach((icon) => {
      icon.classList.add("hk-strip__glyph");
    });
    const stripOriginals = Array.from(stripList.children);
    // The strip edge path, sampled from its cubic curve. x runs left to right.
    const stripCurve = (() => {
      const cubics = [
        [[1440, 19], [1253, 45], [1114, 45], [926, 28]],
        [[926, 28], [691, 7], [587, 9], [395, 29]],
        [[395, 29], [219, 47], [102, 45], [0, 27]],
      ];
      const points = [];
      cubics.forEach(([p0, p1, p2, p3]) => {
        for (let step = 0; step <= 48; step += 1) {
          const t = step / 48;
          const u = 1 - t;
          const mix = (a, b, c, d) => u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
          const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
          const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
          points.push({ x: mix(p0[0], p1[0], p2[0], p3[0]), y: mix(p0[1], p1[1], p2[1], p3[1]), dx, dy });
        }
      });
      points.sort((a, b) => a.x - b.x);
      return points;
    })();
    const stripCurveMean = stripCurve.reduce((sum, point) => sum + point.y, 0) / stripCurve.length;
    const stripSpeed = 34;
    let stripLoop = 0;
    let stripFrame = 0;
    let stripPlaying = false;
    let stripPaused = false;
    let stripSlots = [];
    let stripOrigin = 0;
    let stripWavePx = 48;
    let stripWidth = 1;
    let stripMotion = null;

    const pointOnStrip = (norm) => {
      const x = ((norm % 1) + 1) % 1 * 1440;
      let lo = 0;
      let hi = stripCurve.length - 1;
      while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (stripCurve[mid].x < x) lo = mid + 1;
        else hi = mid;
      }
      const next = stripCurve[Math.min(lo, stripCurve.length - 1)];
      const prev = stripCurve[Math.max(lo - 1, 0)];
      const span = next.x - prev.x || 1;
      const t = Math.min(1, Math.max(0, (x - prev.x) / span));
      return {
        y: prev.y + (next.y - prev.y) * t,
        dx: prev.dx + (next.dx - prev.dx) * t,
        dy: prev.dy + (next.dy - prev.dy) * t,
      };
    };

    const placeStripGlyph = (slot, shift) => {
      const width = stripWidth || 1;
      const center = stripOrigin + slot.left + slot.width / 2 - shift;
      const norm = ((center % width) + width) % width / width;
      const point = pointOnStrip(norm);
      const yPx = ((point.y - stripCurveMean) / 48) * stripWavePx;
      const slope = (point.dy / (point.dx || -1)) * (stripWavePx / 48) * (1440 / width);
      const angle = Math.atan(slope) * (180 / Math.PI);
      slot.el.style.transform = `translate3d(0, ${yPx}px, 0) rotate(${angle}deg)`;
    };

    const rideStrip = () => {
      if (!stripPlaying) return;
      stripFrame = requestAnimationFrame(rideStrip);
      if (!stripMotion || stripPaused || document.hidden || reduceMotion || stripLoop <= 0) return;
      const duration = Number(stripMotion.effect.getTiming().duration) || 1;
      const time = Number(stripMotion.currentTime) || 0;
      const shift = ((time % duration) / duration) * stripLoop;
      stripSlots.forEach((slot) => placeStripGlyph(slot, shift));
    };

    const measureStrip = () => {
      stripOrigin = stripList.offsetLeft;
      stripWidth = stripTicker.clientWidth || 1;
      stripWavePx = stripEdge?.getBoundingClientRect().height || 48;
      stripSlots = Array.from(stripList.querySelectorAll(".hk-strip__glyph")).map((el) => ({
        el,
        left: el.offsetLeft,
        width: el.offsetWidth,
      }));
    };

    const startStripMotion = () => {
      stripMotion?.cancel();
      stripMotion = null;
      if (reduceMotion || stripLoop <= 0) return;
      stripMotion = stripList.animate(
        [
          { transform: "translate3d(0, 0, 0)" },
          { transform: `translate3d(${-stripLoop}px, 0, 0)` },
        ],
        {
          duration: (stripLoop / stripSpeed) * 1000,
          iterations: Infinity,
          easing: "linear",
        }
      );
      if (stripPaused || document.hidden || !stripPlaying) stripMotion.pause();
    };

    const buildStrip = () => {
      stripMotion?.cancel();
      stripMotion = null;
      stripList.querySelectorAll("[data-hk-clone]").forEach((node) => node.remove());
      stripList.style.transform = "";
      if (!reduceMotion && stripOriginals.length) {
        const viewport = stripTicker.clientWidth || 1;
        const setWidth = Math.max(stripList.scrollWidth, 1);
        const copies = Math.max(2, Math.ceil((viewport + setWidth) / setWidth));
        for (let copy = 1; copy < copies; copy += 1) {
          stripOriginals.forEach((item) => {
            const clone = item.cloneNode(true);
            clone.setAttribute("data-hk-clone", "");
            clone.setAttribute("aria-hidden", "true");
            stripList.appendChild(clone);
          });
        }
        const firstClone = stripList.querySelector("[data-hk-clone]");
        const from = stripOriginals[0].getBoundingClientRect().left;
        const to = firstClone ? firstClone.getBoundingClientRect().left : from + setWidth;
        stripLoop = Math.max(1, to - from);
      } else {
        stripLoop = 0;
      }
      measureStrip();
      startStripMotion();
      stripSlots.forEach((slot) => placeStripGlyph(slot, 0));
    };

    const playStrip = () => {
      if (reduceMotion || stripPlaying) return;
      stripPlaying = true;
      if (!stripPaused && !document.hidden) stripMotion?.play();
      stripFrame = requestAnimationFrame(rideStrip);
    };

    const stopStrip = () => {
      stripPlaying = false;
      cancelAnimationFrame(stripFrame);
      stripMotion?.pause();
    };

    stripTicker.addEventListener("pointerenter", () => {
      stripPaused = true;
      stripMotion?.pause();
    });
    stripTicker.addEventListener("pointerleave", () => {
      stripPaused = false;
      if (stripPlaying && !document.hidden) stripMotion?.play();
    });
    document.addEventListener("visibilitychange", () => {
      if (!stripPlaying || stripPaused) return;
      if (document.hidden) stripMotion?.pause();
      else stripMotion?.play();
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
      const stripObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) playStrip();
        else stopStrip();
      });
      stripObserver.observe(stripTicker);
    } else if (!reduceMotion) {
      playStrip();
    }

    let stripResize = 0;
    window.addEventListener("resize", () => {
      cancelAnimationFrame(stripResize);
      stripResize = requestAnimationFrame(() => {
        const wasPlaying = stripPlaying;
        stopStrip();
        buildStrip();
        if (wasPlaying) playStrip();
      });
    });

    buildStrip();
    document.fonts?.ready?.then(() => {
      const wasPlaying = stripPlaying;
      stopStrip();
      buildStrip();
      if (wasPlaying) playStrip();
    });
  }
})();
