// Shared navbar injection and dynamic brand text
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  const brandMap = {
    'index.html': 'Martin Ševčík',
    'current.html': 'MARL Emergent Coalitions',
    'learning.html': 'RL Learning Progress',
    'products.html': 'ClipAI',
    'interpres.html': 'Interpres',
    '': 'Martin Ševčík'
  };

  const activeFor = {
    'current.html': 'research',
    'learning.html': 'research',
    'marl.html': 'research',
    'products.html': 'products',
    'interpres.html': 'products'
  };

  const header = document.querySelector('header');
  if (!header) return;

  const navHtml = `
    <div class="container">
      <nav>
        <a href="index.html" class="brand" id="brand"></a>
        <span class="menu-toggle">☰</span>
        <ul>
          <li class="has-dropdown">
            <a href="index.html#about">Me</a>
            <div class="dropdown">
              <a href="index.html">About</a>
              <a href="index.html#projects">Projects</a>
              <a href="index.html#contact">Contact</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a href="current.html" data-nav="research">Research</a>
            <div class="dropdown">
              <a href="current.html">Thesis</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a href="products.html" data-nav="products">Featured</a>
            <div class="dropdown">
              <a href="products.html">ClipAI</a>
              <a href="interpres.html">Interpres</a>
            </div>
          </li>
        </ul>
      </nav>
    </div>`;

  header.innerHTML = navHtml;

  // Set brand text
  const brandEl = header.querySelector('#brand');
  if (brandEl) brandEl.textContent = brandMap[path] || 'Martin Ševčík';

  // Mark active link when relevant
  const activeKey = activeFor[path];
  if (activeKey) {
    const activeEl = header.querySelector(`[data-nav="${activeKey}"]`);
    if (activeEl) activeEl.classList.add('active');
  }

  // Dropdown toggle for touch/mobile: First tap opens, second tap navigates
  const isMobile = () => window.matchMedia('(max-width: 680px)').matches;
  header.querySelectorAll('li.has-dropdown > a').forEach(anchor => {
    const li = anchor.parentElement;
    anchor.addEventListener('click', (e) => {
      // If in mobile sidebar or on small screens, toggle instead of direct navigate on first tap
      if (isMobile() && !li.classList.contains('open')) {
        e.preventDefault();
        li.classList.add('open');
      }
    });
  });

  // Close dropdowns when clicking outside (mobile)
  document.addEventListener('click', (e) => {
    if (!isMobile()) return;
    const nav = header.querySelector('nav');
    if (!nav.contains(e.target)) {
      header.querySelectorAll('li.has-dropdown.open').forEach(li => li.classList.remove('open'));
    }
  });
})();
