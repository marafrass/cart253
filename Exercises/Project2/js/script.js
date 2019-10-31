
let enemies = [];
let standardEnemy;

let pawn;
let board;


function preload(){

  pawn = loadImage("assets/images/pawn.png");
  board = loadImage("assets/images/board.png");


}


function setup() {
  createCanvas(windowWidth, windowWidth * 0.4);
  //Create player
  player = new Player();
  //Create enemies
  enemy1 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy1);
  enemy2 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy2);
  enemy3 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy3);
  enemy4 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy4);
  enemy5 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy5);
  enemy6 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy6);
  enemy7 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy7);
  enemy8 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy8);
  enemy9 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy9);
  enemy10 = new Enemy(floor(random(0, 20)), floor(random(0, 10)));
  enemies.push(enemy10);


}
  //draw()
  //
  //Call all functions we want to call
function draw() {
  image(board,0,0,windowWidth,(windowWidth*0.5));
  drawGrid();
  player.display();
  player.handleInput();


//Call all display and movement functions in the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].display();
  }

  // //call ghostbusters
  // ghostBusters();

}


//mouseClicked();
//
//Update whenever we click the mouse
function mouseClicked() {
  player.move();
    for (let i = 0; i < enemies.length; i++) {
  enemies[i].move();
  enemies[i].randomizeDirection();
}
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

//function ghostBusters(){
// console.log("You are going to call them")
// //Happy Belated Halloween!
//}


}
