const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const restartButton = document.querySelector('#restart');
const score = document.querySelector('#score');
const timerDisplay = document.querySelector('#timer');
const stick = document.getElementById('stick'); // Fixed selector

let time = 10;
let timer = null;
let lastHole = null;
let points = 0;
let difficulty = "hard";

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setDelay(difficulty) {
  if (difficulty === "easy") return 1500;
  if (difficulty === "normal") return 1000;
  if (difficulty === "hard") return randomInteger(600, 1200);
}

function chooseHole(holes) {
  const index = randomInteger(0, holes.length - 1);
  const hole = holes[index];
  if (hole === lastHole) return chooseHole(holes);
  lastHole = hole;
  return hole;
}

function toggleVisibility(hole) {
  const mole = hole.querySelector('.mole');
  if (mole) {
    mole.classList.toggle('show');
  }
}

function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

function updateTimer() {
  if (time > 0) {
    time -= 1;
    timerDisplay.textContent = time;
  } else {
    stopGame();
  }
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function stopGame() {
  clearInterval(timer);
  moles.forEach(mole => mole.classList.remove('show')); // Hide all moles
  return "game stopped";
}

function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole
    if (time > 0) showUp(); // Continue game if time remains
  }, delay);
  return timeoutID;
}

function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

function whack(event) {
  const mole = event.target.closest('.mole');
  if (!mole || !mole.classList.contains('show')) return;
  updateScore();
  toggleVisibility(mole.closest('.hole'));
}

function hitMole(event) {
  const mole = event.target.closest('.mole');
  if (!mole || !mole.classList.contains('show')) return;

  const moleRect = mole.getBoundingClientRect();
  stick.style.top = `${moleRect.top + moleRect.height / 2}px`;
  stick.style.left = `${moleRect.left - stick.offsetWidth / 2}px`;
  stick.style.display = 'block';

  setTimeout(() => {
    stick.style.display = 'none';
  }, 200);
}

function setEventListeners() {
  moles.forEach(mole => {
    mole.addEventListener('click', (event) => {
      whack(event);
      hitMole(event);
    });
  });
}

function setDuration(duration) {
  time = duration;
  timerDisplay.textContent = time;
  return time;
}

function startGame(duration = 10) {
  clearScore();
  setDuration(duration);
  stopGame(); // Reset the game
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener('click', () => startGame(10));
restartButton.addEventListener('click', () => {
  clearScore();
  startGame(10);
});


// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;

