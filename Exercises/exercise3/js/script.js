"use strict";

/******************************************************************************
Where's Sausage Dog?
by Pippin Barr

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

//Set image size
let imageSize = 128;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 100;

// Keep track of whether they've won
let gameOver = false;
//Keeps track of whether you can click to reset or not
let onEndScreen = false;

// Create positions of animated dog when spawned in
let godDogY;
let godDogX;
//Set height of celestial beam (on which the game over dog is transported)
let beamHeight = 1000;

//Set speed, noise and velocity variables for animated dog
let dogSpeed = 1;
let dogVelocity = 1;
let dogNoise = 0;

//Create random color values for RGB background
  let randomColorValue1;
  let randomColorValue2;
  let randomColorValue3;



// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");
}

// setup()
//

function setup() {
  //sets up the playing board
  setUpGame();

}


// draw()
//
// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {




    godDogY -= dogSpeed * (dogVelocity * dogVelocity);
    //I multiply dogVelocity with itself to create a more curved acceleration,
    //starting slow but progressively accelerating
    dogVelocity += 0.03;
    godDogX += random(-2,2);

    //Create celestial tractor beam on location of found dog
    fill(255);
    rect(targetX, targetY - (beamHeight / 2), imageSize, beamHeight);
    ellipse(targetX, targetY, imageSize, imageSize);
    //Draw animated version of target
    image(targetImage, godDogX, godDogY, imageSize, imageSize);
    //Animate dog up the screen, into the heavens.




    // Prepare our typography
    textFont("Helvetica");

    textAlign(CENTER, CENTER);
    noStroke();
    fill(random(255));

    // Tell them they won!
    textSize(120);
    text("DOG HAS ASCENDED", width / 2, height / 2);
    textSize(80);
    text("CLICK TO RELIVE THE HORROR", width / 2, height / 2 + 80);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(random(255));
    strokeWeight(10);
    ellipse(targetX, targetY, imageSize, imageSize);
  }
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {

  //If you click on the game over screen, the game restarts
  if (onEndScreen === true) {
    setUpGame();
  }
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width / 2 && mouseX < targetX + targetImage.width / 2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    //Also set target dog's position to celestial dog's starting point

    if (mouseY > targetY - targetImage.height / 2 && mouseY < targetY + targetImage.height / 2) {
      gameOver = true;
      //Set celestial dog's starting point to found target
      godDogY = targetY;
      onEndScreen = true;
      //Decrease size of images every reset
      imageSize -= 10;
      //Increase amount of decoys every reset
      numDecoys += 30;
    }
  }



}
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setUpGame() {
  gameOver = false;
  onEndScreen = false;
  //Reset speed and velocity for dog
  dogSpeed = 1;
  dogVelocity = 1;

  //Create new random values for RGB background
  findRandomColor()

  createCanvas(windowWidth, windowHeight);
  //Use random numbers from findRandomColor to create new background color every reset
  background(randomColorValue1,randomColorValue2,randomColorValue3);
  imageMode(CENTER);
  rectMode(CENTER);


  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0, width);
    let y = random(0, height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1, x, y, imageSize, imageSize);
    } else if (r < 0.2) {
      image(decoyImage2, x, y, imageSize, imageSize);
    } else if (r < 0.3) {
      image(decoyImage3, x, y, imageSize, imageSize);
    } else if (r < 0.4) {
      image(decoyImage4, x, y, imageSize, imageSize);
    } else if (r < 0.5) {
      image(decoyImage5, x, y, imageSize, imageSize);
    } else if (r < 0.6) {
      image(decoyImage6, x, y, imageSize, imageSize);
    } else if (r < 0.7) {
      image(decoyImage7, x, y, imageSize, imageSize);
    } else if (r < 0.8) {
      image(decoyImage8, x, y, imageSize, imageSize);
    } else if (r < 0.9) {
      image(decoyImage9, x, y, imageSize, imageSize);
    } else if (r < 1.0) {
      image(decoyImage10, x, y, imageSize, imageSize);
    }
  }
  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0, width);
  targetY = random(0, height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage, targetX, targetY, imageSize, imageSize);

  //Draw dog on rectangle, with text, in top right CORNER
  noStroke();
  fill(227, 160, 5);
  rect(width - 70, 80, 140, 160);
  fill(0);
  textStyle(CENTER);
  textSize(12);
  stroke(50);
  text("RELEASE ME FROM \n THIS NIGHTMARE", width - 128, 128);
  image(targetImage, width - 64, 64);

  //set animation starting point for animated dog
  godDogX = targetX;

}

//This function assigns three random numbers for the RGB values used in the background
function findRandomColor(){
  randomColorValue1 = random(0,255);
  randomColorValue2 = random(0,255);
  randomColorValue3 = random(0,255);


}
