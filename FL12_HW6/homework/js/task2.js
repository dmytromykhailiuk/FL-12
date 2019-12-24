const data = [];
const numberOfSides = 3;
let validDataType = true;
let positiveData = true;
for (let i = 0; i < numberOfSides; i++) {
  data[i] = prompt(`Enter numeric length of ${i+1} side of the triangle`);
  if (!!data[i] && isFinite(Number(data[i]))) {
    if (Number(data[i]) > 0) {
      data[i] = Number(data[i]);
    } else {
      positiveData = false;
    }
  } else {
    validDataType = false;
  }
}
if (!validDataType) {
  alert(`input values should be ONLY numbers`);
} else {
  if (!positiveData) {
    alert(`A triangle must have 3 sides with a positive definite length`);
  } else {
    const [a, b, c] = data;
    if (a + b > c && a + c > b && c + b > a) {
      if ( a === b && b === c ) {
        console.log(`Equivalent triangle`);
      } else if (a === b || b === c || a === c) {
        console.log(`Isosceles triangle`);
      } else {
        console.log(`Normal triangle`);
      }
    } else {
      alert(`Triangle doesn't exist`);
      console.log(`Triangle doesn't exist`);
    }
  }
}
