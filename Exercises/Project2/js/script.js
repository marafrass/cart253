
let enemies = [];
let standardEnemy;

let pawn;
let board;


  let numberOfPawns = 10;
  let pawns = [];



function preload(){

  pawn = loadImage("assets/images/pawn.png");
  board = loadImage("assets/images/board.png");


}

//setup()
//
//Set up player, enemies, and targets
function setup() {
  createCanvas(windowWidth, windowWidth * 0.4);
  //Create player
  player = new Player();

  // Create pawns based on numberOfPawns wanted
  for (let i = 0; i < numberOfPawns; i++) {
    let x = floor(random(0, 20));
    let y = floor(random(0, 10));
    let newPawn = new Enemy(x,y);
    console.log("pawn created");
    pawns.push(newPawn);
  }

}
  //draw()
  //
  //Call all functions we want to call during gameplay
function draw() {

  drawGrid();
  player.display();
  player.handleInput();


//Call all display and movement functions in the enemies
  for (let i = 0; i < pawns.length; i++) {
    pawns[i].update();
    pawns[i].display();
  }

  // //call ghostbusters
  // ghostBusters();

}


//mouseClicked();
//
//Update whenever we click the mouse
function mouseClicked() {
  player.move();
    for (let i = 0; i < pawns.length; i++) {
  pawns[i].move();
  pawns[i].randomizeDirection();
}
}

//drawGrid()
//
//Draw the playing grid
function drawGrid() {
  //Draw background tiles
  image(board,0,0,windowWidth,(windowWidth*0.5));
  //Set tile size based on window size 
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

//function ghostBusters(){
// console.log("You are going to call them")
// //Happy Belated Halloween!
//}


}
