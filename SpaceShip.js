class SpaceShip extends Alien {
  constructor(x, y, image, up) {
    super(x, y, image);
    this.r = 15; // Increase the radius for a stronger alien
  }

  draw() {
    super.draw();
  }
  shoot(player) {
    const bulletOffset = 3;
    let bullet1 = new SpaceShipBullet(
      this.x + this.r,
      this.y + this.r * 2,
      !player.playerIsUp()
    );
    let bullet2 = new SpaceShipBullet(
      this.x - this.r + bulletOffset * 2,
      this.y + this.r * 2,
      !player.playerIsUp()
    );
    return [bullet1, bullet2];
  }

  hasHitPlayer(player) {
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
