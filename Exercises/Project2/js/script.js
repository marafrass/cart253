


function setup() {
  createCanvas(windowWidth, windowWidth*0.4);

  player = new Predator();




}

function draw() {
  background(255);
  drawGrid();
  player.display();
  player.handleInput();



}

//draw the playing grid
function drawGrid() {
    let tileSize = windowWidth/20;

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
