class Desk {
  constructor() {
    this.cards = (() => {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        for (let b = 1; b <= 13; b++) {
          arr.push(new Card(Card.suits[i], b));
        }
      }
      return arr;
    })();
  }

  get count() {
    return this.cards.length;
  }

  shuffle() {
    let j, temp;
	  for(let i = this.cards.length - 1; i > 0; i--){
	  	j = Math.floor(Math.random()*(i + 1));
	  	temp = this.cards[j];
	  	this.cards[j] = this.cards[i];
	  	this.cards[i] = temp;
	  }
  }

  draw(n) {
    const num = n > this.cards.length ? this.cards.length : n;
    this.cards = this.cards.slice(0, -num);
    return this.cards.slice(-num);
  }
}

class Card {
  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get _rankNames() {
    return { 1: 'Ace', 11: 'Jack', 12: 'Queen', 13: 'King' };
  };

  static suits = ['hearts', 'diamonds', 'clubs', 'spades'];
 
  get isFaceCard() {
    return this.rank === 1 || this.rank > 10 ? true : false;
  }
 
  get _rankName() {
    const rankName = this.rank === 1 || this.rank > 10 ? this._rankNames[this.rank] : this.rank;
    return rankName;
  }

  toString() {
    return `${this._rankName} of ${this.suit}`;
  }

  compare(card1, card2) {
    return card1 > card2;
  }
}

class Player {
  constructor(name, desk) {
    this.name = name;
    this.wins = 0;
    this.deck = desk;
  }

  play(player1, player2) {

  }
}

let desk1 = new Desk();
console.log(desk1.constructor.toString().split(' ')[1]);
