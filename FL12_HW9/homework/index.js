function convert (...arr) {
  const newArr = [];
  for (let el of arr) {
    newArr.push(el === +el ? el + '' : +el);
  }
  return newArr;
}

function executeforEach (arr, f) {
  for (let el of arr) {
    f(el);
  }
}

function mapArray (arr, f) {
 const newArr = [];
 let i = 0;
 executeforEach(arr, el => {
   newArr[i] = f(+el);
   i++;
 });
 return newArr;
}

function filterArray (arr, f) {
  const newArr = [];
  let i = 0;
  executeforEach(arr, el => {
    if (f(el)) {
      newArr[i] = el;
      i++;
    }
  });
  return newArr;
}

function flipOver (str) {
  let newStr = '';
  for (let i = str.length - 1; i >= 0; i--) {
    newStr += str[i];
  }
  return newStr;
}

function makeListFromRange (arr) {
  const newArr = [];
  let i = 0;
  for (let el = arr[0]; el <= arr[1]; el++) {
    newArr[i] = el;
    i++;
  }
  return newArr;
}

function getArrayOfKeys (arr, pr) {
  const newArr = [];
  let i = 0;
  executeforEach(arr, () => {
    newArr[i] = arr[i][pr];
    i++;
  });
  return newArr;
}

function substitute (arr) {
  const limit = 30;
  return mapArray(arr, el => el < limit ? '*' : el);
}

function getPastDay (date, daysPassed) {
  const milisecInDay = 86400000;
  return new Date(date.getTime() - daysPassed * milisecInDay).getDate();
}

function formatDate (date) {
  const ancillaryVal = 10;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours() < ancillaryVal ? '0' + date.getHours() : date.getHours();
  const minutes = date.getMinutes() < ancillaryVal ? '0' + date.getMinutes() : date.getMinutes();
  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
