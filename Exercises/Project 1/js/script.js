"use strict";

/******************************************************

Game - Elephant Parent Simulator 2019
Martin Hanses

Original code by
Pippin Barr

Elephant parenting is probably the hardest parenting there is. This is an important fact
and something that needs to be adressed in the medium of games. Elephant children are
especially curious, much to the dismay of their elephant dads, who are hopelessly
incapable of explaining where baby elephants come from. This stems from a tradition
of toxic masculinity in elephant tribes and the repression of dad elephant feelings.
This game deals with the issue in a tasteful and appropriate manner.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap, elephant-based parenting, sound and dialogue.

******************************************************/

// Track whether the game is over and when it has just begun
let onIntroScreen = true;
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 15;
let playerVX = 0;
let playerVY = 0;
//Player speeds, current, standard and boosted
let playerCurrentSpeed;
let playerStdSpeed = 3;
let playerBoostSpeed = 6;
// Player health & damage values (standard, current, and boosted)
let playerHealth;
let playerMaxHealth = 255;
let playerCurrentDamageOverTime;
let playerStdDamageOverTime = 0.5;
let sprintingDamageOverTime = 2.3;

//Player check if moving
let playerIsMoving = false;

// Player fill color
let playerFill = 50;

// Prey position, size, velocity and noise variables
let targetX;
let targetY;
let targetRadius = 40;
let targetVX;
let targetVY;
let targetMaxSpeed = 5;
let targetTX;
let targetTY;
// Prey health
let targetHealth;
let targetMaxHealth = 100;
// Prey fill color
let targetFill = 255;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 1;
// Number of prey eaten during the game (the "score")
let targetHit = 0;

//width of side windows
let sideSpace = 200;

//set up image variables
let winScreen;
let introScreen;
let gameOverScreen;
let rightScreen;
let leftScreen;
let target;
let gameBackground;
let playerAvatar;

//Set up sound variables
let parentBark1;
let parentBark2;
let parentBark3;
let parentBark4;
let parentBark5;
let parentBark6;
let parentBark7;
let parentBark8;
let parentBark9;
//set up background music
let timerMusic;
// create variable for dialogue line to display
let currentLine;


// preload()
//
//Preload all images and sounds
function preload() {


  // Load all images
  winScreen = loadImage("assets/images/winScreen.PNG");
  gameOverScreen = loadImage("assets/images/gameOverScreen.PNG");
  introScreen = loadImage("assets/images/introScreen.PNG");
  rightScreen = loadImage("assets/images/rightScreen.PNG");
  leftScreen = loadImage("assets/images/leftScreen.PNG");
  target = loadImage("assets/images/target.png");
  gameBackground = loadImage("assets/images/gameBackground.png");
  playerAvatar = loadImage("assets/images/player.png");

  //Load all sounds
  parentBark1 = loadSound("assets/sounds/parentBark1.wav");
  parentBark2 = loadSound("assets/sounds/parentBark2.wav");
  parentBark3 = loadSound("assets/sounds/parentBark3.wav");
  parentBark4 = loadSound("assets/sounds/parentBark4.wav");
  parentBark5 = loadSound("assets/sounds/parentBark5.wav");
  parentBark6 = loadSound("assets/sounds/parentBark6.wav");
  parentBark7 = loadSound("assets/sounds/parentBark7.wav");
  parentBark8 = loadSound("assets/sounds/parentBark8.wav");
  parentBark9 = loadSound("assets/sounds/parentBark9.wav");

  timerMusic = loadSound("assets/sounds/timerMusic.wav");


}

