import './gamesField.scss';

export default class Game {
  constructor(gameField, fields, statusPanel, startNewGameBtn, gameScore, player1, player2) {
    this._gameField = gameField;
    this._fields = fields;
    this._statusPanel = statusPanel;
    this._startNewGameBtn = startNewGameBtn;
    this._gameScore = gameScore;
    this._player1 = player1;
    this._player2 = player2;
    this._player1.setSymbol('○');
    this._player2.setSymbol('×');
    this._currentPlayer = this._player1;
    this._firstMovePlayer = this._player1;
  }

  startNew(text) {
    for (let field of this._fields) {
      field.classList.remove('won');
      field.classList.remove('×');
      field.classList.remove('○');
      field.innerText = '';
    }
    if (text === 'New game') {
      if (this._firstMovePlayer === this._currentPlayer) {
        this._currentPlayer = this._currentPlayer === this._player1 ? this._player2 : this._player1;
      }
    } else {
      if (this._firstMovePlayer !== this._currentPlayer) {
        this._currentPlayer = this._currentPlayer === this._player1 ? this._player2 : this._player1;
      }
    }
    this._firstMovePlayer = this._currentPlayer;
    if (this._currentPlayer.symbol === '×') {
      this._changeSymbols();
    }
    this._nextMove();
    this._gameField.classList.add('game');
    this._startNewGameBtn.innerText = 'Clear';
    this._setGameScore();
    this._gameField.addEventListener('click', (e) => this._markField(e));
  }

  _markField(e) {
    if (e.target.classList.contains('game__cell') && e.target.innerText === "") {
      if (this._gameField.classList.contains('game')) {
        e.target.innerText = this._currentPlayer.symbol;
        e.target.classList.add(this._currentPlayer.symbol);
        this._checkWin();
      }
    } 
  }

  _checkWin() {
    const topLeft = this._fields[0].classList[1];
    const topMiddle = this._fields[1].classList[1];
    const topRight = this._fields[2].classList[1];
    const middleLeft = this._fields[3].classList[1];
    const middleMiddle = this._fields[4].classList[1];
    const middleRight = this._fields[5].classList[1];
    const bottomLeft = this._fields[6].classList[1];
    const bottomMiddle = this._fields[7].classList[1];
    const bottomRight = this._fields[8].classList[1];
  
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
      this._markWinnerLine(this._fields[0], this._fields[1], this._fields[2]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
      this._markWinnerLine(this._fields[3], this._fields[4], this._fields[5]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
      this._markWinnerLine(this._fields[6], this._fields[7], this._fields[8]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
      this._markWinnerLine(this._fields[0], this._fields[3], this._fields[6]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
      this._markWinnerLine(this._fields[1], this._fields[4], this._fields[7]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
      this._markWinnerLine(this._fields[2], this._fields[5], this._fields[8]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
      this._markWinnerLine(this._fields[0], this._fields[4], this._fields[8]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
      this._markWinnerLine(this._fields[2], this._fields[4], this._fields[6]);
      this._finishGame();
      this._setNumberOfWins();
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
      this._finishGame();
      this._setTies();
    } else {
      this._nextMove();
    }
  }

  _setTies() {
    this._player1.enlargeScore();
    this._player2.enlargeScore();
    this._setGameScore();
    this._statusPanel.innerText = `Ties!`;
  }

  _setGameScore() {
    this._gameScore.innerText = `${this._player1.name} - ${this._player1.score} : ${this._player2.score} - ${this._player2.name}`;
  }

  _setNumberOfWins() {
    this._currentPlayer === this._player1 ? this._player1.enlargeScore() : this._player2.enlargeScore();
    this._setGameScore();
  }
  
  _finishGame() {
    this._gameField.classList.remove('game');
    this._startNewGameBtn.innerText = 'New game';
  }
  
  _markWinnerLine(el1, el2, el3) {
    el1.classList.add('won');
    el2.classList.add('won');
    el3.classList.add('won');
    this._statusPanel.innerText = `${this._currentPlayer.name} won!`;
  }

  _changeSymbols() {
    const newSecondPlayersSymbol = this._player1.symbol;
    this._player1.setSymbol(this._player2.symbol);
    this._player2.setSymbol(newSecondPlayersSymbol);
  }

  _nextMove() {
    this._currentPlayer = this._currentPlayer === this._player1 ? this._player2 : this._player1;
    this._statusPanel.innerText = `${this._currentPlayer.name}(${this._currentPlayer.symbol}) - move`;
  }
}
