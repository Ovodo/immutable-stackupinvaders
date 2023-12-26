let alienImage;
let spaceShip;
let tank;
let invaders;
let shooterImage;
let player;
let allDebris = [];
let allPowerUps = [];
let gameOver = false;
let canvas;
let canvasEl;
let loading = 10;
let loadingPlus = true;
let resumeButton;
let upgradedShooterImage;
let backgroundImage;
let POWER_UPS = 5;
let levelDurationMillis = 80000; // Set the desired level duration in milliseconds
let levelStartTime;
let timerStarted = false;
let level = 1;
const NUM_DEBRIS = 5; // number of space debris
let levelAdvancement = false;
let levelAdvancementText = "";
let secondsRemaining;
let winner = false;

function preload() {
  alienImage = loadImage("invader1.png");
  spaceShip = loadImage("ship.png");
  tank = loadImage("tank.png");
  shooterImage = loadImage("player.png");
  backgroundImage = loadImage("flat.jpg");
  upgradedShooterImage = loadImage("playerv2.png");
}

function setup() {
  canvasEl = document.getElementById("sketch-holder");
  canvas = createCanvas(canvasEl.offsetWidth, 400);
  canvas.style("display", "block");
  canvas.parent("sketch-holder");
  level = 1;
  invaders = new Invaders(alienImage, spaceShip, tank, 3);
  player = new Player(shooterImage);
  // levelStartTime = millis();
  spawnPowerUps();

  // create the debris objects
  for (let i = 0; i < NUM_DEBRIS; i++) {
    if (allDebris.length < NUM_DEBRIS) {
      allDebris.push(new Debris());
    }
  }

  // Create the resume game button but hide it initially
  resumeButton = createButton("Resume Game");
  resumeButton.position(width / 2 - 40, height / 2 + 220);
  resumeButton.mousePressed(resumeGame);
  resumeButton.hide();
}

function spawnPowerUps() {
  // create the powerup objects
  for (let i = 0; i < POWER_UPS; i++) {
    if (allPowerUps.length < POWER_UPS) {
      // Randomly choose between Powerup and BulletShield
      const randomPowerupType = random() < 0.5 ? "powerup" : "bulletshield";

      // Create a new instance based on the randomly chosen type
      if (randomPowerupType === "powerup") {
        allPowerUps.push(new Powerup());
      } else {
        allPowerUps.push(new BulletShield());
      }
    }
  }
}
function showGameOver() {
  background(0);
  gameOver = true;
  fill(255);
  let gameOverT;

  if (secondsRemaining === 0) {
    gameOverT =
      "Time Up! Game Over! Click to restart. Your score was " + player.score;
  } else {
    gameOverT = "GAME OVER! Click to continue. Your score was " + player.score;
  }
  textSize(16);
  text(gameOverT, width / 2, height / 2);
}

function connectToStart() {
  background(0, 0, 139);
  fill(255, 255, 255);
  textSize(16);
  let startText1 = "Game will start after successful authentication";
  let startText2 = "Click on Connect passport";
  let textXpos1 = width / 2 - textWidth(startText1) / 2;
  let textXpos2 = width / 2 - textWidth(startText2) / 2;
  let textYpos = height / 2;

  if (window.isconnecting) {
    startText1 = "Connecting ...";
    textXpos1 = width / 2 - textWidth(startText1) / 2;
    if (loadingPlus === true && loading == 100) {
      loadingPlus = false;
    } else if (loading == 10 && loadingPlus === false) {
      loadingPlus = true;
    }
    if (loadingPlus) {
      loading++;
    } else {
      loading--;
    }
    fill(loading + 150);
  }

  text(startText1, textXpos1, textYpos);
  text(startText2, textXpos2, textYpos + 20);
}

function resumeGame() {
  console.log("Resuming game, hiding resume button");
  // invaders.nextLevel();
  // spawnPowerUps();
  setup();
  resumeButton.hide();
  loop();
  let nft = document.getElementById("nft");
  nft.innerHTML = "";
}

