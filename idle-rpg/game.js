let player = {
  hp: 100,
  maxHp: 100,
  attack: 10,
  defense: 2,
  gold: 0
};

let enemyLevel = 1;
let enemy = {};
let gameRunning = true;

function spawnEnemy() {
  enemy = {
    hp: 50 * enemyLevel,
    maxHp: 50 * enemyLevel,
    attack: 5 * enemyLevel,
    reward: 10 * enemyLevel
  };
}

setInterval(gameLoop, 2000); // from 1000 → 2000 (2 seconds)

function gameLoop() {
  if (!gameRunning) return;

  const playerImg = document.getElementById("playerImg");
  const enemyImg = document.getElementById("enemyImg");

  // Player attack
  playerImg.classList.add("attack");
  setTimeout(() => playerImg.classList.remove("attack"), 200);

  enemy.hp -= player.attack;

  enemyImg.classList.add("hit");
  setTimeout(() => enemyImg.classList.remove("hit"), 200);

  // Check if enemy dies FIRST
  if (enemy.hp <= 0) {
    gameRunning = false;
    player.gold += enemy.reward;

    setTimeout(() => {
      alert("🎉 VICTORY! You defeated the enemy!");
    }, 200);

    return;
  }

  // Enemy attacks
  player.hp -= Math.max(0, enemy.attack - player.defense);

  playerImg.classList.add("hit");
  setTimeout(() => playerImg.classList.remove("hit"), 200);

  // Check if player dies
  if (player.hp <= 0) {
    gameRunning = false;

    setTimeout(() => {
      alert("💀 GAME OVER! You were defeated.");
    }, 200);

    return;
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