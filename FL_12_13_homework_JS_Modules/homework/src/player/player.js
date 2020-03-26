export default class Player {
  constructor(name) {
    this.name = name;
    this.symbol = '';
    this.score = 0;
  }

  setSymbol(symbol) {
    this.symbol = symbol;
  }

  enlargeScore() {
    this.score = this.score + 1;
  }
}