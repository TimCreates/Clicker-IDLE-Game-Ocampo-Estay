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
  const playerImg = document.getElementById("playerImg");
  const enemyImg = document.getElementById("enemyImg");

  // Player attack animation
  playerImg.classList.add("attack");
  setTimeout(() => playerImg.classList.remove("attack"), 200);

  enemy.hp -= player.attack;

  // Enemy hit effect
  enemyImg.classList.add("hit");
  setTimeout(() => enemyImg.classList.remove("hit"), 200);

  // Enemy attacks
  player.hp -= Math.max(0, enemy.attack - player.defense);

  // Player hit effect
  playerImg.classList.add("hit");
  setTimeout(() => playerImg.classList.remove("hit"), 200);

  // Enemy dies
  if (enemy.hp <= 0) {
    enemyLevel++;
    player.gold += enemy.reward;

    // little "death" effect
    enemyImg.style.opacity = 0;
    setTimeout(() => {
      enemyImg.style.opacity = 1;
      spawnEnemy();
    }, 300);
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