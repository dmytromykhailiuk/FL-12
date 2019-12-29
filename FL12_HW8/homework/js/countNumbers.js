function makeNumber(str) {
  return str.split('').filter(el => el >= '0' && el <= '9').join('');
}

function countNumbers(str) {
  const obj = {};
  makeNumber(str).split('').forEach(el => obj.hasOwnProperty(el) ? obj[el]++ : obj[el] = 1);
  return obj;
}

countNumbers('erer384jj4444666888jfd123');
countNumbers('jdjjka000466588kkkfs662555');
countNumbers('');
