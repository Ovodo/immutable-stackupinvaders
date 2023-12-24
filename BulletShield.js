class BulletShield extends Powerup {
  constructor(x, y) {
    super(x, y);
    this.r = 20;
    this.duration = 40 * 60; // 40 seconds at 60 frames per second
  }

  display() {
    // fill(112, 128, 144); // Adjust color as needed
    fill(150, 150, 255, 100); // Transparent blue color for the shield
    // textAlign(CENTER, CENTER);

    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    // fill(255);
    // text("b", this.x, this.y);
  }
  draw(player) {
    fill(150, 150, 255, 100); // Transparent blue color for the shield
    ellipse(
      player.x + player.r,
      player.y + player.r,
      player.r * 4,
      player.r * 4
    );
  }
  reduceDuration() {
    // Reduce the duration by a certain amount
    this.duration--;

    // If the duration is zero or less, the shield is no longer active
    if (this.duration <= 0) {
      // Perform any cleanup or additional logic when the shield expires
      // For example, remove the shield from the list of active power-ups
      const index = allPowerUps.indexOf(this);
      if (index !== -1) {
        allPowerUps.splice(index, 1);
      }
    }
  }

  applyPowerUp(player) {
    // Example: Make the player temporarily invulnerable to enemy bullets
    player.addPowerUp(this);
  }
}
