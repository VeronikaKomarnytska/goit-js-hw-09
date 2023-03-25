function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.startButton.addEventListener('click', () => {
  timer.start();
});
refs.stopButton.addEventListener('click', () => {
  timer.stop();
});

refs.stopButton.setAttribute('disabled', true);
const timer = {
  start() {
    refs.startButton.setAttribute('disabled', true);
    refs.stopButton.removeAttribute('disabled');

    const startTime = Date.now();
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      refs.body.style.backgroundColor = getRandomHexColor(currentTime);
    }, 1000);
  },
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
    refs.startButton.removeAttribute('disabled');
    refs.stopButton.setAttribute('disabled', true);
  },
};
