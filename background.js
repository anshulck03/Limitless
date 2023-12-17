let countdown;
let timerDuration = 1500; // 25 minutes
let endTime;

function startTimer(duration) {
  timerDuration = duration;
  endTime = Date.now() + timerDuration * 1000;
  countdown = setInterval(() => {
    const timeLeft = Math.round((endTime - Date.now()) / 1000);
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdown = null;
    }
    chrome.runtime.sendMessage({ action: 'updateTimer', timeLeft });
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  chrome.runtime.sendMessage({ action: 'resetTimer' });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    startTimer(message.duration);
  } else if (message.action === 'resetTimer') {
    resetTimer();
  }
  if (message.action === 'getTimerState') {
    sendResponse(getTimerState());
  }
});

function getTimerState() {
  return { running: countdown !== null, timeLeft: Math.round((endTime - Date.now()) / 1000) };
}
