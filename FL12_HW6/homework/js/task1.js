const data = [];
const knownNumbers = [`a`, `b`, `c`];
let validData = true;
for (let i = 0; i < knownNumbers.length; i++) {
  data[i] = Number(
    prompt(
      `Enter "${knownNumbers[i]}" - knownNumber for the quadratic equation`
    )
  );
  if (data[i] === 0 || !isFinite(data[i])) {
    validData = false;
  }
}
if (validData) {
  const [a, b, c] = data;
  const discCoef = 4;
  const disc = b*b - discCoef*a*c;
  const qECoef = 2;
  if (disc === 0) {
    console.log(`x = ${-b/(qECoef*c)}`);
  } else if (disc > 0) {
    console.log(`x1 = ${Math.round((-b + Math.sqrt(disc))/(qECoef*a))}`);
    console.log(`x2 = ${Math.round((-b - Math.sqrt(disc))/(qECoef*a))}`);
  } else {
    console.log(`no solution`);
  }
} else {
  console.log(`Invalid input data`);
}
