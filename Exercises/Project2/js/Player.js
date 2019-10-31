"use strict"


class Player {

  constructor() {
    this.size = windowWidth / 20;
    this.x = this.size * 3;
    this.y = this.size * 2;
    this.direction = this.size;

  }

  //Display sprite for player and where you've selected to move next
  display() {

    fill(0);
    rect(this.x, this.y, this.size, this.size);
    fill(255, 0, 0, 30);
    rect(this.nextMoveX, this.nextMoveY, this.size, this.size);

  }

  move() {

    this.x = this.nextMoveX;
    this.y = this.nextMoveY;





  }


  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.nextMoveX = this.x - (this.size);
      this.nextMoveY = this.y;
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.nextMoveX = this.x + this.size;
      this.nextMoveY = this.y;
    }
    if (keyIsDown(UP_ARROW)) {
      this.nextMoveX = this.x;
      this.nextMoveY = this.y - (this.size);
    }

    if (keyIsDown(DOWN_ARROW)) {
      this.nextMoveX = this.x;
      this.nextMoveY = this.y + this.size;

    }



  }


}
