class Player {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 1.5;
    this.targetX = this.x;
    this.targetY = this.y - 100;
    this.size = 75;
    this.vx = 0;
    this.vy = 0;
  }

  //update()
  //
  //Update the position of the player and the reticule
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.targetX -= this.vx;
    this.targetY -= this.vy;

  }

  //handleInput()
  //
  //Handle the input keys to change velocity
  handleInput() {

    if (keyIsDown(LEFT_ARROW)) {
      this.vx += -0.5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx += 0.5;
    } else if (this.vx <= 0) {
      this.vx += 0.5;
    } else if (this.vx >= 0.5) {
      this.vx -= 0.5;
    } else {
      this.vx = 0;
    }


    if (keyIsDown(UP_ARROW)) {
      this.vy += -0.5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy += 0.5;
    } else if (this.vy <= 0) {
      this.vy += 0.5;
    } else if (this.vy >= 0.5) {
      this.vy -= 0.5;
    } else {
      this.vy = 0;
    }

    // shooting boys
    if (keyIsDown(SHIFT)) {

      push();
      strokeWeight(5);
      stroke(0, 0, 255);
      line(player.x, player.y, player.targetX, player.targetY);
      pop();
    }

  }

  //display()
  //
  //display images for the player and the reticule
  display() {
    push();
    imageMode(CENTER, CENTER);
    rectMode(CENTER, CENTER);
    image(reticule, this.targetX, this.targetY, 50, 50);

    fill(255, 255, 255);
    rect(this.x, this.y, this.size, this.size);
    pop();
  }

  //handleShooting()
  //
  //Checks if lasers collide with enemy when shots are fired
  handleShooting() {

    let d = dist(player.targetX,player.targetY, enemy.x,enemy.y )

    if (d < 20){
      enemy.fillcolor += 20;

    }


  }


}
