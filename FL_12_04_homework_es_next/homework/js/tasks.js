
// Task - 1

const maxElement = arr => Math.max(...arr);

// Task - 2

const copiedArray = arr => [...arr];

// Task - 3

const addUniquedId = ({...obj}) => ({...obj, id: Symbol()});

// Task - 4

const regroupObject = obj => {
  const { name, details: { id, age, university } } = obj;
  return { university: university, user: { age: age, firstName: name, id: id } };
};

// Task - 5

const findUniqueElements = arr => Array.from(new Set(arr));

// Task - 6

const hideNumber = str => '****'.padStart(str.length, str);

// Task - 7

const throwError = () => { throw new Error('Missing Property') }

const add = (a = throwError(), b = throwError()) => a + b;

// Task - 8

const getNameUsingPromise = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => data.map(el => el.name).sort())
    .then(repozList => { console.log(repozList) })
    .catch(e => console.error(e));
};

// Task - 9

const getNameUsingAsync = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data.map(el => el.name).sort());
  } catch (e) {
    console.error(e);
  }
};
