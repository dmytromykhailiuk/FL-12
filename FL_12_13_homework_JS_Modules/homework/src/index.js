import "./scss/main.scss";
import Player from './js/player';

const player1 = new Player('player1');
const player2 = new Player('player2');

let firstMovePlayer = '1';
let currentSymbol = '×';
let currentPlayer = '1';
let player1Score = 0;
let player2Score = 0;
const gameField = document.querySelector('.game__grid');
const fields = document.querySelectorAll('.game__cell');
const statusPanel = document.querySelector('.status__panel');
const startNewGameBtn = document.querySelector('.game__start--btn');
const gameScore = document.querySelector('.game__score');

function nextMove() {
  currentSymbol = currentSymbol === '○' ? '×' : '○';
  currentPlayer = currentPlayer === '1' ? '2' : '1';
  statusPanel.innerText = `player${currentPlayer}(${currentSymbol}) - move`;
}

function setNumberOfWins() {
  currentPlayer === '1' ? player1Score++ : player2Score++;
  gameScore.innerText = `player1 - ${player1Score} : ${player2Score} - player2`;
}

function finishGame() {
  gameField.classList.remove('game');
  startNewGameBtn.innerText = 'New game';
}

function markWinnerLine(el1, el2, el3) {
  el1.classList.add('won');
  el2.classList.add('won');
  el3.classList.add('won');
  statusPanel.innerText = `player${currentPlayer} won!`;
}

function checkWin() {
  const topLeft = fields[0].classList[1];
  const topMiddle = fields[1].classList[1];
  const topRight = fields[2].classList[1];
  const middleLeft = fields[3].classList[1];
  const middleMiddle = fields[4].classList[1];
  const middleRight = fields[5].classList[1];
  const bottomLeft = fields[6].classList[1];
  const bottomMiddle = fields[7].classList[1];
  const bottomRight = fields[8].classList[1];

  if (topLeft && topLeft === topMiddle && topLeft === topRight) {
    markWinnerLine(fields[0], fields[1], fields[2]);
    finishGame()
    setNumberOfWins()
  } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
    markWinnerLine(fields[3], fields[4], fields[5])
    finishGame()
    setNumberOfWins()
  } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
    markWinnerLine(fields[6], fields[7], fields[8])
    finishGame()
    setNumberOfWins()
  } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
    markWinnerLine(fields[0], fields[3], fields[6])
    finishGame()
    setNumberOfWins()
  } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
    markWinnerLine(fields[1], fields[4], fields[7])
    finishGame()
    setNumberOfWins()
  } else if (topRight && topRight === middleRight && topRight === bottomRight) {
    markWinnerLine(fields[2], fields[5], fields[8])
    finishGame()
    setNumberOfWins()
  } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
    markWinnerLine(fields[0], fields[4], fields[8])
    finishGame()
    setNumberOfWins()
  } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
    markWinnerLine(fields[2], fields[4], fields[6])
    finishGame()
    setNumberOfWins()
  } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
    finishGame()
  } else {
    nextMove()
  }
}

function markField(e, symbol) {
  if (e.target.classList.contains('game__cell') && e.target.innerText === "") {
    if(e.target.parentElement.classList.contains('game')) {
      e.target.innerText = symbol;
      e.target.classList.add(symbol);
      checkWin()
    }
  } 
}

function startNewGame() {
  for (let field of fields) {
    field.classList.remove('won');
    field.classList.remove('×');
    field.classList.remove('○');
    field.innerText = '';
  }
  gameField.classList.add('game');
  startNewGameBtn.innerText = 'Clear';
  currentPlayer = firstMovePlayer === '1' ? '1': '2';
  firstMovePlayer = firstMovePlayer === '1' ? '2': '1'
  currentSymbol = '○';
  nextMove();
}

startNewGameBtn.addEventListener('click', startNewGame);

gameField.addEventListener('click', (e) => markField(e, currentSymbol));