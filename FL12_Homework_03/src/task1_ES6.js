class Deck {
  constructor() {
    this.cards = (() => {
      const arr = [];
      for (let i = 0; i < 4; i++) {
        for (let b = 1; b <= 13; b++) {
          arr.push(new Card(Card.suits()[i], b));
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
	  for (let i = this.cards.length - 1; i > 0; i--) {
	  	j = Math.floor(Math.random()*(i + 1));
	  	temp = this.cards[j];
	  	this.cards[j] = this.cards[i];
	  	this.cards[i] = temp;
	  }
  }

  draw(n) {
    const num = n > this.cards.length ? this.cards.length : n;
    const outputCards = this.cards.slice(-num);
    this.cards = this.cards.slice(0, -num);
    return outputCards;
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

  static suits() { return ['hearts', 'diamonds', 'clubs', 'spades']};
 
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

  static compare(card1, card2) {
    if (card1[0].rank === card2[0].rank) {
      return `${card1.toString()} and ${card2.toString()} are equal`;
    } else if (card1[0].rank > card2[0].rank) {
      return `${card1.toString()} is greater than ${card2.toString()}`;
    } else {
      return `${card1.toString()} is less than ${card2.toString()}`;
    }
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this._numOfWins = 0;
    this.deck = (() => {
      const newDeck = new Deck();
      newDeck.shuffle();
      return newDeck;
    })();
  }

  get wins() {
    return this._numOfWins;
  }

  static play(player1, player2) {
    let rezOfCompare;
    while (player1.deck.count > 0) {
      rezOfCompare = Card.compare(player1.deck.draw(1), player2.deck.draw(1));
      console.log(rezOfCompare);
      if (rezOfCompare.includes('greater')) {
        console.log(`So, ${player1.name} wins in this round`);
        player1._numOfWins = player1._numOfWins + 1;
      } else if(rezOfCompare.includes('less')) {
        console.log(`So, ${player2.name} wins in this round`);
        player2._numOfWins = player2._numOfWins + 1;
      }
    }
    console.log(`Score ${player1.wins} : ${player2.wins}`);
    if (player1.wins === player2.wins) {
      console.log('Two players scored the same number of points');
      
    }
    const winner = player1.wins > player2.wins ? player1.name : player2.name;
    console.log(`${winner} wins in the Game`); 
  }
}

const player1 = new Player('T1');
const player2 = new Player('K1');
Player.play(player1, player2);
