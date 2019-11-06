let isGameRunning = false;
let isGameOver = false;

let enemies = [];
let standardEnemy;

let numberOfPawns = 10;
let pawns = [];

let imgPlayer;
let imgPawn;
let imgBoard;

let imgLoseScreen;
let imgIntroScreen;
let imgWinScreen;
let imgKing;

function preload() {
  imgPlayer = loadImage("assets/images/player.png");

  imgPawn = loadImage("assets/images/pawn.png");
  imgKing = loadImage("assets/images/king.png")
  imgBoard = loadImage("assets/images/board.png");
  imgIntroScreen = loadImage("assets/images/introScreen.png");
  imgLoseScreen = loadImage("assets/images/loseScreen.png");
  imgWinScreen = loadImage("assets/images/winScreen.png");

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
    let newPawn = new Enemy(x, y);
    console.log("pawn created");
    pawns.push(newPawn);
  }

  king = new King(floor(random(0, 20)),floor(random(0, 10)))

}
//draw()
//
//Call all functions we want to call during gameplay
function draw() {
  if (!isGameOver && !isGameRunning) {
    image(imgIntroScreen, 0, 0, windowWidth, windowHeight);
  } else if (isGameOver) {
    image(imgEndScreen, 0, 0);
  } else {
    gamePlay();

  }
}






//gamePlay();
//
//Handle all the functions of the actual gameplay
function gamePlay() {

  drawGrid();
  player.display();
  player.handleInput();

  //Call all display and movement functions in the enemies
  for (let i = 0; i < pawns.length; i++) {
    pawns[i].update();
    pawns[i].display();
  }

  king.display();

  player.handleScoring(king);

}

//mouseClicked();
//
//Update whenever we click the mouse
function mouseClicked() {
  if (!isGameRunning) {
    isGameRunning = true;
  } else if (isGameOver) {

  } else {
    for (let i = 0; i < pawns.length; i++) {
      pawns[i].move();
      pawns[i].randomizeDirection();
    }

    player.move();

  }
}

//drawGrid()
//
//Draw the playing grid
function drawGrid() {
  //Draw background tiles
  image(imgBoard, 0, 0, windowWidth, (windowWidth * 0.5));
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

}
