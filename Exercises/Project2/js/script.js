// COMMUNITY SERVICE
//
// All code, art and audio by Martin Hanses
// (Except for:
// Background music, by Martin Holm, which is a track I commissioned
// previously and own the rights to - "Clammy Quest")
// Fanfare, by user "joepayne", https://freesound.org/people/joepayne/sounds/413203/
//
// DESCRIPTION:
// Known for his appearances in TURTLES HAGGLING and TURTLES NOT HAGGLING,
// Hieronymous the Turtle stars in this adventure based on two core beliefs
// of conservative politicians - avoiding children and only picking up trash
// when the state forces you to.
//
// This is a turn-based game in which you, as Hieronymous the turtle, have to
// clean up the forest and the beach - 10 massive pieces of trash. The area is
// overrun by children, however, and you must do your best to not run into them.
// If you do, more days will be added to your community service duty!
// This game gets progressively harder every time you play - you can refresh
// the browser window to reset the difficulty!
//
// CONTROLS:
// - Use arrow keys to set a direction for Hieronymous
// - Use Left Shift to execute the move you've planned
// - Click to begin the game or restart it!


///////////////////////////////////////////////////////////
//VARIABLES
//
//This is a section for variables. They're happy together.

//Set variables for checking what state the game is in
let isGameRunning = false;
let isGameOver = false;

//Set amount of points needed for endgame
let winScore = 10;

//Set variables for spawning kids
let numberOfKids = 15;
let kids = [];

//Set image variables for player and all kids
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
let audioPlayerHit;
let audioFanfare;

// VARIABLES END SECTION HERE
///////////////////////////////////////////////////////////

//preload()
//
//Preload all music and image assets for quick access
function preload() {
  // load player avatar
  imgPlayer = loadImage("assets/images/imgPlayer.png");
  //load enemy and trash avatars
  imgKid = loadImage("assets/images/imgKid.png");
  imgTrash = loadImage("assets/images/imgTrash.png")
  // load the game background
  imgBackground = loadImage("assets/images/imgBackground.png");
  //Load intro and end screens
  imgIntroScreen = loadImage("assets/images/introScreen.png");
  imgEndScreen = loadImage("assets/images/endScreen.png");

  //Load sound effects and music
  audioGameMusic = loadSound("assets/sounds/gameMusic.wav")
  audioPlayerMove = loadSound("assets/sounds/playerMove.wav")
  audioPlayerHit = loadSound("assets/sounds/playerHit.wav")
  audioPickUpTrash = loadSound("assets/sounds/pickupTrash.wav")
  audioFanfare = loadSound("assets/sounds/fanfare.wav")

}

//setup()
//
//Set up player, kids, and trash
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
    spawnKid();
  }
  // Create trash on a random location within the center tiles of the game
  trash = new Trash(floor(random(0, 15)), floor(random(2, 7)));
}

//draw()
//
//Call all functions we want to call during gameplay
function draw() {
  //If game has just started, show intro screen
  if (!isGameOver && !isGameRunning) {
    displayIntroScreen();
    // if game is over, show end screen
  } else if (isGameOver) {
    displayEndScreen();
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
  //Check for collisions with trash and handle scoring
  player.handleScoring(trash);
  //Display trash
  trash.display();
  //Check the score of the player to determine if they've won yet
  checkScores();

  //Call all display and movement functions for kids in the kids array
  for (let i = 0; i < kids.length; i++) {
    kids[i].update();
    kids[i].display();
    kids[i].handleDamage(player)
  }

}

//mouseClicked();
//
//Update whenever we click the mouse, depending on state of the game
function mouseClicked() {
  if (!isGameRunning) {
    isGameRunning = true;
    playMusic();
  } else if (isGameOver) {
    resetGame();
  } else {
    // Nothing here
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

//playMusic();
//
//Loops the main music of the game
function playMusic() {
  audioGameMusic.stop();
  audioGameMusic.setVolume(0.2);
  audioGameMusic.loop();

}

//resetGame()
//
//when game is over and clicked, reset the whole game including variables,
//positions and setup
function resetGame() {
  for (let i = 0; i < kids.length; i++) {
    kids[i].reset();
    player.reset();
    isGameOver = false;
  }
}

//checkScores();
//
//Check what the player score is and changes game state accordingly
function checkScores() {

  // When player reaches the winScore, play the fanfare and immediately
  // add another point to only play the sound effect once
  if (player.score === winScore) {
    audioFanfare.play();
    player.score += 1;
  }
  //If the player has reached the winning score, set game state to gameover
  if (player.score >= winScore) {
    isGameOver = true;
  }
}

//spawnKid()
//
//Code for creating a single child (hahaha)
function spawnKid() {
  //randomize location
  let x = floor(random(0, 20));
  let y = floor(random(0, 10));
  //Create kid based on the variable
  let newKid = new Kid(x, y);
  //place the new kid in the kids array
  kids.push(newKid);
}

//displayIntroScreen()
//
//Displays the intro screen
function displayIntroScreen() {
  image(imgIntroScreen, 0, 0, windowWidth, windowWidth * 0.4);

}

//displayEndScreen()
//
//Displays the end screen along with messages based on the number of times
//the player bumped into kids
function displayEndScreen() {
  //display image
  image(imgEndScreen, 0, 0, windowWidth, windowWidth * 0.4);
  //Set text size in push-pop
  push();
  textSize(19);
  //If player hits zero kids, display this
  if (player.sentence === 0) {
    text("It took you only " + player.timeSpent + " hours and you did it \nwithout bumping into children! \nAmazing job, Hieronymous! Back to \nloitering!", 0 + windowWidth / 20, windowWidth / 5);
    //If player hits less than three kids, display this
  } else if (player.sentence < 107) {
    text("It took you only " + player.timeSpent + " hours you only added " + player.sentence + " days \n to your community service!", 0 + windowWidth / 20, windowWidth / 5);
  } else {
    //otherwise, display this message
    text("It took you " + player.timeSpent + " hours... \n...but holy crap Hieronymous you added " + player.sentence + " days \nto your community service. Embarrassing.", 0 + windowWidth / 20, windowWidth / 5);
  }
  pop();

}
