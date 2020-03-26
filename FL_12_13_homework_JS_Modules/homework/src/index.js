import "./main.scss";
import Player from './player/player';
import Game from './game/game';

const game = new Game(
  document.querySelector('.game__grid'),
  document.querySelectorAll('.game__cell'),
  document.querySelector('.status__panel'),
  document.querySelector('.game__start--btn'),
  document.querySelector('.game__score'),
  new Player('Player1'), 
  new Player('Player2')
);

document
  .querySelector('.game__start--btn')
  .addEventListener('click', (e) => game.startNew(e.target.innerText));

