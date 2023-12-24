class Alien {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;
    this.r = 10;
    this.image = image;
  }
  draw() {
    image(this.image, this.x, this.y, this.r * 2, this.r * 2);
  }
  shoot() {
    // Implement shooting logic for the basic Alien
    let bullet = new AlienBullet(this.x + 10, this.y + 10);
    return [bullet];
  }
  hasHitPlayer(player) {
    if (dist(this.x, this.y, player.x, player.y) < this.r + player.r) {
      return true;
    }
    return false;
  }
}
