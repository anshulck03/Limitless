const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');

startButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startTimer', duration: 1500 });
});

resetButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'resetTimer' });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateTimer') {
    updateDisplay(message.timeLeft);
  } else if (message.action === 'resetTimer') {
    updateDisplay(1500); // Reset to 25 minutes
  }
});

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// On popup open, request current timer state
document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'getTimerState' });
});
