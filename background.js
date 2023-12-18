let countdown;
let timerType = 'work'; 
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

      if (timerType === 'work') {
        showNotification('Pomodoro Timer', 'Time for a break!');
      } else {
        showNotification('Pomodoro Timer', 'Back to work!');
      }

      chrome.runtime.sendMessage({ 
        action: timerType === 'work' ? 'pomodoroComplete' : 'breakComplete',
        cycleCount
      });
    }
    chrome.runtime.sendMessage({ action: 'updateTimer', timeLeft });
  }, 1000);
}

function resetTimer() {
  clearInterval(countdown);
  countdown = null;
  chrome.runtime.sendMessage({ action: 'resetTimer' });
}

function showNotification(title, message) {
  chrome.notifications.create('', {
    type: 'basic',
    iconUrl: 'imgs/Limitless.png', // Replace with your extension's icon path
    title: title,
    message: message,
    priority: 2
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'startTimer') {
    startTimer(message.duration, message.type);
  } else if (message.action === 'resetTimer') {
    resetTimer();
  }
});
