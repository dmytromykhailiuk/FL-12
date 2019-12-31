function addOne(x) {
  return x + 1;
}

function pipe(val, ...args) {
  args.forEach(arg => {
    val = arg.call(this, val);
  });
  return val;
}

pipe(1, addOne);
pipe(1, addOne, addOne);
