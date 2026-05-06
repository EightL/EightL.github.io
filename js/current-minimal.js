document.addEventListener('DOMContentLoaded', () => {
  // ---------- Chapter heading toggles its section (smooth unroll) ----------
  document.querySelectorAll('.ch > h2').forEach((heading) => {
    const chapter = heading.parentElement;
    const body = chapter.querySelector('.t-body');
    if (!body) return;

    heading.addEventListener('click', () => {
      const isOpen = chapter.classList.contains('open');

      if (isOpen) {
        // Closing: lock current height, then collapse to 0 on next frame
        body.style.maxHeight = body.scrollHeight + 'px';
        requestAnimationFrame(() => {
          body.style.maxHeight = '0px';
          chapter.classList.remove('open');
        });
      } else {
        // Opening: animate to measured content height, then release to auto
        chapter.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        const onEnd = (e) => {
          if (e.propertyName !== 'max-height') return;
          if (chapter.classList.contains('open')) {
            body.style.maxHeight = 'none';
          }
          body.removeEventListener('transitionend', onEnd);
        };
        body.addEventListener('transitionend', onEnd);
      }
    });
  });

  // ---------- Policy selector ----------
  const policyData = {
    survival: {
      blurb: "The most structured policy. Knights absorb pressure up front, archers fire from behind. Highest formation score and role separation in the set, lowest unsupported archer exposure. Picks fights rather than maximizing attack volume — and lasts the longest.",
      stats: "701.1 ± 6.0 steps · formation 0.974 · −451 steps when a knight is removed",
    },
    shared: {
      blurb: "Low clustering, high formation, highest knight close-commit rate. Archers shoot from the back while knights press aggressively near the top. Different style from Coalition but similar performance — and the most architecture-robust of all seven.",
      stats: "608.8 ± 63.6 steps · knight close-commit 0.153 · clustering 0.177",
    },
    coalition: {
      blurb: "The most compact policy. Highest clustering, lowest role separation, and by far the longest coalition lifetime median (51.7 steps). Agents stick together persistently — density and temporal cohesion as a strategy.",
      stats: "583.3 ± 22.7 steps · clustering 0.593 · coalition lifetime 51.7 steps",
    },
    baseline: {
      blurb: "Only base kill rewards. Any coordination that shows up here comes from environment structure, not incentives. Behaves near-identically to Zero-Sum — the cooperative task absorbs the competitive signal.",
      stats: "556.3 ± 28.2 steps · formation 0.841 · focus fire 0.042",
    },
    egalitarian: {
      blurb: "Achieves its design goal — lowest late-episode Gini coefficient by a wide margin — but forced equalization leaves archers idle rather than firing from protected positions. Breaks the durable role structure the stronger policies rely on.",
      stats: "552.8 ± 31.9 steps · Gini 0.033 · archer survival 0.611",
    },
    zerosum: {
      blurb: "Competitive reward transfer — killer gains, others lose — yet results near-indistinguishable from Baseline. The cooperative pressure of the environment neutralizes the competitive component.",
      stats: "534.4 ± 81.3 steps · focus fire 0.039 · −4 steps when an archer is removed",
    },
    territorial: {
      blurb: "Archers own the left half, knights the right. The split is initially followed, but shielded zombies spawn across the full arena, so knights cross the border. The formation spirals into confusion — highest focus fire, shortest episodes.",
      stats: "431.7 ± 62.7 steps · focus fire 0.132 · knight survival 0.756",
    },
  };

  const blurbEl = document.getElementById('policy-blurb');
  const statsEl = document.getElementById('policy-stats');
  const pTabs = document.querySelectorAll('.p-tab');

  const renderPolicy = (key) => {
    const data = policyData[key];
    if (!data || !blurbEl || !statsEl) return;
    blurbEl.textContent = data.blurb;
    statsEl.textContent = data.stats;
  };

  pTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      pTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      renderPolicy(tab.dataset.policy);
    });
  });

  if (pTabs.length) renderPolicy(pTabs[0].dataset.policy);

  // ---------- Result chart tabs ----------
  const resultData = {
    final: {
      src: 'assets/thesis_figures/2.png',
      cap: 'Final deterministic evaluation — 12 metrics, 7 policies, 5 seeds each. Bars = mean, error bars = std.',
    },
    training: {
      src: 'assets/thesis_figures/3.png',
      cap: 'Coordination metrics during training. Points are 200-episode means from checkpoints every 25 updates. Regimes separate early and stay separated.',
    },
    vision: {
      src: 'assets/thesis_figures/0.png',
      cap: 'Limited (400 px) vs unlimited vision. Five of seven policies prefer limited vision — more information often just adds noise.',
    },
    param: {
      src: 'assets/thesis_figures/1.png',
      cap: 'Type-shared (TS), non-shared (SEP), fully shared (SH). Type-shared wins for every policy.',
    },
  };

  const resultImg = document.getElementById('result-img');
  const resultCap = document.getElementById('result-cap');
  const rTabs = document.querySelectorAll('.r-tab');

  rTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      rTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      const data = resultData[tab.dataset.result];
      if (!data) return;
      resultImg.src = data.src;
      resultCap.textContent = data.cap;
    });
  });
});
