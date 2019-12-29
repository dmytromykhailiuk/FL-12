function getMin(...arg) {
  return arg.sort((a, b) => a - b)[0];
}

getMin(3, 0, -3);
