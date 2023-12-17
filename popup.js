let countdown;
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  timerDisplay.textContent = display;
}

startButton.addEventListener('click', () => timer(1500));
resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  timerDisplay.textContent = '25:00';
});
