let countdown;
const timerDisplay = document.querySelector('#timer');
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');
const blockedSitesInput = document.querySelector('#blockedSites');
const saveButton = document.querySelector('#saveButton');

// Initialize the blocked sites list from Chrome's storage
chrome.storage.local.get(['blockedSites'], function(result) {
  blockedSitesInput.value = (result.blockedSites || []).join('\n');
});

// Save the blocked sites list to Chrome's storage
saveButton.addEventListener('click', () => {
  const sites = blockedSitesInput.value.split('\n').map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({blockedSites: sites}, function() {
    console.log('Blocked sites list saved.');
  });
});

function timer(seconds) {
  // Clear any existing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
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
  document.title = display;
}

startButton.addEventListener('click', () => {
  timer(1500);
  const sites = blockedSitesInput.value.split('\n').map(s => s.trim()).filter(Boolean);
  chrome.runtime.sendMessage({action: 'updateBlockedList', sites: sites});
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  timerDisplay.textContent = '25:00';
  chrome.runtime.sendMessage({action: 'updateBlockedList', sites: []}); // Unblock sites on reset
});
