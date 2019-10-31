"use strict"


class Predator {

constructor() {
  this.size = windowWidth/20;
  this.x = this.size*3;
  this.y = this.size*2;

}

display() {
  fill(0);
  rect(this.x,this.y,this.size,this.size);

}

handleInput() {
  if (keyIsDown(LEFT_ARROW)){
    this.x -= this.size;
  }

  if (keyIsDown(RIGHT_ARROW)){
    this.x += this.size;
  }
  if (keyIsDown(UP_ARROW)){
    this.y -= this.size;
  }

  if (keyIsDown(DOWN_ARROW)){
    this.y += this.size;
  }

}


}
