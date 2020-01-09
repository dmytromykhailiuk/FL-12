const convert = (...arr) => arr.map(el => el === +el ? el + '' : +el);

const executeforEach = (arr, f) => {
  for (let el of arr) {
    f(el);
  }
};

const mapArray = (arr, f) => {
  const newArr = [];
  let i = 0;
  executeforEach(arr, el => {
    newArr[i] = f(+el);
    i++;
  });
  return newArr;
};

const filterArray = (arr, f) => {
  const newArr = [];
  let i = 0;
  executeforEach(arr, el => {
    if (f(el)) {
      newArr[i] = el;
      i++;
    }
  });
  return newArr;
};

const flipOver = str => str.split('').reverse().join('');

const makeListFromRange = arr => {
  const newArr = [];
  let i = 0;
  for (let el = arr[0]; el <= arr[1]; el++) {
    newArr[i] = el;
    i++;
  }
  return newArr;
};

const getArrayOfKeys = (arr, pr) => {
  const newArr = [];
  let i = 0;
  executeforEach(arr, () => {
    newArr[i] = arr[i][pr];
    i++;
  });
  return newArr;
};

const substitute = arr => {
  const limit = 30;
  return mapArray(arr, el => el < limit ? '*' : el);
};