function draw() {
  if (level == 3 && invaders.aliens.length == 0) {
    background(0);
  }

  if (gameOver) {
    showGameOver();
  } else if (window?.userProfile?.email) {
    if (!player.gamePaused) {
      // Shift the background based on player's movement
      let parallax = 0.11;
      let bgSpeed = 5; // Adjust the speed of the background shift
      let bgX = player.x * parallax - bgSpeed;
      let bgY = player.y * parallax - bgSpeed;

      // Draw background image
      image(backgroundImage, 0, 0, width, height);
      drawLevel();
      drawCountdownTimer();

      // background(192, 192, 192);
      player.update();
      updateDebrisAndCheckCollisions();
      updatePowerUpsAndCheckCollisions();
      invaders.update(player);
    }

    player.draw();
    player.drawInfo();
    invaders.draw();

    // Check if the game needs to be paused
    if (player.gamePaused && resumeButton.elt.style.display === "none") {
      console.log("Pausing game, showing resume button");
      noLoop();
      resumeButton.show();
    }

    if (player.lives == 0 || (secondsRemaining == 0 && timerStarted)) {
      gameOver = true;
      timerStarted = false;
    }
    if (invaders.aliens.length == 0) {
      // Set level advancement to true when the current level is completed
      levelAdvancement = true;
      levelAdvancementText =
        level < 3
          ? `Advancing to Level ${level + 1}...`
          : `Congratulation!!, You won the game`;
      invaders.nextLevel();
    }
    if (player.score == 850) {
      player.upgradeSpaceship();
    }
    // Check if the level is advancing
    if (levelAdvancement) {
      fill(255);
      textSize(24);
      textAlign(CENTER, CENTER);
      text(levelAdvancementText, width / 2, height / 2 + 40);
      if (level === 3) {
        winner = true;
        resumeButton.html("Restart");
      }
      noLoop();
      setTimeout(() => {
        levelAdvancement = false;
        loop();
        levelStartTime = millis();

        spawnPowerUps();
      }, 1000);
    }
  } else {
    connectToStart();
  }

  // Update button visibility based on authentication status
  document.getElementById("btn-passport").hidden = window?.userProfile?.email;
  document.getElementById("btn-logout").hidden = !window?.userProfile?.email;
}

function mousePressed() {
  if (gameOver === true) {
    gameOver = false;
    setup();
  }
}

function drawLevel() {
  fill(255);
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text(`Level: ${level}`, round(width - 10), round(height - 10));
}
function drawCountdownTimer() {
  fill(255);
  textSize(12);
  textAlign(CENTER, TOP);
  // Check if the timer has started
  if (!timerStarted) {
    // Start the timer when the screen loads
    levelStartTime = millis();
    timerStarted = true;
  }
  // Calculate the remaining time in seconds
  let remainingMillis = levelDurationMillis - (millis() - levelStartTime);
  secondsRemaining = Math.max(0, Math.ceil(remainingMillis / 1000));

  text(`Time: ${secondsRemaining}s`, round(width / 2), round(20));

  // Check if the countdown reaches zero
  if (remainingMillis <= 0) {
    // Do something when the level time is up (e.g., end the level, decrease player's life, etc.)
    // You can add your logic here.
    // console.log("Level time is up!");
  }
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW || keyCode == 88) {
    player.moveRight();
  } else if (keyCode === LEFT_ARROW || keyCode == 90) {
    player.moveLeft();
  } else if (keyCode === 32) {
    player.shoot();
  }

  if (keyCode === UP_ARROW) {
    player.moveUp();
  } else if (keyCode == DOWN_ARROW) {
    player.moveDown();
  }
}

function updatePowerUpsAndCheckCollisions() {
  for (let i = 0; i < allPowerUps.length; i++) {
    allPowerUps[i].update();
    allPowerUps[i].display();

    if (allPowerUps[i].hasHitPlayer(player)) {
      if (allPowerUps[i] instanceof BulletShield) {
        // allPowerUps[i].draw(player);
        player.activateBulletShield();
      } else if (allPowerUps[i] instanceof Powerup) {
        player.lives += 1;
      }
      allPowerUps.splice(i, 1);
      break;
    }
  }
}
function updateDebrisAndCheckCollisions() {
  for (let i = 0; i < allDebris.length; i++) {
    allDebris[i].update();
    allDebris[i].display();

    if (allDebris[i].hasHitPlayer(player)) {
      allDebris.splice(i, 1);
      player.loseLife();
      break;
    }
  }
}
function windowResized() {
  resizeCanvas(canvasEl.offsetWidth, 400);
  background(0);
}
