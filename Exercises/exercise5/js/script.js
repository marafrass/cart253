// Donut County Demake
// by Martin Hanses
// Original code by  Pippin Barr
//
// Donut County is a game about controlling a hole and having things fall into
// said hole. At least, I think that's what it is. I haven't played it.
// I saw some trailers once, and it looked really, really cool.
// But as the ancient greek philosopher Aristotle once said, "Why should I shell
// out ten bucks to play some weird indie crap when I can make it myself for
// for none of the price and a fraction of the quality?"
//
// Remember, this is the man that basically invented logic. You can not argue
// him. Because he's dead.

// Move around and drop things into your hole! First player to reach 10 donuts
// wins! Don't worry too much about the logic of the game. Leave that to someone
// else. Like Aristotle.

// Our game states
let gameStart = false;
let gameOver = false;

// The amount of points needed to win and the winner variable
let winScore = 10;
let winner = " ";

// Our players
let playerOne;
let playerTwo;

// The four donuts
let pinkDonut;
let brownDonut;
let whiteDonut;
let pinkDonut2;
// and their image variables
let imgPink;
let imgBrown;
let imgWhite;

// preload()
//
// Preloads all the images we're using
function preload(){
imgPink = loadImage("assets/images/pinkDonut.PNG");
imgBrown = loadImage("assets/images/brownDonut.PNG");
imgWhite = loadImage("assets/images/whiteDonut.PNG");

}


// setup()
//
// Sets up a canvas
// Creates objects for the players and four donuts
function setup() {
  createCanvas(windowWidth, windowHeight);
  playerOne = new Predator(width-100, height / 2, 5, 0, 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 77);
  playerTwo = new Predator(100, height / 2, 5, 80, 40, 87, 83, 65, 68, 86);

  pinkDonut = new Prey(100, 100, 10, color(255, 100, 10), 50, imgPink);
  pinkDonut2 = new Prey(100, 100, 20, color(255, 100, 10), 40, imgPink);
  brownDonut = new Prey(100, 100, 8, color(255, 255, 255), 70, imgBrown);
  whiteDonut = new Prey(100, 100, 10, color(255, 255, 0), 30, imgWhite);
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(252, 241, 210);
  // Check what state the game is/should be in
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
    pinkDonut.move();
    pinkDonut2.move();
    brownDonut.move();
    whiteDonut.move();

    // Handle the players eating any of the donuts
    playerOne.handleEating(pinkDonut);
    playerTwo.handleEating(pinkDonut);
    playerOne.handleEating(pinkDonut2);
    playerTwo.handleEating(pinkDonut2);
    playerOne.handleEating(brownDonut);
    playerTwo.handleEating(brownDonut);
    playerOne.handleEating(whiteDonut);
    playerTwo.handleEating(whiteDonut);

    //Handle the players eating eachother
    playerOne.handleFighting(playerTwo);
    playerTwo.handleFighting(playerOne);

    // Display players and all the "animals"
    playerOne.display();
    playerTwo.display();
    pinkDonut.display();
    pinkDonut2.display();
    brownDonut.display();
    whiteDonut.display();
  }
}

//GAMEISOVER
//
//Displayed if game is over
function gameIsOver() {
  push();
  fill(0);
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
  fill(0);
  textSize(60);
  text("DONUT COUNTY \nDEMAKE", width / 2, height / 2);
  textSize(25);
  text("click to play", width/2, height/1.4);
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
  pinkDonut.reset();
  pinkDonut2.reset();
  brownDonut.reset();
  whiteDonut.reset();
}

//CHECKSCORES
//
//This functions checks if either player has reached the end score, and if so,
// returns as true. Also sets the "winner" variable to the player who reached winScore first
function checkScores() {
  if ((playerOne.donutsEaten >= winScore) || (playerTwo.donutsEaten >= winScore)) {
    console.log("game is over");
    if (playerOne.donutsEaten >= winScore){
      winner = "Player One";
    } else {
      winner = "Player Two";
    }
    return true;
  }
}
