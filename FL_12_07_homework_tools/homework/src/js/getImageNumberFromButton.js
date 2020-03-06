const getImageNumberFromButton = (buttonName) => {
  if (buttonName === "PAPER") {
    return 1;
  } else if(buttonName === "ROCK") {
    return 2;
  } else {
    return 3;
  }
};

export default getImageNumberFromButton;