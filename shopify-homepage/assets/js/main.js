(() => {
  const menuBtn = document.querySelector("[data-hk-menu]");
  const drawer = document.querySelector("[data-hk-drawer]");
  const bagBtn = document.querySelectorAll("[data-hk-open-bag]");
  const searchBtn = document.querySelectorAll("[data-hk-open-search]");
  const accountBtn = document.querySelectorAll("[data-hk-open-account]");
  const bagDialog = document.querySelector("#bag-dialog");
  const searchDialog = document.querySelector("#search-dialog");
  const accountDialog = document.querySelector("#account-dialog");
  const koelDialog = document.querySelector("#koel-dialog");
  const koelCards = document.querySelectorAll("[data-hk-koel]");
  const closeButtons = document.querySelectorAll("[data-hk-close-dialog]");
  const searchInput = document.querySelector("[data-hk-search-input]");
  const bagCountEls = document.querySelectorAll(".hk-nav__bag-count");
  const bagEmpty = bagDialog?.querySelector("[data-hk-bag-empty]");
  const bagList = bagDialog?.querySelector("[data-hk-bag-list]");
  const bagFoot = bagDialog?.querySelector("[data-hk-bag-foot]");
  const bagTotal = bagDialog?.querySelector("[data-hk-bag-total]");
  const accountForm = accountDialog?.querySelector("[data-hk-account-form]");

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

  accountForm?.addEventListener("submit", (event) => {
    event.preventDefault();
  });

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

  accountBtn.forEach((btn) => {
    btn.addEventListener("click", () => accountDialog?.showModal());
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

  const howRoot = document.querySelector("[data-hk-how]");
  if (howRoot) {
    const steps = Array.from(howRoot.querySelectorAll("[data-hk-how-step]"));
    const panels = Array.from(howRoot.querySelectorAll("[data-hk-how-panel]"));
    const stepList = howRoot.querySelector(".hk-how__steps");
    const copy = howRoot.querySelector(".hk-how__copy");

    // Equal reveal heights keep the space transferred between steps constant.
    const sizeStepDetails = () => {
      const detailHeight = Math.ceil(Math.max(...steps.map((step) =>
        step.querySelector(".hk-how__step-text").scrollHeight
      )));
      howRoot.style.setProperty("--hk-how-detail-height", `${detailHeight}px`);

      // Reserve the full list even when rapid clicks interrupt the transitions.
      const titleHeight = steps.reduce((height, step) => height +
        step.getBoundingClientRect().height -
        step.querySelector(".hk-how__step-reveal").getBoundingClientRect().height,
      0);
      const gap = parseFloat(getComputedStyle(stepList).rowGap) || 0;
      stepList.style.minHeight = `${Math.ceil(titleHeight + detailHeight + gap * (steps.length - 1))}px`;
    };

    sizeStepDetails();
    if (typeof ResizeObserver !== "undefined") {
      let previousWidth;
      const observer = new ResizeObserver(([entry]) => {
        if (entry.contentRect.width === previousWidth) return;
        previousWidth = entry.contentRect.width;
        sizeStepDetails();
      });
      observer.observe(copy);
    } else {
      window.addEventListener("resize", sizeStepDetails);
    }
    document.fonts?.ready.then(sizeStepDetails);

    const activate = (id) => {
      steps.forEach((step) => {
        const active = step.dataset.hkHowStep === id;
        step.classList.toggle("is-active", active);
        step.setAttribute("aria-selected", active ? "true" : "false");
        step.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel.dataset.hkHowPanel === id;
        panel.classList.toggle("is-active", active);
        panel.setAttribute("aria-hidden", active ? "false" : "true");
      });
    };

    steps.forEach((step) => {
      step.addEventListener("click", () => activate(step.dataset.hkHowStep));
      step.addEventListener("keydown", (event) => {
        const index = steps.indexOf(step);
        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
          event.preventDefault();
          const next = steps[(index + 1) % steps.length];
          next.focus();
          activate(next.dataset.hkHowStep);
        }
        if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
          event.preventDefault();
          const prev = steps[(index - 1 + steps.length) % steps.length];
          prev.focus();
          activate(prev.dataset.hkHowStep);
        }
      });
    });
  }

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
})();
