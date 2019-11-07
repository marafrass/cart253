//Set variables for checking what state the game is in
let isGameRunning = false;
let isGameOver = false;

//Set variables for spawning enemies
let numberOfKids = 15;
let kids = [];

//Set image variables for player and all enemies
let imgPlayer;
let imgKid;
let imgBackground;
let imgTrash;

//Set intro and end screen variables
let imgEndScreen;
let imgIntroScreen;

//Set audio and music variables
let audioGameMusic;
let audioPickUpTrash;
let audioPlayerMove;

//preload()
//
//Preload all music and image assets for quick access
function preload() {
  // load player avatar
  imgPlayer = loadImage("assets/images/imgPlayer.png");
  //load enemy and target avatars
  imgKid = loadImage("assets/images/imgKid.PNG");
  imgTrash = loadImage("assets/images/imgTrash.png")
  // load the game background
  imgBackground = loadImage("assets/images/imgBackground.png");
  //Load intro and end screens
  imgIntroScreen = loadImage("assets/images/introScreen.png");
  imgEndScreen = loadImage("assets/images/endScreen.png");

  //Load sound effects
  audioGameMusic = loadSound("assets/sounds/gameMusic.wav")
  audioPlayerMove = loadSound("assets/sounds/playerMove.wav")
  audioPickUpTrash = loadSound("assets/sounds/pickupTrash.wav")

}

//setup()
//
//Set up player, enemies, and targets
function setup() {
  createCanvas(windowWidth, windowWidth * 0.4);
  setupActors();
}
//setupActors()
//
//Set up players, kids and trash for a new game
function setupActors() {
  //Create player
  player = new Player();

  // Create kids based on numberOfKids wanted using a for loop,
  // add them to the array
  for (let i = 0; i < numberOfKids; i++) {
    let x = floor(random(0, 20));
    let y = floor(random(0, 10));
    let newKid = new Enemy(x, y);
    kids.push(newKid);
  }
  // Create target on a random location within the center tiles of the game
  trash = new King(floor(random(0, 15)), floor(random(2, 7)));

}

//draw()
//
//Call all functions we want to call during gameplay
function draw() {
  //If game has just started, show intro screen
  if (!isGameOver && !isGameRunning) {
    image(imgIntroScreen, 0, 0, windowWidth, windowWidth* 0.4);
    // if game is over, show end screen
  } else if (isGameOver) {
    image(imgEndScreen, 0, 0);
    //Otherwise, go to gameplay
  } else {
    gamePlay();
  }
}

//gamePlay();
//
//Handle all the functions of the actual gameplay
function gamePlay() {
  //draw the grid
  drawMap();

  //Update and display player and check for input
  player.display();
  player.handleInput();
  //Check for collisions with target and handle scoring
  player.handleScoring(trash);

  //Call all display and movement functions in the enemies
  for (let i = 0; i < kids.length; i++) {
    kids[i].update();
    kids[i].display();
    kids[i].handleDamage(player)
  }
  //Display target
  trash.display();
}

//mouseClicked();
//
//Update whenever we click the mouse, depending on state of the game
function mouseClicked() {
  if (!isGameRunning) {
    isGameRunning = true;
  } else if (isGameOver) {
    resetGame();
  } else {
    resetGame();
  }
}

//keyPressed()
//
//When pressing the turn key, shift, make all actors move
function keyPressed() {
  if (keyCode === SHIFT) {
    for (let i = 0; i < kids.length; i++) {
      player.move();
      //Update movement and random direction among all the kids
      kids[i].move();
      kids[i].randomizeDirection();

    }
  }
}

//drawGrid()
//
//Draw the playing grid and background
function drawMap() {
  //Draw background tiles
  image(imgBackground, 0, 0, windowWidth, (windowWidth * 0.5));
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

//resetGame()
//
//when game is over and clicked, reset the whole game including variables,
//positions and setup
function resetGame() {
  for (let i = 0; i < kids.length; i++) {
    kids[i].reset();
    player.score = 0;
  }
}
