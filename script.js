'use strict';
//* Variables of players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
//* variables to visual a current player score
const currentS0 = document.getElementById('current--0');
const currentS1 = document.getElementById('current--1');
//* variables to visual a complete player score
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

//* Picking a DOM el of dice
const diceSrc = document.querySelector('.dice');
//* Funvtionality on buttons
const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

//* Starting conditions
/* currentS0.textContent = 0;
currentS1.textContent = 0;
diceSrc.classList.add('hidden');
score0.textContent = 0;
score1.textContent = 0; */

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//* Starting conditions
const begin = function () {
  //* Setting all value to zero, reseting a class values to main
  currentS0.textContent = 0;
  currentS1.textContent = 0;
  diceSrc.classList.add('hidden');
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore = 0;
  activePlayer = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
  //* Enable the buttons
  rollBtn.disabled = false;
  holdBtn.disabled = false;
  scores = [0, 0];
};
begin();

//* This function check wchich player is active and swtich value to other one
const switchPlayer = function () {
  //* Setting a current score to 0 for active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //* Logic for chaning a players
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //* Toggle checks that current class has a specific class ( yes ? remove it : add it )
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//* Functionality for button New Game
newGameBtn.addEventListener('click', begin);

//*Functionality for button ROLL DICE
rollBtn.addEventListener('click', function () {
  //* Saving a random number to value
  const dice = Math.trunc(Math.random() * 6 + 1);
  //* Show this value
  console.log(dice);
  //* Show a dice png
  diceSrc.classList.remove('hidden');
  //* Showing png based on the number drawn
  diceSrc.src = `dice-${dice}.png`;

  if (dice !== 1) {
    //* Add to current score
    currentScore += dice;
    //* Dymicialy seting a textContent for value.
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    //*Switch to next player
    switchPlayer();
  }
});

//* Functionality for button HOLD
holdBtn.addEventListener('click', function () {
  //* 1. Add current score to active player
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  //* 2. Update a current score of active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //* 3. Add wining conditions
  if (scores[activePlayer] >= 100) {
    diceSrc.classList.add('hidden');

    //* 4. Remove a active player css class
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    //* 5. Add wining class to active player
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    //* 6. Disable a buttons to end a game
    rollBtn.disabled = true;
    holdBtn.disabled = true;
  } else switchPlayer();
});
