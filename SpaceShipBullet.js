// Define a new TankBullet class
class SpaceShipBullet extends Bullet {
  constructor(x, y, up) {
    super(x, y);
    this.r = 15;
    this.up = up;
    this.speed = 2; // Increase the speed for a harder bullet
  }

  draw() {
    fill(255, 0, 0);
    rect(this.x, this.y, 3, 10);
  }

  update() {
    console.log("direction", this.up);
    // this.y += this.speed;
    if (this.up) {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
  }

  hasHitPlayer(player) {
    // Check collision with the main bullet
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
