
class Enemy {
  //Construct location, properties and size
constructor(x,y){
  this.size = (windowWidth/20);
  this.x = x*(this.size*5);
  this.y = y*(this.size*5);

  this.nextDirection = 0;

  this.nextMoveX = this.x + this.size;
  this.nextMoveY = this.y + this.size;

}




randomizeDirection(){



  let directions = [this.size,-this.size*2];

  let randomDirection = floor(random() * directions.length);

  this.nextMoveX = this.x + randomDirection;



}

//Update all physical variables
update(){
    this.size = (windowWidth/20);
    this.nextMoveX = this.x + this.size;
    this.nextMoveY = this.y + this.size;


}

// display()
//
//draw the sprites for the enemy and location of the next move
display(){
  fill(120);
rect(this.x,this.y,this.size,this.size);
rect(this.nextMoveX,this.nextMoveY,this.size,this.size);


}
//move()
//
//actually move the enemy based on the next predicted location
move() {

  this.x = this.nextMoveX;
  this.y = this.nextMoveY;

}


}
