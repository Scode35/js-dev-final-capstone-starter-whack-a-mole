const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
// TODO: Add the missing query selectors:
const score = document.querySelector('#score'); // Gets the score element
const timerDisplay = document.querySelector('#timer'); // Gets the timer element
const restartButton = document.getElementById('restart');


let time = 0;
let timer= 0;
let lastHole = 0;
let points = 0;
let difficulty = "hard";

/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
    if (difficulty === "easy") return 1500;
    if (difficulty === "normal") return 1000;
    if (difficulty === "hard") return randomInteger(600, 1200);
  }
  
  
/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */

  

function chooseHole(holes) {
  // 1. Generate a random integer from 0 to 8
  const index = Math.floor(Math.random() * holes.length);

  // 2. Get a random hole with the random index
  const hole = holes[index];

  // 3. If the chosen hole is the same as the last hole, call the function recursively
  if (hole === lastHole) {
    return chooseHole(holes);
  }

  // 4. Otherwise, update lastHole and return the hole
  lastHole = hole;
  return hole;
}

// Example usage
const hole = document.querySelectorAll('.hole');
const selectedHole = chooseHole(holes);
console.log(selectedHole); // Logs a random hole, ensuring it's not the same as the last one




/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  //if time > 0:
*  //timeoutId = showUp()
*  //return timeoutId
*  //else
*  //gameStopped = stopGame()
*  //return gameStopped
*
*/
function gameOver() {
  if (time > 0) {
    const timeoutId = showUp(); // Call showUp if there is still time
    return timeoutId; // Return the timeoutId for tracking
  } else {
    const gameStopped = stopGame(); // Stop the game if time is 0
    return gameStopped; // Return the string "game stopped"
  }
}


/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  const delay = setDelay(difficulty);
  const hole = chooseHole(holes);
  return showAndHide(hole, delay);
}

/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay) {
  toggleVisibility(hole); // Show the mole
  const timeoutID = setTimeout(() => {
    toggleVisibility(hole); // Hide the mole
    gameOver(); // Check if the game should continue
  }, delay);
  return timeoutID;
}


/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole) {
  hole.classList.toggle('show');
  return hole;
}


/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/

function updateScore() {
  points += 1;
  score.textContent = points;
  return points;
}


/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/

function clearScore() {
  points = 0;
  score.textContent = points;
  return points;
}

/**
*
* Updates the control board with the timer if time > 0
*
*/

function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}


/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
  timer = setInterval(updateTimer, 1000);
  return timer;
}


/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  updateScore();
  toggleVisibility(event.target.closest('.hole')); // Hide the mole when clicked
  return points;
}


/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners() {
  moles.forEach(mole => {
  mole.addEventListener('click', whack);
  });
  return moles;
}


/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}

/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}

/**
* This function starts the game when the `startButton` is clicked and initializes the game by performing the following steps: 

 * 1. Clears the score using `clearScore()`. 

 * 2. Sets the game duration using `setDuration()`. 

 * 3. Sets up event listeners on the moles using `setEventListeners()`.

 * 4. Starts the game timer by calling `startTimer()`.  

 * 5. Begins the game loop by calling `showUp()` to display moles. 


 * Note: Simply uncommenting `setDuration(10);` and `showUp();` is not enough. To make the game work, ensure all necessary functions listed above are called to initialize the score, timer, event listeners, and mole appearances. 
*/
function startGame(){
  clearScore();
  stopGame();   //optional
  setDuration(10);
  setEventListeners();
  startTimer();
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener('click', clearScore);

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
