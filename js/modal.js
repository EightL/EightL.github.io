document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const phoneModal = document.getElementById('phoneModal');
  const emailModal = document.getElementById('emailModal');
  const showPhoneModal = document.getElementById('showPhoneModal');
  const showEmailModal = document.getElementById('showEmailModal');
  const closeButtons = document.querySelectorAll('.close-modal');
  const copyButtons = document.querySelectorAll('.copy-btn');

  // Open modal function
  function openModal(modal) {
    modal.classList.remove('closing');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    // Next frame: add "open" to kick off the transition
    requestAnimationFrame(() => modal.classList.add('open'));
  }

  // Close modal function
  function closeModal(modal) {
    modal.classList.remove('open');
    modal.classList.add('closing');
    document.body.style.overflow = ''; // Restore scrolling
    // After the .3s transition, truly hide it
    setTimeout(() => {
      modal.classList.remove('closing');
      modal.style.display = 'none';
    }, 300);
  }

  // Open modal event listeners
  if (showPhoneModal) showPhoneModal.addEventListener('click', () => openModal(phoneModal));
  if (showEmailModal) showEmailModal.addEventListener('click', () => openModal(emailModal));

  // Close when clicking X
  closeButtons.forEach(btn => {
    const modal = btn.closest('.modal');
    btn.addEventListener('click', () => closeModal(modal));
  });

  // Close when clicking outside the content
  window.addEventListener('click', e => {
    if (e.target === phoneModal) closeModal(phoneModal);
    if (e.target === emailModal) closeModal(emailModal);
  });

  // Copy functionality
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const textToCopy = this.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      });
    });
  });
});