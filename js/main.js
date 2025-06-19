// Dynamic year update
document.getElementById('year').textContent = new Date().getFullYear();

// Scroll reveal animation
const initScrollReveal = () => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { 
      if (e.isIntersecting) { 
        e.target.classList.add('show'); 
        obs.unobserve(e.target); 
      } 
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
};

// Mobile navigation toggle
const initMobileNav = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      document.querySelector('nav ul').classList.toggle('open');
    });
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initMobileNav();
});