let timer;
let timeLeft;
let timerActive = false;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "startTimer") {
    timeLeft = request.duration;
    timerActive = true;
    startTimer();
  } else if (request.command === "getRemainingTime") {
    sendResponse({ timeLeft });
  }
});

function startTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0 && timerActive) {
      timeLeft--;
    } else {
      clearInterval(timer);
      timerActive = false;
    }
  }, 1000);
}
