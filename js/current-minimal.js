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
      blurb: "Survival produces the most structured regime. Knights absorb pressure in front while archers stay behind them. It has the highest formation score and role separation, and the lowest unsupported archer exposure. This suggests that the policy learns to preserve roles instead of maximizing attack volume.",
      stats: "701.1 ± 6.0 steps · formation 0.974 · −451 steps when a knight is removed",
    },
    shared: {
      blurb: "Shared Reward produces low clustering, high formation, and the highest knight close-commit rate. Archers shoot from the back while knights press near the top. The style is different from Coalition, but performance is similar, therefore reward sharing does not imply one fixed spatial structure.",
      stats: "608.8 ± 63.6 steps · knight close-commit 0.153 · clustering 0.177",
    },
    coalition: {
      blurb: "Coalition produces the most compact policy. It has the highest clustering, lowest role separation, and by far the longest coalition lifetime median. Agents stay together persistently, so spatial density and temporal cohesion become the main behavior.",
      stats: "583.3 ± 22.7 steps · clustering 0.593 · coalition lifetime 51.7 steps",
    },
    baseline: {
      blurb: "Baseline uses only base kill rewards. Any coordination that appears here therefore comes from environment structure, not explicit incentives. It behaves almost the same as Zero-Sum, which suggests that the cooperative pressure of the task absorbs the competitive signal.",
      stats: "556.3 ± 28.2 steps · formation 0.841 · focus fire 0.042",
    },
    egalitarian: {
      blurb: "Egalitarian achieves its design goal by producing the lowest late-episode Gini coefficient. However, forced equalization also leaves archers idle instead of firing from protected positions. This breaks the durable role structure used by stronger policies.",
      stats: "552.8 ± 31.9 steps · Gini 0.033 · archer survival 0.611",
    },
    zerosum: {
      blurb: "Zero-Sum gives reward to the killer and penalty to the other agents. This should create competition, but the results are almost indistinguishable from Baseline. The environment mechanics seem to neutralize the competitive component.",
      stats: "534.4 ± 81.3 steps · focus fire 0.039 · −4 steps when an archer is removed",
    },
    territorial: {
      blurb: "Territorial assigns archers to the left half and knights to the right half. The split is followed at first, but shielded zombies spawn across the full arena, so knights must cross the border. The intended spatial rule conflicts with the environment mechanics.",
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
      cap: 'Final deterministic evaluation: 12 metrics, 7 policies, 5 seeds each. Bars = mean, error bars = std.',
    },
    training: {
      src: 'assets/thesis_figures/3.png',
      cap: 'Coordination metrics during training. Points are 200-episode means from checkpoints every 25 updates. Regimes separate early and stay separated.',
    },
    vision: {
      src: 'assets/thesis_figures/0.png',
      cap: 'Limited (400 px) vs unlimited vision. Five of seven policies perform better with limited vision, therefore more information is not always better.',
    },
    param: {
      src: 'assets/thesis_figures/1.png',
      cap: 'Type-shared (TS), non-shared (SEP), fully shared (SH). Type-shared parameters perform best for every reward scheme.',
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
