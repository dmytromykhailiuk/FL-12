import "./scss/main.scss";
import getRundomImageNumber from "./js/getRundomImageNumber";
import whoWinsRound from "./js/whoWinsRound";
import getImageNumberFromButton from "./js/getImageNumberFromButton";
import getNameOfThing from "./js/getNameOfThing";

import noneImg from "./img/none.png";
import paperImg from "./img/paper.png";
import rockImg from "./img/rock.png";
import scissorsImg from "./img/scissors.png";

let isFisrstGame = true;
let round = 1;

const root = document.getElementById('root');
root.innerHTML = `
  <header>
    <h1>Rock, Paper, or Scissors</h1>
    <p>Rules: Scissors beats a paper, Paper beats rock, Rock beats scissors.</p>
    <p>And we play up to three wins!</p>
  </header>
  <main id="main">
    <button class="btn-starn-game" > Start New Game </button>
    <div id='winner-panel' class='hide'>You Won!</div>
    <div id="score" class="hide">
      <div><p>WIN</p><p id="first-player-wins">0</p></div>
      <div><p>TIES</p><p id="players-ties">0</p></div>
      <div><p>WIN</p><p id="second-player-wins">0</p></div>
    </div>
    <div id="game" class='hide'>
      <div class="main-game-panel">
        <div id="first-player">
          <img src="${noneImg}">
        </div>
        <div id="second-player">
          <img src="${noneImg}">
        </div>
      </div>
      <div class="btn-chose-panel">
        <button class="change-btn-img">ROCK</button>
        <button class="change-btn-img">PAPER</button>
        <button class="change-btn-img">SCISSORS</button>
      </div>  
    </div>
  </main>
  <footer id="statys-panel"></footer>
`;

document.querySelector(".btn-starn-game").addEventListener('click', (e) => {
  if (!isFisrstGame) {
    document.getElementById('winner-panel').classList.add('hide');
    document.getElementById('first-player-wins').textContent = 0;
    document.getElementById('second-player-wins').textContent = 0;
    document.getElementById('players-ties').textContent = 0;
  } else {
    document.getElementById('score').classList.remove('hide');
    isFisrstGame = false;
  }
  document.querySelector('.btn-starn-game').classList.add('hide');  
  document.getElementById('game').classList.remove('hide');
  
});

const changeImg = (player, imgNum) => {
  const images = [noneImg, paperImg, rockImg, scissorsImg]
  const el = document.querySelector(`#${player}-player > img`);
  el.src = images[imgNum];
  setTimeout(() => el.src = images[0], 2500);
}

const refreshScore = (status) => {
  const firstPlayer = document.getElementById('first-player-wins');
  const secondPlayer = document.getElementById('second-player-wins');
  const ties = document.getElementById('players-ties');
  if (status === 'WIN') {
    firstPlayer.textContent = +firstPlayer.textContent + 1;
  } else if (status === 'LOSE') {
    secondPlayer.textContent = +secondPlayer.textContent + 1;
  } else {
    ties.textContent = +ties.textContent + 1;
  }
}

const showSatusPanel = (n1, n2, str) => {
  let winner;
  if (str === "TIES") {
    winner = "Ties";
  } else if (str === "WIN") {
    winner = "You’ve WON";
  } else {
    winner = "You’ve LOST";
  }
  document.getElementById('statys-panel').textContent = `
    Round ${round}, ${getNameOfThing(n1)} vs. ${getNameOfThing(n2)}, ${winner}!
  `;
  console.log(`Round ${round}, ${getNameOfThing(n1)} vs. ${getNameOfThing(n2)}, ${winner}!`);
  round++;
};

const finishTheGame = () => {
  const firstPlayerScore = document.getElementById('first-player-wins').textContent;
  const secondPlayerScore = document.getElementById('second-player-wins').textContent;
  if (firstPlayerScore === '3' || secondPlayerScore === '3') {
    document.getElementById('winner-panel').textContent = firstPlayerScore - secondPlayerScore > 0
    ? "You Won!" : "You Lost!";
    console.log(firstPlayerScore - secondPlayerScore > 0 ? "You Won!" : "You Lost!");
    document.querySelector('.btn-starn-game').classList.remove('hide');
    document.getElementById('winner-panel').classList.remove('hide');
    document.getElementById('game').classList.add('hide');
    document.getElementById('statys-panel').textContent = '';
    round = 1;
  }
}

const playTheGame = (e) => {
  if (e.target.classList.contains("change-btn-img")) {
    document.querySelector(".btn-chose-panel").removeEventListener('click', playTheGame);
    let myNum = getImageNumberFromButton(e.target.textContent);
    let enemyNum = getRundomImageNumber();
    changeImg('first', myNum);
    changeImg('second', enemyNum);
    const winerStr = whoWinsRound(myNum, enemyNum);
    refreshScore(winerStr);
    showSatusPanel(myNum, enemyNum, winerStr);
    setTimeout(() => {
      document.querySelector(".btn-chose-panel").addEventListener('click', playTheGame);
      finishTheGame();
    }, 2500);   
  }
}

document.querySelector(".btn-chose-panel").addEventListener('click', playTheGame);
