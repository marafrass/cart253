// Predator-Prey Simulation
// by Martin Hanses
// Original code by  Pippin Barr
//
// Creates two players and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our game states
let gameStart = false;
let gameOver = false;

// The amount of points needed to win and the winner variable
let winScore = 10;
let winner = " ";

// Our players
let playerOne;
let playerTwo;

// The three prey
let antelope;
let zebra;
let bee;

// setup()
//
// Sets up a canvas
// Creates objects for the players and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  playerOne = new Predator(100, height / 2, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 77);
  playerTwo = new Predator(width - 100, height / 2, 5, color(140, 230, 34), 40, 87, 83, 65, 68, 86);

  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

  if (!gameStart) {
    gameIntro();
  } else if (checkScores()) {
    gameIsOver();
  } else {

    // Handle input for the players
    playerOne.handleInput();
    playerTwo.handleInput();

    // Move players and all the "animals"
    playerOne.move();
    playerTwo.move();
    antelope.move();
    zebra.move();
    bee.move();

    // Handle the players eating any of the prey
    playerOne.handleEating(antelope);
    playerTwo.handleEating(antelope);
    playerOne.handleEating(zebra);
    playerTwo.handleEating(zebra);
    playerOne.handleEating(bee);
    playerTwo.handleEating(bee);

    //Handle the players eating eachother
    playerOne.handleFighting(playerTwo);
    playerTwo.handleFighting(playerOne);

    // Display players and all the "animals"
    playerOne.display();
    playerTwo.display();
    antelope.display();
    zebra.display();
    bee.display();
  }
}

//GAMEISOVER
//
//Displayed if game is over
function gameIsOver() {
  push();
  fill(255);
  textSize(100);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2);
  textSize(50);
  text(winner + " wins!", width / 2, height / 1.4);
  textSize(30);
  text("Click to restart!", width / 2, height / 1.2);
  pop();
}

//GAMEINTRO
//
//Show the game splash screen
function gameIntro() {
  push();
  fill(255);
  text("LETS GO", width / 2, height / 2);
  pop();
}

//MOUSEPRESSED
//
//On load, click to start the game.
//If the game is over, click to restart the game
function mousePressed() {
  if (!gameStart) {
    gameStart = true;
  } else if (gameOver)
    gameStart = false;
  gameOver = false;
  playerOne.reset();
  playerTwo.reset();
  antelope.reset();
  zebra.reset();
  bee.reset();
}

//CHECKSCORES
//
//This functions checks if either player has reached the end score, and if so,
// returns as true. Also sets the "winner" variable to the player who reached winScore first
function checkScores() {
  if ((playerOne.preyEaten >= winScore) || (playerTwo.preyEaten >= winScore)) {
    console.log("game is over");
    if (playerOne.preyEaten >= winScore){
      winner = "Player One";
    } else {
      winner = "Player Two";
    }
    return true;
  }
}
