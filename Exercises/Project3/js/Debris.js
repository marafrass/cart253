class Debris {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.alpha = 0;
  }

  //update()
  //
  //Update direction, position and speed of the debris
  update() {
    let flyByX;
    let flyByY;

    if (this.x < player.targetX) {
      flyByX = player.targetX - this.x;
    } else {
      flyByX = this.x - player.targetX;
    }

    if (this.y < player.targetY) {
      flyByY = player.targetY - this.y;
    } else {
      flyByY = this.y - player.targetY;
    }

    if (player.targetX < this.x) {
      this.x += flyByX / 50 + this.size / 3;
    } else {
      this.x -= flyByX / 50 + this.size / 3;
    }

    if (player.targetY < this.y) {
      this.y += flyByY / 50 + this.size / 3;
    } else {
      this.y -= flyByY / 50 + this.size / 3;
    }
    this.size += 0.01;
    this.alpha += 3;
    fill(255, 255, 255, this.alpha);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
    console.log("star");


    //When the debris leaves the screen, reset it
    if (this.x > windowWidth || this.x < 0 || this.y < 0 || this.y > windowHeight) {
      this.reset();
    }
    //When the debris gets too close to the camera/too big, reset it
    if (this.size > 40) {
      this.reset();
    }

  }

  //reset()
  //
  //Reset position, size and alpha of the debris
  reset() {
    this.alpha = 0;
    this.size = 4;
    this.x = floor(random(0, windowWidth));
    this.y = floor(random(0, windowHeight));
  }

}
