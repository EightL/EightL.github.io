document.addEventListener('DOMContentLoaded', () => {
  // Highlight section titles on nav click
  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function() {
      const id = this.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (section) {
        const title = section.querySelector('.sm-title');
        if (title) {
          title.classList.add('highlighted');
          setTimeout(() => title.classList.remove('highlighted'), 1000);
        }
      }
    });
  });

  // Brand click behavior
  const brandLink = document.querySelector('.brand');
  if (brandLink) {
    brandLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      const portfolioTitle = document.querySelector('.hero .sm-title');
      if (portfolioTitle) {
        portfolioTitle.classList.add('highlighted');
        setTimeout(() => portfolioTitle.classList.remove('highlighted'), 1000);
      }
    });
  }

  // Lightbox for crisp full-size previews on App Screens
  const appScreenImgs = document.querySelectorAll('.app-screens .current-image img');
  if (appScreenImgs.length) {
    // Create lightbox elements once
    const backdrop = document.createElement('div');
    backdrop.className = 'lightbox-backdrop';
    const bigImg = document.createElement('img');
    bigImg.className = 'lightbox-image';
    backdrop.appendChild(bigImg);
    document.body.appendChild(backdrop);

    const openLightbox = (src) => {
      // Preload then show to avoid blurry transition
      const preload = new Image();
      preload.onload = () => {
        bigImg.src = src;
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      };
      preload.src = src;
    };

    const closeLightbox = () => {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      // Delay clearing src for smoother fade
      setTimeout(() => { bigImg.removeAttribute('src'); }, 200);
    };

    appScreenImgs.forEach(img => {
      img.addEventListener('click', () => {
        const full = img.getAttribute('data-full') || img.src;
        openLightbox(full);
      });
    });

    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop || e.target === bigImg) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && backdrop.classList.contains('active')) closeLightbox();
    });
  }
});