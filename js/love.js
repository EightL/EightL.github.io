// Slovenská love minihra s volejbalovým míčem

document.addEventListener('DOMContentLoaded', function() {
  const ball = document.getElementById('ball');
  const game = document.getElementById('volleyball-game');
  const message = document.getElementById('game-message');
  let score = 0;
  let gameActive = true;

  // Funkce pro náhodné umístění míče v rámci herního pole
  function moveBallRandomly() {
    const gameRect = game.getBoundingClientRect();
    const ballSize = ball.offsetWidth;
    const maxLeft = game.offsetWidth - ballSize;
    const maxTop = game.offsetHeight - ballSize;
    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;
    ball.style.left = left + 'px';
    ball.style.top = top + 'px';
    ball.style.transform = 'none';
  }

  // Po kliknutí na míč
  ball.addEventListener('click', function() {
    if (!gameActive) return;
    score++;
    if (score < 3) {
      message.textContent = [
        'To bolo rýchle! Skús ešte raz! 😏',
        'Ešte jeden zásah a niečo sa stane...!'
      ][score-1];
      moveBallRandomly();
    } else {
      gameActive = false;
      ball.style.display = 'none';
      message.textContent = 'Wau! Si rýchlejšia ako wifi v Žiline! ❤️';
      // Exploze srdíček
      for (let i = 0; i < 12; i++) {
        setTimeout(() => popHeart(), i*80);
      }
    }
  });

  // Funkce pro animaci srdíčka
  function popHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = ['❤️','💖','💕','💗','💓'][Math.floor(Math.random()*5)];
    // Náhodná pozice v herním poli
    const x = Math.random() * (game.offsetWidth - 40) + 10;
    const y = Math.random() * (game.offsetHeight - 40) + 10;
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    game.appendChild(heart);
    setTimeout(() => game.removeChild(heart), 1200);
  }

  // Inicializace
  moveBallRandomly();
  message.textContent = 'Chyť ma! (3x)';
}); 