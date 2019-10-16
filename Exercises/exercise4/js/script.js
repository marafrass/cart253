"use strict";

// Pong
// Originally by Pippin Barr, edited by Martin Hanses
//
// A "simple" implementation of Pong with no scoring system
// just the ability to play the game with the keyboard. Or is it? Yes, it is.
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle

// Whether the game has started or is over
let playing = false;
let gameOver = false;

// Game colors (Ballcolor here instead of in ball because grouping seems more logical.)
let bgColor = 0;
let fgColor = 255;
let ballColor;
let leftPlayerColor;
let rightPlayerColor;

// BALL

// A ball object with the properties of
// position, size, velocity, and speed
let ball = {
  x: 0,
  y: 0,
  size: 20,
  vx: 0,
  vy: 0,
  speed: 4
}

let marker;

// PADDLES

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let leftPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 7,
  upKey: 87,
  downKey: 83
}

// RIGHT PADDLE

// Basic definition of a left paddle object with its key properties of
// position, size, velocity, and speed
let rightPaddle = {
  x: 0,
  y: 0,
  w: 20,
  h: 70,
  vy: 0,
  speed: 7,
  upKey: 38,
  downKey: 40
}

// A variable to hold the beep sound we will play on bouncing
let beepSFX;

//Set up score variables
let leftScore = 0;
let rightScore = 0;
let winScore = 1;
//Set up winner
let winner;

// preload()
//
// Loads the beep audio for the sound of bouncing
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(840, 480);
  rectMode(CENTER);
  noStroke();
  fill(fgColor);

  setupColors();


  setupPaddles();
  setupMarker();
  resetBall();
}

// setupPaddles()
//
// Sets the starting positions of the two paddles
function setupPaddles() {
  // Initialise the left paddle position
  leftPaddle.x = 0 + leftPaddle.w;
  leftPaddle.y = height / 2;

  // Initialise the right paddle position
  rightPaddle.x = width - rightPaddle.w;
  rightPaddle.y = height / 2;
}

//Sets the starting location of the marker
function setupMarker() {
  marker = width/2;
}

// draw()
//
// Calls the appropriate functions to run the game
// See how tidy it looks?!
function draw() {
  // Fill the background
  background(bgColor);
  drawBackground();
  drawMarker();
if (gameOver === true){
  showGameOver();
  } else if (playing) {
    // If the game is in play, we handle input and move the elements around
    handleInput(leftPaddle);
    handleInput(rightPaddle);
    updatePaddle(leftPaddle);
    updatePaddle(rightPaddle);
    updateBall();

    checkBallWallCollision();
    checkBallPaddleCollision(leftPaddle);
    checkBallPaddleCollision(rightPaddle);

    // Check if the ball went out of bounds and respond if so
    // (Note how we can use a function that returns a truth value
    // inside a conditional!)
    if (ballIsOutOfBounds()) {

      //If ball goes out to the left, give player on the right a point and deduct o
      // a point from the left player - otherwise, do the opposite
      //give player on the left one. Additionally, set direction of ball after scoring a point.
      if(ball.x <= 0 ) {
        rightScore += 1;
        leftScore -= 1;
        //Set ball to move to the right
        ball.speed = 5;
        //Color the ball in the color of the losing player
      } else {
        leftScore += 1;
        rightScore -= 1;
        //Set ball to move to the left
        ball.speed = -5;
        //Color the ball in the color of the losing player
      }
      //Check if either player has reached the winning amount of points
      //Also check who the winning player was and set that one to winner
      if (leftScore >= winScore || rightScore >= winScore){
        gameOver = true;
        if(leftScore > rightScore){
          winner = "red player";
        } else {
        winner = "green player";
        }
      }
      // After points have been added, reset it
      resetBall();

    }
  }
  else {
    // Otherwise we display the message to start the game
    displayStartMessage();
  }

  // We always display the paddles and ball so it looks like Pong!
  displayPaddle(leftPaddle);
  displayPaddle(rightPaddle);
  displayBall();
}

// handleInput()
//
// Checks the mouse and keyboard input to set the velocities of the
// left and right paddles respectively.
function handleInput(paddle) {
  // Move the paddle based on its up and down keys
  // If the up key is being pressed
  if (keyIsDown(paddle.upKey)) {
    // Move up
    paddle.vy = -paddle.speed;
  }
  // Otherwise if the down key is being pressed
  else if (keyIsDown(paddle.downKey)) {
    // Move down
    paddle.vy = paddle.speed;
  }
  else {
    // Otherwise stop moving
    paddle.vy = 0;
  }
}

