// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// The current position of the second square, added by Martin
let newSquareX;
let newSquareY;
let newSquareSize = 90;

// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  //Starting the second square on the left, halfway down the canvas (We don't touch X since we want it at 0)
  //We continue to divide by two since rectangles are set to draw from center
  // Height is divided by two to place it in the middle
  newSquareX = -newSquareSize/2;
  newSquareY = height/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect

  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  //Move new square from left to right
  newSquareX += 1;
  //Make the new square transparent green
  fill(0,255,0,10);
  //Display the new square
  rect(newSquareX,newSquareY,newSquareSize,newSquareSize);


  //CREATE BLACK DOT TO FOLLOW THE MOUSE
  //Set color of dot to black
  fill(0);
  //Make the dot jitter around to make it more interesting
  let mouseJitter = random(-5,5);
  // Draw a small, black ellipse that follows the mouse
  ellipse(mouseX + mouseJitter,mouseY + mouseJitter,10,10);

}
