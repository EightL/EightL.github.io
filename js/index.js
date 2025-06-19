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
});