// updatePositions()
//
// Sets the positions of the paddles and ball based on their velocities
function updatePaddle(paddle) {
  // Update the paddle position based on its velocity
  paddle.y += paddle.vy;
}

// updateBall()
//
// Sets the position of the ball based on its velocity
function updateBall() {
  // Update the ball's position based on velocity
  ball.x += ball.vx;
  ball.y += ball.vy;
}

// ballIsOutOfBounds()
//
// Checks if the ball has gone off the left or right
// Returns true if so, false otherwise
function ballIsOutOfBounds() {
  // Check for ball going off the sides
  if (ball.x < 0 || ball.x > width) {
    return true;
  }
  else {
    return false;
  }
}

// checkBallWallCollision()
//
// Check if the ball has hit the top or bottom of the canvas
// Bounce off if it has by reversing velocity
// Play a sound
function checkBallWallCollision() {
  // Check for collisions with top or bottom...
  if (ball.y < 0 || ball.y > height) {
    // It hit so reverse velocity
    ball.vy = -ball.vy;
    // Play our bouncing sound effect by rewinding and then playing
    beepSFX.currentTime = 0;
    beepSFX.play();
    //Set marker to the location where the ball touched the wall and referenced AC/DC
    marker = ball.x;

  }
}

// checkBallPaddleCollision(paddle)
//
// Checks for collisions between the ball and the specified paddle
function checkBallPaddleCollision(paddle) {
  // VARIABLES FOR CHECKING COLLISIONS

  // We will calculate the top, bottom, left, and right of the
  // paddle and the ball to make our conditionals easier to read...
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  let paddleTop = paddle.y - paddle.h / 2;
  let paddleBottom = paddle.y + paddle.h / 2;
  let paddleLeft = paddle.x - leftPaddle.w / 2;
  let paddleRight = paddle.x + paddle.w / 2;

  // First check the ball is in the vertical range of the paddle
  if (ballBottom > paddleTop && ballTop < paddleBottom) {
    // Then check if it is touching the paddle horizontally
    if (ballLeft < paddleRight && ballRight > paddleLeft) {
      // Then the ball is touching the paddle
      // Reverse its vx so it starts travelling in the opposite direction
      ball.vx = -ball.vx;
      // Play our bouncing sound effect by rewinding and then playing
      beepSFX.currentTime = 0;
      beepSFX.play();
    }
  }
}

// displayPaddle(paddle)
//
// Draws the specified paddle
function displayPaddle(paddle) {
  // Draw the paddles
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

// displayBall()
//
// Draws the ball on screen as a square in the color of the last player to touch it
function displayBall() {
  push();
  if (ball.vx >= 0){
    ballColor = leftPlayerColor;
  } else {
    ballColor = rightPlayerColor;
  }
  // Draw the ball
  fill(ballColor);
  rect(ball.x, ball.y, ball.size, ball.size);
  pop();
}

// resetBall()
//
// Sets the starting position and velocity of the ball
function resetBall() {
  // Initialise the ball's position and velocity
  ball.x = width / 2;
  ball.y = height / 2;
  ball.vx = ball.speed;
  //Randomize the vertical direction of the ball between double positive and negative values
  ball.vy = random((ball.speed-(ball.speed*2)),(ball.speed+ball.speed));
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(32);
  text("CLICK TO PONG", width / 2, height / 2);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  playing = true;
}

//Draw and color both background squares
//Change width of each player's sides based on the amount of points
function drawBackground() {
    push();
    rectMode(LEFT);
    fill(leftPlayerColor);
    rect(0 + (leftScore * 50),height/2,width,height);
    fill(rightPlayerColor);
    rect(width - (rightScore * 50),height/2,width,height);
    pop();
}

//Set RGB values to color variables
function setupColors() {
  leftPlayerColor = color(230, 147, 129);
  rightPlayerColor = color(123, 199, 119);

}

function drawMarker() {
  push();
  fill(20,20,20,20);
  rect(marker, height/2, 10, height,);
  pop();
}

function showGameOver() {
  ball.x = width*2;
  ball.y = height*2;
  push();
  textSize(180);
  textAlign(CENTER,CENTER);
  text("GAME\nOVER",width/2,height/2);
  textAlign(CENTER);
  textSize(50);
  text(winner + " wins", width/2,height/2);
  pop();
}
