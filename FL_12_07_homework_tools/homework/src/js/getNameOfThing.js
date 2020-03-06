const getNameOfThing = (n) => {
  if (n === 1) {
    return "Paper";
  } else if (n === 2) {
    return "Rock";
  } else {
    return "Scissors";
  }
}

export default getNameOfThing;