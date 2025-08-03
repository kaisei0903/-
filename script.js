let images = [];
let currentIndex = 0;
let startTime = null;
let timerInterval = null;

const cardElement = document.getElementById("card");
const startButton = document.getElementById("start");
const orientationRadios = document.querySelectorAll("input[name='orientation']");
const timerDisplay = document.getElementById("timer");

async function loadImages() {
  // 100枚前提でcard1.png〜card100.pngを読み込む
  images = [];
  for (let i = 1; i <= 100; i++) {
    images.push(`cards/card${i}.png`);
  }
}

function getOrientationSetting() {
  for (const radio of orientationRadios) {
    if (radio.checked) return radio.value;
  }
  return "normal";
}

function showImage(index) {
  if (index >= images.length) {
    clearInterval(timerInterval);
    const elapsed = (performance.now() - startTime) / 1000;
    timerDisplay.textContent = `終了！経過時間: ${elapsed.toFixed(2)} 秒`;
    return;
  }

  const orientation = getOrientationSetting();
  const rotation = orientation === "normal" ? 0
                  : orientation === "reverse" ? 180
                  : Math.random() < 0.5 ? 0 : 180;

  cardElement.src = images[index];
  cardElement.style.transform = `rotate(${rotation}deg)`;
}

function advanceImage() {
  currentIndex++;
  showImage(currentIndex);
}

function startSession() {
  currentIndex = 0;
  startTime = performance.now();
  showImage(0);

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    timerDisplay.textContent = `経過時間: ${elapsed.toFixed(2)} 秒`;
  }, 100);
}

function setupInteraction() {
  // タップまたはスワイプで進む
  cardElement.addEventListener("click", advanceImage);

  let touchStartX = 0;
  cardElement.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  });

  cardElement.addEventListener("touchend", e => {
    const touchEndX = e.changedTouches[0].clientX;
    if (Math.abs(touchEndX - touchStartX) > 30) {
      advanceImage();
    }
  });
}

startButton.addEventListener("click", () => {
  loadImages().then(startSession);
});

setupInteraction();
