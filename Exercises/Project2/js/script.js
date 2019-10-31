function setup() {
  createCanvas(windowWidth, windowWidth * 0.5);

  player = new Player();
  //enemy = new Enemy(1, 1);



}

function draw() {
  background(255);
  drawGrid();
  player.display();
  player.handleInput();

  // enemy.display();
  // enemy.update();



}

function mouseClicked(){
player.move();

}


//draw the playing grid
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



}
