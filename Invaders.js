class Invaders {
  constructor(alienImage, spaceShip, tank, rowsCount) {
    this.alienImage = alienImage;
    this.spaceShip = spaceShip;
    this.tank = tank;
    this.rowsCount = rowsCount;
    this.direction = 0;
    this.y = 40;
    this.powerUps = [];
    this.shootUp = false;
    this.aliens = this.initialiseAliens(this.shootUp);
    this.bullets = [];
    this.movingDown = true;
    this.speed = 0.2;
    this.timeSinceLastBullet = 0;
  }

  update(player) {
    for (let alien of this.aliens) {
      if (this.direction == 0) {
        alien.x += this.speed;
      } else if (this.direction == 1) {
        alien.x -= this.speed;
      }
      if (alien.hasHitPlayer(player)) {
        player.loseLife();
        let i = this.aliens.indexOf(alien);
        if (i != -1) {
          this.aliens.splice(i, 1);
        }
      }
    }

    if (this.hasChangedDirection()) {
      this.moveAlienDown();
    }
    // if (this.aliens.length == 0) {
    //   this.nextLevel();
    // }

    if (this.timeSinceLastBullet >= 40) {
      let bottomAliens = this.getBottomAliens();
      if (bottomAliens.length) {
        this.makeABottomAlienShoot(bottomAliens);
      }
    }
    this.timeSinceLastBullet++;

    this.updateBullets(player);
  }

  hasChangedDirection() {
    for (let alien of this.aliens) {
      if (alien.x >= width - 40) {
        this.direction = 1;
        return true;
      } else if (alien.x <= 20) {
        this.direction = 0;
        return true;
      }
    }
    return false;
  }

  moveAlienDown() {
    for (let alien of this.aliens) {
      if (this.movingDown) {
        alien.y += 10;
        if (alien.y >= height - 30) {
          this.movingDown = false;
        }
      } else {
        alien.y -= 10;
        if (alien.y <= 0) {
          this.movingDown = true;
        }
      }
    }
  }

  getBottomAliens() {
    let allXPositions = this.getAllXPositions();
    let aliensAtTheBottom = [];
    for (let alienAtX of allXPositions) {
      let bestYPosition = 0;
      let lowestAlien;
      for (let alien of this.aliens) {
        if (alien.x == alienAtX) {
          if (alien.y > bestYPosition) {
            bestYPosition = alien.y;
            lowestAlien = alien;
          }
        }
      }
      aliensAtTheBottom.push(lowestAlien);
    }
    return aliensAtTheBottom;
  }

  getAllXPositions() {
    let allXPositions = new Set();
    for (let alien of this.aliens) {
      allXPositions.add(alien.x);
    }
    return allXPositions;
  }

  nextLevel() {
    this.speed += 0.2;
    this.rowsCount++;
    if (level < 3) {
      level += 1;
    }
    this.aliens = this.initialiseAliens(this.shootUp);
    levelDurationMillis = 80000;
  }

  initialiseAliens(shootUp) {
    let aliens = [];
    let y = 40;

    // Level 1: Ordinary Aliens
    if (level === 1) {
      for (let i = 0; i < this.rowsCount; i++) {
        for (let x = 40; x < width - 40; x += 30) {
          aliens.push(new Alien(x, y, this.alienImage, shootUp));
          // aliens.push(new SpaceShip(x, y, this.spaceShip, shootUp));
        }
        y += 40;
      }
    }

    // Level 2: SpaceShip Aliens
    else if (level === 2) {
      for (let i = 0; i < this.rowsCount; i++) {
        for (let x = 40; x < width - 40; x += 30) {
          aliens.push(new SpaceShip(x, y, this.spaceShip, shootUp));
        }
        y += 40;
      }
    }

    // Level 3: Tank Aliens
    else if (level === 3) {
      for (let i = 0; i < this.rowsCount; i++) {
        for (let x = 40; x < width - 40; x += 30) {
          aliens.push(new Tank(x, y, this.tank, shootUp));
        }
        y += 40;
      }
    }

    return aliens;
  }

  draw() {
    for (let bullet of this.bullets) {
      // fill(255, 0, 0);
      // rect(bullet.x, bullet.y, 4, 10);
      bullet.draw();
    }

    for (let alien of this.aliens) {
      // Draw the appropriate alien type
      // if (alien instanceof Alien) {
      //   fill("#00ff00"); // Regular Alien color (modify as needed)
      // } else if (alien instanceof StrongAlien) {
      //   fill("#ff9900"); // StrongAlien color (modify as needed)
      // } else if (alien instanceof ToughAlien) {
      //   fill("#ff0000"); // ToughAlien color (modify as needed)
      // }

      alien.draw();
    }
  }

  checkCollision(x, y) {
    for (let i = this.aliens.length - 1; i >= 0; i--) {
      let currentAlien = this.aliens[i];
      if (dist(x, y, currentAlien.x + 11.5, currentAlien.y + 8) < 10) {
        this.aliens.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  makeABottomAlienShoot(bottomAliens) {
    let shootingAlien = random(bottomAliens);
    let bullets = shootingAlien.shoot(player);
    this.bullets.push(...bullets);
    this.timeSinceLastBullet = 0;
  }

  updateBullets(player) {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      this.bullets[i].update();
      if (this.bullets[i].hasHitPlayer(player)) {
        if (!player.bulletShield) {
          player.loseLife();
          this.bullets.splice(i, 1);
        } else {
          this.bullets.splice(i, 1);
        }
      }
    }
  }
}
