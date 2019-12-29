function makeNumber(str) {
  return str.split('').filter(el => el >= '0' && el <= '9').join('');
}

makeNumber('erer384jjjfd123');
makeNumber('123098h76gfdd');
makeNumber('ijifjgdj');
