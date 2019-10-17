// Predator-Prey Simulation
// by Martin Hanses
// Original code by  Pippin Barr
//
// Creates two players and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

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
  playerOne = new Predator(100, height/2, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, 77);
  playerTwo = new Predator(width-100, height/2, 5, color(140, 230, 34), 40, 87, 83, 65, 68, 86);
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

  // Handle input for the players
  playerOne.handleInput();
  playerTwo.handleInput();

  // Move all the "animals"
  playerOne.move();
  playerTwo.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  playerOne.handleEating(antelope);
  playerTwo.handleEating(antelope);
  playerOne.handleEating(zebra);
  playerTwo.handleEating(zebra);
  playerOne.handleEating(bee);
  playerTwo.handleEating(bee);

  // Display all the "animals"
  playerOne.display();
  playerTwo.display();
  antelope.display();
  zebra.display();
  bee.display();
}
