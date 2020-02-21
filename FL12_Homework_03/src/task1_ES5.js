function Deck (){
  this.cards = (function() {
    var arr = [];
    for (var i = 0; i < 4; i++) {
      for (var b = 1; b <= 13; b++) {
        arr.push(new Card(Card.suits()[i], b));
      }
    }
    return arr;
  })();

  this.getCount = function() {
    return this.cards.length;
  }
  
  this.shuffle = function() {
    var j, temp;
    for (let i = this.cards.length - 1; i > 0; i--) {
      j = Math.floor(Math.random()*(i + 1));
      temp = this.cards[j];
      this.cards[j] = this.cards[i];
      this.cards[i] = temp;
    }
  }
  
  this.draw = function(n) {
    var num = n > this.cards.length ? this.cards.length : n;
    var outputCards = this.cards.slice(-num);
    this.cards = this.cards.slice(0, -num);
    return outputCards;
  }
}

function Card(suit, rank) {
  this.suit = suit;
  this.rank = rank;

  this.isFaceCard = function() {
    return this.rank === 1 || this.rank > 10 ? true : false;
  }

  this._rankNames = function() {
    return { 1: 'Ace', 11: 'Jack', 12: 'Queen', 13: 'King' };
  };

  this._rankName = function() {
    var rankName = this.rank === 1 || this.rank > 10 ? this._rankNames()[this.rank] : this.rank;
    return rankName;
  }
  this.toString = function() {
    return this._rankName() + ' of ' + this.suit;
  }
}


Card.suits = function() { return ['hearts', 'diamonds', 'clubs', 'spades']};

Card.compare = function(card1, card2) {
  if (card1[0].rank === card2[0].rank) {
    return card1.toString() + ' and ' + card2.toString() + ' are equal';
  } else if (card1[0].rank > card2[0].rank) {
    return card1.toString() + ' is greater than ' + card2.toString();
  } else {
    return card1.toString() + ' is less than ' + card2.toString();
  }
}

function Player(name) {
  this.name = name;
  this._wins = 0;
  this.deck = (function() {
    var newDeck = new Deck();
    newDeck.shuffle();
    return newDeck;
  })();

  this.getWins = function() {
    return this._wins;
  }
}

Player.play = function(player1, player2) {
  var rezOfCompare;
  while (player1.deck.getCount() > 0) {
    rezOfCompare = Card.compare(player1.deck.draw(1), player2.deck.draw(1));
    console.log(rezOfCompare);
    if (rezOfCompare.includes('greater')) {
      console.log('So, ' + player1.name + ' wins in this round');
      player1._wins = player1._wins + 1;
    } else if(rezOfCompare.includes('less')) {
      console.log('So, ' + player2.name + ' wins in this round');
      player2._wins = player2._wins + 1;
    }
  }
  console.log('Score ' + player1.getWins() + ' : ' + player2.getWins());
  if (player1.getWins() === player2.getWins()) {
    console.log('Two players scored the same number of points');
    
  }
  var winner = player1.getWins() > player2.getWins() ? player1.name : player2.name;
  console.log(winner + ' wins in the Game'); 
}


const player1 = new Player('Tom');
const player2 = new Player('Jerry');
Player.play(player1, player2);

