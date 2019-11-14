class Background {
  constructor() {
    this.x = -50;
    this.y = -50;
    this.vx = 0;
    this.vy = 0;
  }
  //display()
  //
  //display the background image and update its position
  display() {
    this.x += this.vx;
    this.y += this.vy;
    image(earth, this.x, this.y, windowWidth * 1.4, windowHeight * 1.4);
  }

  //handleInput()
  //
  //Handle the movement of the background
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.vx = -0.6;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx = 0.6;
    } else {
      this.vx = 0;
    }
    if (keyIsDown(UP_ARROW)) {
      this.vy = -0.6;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy = 0.6;
    } else {
      this.vy = 0;
    }

  }

}
