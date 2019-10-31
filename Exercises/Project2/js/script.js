function setup() {
  createCanvas(windowWidth, windowWidth * 0.5);
  //Create player
  player = new Player();
  //Create enemies
  enemy = new Enemy(floor(random(0, 20)), floor(random(1, 10)));


}
  //draw()
  //
  //Call all functions we want to call
function draw() {
  background(255);
  drawGrid();
  player.display();
  player.handleInput();

  enemy.display();
  enemy.update();

  //call ghostbusters
  ghostBusters();

}


//mouseClicked();
//
//Update whenever we click the mouse
function mouseClicked() {
  player.move();
  enemy.move();
  enemy.randomizeDirection();
}

//drawGrid()
//
//Draw the playing grid
function drawGrid() {
  let tileSize = windowWidth / 20;

  // set grid dimensions based on tilesize
  let gridWidth = tileSize;
  let gridHeight = tileSize;
  // Draw vertical lines
  for (let i = 0; gridWidth < width; i++) {
    line(gridWidth, 0, gridWidth, height);
    gridWidth += tileSize;
  }
  // draw horizontal lines
  for (let i = 0; gridHeight < height; i++) {
    line(0, gridHeight, width, gridHeight);
    gridHeight += tileSize;
  }

//ghostBusters()
//
//Create a function just so we can call ghostBusters() in every frame
//because we really should. Happy belated Halloween!
function ghostBusters(){
  console.log("These are the people you are going to call")
}

}
