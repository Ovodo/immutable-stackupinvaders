class Powerup {
  constructor() {
    this.r = 4;
    this.resetPowerup();
  }

  resetPowerup() {
    this.y = random(height - 10);
    // this.r = random(5, 10);

    let spawnLeftSide = random(1) < 0.5;

    if (spawnLeftSide) {
      this.x = random(-width, 0);
      this.isGoingLeft = false;
    } else {
      this.x = random(width, width * 2);
      this.isGoingLeft = true;
    }
  }

  update() {
    if (this.isGoingLeft) {
      this.x--;
    } else {
      this.x++;
    }

    if (this.isOffScreen()) {
      this.resetPowerup();
    }
  }

  isOffScreen() {
    if (this.isGoingLeft && this.x < -5) {
      return true;
    } else if (!this.isGoingLeft && this.x > width + 5) {
      return true;
    }
    return false;
  }

  display() {
    fill(0, 0, 255);
    noStroke();
    textAlign(CENTER, CENTER);

    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    // fill(255);
    // text("life", this.x, this.y);
  }

  hasHitPlayer(player) {
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
