let numberOfFighter = 1;
const fightersNames = new Set();

function Fighter(properties = {}) {
  const prop = ['damage', 'strength', 'agility'];
  const defHp = 100;
  properties.hp = properties.hp === undefined || properties.hp <= 0 ? defHp : properties.hp;
  if (properties.name === undefined || fightersNames.has(properties.name)) {
    properties.name = `fighter${numberOfFighter}`;
    numberOfFighter++;
  }
  fightersNames.add(properties.name);
  prop.forEach(el => {
    properties[el] = properties[el] <= 0 || properties[el] === undefined ? properties[el] = 10 
    : properties[el];
  })
  const percentageCoef = 101;
  const maxHp = properties.hp;
  const combatHistory = {
    wins: 0,
    losses: 0
  };

  this.getName = () => properties.name;
  this.getDamage = () => properties.damage;
  this.getStrength = () => properties.strength;
  this.getAgility = () => properties.agility;
  this.getHealth = () => properties.hp;

  this.attack = enemy => {
    if (Math.floor(Math.random() * percentageCoef) > enemy.getStrength() + enemy.getAgility()) {
      console.log(`${this.getName()} makes ${this.getDamage()} damage to ${enemy.getName()}`);
      enemy.dealDamage(this.getDamage());
    } else {
      console.log(`${this.getName()} attack missed`);
    }
  };

  this.logCombatHistory = () => {
    console.log(`Name: ${this.getName()}, Wins: ${combatHistory.wins}, Losses: ${combatHistory.losses}`);
  };

  this.heal = healtHp => {
    properties.hp + healtHp > maxHp ? properties.hp = maxHp : properties.hp += healtHp;
  };

  this.dealDamage = someDamage => {
    properties.hp - someDamage < 0 ? properties.hp = 0 : properties.hp -= someDamage;
  };

  this.addWin = () => {
    combatHistory.wins++;
  };

  this.addLoss = () => {
    combatHistory.losses++;
  };
}

function setWinnerOfBattle(winner, loser) {
  console.log(`${winner.getName()} has won!`);
  winner.addWin();
  loser.addLoss();
}

function battle(fighter1, fighter2) {
  let stopBattle = false;
  [fighter1, fighter2].forEach(fighter => {
    if (!fighter) {
      console.log(`${fighter.getName()} is dead`);
      stopBattle = true;
    }
  });
  while (!stopBattle) {
    fighter1.attack(fighter2);
    if (!fighter2.getHealth()) {
      setWinnerOfBattle(fighter1, fighter2);
      stopBattle = true;
    }
    if (!stopBattle) {
      fighter2.attack(fighter1);
      if (!fighter1.getHealth()) {
        setWinnerOfBattle(fighter2, fighter1);
        stopBattle = true;
      }
    }
  }
}

const fighter1 = new Fighter({ name: 'Maximus', damage: 20, hp: 100, strength: 20, agility: 15 });
const fighter2 = new Fighter({ name: 'Commodus', damage: 25, hp: 90, strength: 25, agility: 20 });

battle(fighter1, fighter2);
