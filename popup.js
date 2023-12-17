const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const shortBreakButton = document.querySelector('#shortBreakButton');
const longBreakButton = document.querySelector('#longBreakButton');
const resetButton = document.querySelector('#resetButton');

startButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startTimer', duration: 1500, type: 'work' });
});

shortBreakButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startTimer', duration: 300, type: 'shortBreak' });
});

longBreakButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'startTimer', duration: 900, type: 'longBreak' });
});

resetButton.addEventListener('click', () => {
  chrome.runtime.sendMessage({ action: 'resetTimer' });
});

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'updateTimer') {
    updateDisplay(message.timeLeft);
  } else if (message.action === 'resetTimer') {
    updateDisplay(1500); // 25 minutes
  } else if (message.action === 'pomodoroComplete') {
    alert("Time for a break!");
  } else if (message.action === 'breakComplete') {
    alert("Time to get back to work!");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.sendMessage({ action: 'getTimerState' });
});
