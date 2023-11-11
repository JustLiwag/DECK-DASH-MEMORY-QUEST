
const cards = document.querySelectorAll(".memory-card");
const score = document.getElementById("point");
const finalScore = document.getElementById("finalPoints");
const won = document.getElementById("won");
const gameover = document.getElementById("gameover");
const play = document.getElementById("playAgain");
const button = document.getElementsByClassName("btn-handle");
const ship = document.getElementById("ship");
const body = document.getElementsByTagName("body")[0];
const time = document.getElementById("timeRemaining");
const timerDisplay = document.getElementById("timer");
const bgMusic = new Audio('Assets/Audio/Space-Jazz.wav');
const flipSound = new Audio('Assets/Audio/flip.wav');
const matchSound = new Audio('Assets/Audio/match.wav');
const victorySound = new Audio('Assets/Audio/victory.wav');
const gameOverSound = new Audio('Assets/Audio/gameOver.wav');
bgMusic.loop = true;
var points = 0;
var finalPoint = 0;
var win = 0;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

const durationInSeconds = 60;

// Initialize the timer
let timeLeft = durationInSeconds;
let timerInterval;
function playBGM() { bgMusic.play(); }
function startTimer() {
  bgMusic.play();
  timerInterval = setInterval(function () {
    timeLeft--;

    timerDisplay.innerHTML = timeLeft + " seconds left";
    if (timeLeft === 0) {
      timeLeft = 0;
      timerDisplay.innerHTML = "Time's up!";
      gameOverSound.play();
      clearInterval(timerInterval);
      gameover.style.visibility = "visible";
    }
  }, 1000);
}

startTimer();

for (let i = 0; i < cards.length; i++) {
  cards[i].addEventListener('click', function () {
    flipSound.play();
  });
}


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkCards();
}

function checkCards() {
  let isMatch = firstCard.dataset.cards === secondCard.dataset.cards;

  isMatch ? cardsMatch() : cardsDontMatch();
}

function cardsMatch() {
  matchSound.play();
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  points += 4;
  finalPoint = points;
  win += 2;
  finalScore.innerHTML = finalPoint;
  score.innerHTML = points;

  if (win === 12) {
    victorySound.play();
    clearInterval(timerInterval);
    won.style.visibility = "visible";
  }

  resetBoard();
}

function cardsDontMatch() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);

  points -= 1;
  finalPoint = points;
  score.innerHTML = points;
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function playAgain() {
  location.reload();
}

play.addEventListener("click", playAgain);

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach((card) => card.addEventListener("click", flipCard));


function shipMove() {
  ship.classList.add = "animate__slideOutRight";
}
button.addEventListener("click", shipMove);
