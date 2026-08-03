const STORAGE_KEY = 'pomodoroMinutes';
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.getElementById('timer-minutes');
const saveBtn = document.getElementById('save-btn');

function loadSavedMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  return saved >= MIN_MINUTES && saved <= MAX_MINUTES ? saved : 25;
}

function isValidMinutes(value) {
  if (value === '') return false;
  const num = Number(value);
  return Number.isInteger(num) && num >= MIN_MINUTES && num <= MAX_MINUTES;
}

function updateSaveButtonState() {
  saveBtn.disabled = !isValidMinutes(minutesInput.value);
}

minutesInput.value = loadSavedMinutes();
updateSaveButtonState();

minutesInput.addEventListener('input', updateSaveButtonState);

saveBtn.addEventListener('click', () => {
  if (!isValidMinutes(minutesInput.value)) return;
  localStorage.setItem(STORAGE_KEY, Number(minutesInput.value));
});
