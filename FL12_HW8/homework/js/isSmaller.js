function isBigger(val1, val2) {
  return val1 > val2;
}

function isSmaller(val1, val2) {
  return val1 === val2 ? false : !isBigger(val1, val2);
}

isSmaller(5, -1);
