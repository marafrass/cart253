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

// The current position and size of the second square, added by Martin
let newSquareX;
let newSquareY;
let newSquareSize = 90;

//The current position of the "graph"
let graphX;
let graphY;
let graphSize = 10;

let img;

// preload()
//
//

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

  //Set the starting location of the "graph" to the middle of the right side
  //Size divided because of rectMode(CENTER)
  graphX = width + graphSize/2;
  graphY = height/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle, two square's, mouse dot and graph positions so they move
// Draw the shapes on screen

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


  //CREATE BLACK DOT MOUSE TRAIL

  //Set color of dot to black
  fill(0);
  //Make the dot jitter around to make it more interesting
  let randomNumber = random(-5,5);
  // Draw a small, black ellipse that follows the mouse
  ellipse(mouseX + randomNumber,mouseY + randomNumber,10,10);



  //MOVEMENT OF GRAPH

  //Set color of graph to yellow
  fill(255, 255, 0);
  //Move graph from right to left
  //Horizontal movement is constant, but add random value to Y to give effect of graph
  graphX -= 1;
  graphY -= randomNumber;
  //Draw graph
  rect(graphX,graphY,graphSize,graphSize);



}
