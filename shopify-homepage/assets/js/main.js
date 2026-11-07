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

  const dialogTitle = koelDialog?.querySelector("[data-hk-koel-title]");
  const dialogMeta = koelDialog?.querySelector("[data-hk-koel-meta]");
  const dialogImage = koelDialog?.querySelector("[data-hk-koel-image]");
  const dialogAdd = koelDialog?.querySelector("[data-hk-koel-dialog-add]");

  /** @type {{ title: string, meta: string, image: string }[]} */
  const bagItems = [];
  let activeKoel = null;

  const readKoel = (card) => ({
    title: card?.dataset.title || "Koel",
    meta: card?.dataset.meta || "",
    image: card?.dataset.image || "",
  });

  const updateBagChrome = () => {
    const count = bagItems.length;
    bagCountEls.forEach((el) => {
      el.textContent = String(count);
    });
    document.querySelectorAll("[data-hk-open-bag]").forEach((btn) => {
      btn.setAttribute("aria-label", `Open bag, ${count} item${count === 1 ? "" : "s"}`);
    });

    if (!bagEmpty || !bagList) return;
    const empty = count === 0;
    bagEmpty.hidden = !empty;
    bagList.hidden = empty;
    bagList.replaceChildren();
    bagItems.forEach((item) => {
      const li = document.createElement("li");
      li.className = "hk-bag-list__item";
      li.innerHTML = `<img src="${item.image}" width="48" height="48" alt=""><div><strong></strong><span></span></div>`;
      li.querySelector("strong").textContent = item.title;
      li.querySelector("span").textContent = item.meta;
      bagList.appendChild(li);
    });
  };

  const addKoelToBag = (koel, trigger) => {
    if (!koel?.title) return;
    bagItems.push(koel);
    updateBagChrome();
    if (trigger) {
      trigger.classList.add("is-added");
      trigger.textContent = "Added";
      window.setTimeout(() => {
        trigger.classList.remove("is-added");
        trigger.textContent = "Add to bag";
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
    card.querySelectorAll("[data-hk-koel-preview]").forEach((btn) => {
      btn.addEventListener("click", () => openKoelPreview(card));
    });
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

      const close = ({ instant = false } = {}) => {
        if (!details.open && !details.classList.contains("is-closing")) {
          return Promise.resolve();
        }

        if (instant || reduceMotion) {
          stopWaiting();
          details.classList.remove("is-closing");
          setExpanded(false);
          panel.style.height = "0px";
          animating = false;
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          animating = true;
          details.classList.add("is-closing");
          panel.style.height = `${content.scrollHeight}px`;
          panel.offsetHeight;
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
          panel.style.height = "auto";
          animating = false;
          return Promise.resolve();
        }

        return new Promise((resolve) => {
          animating = true;
          setExpanded(true);
          panel.style.height = "0px";
          panel.offsetHeight;
          panel.style.height = `${content.scrollHeight}px`;
          afterHeight(() => {
            panel.style.height = "auto";
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
