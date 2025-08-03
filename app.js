const totalCards = 100;
let cardImages = [];

for (let i = 1; i <= totalCards; i++) {
  cardImages.push(`cards/card${i}.png`);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

document.getElementById('start').addEventListener('click', () => {
  const orientation = document.getElementById('orientation').value;
  const shuffledCards = shuffle([...cardImages]);
  const container = document.getElementById('card-container');
  container.innerHTML = '';

  shuffledCards.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'card-image';

    // 向きを指定
    if (orientation === 'upside-down') {
      img.style.transform = 'rotate(180deg)';
    } else if (orientation === 'random') {
      const rotate = Math.random() < 0.5 ? '0deg' : '180deg';
      img.style.transform = `rotate(${rotate})`;
    }

    container.appendChild(img);
  });
});

// PWA: Service Worker登録
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log('Service Worker registered.'));
}
