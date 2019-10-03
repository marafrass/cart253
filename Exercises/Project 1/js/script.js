"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 15;
let playerVX = 0;
let playerVY = 0;
//Player speeds, current, standard and boosted
let playerCurrentSpeed;
let playerStdSpeed = 2;
let playerBoostSpeed = 5;
// Player health & damage values (standard, current, and boosted)
let playerHealth;
let playerMaxHealth = 255;
let playerCurrentDamageOverTime;
let playerStdDamageOverTime = 0.5;
let sprintingDamageOverTime = 2;

//Player check if moving
let playerIsMoving = false;

// Player fill color
let playerFill = 50;

// Prey position, size, velocity and noise variables
let preyX;
let preyY;
let preyRadius = 40;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
let preyTX;
let preyTY;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;


// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 1;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);





  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
  // Initialise noise variables for prey
  preyTX = random(0, 750);
  preyTY = random(0, 750);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  background(100, 100, 200);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  } else {
    showGameOver();
  }
}

// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {

  //Check if any movement key is down (if player is moving)
  let isAnyMoveKeyPressed = keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW);

  //Check if player is moving
  if (isAnyMoveKeyPressed) {
    playerIsMoving = true;
  } else {
    playerIsMoving = false;
  }

  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerCurrentSpeed;
  } else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerCurrentSpeed;
  } else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerCurrentSpeed;
  } else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerCurrentSpeed;
  } else {
    playerVY = 0;
  }

  //Check for sprinting
  if ((keyIsDown(SHIFT)) && (playerIsMoving === true)) {
    playerCurrentSpeed = playerBoostSpeed;
    playerCurrentDamageOverTime = sprintingDamageOverTime;
  } else {
    playerCurrentSpeed = playerStdSpeed
    playerCurrentDamageOverTime = playerStdDamageOverTime;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  } else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  } else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - playerCurrentDamageOverTime;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + (eatHealth * 3);
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on Perlin noise
function movePrey() {

  // Change the prey's velocity at random intervals using Perlin noise
  preyVX = map(noise(preyTX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
  preyVY = map(noise(preyTY), 0, 1, -preyMaxSpeed, preyMaxSpeed);

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // // Update noise variables
  preyTX += 0.01;
  preyTY += 0.01;


  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  } else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  } else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  strokeWeight(4);
  fill(preyFill, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health, without black outline
function drawPlayer() {
  push();
  noStroke();
  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerRadius * 2);
  pop();
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(0);
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " prey\n";
  gameOverText = gameOverText + "before you died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
}
