function isLeapYear(val) {
  const year = new Date(val).getFullYear();
  if (isNaN(year)) {
    return 'Invalid Date';
  }
  const isYearALeapYear = new Date(year, 1, 29).getDate() === 29;
  return isYearALeapYear ? `${year} is a leap year` : `${year} is not a leap year`;
}

isLeapYear('2020-01-01 00:00:00');
isLeapYear('2020-01-01 00:00:00777');
isLeapYear('2021-01-15 13:00:00');
isLeapYear('2200-01-15 13:00:00');
isLeapYear(1213131313135465656654564646542132132131);
isLeapYear(1213131313);
