"use strict"


class Player {
//Define position, size, properties and next predicted move
  constructor() {
    this.size = windowWidth / 20;
    this.x = this.size * 3;
    this.y = this.size * 2;
    this.direction = this.size;
    this.nextMoveX = this.x + this.size;
    this.nextMoveY = this.y;

  }

  //display()
  //
  //Display sprite for player and location where you've selected to move next
  display() {
    fill(0);
    rect(this.x, this.y, this.size, this.size);
    fill(255, 0, 0, 30);
    rect(this.nextMoveX, this.nextMoveY, this.size, this.size);
  }


  //move()
  //
  //Update the position of the player based on where their next movement target was
  move() {
    this.x = this.nextMoveX;
    this.y = this.nextMoveY;
  }

  //handleImput()
  //
  //Handle input based on the arrow keys
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
