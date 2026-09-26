const STORAGE_KEY = "pomodoroMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const timerDisplay = document.getElementById("timer-display");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");
const clock = document.getElementById("clock");

function getSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return saved >= MIN_MINUTES && saved <= MAX_MINUTES ? saved : DEFAULT_MINUTES;
}

let remainingSeconds = getSavedMinutes() * 60;
let intervalId = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (intervalId !== null) return;

  intervalId = setInterval(() => {
    if (remainingSeconds <= 0) {
      stopTimer();
      return;
    }
    remainingSeconds -= 1;
    updateDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  intervalId = null;
}

function resetTimer() {
  stopTimer();
  remainingSeconds = getSavedMinutes() * 60;
  updateDisplay();
}

function updateClock() {
  clock.textContent = new Date().toLocaleTimeString("ko-KR", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
updateClock();
setInterval(updateClock, 1000);
