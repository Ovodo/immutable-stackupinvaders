// Define a new TankBullet class
class TankBullet extends Bullet {
  constructor(x, y, up) {
    super(x, y);
    // this.up = up;
    this.r = 15;
    this.up = up;
    this.speed = 3; // Increase the speed for a harder bullet
  }
  draw() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
  }
  update() {
    // this.y += this.speed;
    if (this.up) {
      this.y -= this.speed;
    } else {
      this.y += this.speed;
    }
  }
  hasHitPlayer(player) {
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
