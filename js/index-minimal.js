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
