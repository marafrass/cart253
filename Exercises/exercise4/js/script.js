"use strict";
// NOTE: I was slightly apprehensive about handing this game in as it was,
// since I was worried it wasn't visually and audially interesting enough.
// I really like the simplicity and minimalistic design it has now, but I was
// worried it'd come across as lazy. That being said, I think the visuals not
// only look cool, but genuinelly change the game in a meaningful way. The sound
// and marker make the game different enough to be interesting, at least in my opinion.


// DANGER PONG
// By Martin Hanses
// (Original code by Pippin Barr)
//
// This is danger pong. How is it different from regular pong?
// I am glad you asked. It is more dangerous. Aggression occurs
// constantly in everyday life. Anger and violence is commonplace.
// Danger pong explores this violence, so that we may learn from it.
// Learn fighting moves, mostly.
//
//
// Up and down keys control the right hand paddle, W and S keys control
// the left hand paddle.
//
// WHAT IS THIS GAME?
// With every point, your playing field will grow, making it more difficult for
// The opponent to see where the ball will go! First to fill the screen with their color wins!

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
  speed: 10
}

//MARKER
//
//Helps the players see where the ball bounced
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

// Variables to hold the beep/boop sound we will play on bouncing on wall/paddle,
// as well as the point scoring sound
let beepSFX;
let boopSFX;
let pointSFX;

//Set up score variables
let leftScore = 0;
let rightScore = 0;
let winScore = 8;
//Set up winner
let winner;

// preload()
//
// Loads the beep and boop audio for the sounds of bouncing against paddles/walls
function preload() {
  beepSFX = new Audio("assets/sounds/beep.wav");
  boopSFX = new Audio("assets/sounds/boop.wav");
  pointSFX = new Audio("assets/sounds/winSound.wav");
}

// setup()
//
// Creates the canvas, sets up the drawing modes,
// Sets initial values for paddle and ball positions
// and velocities.
function setup() {
  // Create canvas and set drawing modes
  createCanvas(windowWidth, 480);
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
  marker = width / 2;
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
  if (gameOver === true) {
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
      if (ball.x <= 0) {
        rightScore += 1;
        leftScore -= 1;
        //Set ball to move to the right
        ball.speed = 5;
      } else {
        leftScore += 1;
        rightScore -= 1;
        //Set ball to move to the left
        ball.speed = -5;
      }
      // play point scoring sound effect
      pointSFX.currentTime = 0;
      pointSFX.play();
      //Check if scoring player got the winning point
      hasPlayerWon();
      // After points have been added, reset it
      resetBall();

    }
  } else {
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
  } else {
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
  } else {
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
    boopSFX.currentTime = 0;
    boopSFX.play();
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
  if (ball.vx >= 0) {
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
  //Randomize the vertical direction of the ball
  //(This was changed due to the game being more intresting when the ball launched
  // at more steep angles, making it bounce more)
  ball.vy = random(random(-12, -16), random(12, 16));
}

//resetScore()
//
//Reset the scores and playing field
function resetGame() {
  leftScore = 0;
  rightScore = 0;
}

// displayStartMessage()
//
// Shows a message about how to start the game
function displayStartMessage() {
  push();
  textAlign(CENTER, CENTER);
  textSize(100);
  text("CLICK TO PLAY", width / 2, height / 4);
  text("DANGER PONG", width / 2, height / 1.4);
  pop();
}

// mousePressed()
//
// Here to require a click to start playing the game
// Which will help us be allowed to play audio in the browser
function mousePressed() {
  //If game just started, click to begin
  if (!playing) {
    playing = true;
  }
  //If game is over, click to reset
  if (gameOver) {
    gameOver = false;
    resetBall();
    resetGame();
  }

}

//drawMarker
//
//Draw and color both background squares
//Change width of each player's sides based on the amount of points
function drawBackground() {
  push();
  rectMode(LEFT);
  fill(leftPlayerColor);
  rect(0 + (leftScore * 50), height / 2, width, height);
  fill(rightPlayerColor);
  rect(width - (rightScore * 50), height / 2, width, height);
  pop();
}

//setupColors()
//
//Set RGB values to color variables
function setupColors() {
  leftPlayerColor = color(230, 147, 129);
  rightPlayerColor = color(123, 199, 119);

}
//drawMarker()
//
//Draw the marker on the last location the ball bounced against a wall
function drawMarker() {
  push();
  fill(20, 20, 20, 20);
  rect(marker, height / 2, 10, height, );
  pop();
}

//showGameOver()
//
//When the winScore has been reached by either player, display the winner and show the
//game over screen
function showGameOver() {
  ball.x = width * 2;
  ball.y = height * 2;
  push();
  textSize(180);
  textFont("verdana");
  textAlign(CENTER, CENTER);
  text("GAME\nOVER", width / 2, height / 2);
  textAlign(CENTER);
  textSize(50);
  text(winner + " wins", width / 2, (height / 2) - 10);
  textSize(35);
  text("click to play again", width / 2, height - 40);
  pop();
}

//hasPlayerWon()
//
//Check if either player has reached the winning amount of points
//Also check who the winning player was and set that one to winner
function hasPlayerWon() {
  if (leftScore >= winScore || rightScore >= winScore) {
    gameOver = true;
    if (leftScore > rightScore) {
      winner = "red player";
    } else {
      winner = "green player";
    }
  }
}
