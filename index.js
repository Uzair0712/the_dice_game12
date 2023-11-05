// SELECTING ALL THE REQUIRED ELEMENTS
const leftContainer = document.querySelector(".left");
const rightContainer = document.querySelector(".right");
const totoalScore1 = document.querySelector(".total-score-1");
const totoalScore2 = document.querySelector(".total-score-2");
const currentScore1 = document.querySelector(".current-score-1");
const currentScore2 = document.querySelector(".current-score-2");
const newGame = document.querySelector(".new-game");
const roll = document.querySelector(".roll");
const hold = document.querySelector(".hold");
const image = document.querySelector(".dice-image");

// FUNCTIONS FOR THE GAME
// 1. One of the player rolls the dice.
// 2. According to the dice current score is added.
// 3. If ther is one the turn changes to another player.
// 4. If Player holds turn changes .
// 5. Holded current score is added to the total Score.
// 6. player reaching 100 points first wins the game.
// 7. Reset the game on Clicking play again button

// CONSTANTS OF THE GAME
const MIN_WIN_POINTS = 100;

let currentPlayer = 0;
const totalScore = [0, 0];
const curScoreVar = [currentScore1, currentScore2];
const totalScoreVar = [totoalScore1, totoalScore2];
let score = 0;

function initialize() {
  leftContainer.classList.remove("win");
  leftContainer.classList.remove("inactive");
  rightContainer.classList.remove("win");
  rightContainer.classList.add("inactive");
  image.classList.add("hidden");

  currentScore1.textContent =
    currentScore2.textContent =
    totoalScore1.textContent =
    totoalScore2.textContent =
      0;
  roll.disabled = false;
  hold.disabled = false;
  currentPlayer = 0;
  totalScore.fill(0);
  score = 0;
}

function declareWin() {
  if (currentPlayer === 0) leftContainer.classList.add("win");
  if (currentPlayer === 1) rightContainer.classList.add("win");
  roll.disabled = true;
  hold.disabled = true;
}

function changePlayer() {
  curScoreVar[currentPlayer].textContent = 0;
  score = 0;
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  if (currentPlayer === 1) {
    leftContainer.classList.add("inactive");
    rightContainer.classList.remove("inactive");
  }
  if (currentPlayer === 0) {
    leftContainer.classList.remove("inactive");
    rightContainer.classList.add("inactive");
  }
}

function rollDice() {
  const face = Math.floor(Math.random() * 6 + 1);

  image.src = `./public/dice-${face}.png`;
  image.classList.remove("hidden");
  if (face === 1) {
    changePlayer(currentPlayer);
  } else {
    score += face;
    curScoreVar[currentPlayer].textContent = score;
  }
}

function onHold() {
  totalScore[currentPlayer] += score;
  totalScoreVar[currentPlayer].textContent = totalScore[currentPlayer];
  if (totalScore[currentPlayer] >= MIN_WIN_POINTS) {
    declareWin();
    return;
  }
  changePlayer();
}

initialize();
roll.addEventListener("click", rollDice);
hold.addEventListener("click", onHold);
newGame.addEventListener("click", initialize);
