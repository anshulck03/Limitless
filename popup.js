const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const shortBreakButton = document.querySelector('#shortBreakButton');
const longBreakButton = document.querySelector('#longBreakButton');
const resetButton = document.querySelector('#resetButton');
const blockedSitesInput = document.querySelector('#blockedSites');

// Load the blocked sites from storage when the popup is opened
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['blockedSites'], function(result) {
    if (result.blockedSites) {
      blockedSitesInput.value = result.blockedSites.join('\n');
    }
    chrome.runtime.sendMessage({ action: 'getTimerState' });
  });
});

// Save the blocked sites to storage when the user changes them
blockedSitesInput.addEventListener('change', () => {
  const sitesToBlock = blockedSitesInput.value.split('\n').map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blockedSites: sitesToBlock });
});

function updateDisplay(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

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
