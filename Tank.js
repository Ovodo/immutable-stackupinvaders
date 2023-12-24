class Tank extends Alien {
  constructor(x, y, image, up) {
    super(x, y, image);
    this.r = 20; // Increase the radius for a tougher alien
    this.bulletSize = 15;
    this.up;
  }
  draw() {
    super.draw();
  }
  shoot() {
    // Implement shooting logic for the Tank
    // Implement shooting logic for the Tank
    let bullet = new TankBullet(this.x + 10, this.y + 10, this.up);
    return [bullet];
    // let bullet = new AlienBullet(this.x + 10, this.y + 10);
    // return [bullet];
  }

  hasHitPlayer(player) {
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
