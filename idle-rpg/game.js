let player = {
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 2,
  gold: 0
};

let enemyLevel = 1;
let enemy = {};

function spawnEnemy() {
  enemy = {
    hp: 50 * enemyLevel,
    maxHp: 50 * enemyLevel,
    attack: 5 * enemyLevel,
    reward: 10 * enemyLevel
  };
}

function gameLoop() {
  // Player attacks
  enemy.hp -= player.attack;

  // Enemy attacks
  player.hp -= Math.max(0, enemy.attack - player.defense);

  // Enemy dies
  if (enemy.hp <= 0) {
    player.gold += enemy.reward;
    enemyLevel++;
    spawnEnemy();
  }

  // Player dies
  if (player.hp <= 0) {
    player.hp = player.maxHp;
  }

  updateUI();
}

function upgradeAttack() {
  if (player.gold >= 20) {
    player.gold -= 20;
    player.attack += 2;
  }
}

function upgradeDefense() {
  if (player.gold >= 15) {
    player.gold -= 15;
    player.defense += 1;
  }
}

function updateUI() {
  document.getElementById("playerHp").textContent =
    player.hp + "/" + player.maxHp;

  document.getElementById("playerAtk").textContent = player.attack;
  document.getElementById("playerDef").textContent = player.defense;
  document.getElementById("gold").textContent = player.gold;

  document.getElementById("enemyHp").textContent =
    enemy.hp + "/" + enemy.maxHp;

  document.getElementById("enemyLvl").textContent = enemyLevel;
}

// Start game
spawnEnemy();
setInterval(gameLoop, 1000);