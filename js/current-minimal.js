document.addEventListener('DOMContentLoaded', () => {
  const showTrigger = document.getElementById('progress-toggle');
  const details = document.getElementById('progress-details');
  const hideTrigger = document.getElementById('progress-hide');

  if (!showTrigger || !details || !hideTrigger) {
    return;
  }

  hideTrigger.style.display = 'none';

  const revealDetails = () => {
    showTrigger.style.display = 'none';
    details.classList.add('revealed');
    setTimeout(() => {
      hideTrigger.style.display = 'inline';
    }, 150);
  };

  const concealDetails = () => {
    hideTrigger.style.display = 'none';
    details.classList.remove('revealed');
    setTimeout(() => {
      showTrigger.style.display = 'inline';
    }, 200);
  };

  showTrigger.addEventListener('click', revealDetails);
  hideTrigger.addEventListener('click', concealDetails);
});
