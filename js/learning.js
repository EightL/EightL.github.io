document.addEventListener('DOMContentLoaded', () => {
  // Animate progress bars on scroll
  const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Get the width from the inline style and apply it after a delay
          const targetWidth = entry.target.style.width;
          entry.target.style.width = '0%';
          
          setTimeout(() => {
            entry.target.style.width = targetWidth;
          }, 200);
          
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    progressBars.forEach(bar => observer.observe(bar));
  };

  // Smooth scroll for anchor links
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
          
          // Add a highlight effect
          setTimeout(() => {
            target.classList.add('highlight-section');
            setTimeout(() => {
              target.classList.remove('highlight-section');
            }, 1000);
          }, 500);
        }
      });
    });
  };

  // Make learning modules expandable
  const setupExpandableModules = () => {
    const modules = document.querySelectorAll('.learning-module');
    
    modules.forEach(module => {
      module.addEventListener('click', (e) => {
        // Don't trigger if clicking a link inside the module
        if (e.target.tagName === 'A' || e.target.closest('a')) {
          return;
        }
        
        // Toggle expanded state
        const isExpanded = module.classList.contains('expanded');
        
        // Close all other modules first
        document.querySelectorAll('.learning-module.expanded').forEach(m => {
          if (m !== module) {
            m.classList.remove('expanded');
          }
        });
        
        // Toggle this module
        module.classList.toggle('expanded');
        
        // Scroll into view if expanding
        if (!isExpanded) {
          setTimeout(() => {
            module.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }, 100);
        }
      });
    });
  };

  // Initialize all functionality
  animateProgressBars();
  setupSmoothScroll();
  setupExpandableModules();

  // Add a small easter egg
  console.log("🧠 Welcome to my RL learning journey!");
});