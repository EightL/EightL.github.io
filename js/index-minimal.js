// Minimal Index Page Animations
document.addEventListener('DOMContentLoaded', function() {
  const name = document.getElementById('name');
  const infoSection = document.getElementById('info-section');
  const revealMore = document.getElementById('reveal-more');
  const extendedInfo = document.getElementById('extended-info');
  const emailToggle = document.getElementById('email-toggle');
  const emailReveal = document.getElementById('email-reveal');
  
  const projectsSection = document.querySelector('.projects-section');
  const researchSection = document.querySelector('.research-section');
  const contactSection = document.querySelector('.contact-section');
  const progressToggle = document.getElementById('progress-toggle');
  const progressDetails = document.getElementById('progress-details');
  const progressHide = document.getElementById('progress-hide');

  let isInfoRevealed = false;
  let isExtendedRevealed = false;
  let isEmailRevealed = false;

  // Name click - toggle basic info
  if (name && infoSection) {
    name.addEventListener('click', function() {
      if (!isInfoRevealed) {
        name.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          infoSection.classList.add('revealed');
          isInfoRevealed = true;
        }, 200);
      } else {
        infoSection.classList.remove('revealed');
        setTimeout(() => {
          name.style.transform = 'translateY(0)';
          isInfoRevealed = false;
        }, 200);
      }
    });
  }

  // Reveal more/less toggle
  if (revealMore && infoSection && extendedInfo) {
    revealMore.addEventListener('click', function() {
      if (!isExtendedRevealed) {
        infoSection.style.transform = 'translateY(-4px)';
        setTimeout(() => {
          extendedInfo.classList.add('revealed');
          isExtendedRevealed = true;
          revealMore.textContent = 'reveal less';
        }, 200);
      } else {
        extendedInfo.classList.remove('revealed');
        setTimeout(() => {
          infoSection.style.transform = 'translateY(0)';
          isExtendedRevealed = false;
          revealMore.textContent = 'reveal more...';
        }, 200);
      }
    });
  }

  // Email toggle - reveal/hide email
  if (emailToggle && emailReveal && contactSection) {
    emailToggle.addEventListener('click', function() {
      if (!isEmailRevealed) {
        contactSection.style.transform = 'translateY(-5px)';
        setTimeout(() => {
          emailReveal.classList.add('revealed');
          isEmailRevealed = true;
        }, 200);
      } else {
        emailReveal.classList.remove('revealed');
        setTimeout(() => {
          contactSection.style.transform = 'translateY(0)';
          isEmailRevealed = false;
        }, 200);
      }
    });
  }

  // Auto-reveal sections on page load with staggered timing
  const leroSection = document.querySelector('.lero-section');
  if (leroSection) {
    setTimeout(() => {
      leroSection.classList.add('revealed');
    }, 200);
  }

  if (projectsSection) {
    setTimeout(() => {
      projectsSection.classList.add('revealed');
    }, 500);
  }

  if (researchSection) {
    setTimeout(() => {
      researchSection.classList.add('revealed');
    }, 800);
  }

  if (contactSection) {
    setTimeout(() => {
      contactSection.classList.add('revealed');
    }, 1100);
  }

  // Progress details toggle on current page
  if (progressToggle && progressDetails && progressHide) {
    let isProgressRevealed = false;
    progressHide.style.display = 'none';

    progressToggle.addEventListener('click', function() {
      if (!isProgressRevealed) {
        progressToggle.style.display = 'none';
        progressDetails.classList.add('revealed');
        setTimeout(() => {
          progressHide.style.display = 'inline';
        }, 150);
        isProgressRevealed = true;
      }
    });

    progressHide.addEventListener('click', function() {
      if (isProgressRevealed) {
        progressHide.style.display = 'none';
        progressDetails.classList.remove('revealed');
        setTimeout(() => {
          progressToggle.style.display = 'inline';
        }, 200);
        isProgressRevealed = false;
      }
    });
  }

  // LeroCards expand/collapse with lazy iframe loading
  const leroToggle = document.getElementById('lero-toggle');
  const leroTitleToggle = document.getElementById('lero-title-toggle');
  const leroDemoBlock = document.querySelector('.lero-demo-block');
  const leroContainer = document.getElementById('lero-canvas-container');
  const leroPlaceholder = document.getElementById('lero-placeholder');
  const leroIframe = document.getElementById('lero-iframe');
  const leroLinks = document.querySelector('.lero-links');

  if (leroToggle && leroTitleToggle && leroDemoBlock && leroContainer && leroIframe && leroPlaceholder) {
    let isExpanded = false;
    let iframeLoaded = false;
    const EMBED_URL = 'https://www.lerocards.com/embed';

    const loadIframe = () => {
      if (iframeLoaded) return;
      iframeLoaded = true;
      const revealIframe = () => {
        leroPlaceholder.hidden = true;
        leroIframe.classList.add('loaded');
      };
      leroIframe.addEventListener('load', () => {
        revealIframe();
      });
      leroIframe.src = EMBED_URL;
      setTimeout(revealIframe, 1500);
    };

    const scheduleIframePreload = () => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(loadIframe, { timeout: 2000 });
      } else {
        setTimeout(loadIframe, 1200);
      }
    };

    // Listen for resize messages from the embed
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'lero-embed-resize' && event.data.height) {
        const h = Math.min(Math.max(event.data.height, 400), 750);
        if (leroIframe.classList.contains('loaded') && isExpanded) {
          leroIframe.style.height = h + 'px';
          leroContainer.style.maxHeight = h + 'px';
        }
      }
    });

    const centerLeroDemo = () => {
      const rect = leroContainer.getBoundingClientRect();
      const iframeHeight = leroIframe.getBoundingClientRect().height;
      const placeholderHeight = leroPlaceholder.getBoundingClientRect().height;
      const demoHeight = Math.max(iframeHeight, placeholderHeight, rect.height);
      const visibleHeight = Math.min(demoHeight, window.innerHeight * 0.86);
      const targetY = window.scrollY + rect.top - ((window.innerHeight - visibleHeight) / 2);

      window.scrollTo({
        top: Math.max(0, targetY),
        behavior: 'smooth'
      });
    };

    const expandLeroDemo = () => {
      if (isExpanded) return;

      leroContainer.classList.add('expanded');
      leroDemoBlock.classList.add('expanded');
      if (leroLinks) leroLinks.classList.add('visible');
      leroToggle.classList.add('hidden');
      leroTitleToggle.classList.add('expanded');
      leroTitleToggle.disabled = false;
      if (!iframeLoaded) {
        setTimeout(loadIframe, 150);
      }
      isExpanded = true;
      setTimeout(centerLeroDemo, 120);
    };

    const collapseLeroDemo = () => {
      if (!isExpanded) return;

      leroContainer.classList.remove('expanded');
      leroDemoBlock.classList.remove('expanded');
      leroContainer.style.maxHeight = '';
      leroIframe.style.height = '';
      if (leroLinks) leroLinks.classList.remove('visible');
      leroToggle.classList.remove('hidden');
      leroTitleToggle.classList.remove('expanded');
      leroTitleToggle.disabled = true;
      isExpanded = false;
    };

    leroToggle.addEventListener('click', expandLeroDemo);

    leroTitleToggle.addEventListener('click', () => {
      if (isExpanded) collapseLeroDemo();
    });

    scheduleIframePreload();
  }

  // Video carousel on current page
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const carouselVideo = document.getElementById('carousel-video');

  if (prevBtn && nextBtn && carouselVideo) {
    const videos = [
      'assets/CoalitionGrid.mp4',
      'assets/FourStepBackupDiagrams.mp4',
      'assets/MarkovProperty.mp4',
      'assets/SarsaDiagram.mp4',
      'assets/ValuePolicyBackupTweak.mp4'
    ];

    let currentIndex = 0;

    const updateVideo = () => {
      carouselVideo.src = videos[currentIndex];
    };

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + videos.length) % videos.length;
      updateVideo();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % videos.length;
      updateVideo();
    });
  }
});
