let countdown;
let timerType = 'work'; // can be 'work', 'shortBreak', or 'longBreak'
let cycleCount = 0;
let endTime;

function startTimer(duration, type) {
  timerType = type;
  endTime = Date.now() + duration * 1000;
  clearInterval(countdown);
  countdown = setInterval(() => {
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdown = null;
      cycleCount = timerType === 'work' ? (cycleCount + 1) % 4 : cycleCount;
      chrome.runtime.sendMessage({ 
        action: timerType === 'work' ? 'pomodoroComplete' : 'breakComplete',
        cycleCount
      });
      if (timerType !== 'work') {
        updateBlockedSites([]);
      }
    }
    chrome.runtime.sendMessage({ action: 'updateTimer', timeLeft });
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  chrome.runtime.sendMessage({ action: 'resetTimer' });
  updateBlockedSites([]);
}

function updateBlockedSites(sites) {
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: new Array(100).fill().map((_, i) => i + 1),
    addRules: sites.map((site, index) => ({
      id: index + 1,
      priority: 1,
      action: { type: 'block' },
      condition: {
        urlFilter: `*://*.${site}/*`,
        resourceTypes: ['main_frame']
      }
    }))
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    startTimer(message.duration, message.type);
    if (message.type === 'work') {
      chrome.storage.local.get(['blockedSites'], function(result) {
        if (result.blockedSites) {
          updateBlockedSites(result.blockedSites);
        }
      });
    } else {
      updateBlockedSites([]);
    }
  } else if (message.action === 'resetTimer') {
    resetTimer();
  } else if (message.action === 'getTimerState') {
    sendResponse({ 
      running: countdown !== null, 
      timeLeft: Math.round((endTime - Date.now()) / 1000),
      timerType,
      cycleCount 
    });
  }
});
