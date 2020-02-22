const maxElement = arr => Math.max(...arr);

const copiedArray = arr => [...arr];

const addUniquedId = ({...obj}) => ({...obj, id: Symbol()});

const regroupObject = obj => {
  const { name, details: { id, age, university } } = obj;
  return { university: university, user: { age: age, firstName: name, id: id } };
};

const findUniqueElements = arr => Array.from(new Set(arr));

const hideNumber = str => str.split('').map((el, i) => str.length - i < 5 ? el : '*').join('');

const add = (...arr) => {
  if (arr.length > 1) return arr[0] + arr[1];
  throw new Error('Missing Property');
};

const getNameUsingPromise = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => data.map(el => el.name).sort())
    .then(repozList => { console.log(repozList) })
    .catch(e => console.error(e));
};

const getNameUsingAsync = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data.map(el => el.name).sort());
  } catch (e) {
    console.error(e);
  }
};
