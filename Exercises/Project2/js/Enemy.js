class Enemy {
  //Construct location, properties and size
  constructor(x, y) {
    this.size = windowWidth / 20;
    this.x = this.size * x;
    this.y = this.size * y;
    this.direction = this.size;
    this.nextMoveX = this.x + this.size;
    this.nextMoveY = this.y;
    this.nextDirectionX = 0;
    this.nextDirectionY = 0;
    this.nextMoveY = 0;
  }


  //update()
  //
  //Update location of the next tile the enemy will move to
  update() {

    this.nextMoveX = this.x + this.nextDirectionX;
    this.nextMoveY = this.y + this.nextDirectionY;


  }

  //randomizeDirection()
  //
  //Randomize the next tile the enemy will move towards
  randomizeDirection() {
    //Create variables to pick randomly from array
    let directions = [this.size, 0, -this.size];
    //Pick from the array index and set the next direction on a horizontal axis
    let randomDirection = floor(random(0, 1) * directions.length);
    this.nextDirectionX = directions[randomDirection];
    //Pick from the array index and set the next direction on a vertical axis
    randomDirection = floor(random(0, 1) * directions.length);
    this.nextDirectionY = directions[randomDirection];



  }

  //move()
  //
  //Update the position of the enemy based on the predicted tile
  move() {

    //Move the enemy to the determined location
    this.x = this.nextMoveX;
    this.y = this.nextMoveY;
    //Check in case the enemy touches the edges of the map,
    // if so, prevent them from leaving.
    this.handleConstraints();
  }

  //display()
  //
  //Display both enemy and their next predicted movement
  display() {
    push();

    fill(120);
    image(imgKid, this.x,this.y,this.size,this.size);
    // rect(this.x, this.y, this.size, this.size);
    fill(color(255, 0, 0, 120));
    tint(255, 126);
    image(imgKid, this.nextMoveX, this.nextMoveY, this.size, this.size);
    pop();

  }

  handleConstraints(){
    if (this.x < 0){
      this.x = 0;
    }
    if (this.x > width-1){
      this.x = width - this.size;
    }
    if (this.y < 0){
      this.y = 0;
    }
    if (this.y > height-1){
      this.y = height - this.size;
    }


  }

  reset(){
    this.x = (floor(random(0, 20)))*this.size;
    this.y = (floor(random(0, 10)))*this.size;

  }


  handleDamage(player){
    let d = dist(this.x,this.y, player.x, player.y);
    if (d < 5) {
      this.reset();
      player.health -= 5;
      console.log("took damage");
    }

  }

}
