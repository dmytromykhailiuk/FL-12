import playGame from "./js/app";

import "./scss/main.scss";

const root = document.getElementById('root');
let isFirsGame = true;
let isGameCont = false;
let isStartGame = true;

const renderScreen = () => {
  return `
    <header>
      <h1>Rock, Paper, or Scissors</h1>
      <p>Rules: Scissors beats a paper, Paper beats rock, Rock beats scissors.</p>
      <p>And we play up to three wins!</p>
    </header>
    <main id="main"></main>
  `;
}

const renderStartGameBtn = () => {
  return `
    <div class="btn-wraper">
      <buttom class="btn-starn-game">
        ${ isFirsGame ? 'Start The Game' : 'Play Again' }
      </buttom>
    </div>
  `;
}

root.innerHTML = renderScreen();
const main = document.getElementById('main');
main.innerHTML = renderStartGameBtn();

const playGame = () => {
  return `
    ${ !isGameCont ? '<button class="start-game">PLAY THE GAME</button>' : '' }
    ${ isGameCont ? showGame() : '' }
  `
};

const showGame = () => {
  return `
    <div>
      <div>
        <div><p>WIN</p><p id="first-player-wins></p></div>
        <div><p>TIES</p><p id="players-ties></p></div>
        <div><p>WIN</p><p id="first-player-wins></p></div>
      </div>
      <div >
        <div id="first-player"></div>
        <div id="second-player"></div>
      </div>
      <div class="btn-chose-panel">
        <div><button>ROCK</button></div>
        <div><button>PAPER</button></div>
        <div><button>SCISSORS</button></div>
      </div>  
    </div>
  `;
}

const addEventListeners = () => {
  if (isGameCont) {
    if (isStartGame) {

    }
  } else {
    document.getElementsByClassName(".btn-starn-game")
            .addEventListeners('click', playGame);
  }
}

addEventListeners();

