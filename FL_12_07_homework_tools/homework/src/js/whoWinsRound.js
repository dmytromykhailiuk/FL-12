const whoWinsRound = (myNum, enemyNum) => {
  if (myNum === 1 && enemyNum === 1 || myNum === 2 && enemyNum === 2 || myNum === 3 && enemyNum === 3) {
    return 'TIES';
  }
  if (myNum === 1 || enemyNum === 1) {
    if (myNum === 2 || enemyNum === 2) {
      return myNum === 1 ? 'WIN' : 'LOSE';
    }
    if (myNum === 3 || enemyNum === 3) {
      return myNum === 3 ? 'WIN' : 'LOSE';
    }
  }
  if (myNum === 3 || enemyNum === 3) {
    if (myNum === 2 || enemyNum === 2) {
      return myNum === 2 ? 'WIN' : 'LOSE';
    }
  }
}

export default whoWinsRound;