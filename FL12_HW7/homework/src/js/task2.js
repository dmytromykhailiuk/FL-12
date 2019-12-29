if (confirm('Do you want to play a game?')) {
  const maxPrize = 100;
  const attemptsNumber = 3;
  const maxOfRange = 8;
  const rangeAddend = 4;
  const magnificationFactor = 2;
  const enteredData = new Set();
  let userNumber, maxCurrentOfRange, maxCurrentPrize, divisionFactor, randomNumber;
  let gain = 0;
  let numGamesWon = 0;
  let gameWonCoef = 1;
  let gameGoOn = true;
  while (gameGoOn) {
    maxCurrentOfRange = maxOfRange + numGamesWon * rangeAddend;
    randomNumber = Math.floor(Math.random() * (maxCurrentOfRange + 1));
    divisionFactor = 1;
    let attemptsLeft = 3;
    enteredData.clear();
    for (let i = 0; i < attemptsNumber; i++) {
      maxCurrentPrize = maxPrize * gameWonCoef / divisionFactor;
      let validUserNumber = false;
      while (!validUserNumber) {
        let isNumber = false;
        let isInOfRange = false;
        validUserNumber = false;
        userNumber = prompt(`
        Choose a roulette pocket number from 0 to ${maxCurrentOfRange}
        Attempts left: ${attemptsLeft}
        Total prize: ${gain}$
        Possible prize on current attempt: ${maxCurrentPrize}$
        `);
        if (!!userNumber && userNumber !== null && isFinite(Number(userNumber))) {
          isNumber = true;
          userNumber = Number(userNumber);
        } else {
          alert('Input values should be ONLY numbers');
        }
        if (isNumber) {
          if (userNumber >= 0 && userNumber <= maxCurrentOfRange) {
            isInOfRange = true;
          } else {
            alert('Input pocket number is OUT of range');
          }
        }
        if (isInOfRange) {
          if (!enteredData.has(userNumber)) {
            validUserNumber = true;
          } else {
            alert('Your pocket number was previously entered. Enter a new pocket number');
          }
        }
      }
      enteredData.add(userNumber);
      if (randomNumber === userNumber) {
        gain += maxCurrentPrize;
        numGamesWon++;
        gameWonCoef *= magnificationFactor;
        if (!confirm(`
        Congratulation, you won!
        Your prize is: ${gain}$.
        Do you want to continue?
        `)
        ) {
          alert(`Thank you for your participation. Your prize is: ${gain}$`);
          if (!confirm('Do you want to play again?')) {
            gameGoOn = false;
          }
        }
        break;
      }
      divisionFactor *= magnificationFactor;
      attemptsLeft--;
    }
    if (!attemptsLeft) {
      gain = 0;
      numGamesWon = 0;
      gameWonCoef = 1;
      alert(`Thank you for your participation. Your prize is: ${gain}$`);
      if (!confirm('Do you want to play again?')) {
        gameGoOn = false;
      }
    }
  }
} else {
  alert('You did not become a billionaire, but can.');
}
