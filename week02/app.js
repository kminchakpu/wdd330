// Core Elements
const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");

// Bonus Elements
const timeInput = document.getElementById("timeInput");
const pauseButton = document.getElementById("pauseButton");

// Application State Variables
let timeLeft = 10;
let timerInterval = null;
let timeoutId = null;
let isPaused = false;

function updateDisplay() {
  countdownDisplay.textContent = timeLeft.toString();
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
}

function handleTimeUp() {
  stopTimer();
  countdownDisplay.textContent = "Time's up!";
  startButton.disabled = false;
  pauseButton.disabled = true;
  pauseButton.textContent = "Pause";
  isPaused = false;
}

function startCountdown() {
  // Decrement and update DOM every 1000ms
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft >= 0) {
      updateDisplay();
    }
  }, 1000);

  // Schedule the finish execution accurately using setTimeout
  timeoutId = setTimeout(() => {
    handleTimeUp();
  }, timeLeft * 1000);
}

// Start Button Event Listener
startButton.addEventListener("click", () => {
  stopTimer(); // Reset any existing active timer runs safely

  // Parse input or fallback safely
  const parsedInput = parseInt(timeInput.value, 10);
  timeLeft = isNaN(parsedInput) || parsedInput <= 0 ? 10 : parsedInput;

  isPaused = false;
  pauseButton.textContent = "Pause";
  pauseButton.disabled = false;
  startButton.disabled = true;

  updateDisplay();
  startCountdown();
});

// Pause/Resume Button Event Listener
pauseButton.addEventListener("click", () => {
  if (!isPaused) {
    // Pausing the timer: freeze intervals and timeouts
    stopTimer();
    isPaused = true;
    pauseButton.textContent = "Resume";
  } else {
    // Resuming the timer: fire it right back up with remaining time
    isPaused = false;
    pauseButton.textContent = "Pause";
    startCountdown();
  }
});
