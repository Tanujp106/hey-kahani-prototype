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

  const strip = document.querySelector(".hk-strip");
  const stripItems = strip ? Array.from(strip.querySelectorAll(".hk-strip__usps > li")) : [];
  if (strip && stripItems.length) {
    const waveSegs = [
      [[0, 27], [102, 45], [203, 49], [395, 29]],
      [[395, 29], [587, 9], [691, 7], [926, 28]],
      [[926, 28], [1114, 45], [1253, 45], [1440, 19]]
    ];
    const bez = (p0, p1, p2, p3, t) => {
      const m = 1 - t;
      return m * m * m * p0 + 3 * m * m * t * p1 + 3 * m * t * t * p2 + t * t * t * p3;
    };
    const waveY = (x) => {
      const seg = waveSegs.find((points) => x <= points[3][0]) || waveSegs[waveSegs.length - 1];
      const [p0, p1, p2, p3] = seg;
      let lo = 0;
      let hi = 1;
      for (let i = 0; i < 24; i += 1) {
        const mid = (lo + hi) / 2;
        if (bez(p0[0], p1[0], p2[0], p3[0], mid) < x) lo = mid;
        else hi = mid;
      }
      return bez(p0[1], p1[1], p2[1], p3[1], (lo + hi) / 2);
    };
    const placeStripItems = () => {
      const narrow = window.matchMedia("(max-width: 720px)").matches;
      stripItems.forEach((item) => {
        item.style.transform = "none";
      });
      if (narrow) return;
      const bounds = strip.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const wave = parseFloat(getComputedStyle(strip).getPropertyValue("--hk-wave")) || 0;
      const boxes = stripItems.map((item) => item.getBoundingClientRect());
      stripItems.forEach((item, index) => {
        const box = boxes[index];
        const x = ((box.left + box.width / 2 - bounds.left) / bounds.width) * 1440;
        const bandCenter = (waveY(x) / 48) * wave + (bounds.height - wave) / 2;
        const itemCenter = box.top + box.height / 2 - bounds.top;
        item.style.transform = `translateY(${(bandCenter - itemCenter).toFixed(2)}px)`;
      });
    };
    placeStripItems();
    window.addEventListener("resize", placeStripItems, { passive: true });
    document.fonts?.ready?.then(placeStripItems);
  }

})();