// setup()
//
// Sets up the basic elements of the game
function setup() {
  createCanvas(1000, 380);


  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
  setupMusic();

}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  targetX = width / 5;
  targetY = height / 2;
  targetVX = -targetMaxSpeed;
  targetVY = targetMaxSpeed;
  targetHealth = targetMaxHealth;
  // Initialise noise variables for prey
  targetTX = random(0, 750);
  targetTY = random(0, 750);
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {

  playerX = 4 * width / 6;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

function setupMusic() {
  timerMusic.loop();
}

// draw()
//
// While the game is active, checks input
// updates positions of target and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents, and draws sprites for characters.
// When the game is over, shows the game over screen.
function draw() {
  background(187, 236, 240);
  drawSprites();
  if (onIntroScreen) {
    showIntro();
    console.log("introshow");
  } else if (targetHit === 20) {
    showVictory();

  } else if (!gameOver && targetHit < 20) {

    handleInput();
    movePlayer();
    movePrey();
    updateHealth();
    checkEating();
    drawPrey();
    drawPlayer();
    dialogue();
    displayStats();


  } else if (gameOver) {
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
  //Only take extra damage if holding shift AND moving
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

  // Screen wrapping (remain within designated play area, ergo between the two side spaces)
  if (playerX < sideSpace) {
    playerX = playerX + (sideSpace * 3);
  } else if (playerX > width - sideSpace) {
    playerX = playerX - (sideSpace * 3);
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
  let d = dist(playerX, playerY, targetX, targetY);
  // Check if it's an overlap
  if (d < playerRadius + targetRadius) {
    // Increase the player health
    playerHealth = playerHealth + (eatHealth * 3);
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    targetHealth = targetHealth - eatHealth;
    // Constrain to the possible range
    targetHealth = constrain(targetHealth, 0, targetMaxHealth);

    // Check if the prey died (health 0)
    if (targetHealth === 0) {
      // Move the "new" prey to a random position within designated play area
      targetX = random(sideSpace, width - sideSpace);
      targetY = random(0, height);
      // Give it full health
      targetHealth = targetMaxHealth;
      // Track how many prey were eaten
      targetHit = targetHit + 1;
      playBark();
    }
  }
}

// movePrey()
//
// Moves the prey based on Perlin noise
function movePrey() {

  // Change the prey's velocity at random intervals using Perlin noise
  targetVX = map(noise(targetTX), 0, 1, -targetMaxSpeed, targetMaxSpeed);
  targetVY = map(noise(targetTY), 0, 1, -targetMaxSpeed, targetMaxSpeed);

  // Update prey position based on velocity
  targetX = targetX + targetVX;
  targetY = targetY + targetVY;

  // // Update noise variables
  // targetHit / 100 is added to make the prey move progressively more erratic
  targetTX += 0.01 + (targetHit / 100);
  targetTY += 0.01 + (targetHit / 100);


  // Screen wrapping (only within designated play area, ergo between the two side spaces)
  if (targetX < sideSpace) {
    targetX = targetX + (sideSpace * 3);
  } else if (targetX > (width - sideSpace)) {
    targetX = targetX - (sideSpace * 3);
  }

  if (targetY < 0) {
    targetY = targetY + height;
  } else if (targetY > height) {
    targetY = targetY - height;
  }
}

// drawPrey()
//
// Draw the target with alpha based on health
function drawPrey() {
  push();
  strokeWeight(4);
  fill(targetFill, targetHealth);
  imageMode(CENTER);
  image(target, targetX, targetY, targetRadius * 2, targetRadius * 2);
  // Add a secondary circle as a "countdown" to when the prey has lost all health
  ellipse(targetX, targetY, targetHealth * 0.8);
  pop();
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health, without black outline
function drawPlayer() {
  push();
  imageMode(CENTER);
  noStroke();
  fill(playerFill, playerHealth);
  image(playerAvatar,playerX,playerY, playerRadius * 2);
  pop();
}

// showGameOver()
//
// Display stats when the game is over!
function showGameOver() {

  //If player has fails to stay on target, show this
  image(gameOverScreen, 0, 0);
  // Set up the font
  pop();
  textAlign(CENTER);
  fill(0);
  // Set up the text to display
  textSize(17);
  let gameOverText = "STATS:\n"
  gameOverText = gameOverText + "You managed to complete " + targetHit + " ";
  gameOverText = gameOverText + "consecutive sentences."
  // Display it in the centre of the screen
  text(gameOverText, 275, 275);
  push();
}


// drawCharacters
//
//Draw sprites depending on what state the game is in!
function drawSprites() {

  if (!gameOver) {
        image(gameBackground, sideSpace,0);
    image(leftScreen, 0, 0);
    image(rightScreen, width - sideSpace, 0);

  }






}

//dialogue
//
//Display current dialogue and play bark
function dialogue() {
  push();
  fill(0);
  textAlign(LEFT);
  textSize(15);
  textFont('Palatino');
  text(currentLine, 16, 110, 180, 100);
  pop();


  //DIALOGUE
  //
  //Displays dialogue based on amount of prey eaten
  if (targetHit === 0) {
    currentLine = "Oh boy. Umm. Okay. Where to start."
  } else if (targetHit === 2) {
    currentLine = "You know how, um, there are mama elephants and papa elephants."
  } else if (targetHit === 3) {
    currentLine = "And, um. Well."
  } else if (targetHit === 4) {
    currentLine = "Sometimes, if they like each other a lot, they, uh.."
  } else if (targetHit === 5) {
    currentLine = "They might start having three hot meals together, daily."
  } else if (targetHit === 6) {
    currentLine = "Breakfast, lunch, supper. That sort of thing."
  } else if (targetHit === 7) {
    currentLine = "And, um, if a mama and a papa elephant get into that kind of routine.."
  } else if (targetHit === 8) {
    currentLine = "...They might get in touch with, um.."
  } else if (targetHit === 9) {
    currentLine = "...An adoption service? Or maybe an orphanage."
  } else if (targetHit === 10) {
    currentLine = "You see, in those places, um.. There are kiddie elephants."
  } else if (targetHit === 11) {
    currentLine = "And they're brought there by the, um, baby elephant delivery elephants.'"
  } else if (targetHit === 12) {
    currentLine = "From the baby elephant factory."
  } else if (targetHit === 13) {
    currentLine = "If you're a couple and you're having three hot meals a day."
  } else if (targetHit === 14) {
    currentLine = "That's, uh, how baby elephants are made. "
  } else if (targetHit === 15) {
    currentLine = "...An adoption service? Or maybe an orphanage."
  } else if (targetHit === 16) {
    currentLine = "You see, in those places, um.. There are kiddie elephants."
  } else if (targetHit === 17) {
    currentLine = "And they, um, just sort of appear there."
  } else if (targetHit === 18) {
    currentLine = "But sometimes they might appear in your living room as well."
  } else if (targetHit === 19) {
    currentLine = "If you're a couple and you're having three hot meals a day."
  }

}

function mousePressed() {

// Start game if on intro screen
  if (onIntroScreen) {
    onIntroScreen = false;
    console.log("testing");
  }
//restart game if on game over screen
  if (gameOver) {
    gameOver = false;
    setupPrey();
    setupPlayer();
    targetHit = 0;
  }

}



//Plays a certain bark whenever targetHit is added to!
function playBark() {
  if (targetHit === 1) {
    parentBark1.play();
  } else if (targetHit === 2) {
    parentBark2.play();
  } else if (targetHit === 3) {
    parentBark3.play();
  } else if (targetHit === 4) {
    parentBark4.play();
  } else if (targetHit === 5) {
    parentBark5.play();
  } else if (targetHit === 6) {
    parentBark3.play();
  } else if (targetHit === 7) {
    parentBark7.play();
  } else if (targetHit === 8) {
    parentBark8.play();
  } else if (targetHit === 9) {
    parentBark9.play();
  } else if (targetHit === 10) {
    parentBark4.play();
  } else if (targetHit === 11) {
    parentBark2.play();
  } else if (targetHit === 12) {
    parentBark1.play();
  } else if (targetHit === 13) {
    parentBark3.play();
  } else if (targetHit === 14) {
    parentBark2.play();
  } else if (targetHit === 15) {
    parentBark8.play();
  } else if (targetHit === 16) {
    parentBark9.play();
  } else if (targetHit === 17) {
    parentBark5.play();
  } else if (targetHit === 18) {
    parentBark7.play();
  } else if (targetHit === 19) {
    parentBark2.play();
  } else if (targetHit === 20) {
    parentBark1.play();
  }

}


function showVictory() {
  //If player has explained 20 difficult subjects, show win screen
  image(winScreen, 0, 0);
  noLoop();
}

function showIntro() {
  image(introScreen, 0, 0);
}


    //Display all stats on left side of screen
function displayStats() {

  pop();
  textSize(13);
  fill(0);
  text("Cohesiveness of explanation", 825, 120);
  fill(0);
  rect(825, 130, 20 * 5, 30);
  fill(96, 156, 64);
  rect(825, 130, targetHit * 5, 30);
  image(playerAvatar, 930, 130);

  fill(0);
  text("Coolness", 825, 190);
  fill(235, 73, 52);
  rect(825, 200, playerMaxHealth/2, 30,);
  fill(96, 156, 64);
  rect(825, 200, (playerHealth/2), 30);
  push();

}
