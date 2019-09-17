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

//The current position and dominating presence of Frog
let frogX;
let frogY;
let frogSize = 200;
let frog;

//The current position and timid imposing of Fly
let flyX;
let flyY;
let flySize = 150;
let fly;



//Preload both images of Frog and Fly for quick deployment on the field of battle

function preload() {

 frog = loadImage('assets/images/Froggy.jpg');
 fly = loadImage('assets/images/Fly.jpg');

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

  //Set Frog to the bottom left, pushed out of view
  frogX = 0 - frogSize;
  frogY = height - frogSize;
  //Set Fly to bottom right, pushed out of view
  flyX = width;
  flyY = height - flySize;


  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();


}


// draw()
//
// Change the circle, two square's, mouse dot,graph and image positions so they move
// Draw the shapes on screen

function draw() {
  // We don't fill the background so we get a drawing effect
  //NOTE: I kinda wanted to add a background to make the picture seem smoother,
  //so I added it later on while still retaining the trail and drawing effects.


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
  fill(0,0,0,20);
  //Make the dot jitter around to make it more interesting
  let randomNumber = random(-5,5);
  // Draw a small, black ellipse (symbolic fly?) that follows the mouse
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

  //TENSION

  //Set movement(speed) of Frog
  frogX += 0.3;
  //Set movement(speed) of Fly
  flyX -= 0.225;

//draw Frog up until the whole glory of frog is showing, and then stop
if(frogX <= 0){
  image(frog,frogX,frogY,frogSize,frogSize);
  }

//draw Fly until he is dangerously far out in the open, and then stop
//ADDITIONALLY, add slightly transparent background to make image clearer
if (flyX >= width - flySize){
 image(fly,flyX,flyY,flySize,flySize);
   background(255,255,255,2);
}
//If Fly has finished moving, add "tension" to the screen and stop updating background
else {
  fill(0);
  textSize(30);
  textAlign(CENTER);
  text('"tension"', width/2, height*0.85);
}


}
