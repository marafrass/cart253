/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position, image and size of our avatar
let avatarX;
let avatarY;
let avatarSize = 50;
let avatarShip;

// The speed and velocity of our avatar
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position, image and size of the enemy
let enemyX;
let enemyY;
let enemySize = 50;
let enemyShip;

// The speed and velocity of our enemy
let enemySpeed = 5;
let enemyVX = 5;

// How many dodges the player has made
let dodges = 0;

//What text and score is currently being displayed
let displayedText;
let displayedScore;

//Set background image
let backgroundSpace;



function preload(){

  //preload avatar and enemy ship
  enemyShip = loadImage('assets/images/enemyShip.png');
  avatarShip = loadImage('assets/images/avatarShip.png');
  backgroundSpace = loadImage('assets/images/spaceBackground.gif')


}

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(500,500);

  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();

  //Set starting text
  displayedText = "Good luck!";

  //Set enemy ship and player ship


}


// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(255,220,220);

  // Draw space background
  image(backgroundSpace,0,0,700,500);

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  //Set the displayed score

  displayedScore = ("Dodges: " + dodges);

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Tell the player they lost
    //Originally logged to console, now in the lower left text item
    //console.log("YOU LOSE!");
    displayedText = "Try again!"
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
    //Reset enemy speed
    enemySpeed = 5;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    //Originally logged in console, now displayed on bottom left
    //console.log("Don't try to run!");
    displayedText = "Don't try to run!"
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
    //Reset enemy speed
    enemySpeed = 5;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX >= width) {
    // This means the player dodged so update its dodge statistic
    dodges += 1;
    // Tell them how many dodges they have made
    //Originally logged in console, now also displayed on bottom right
    console.log(dodges + " DODGES!");

    // Reset the enemy's position to the left at a random height
    enemyX = 0;
    enemyY = random(0,height);
    // Make enemy move faster each time the player successfully DODGES
    enemySpeed += 0.2;
  }

  // Display the number of successful dodges in the console
  console.log(dodges);


  // ORIGINAL CODE DISPLAYING PLAYER AS A BLACK CIRCLE
  // // The player is black
  // fill(0);
  // // Draw the player as a circle
  // ellipse(avatarX,avatarY,avatarSize,avatarSize);
  //NEW CODE DISPLAYING PLAYER AS SHIP
  image(avatarShip, avatarX,avatarY);

  //ORIGINAL CODE FOR DISPLAYING ENEMY
  // // The enemy is red
  // fill(255,0,0);
  // // Draw the enemy as a circle
  // ellipse(enemyX,enemyY,enemySize,enemySize);
  //NOW FOLLOWS NEW CODE FOR ENEMY
  image(enemyShip,enemyX,enemyY);

  //Added text on the bottom left (moved console logs here)
  fill(255);
  textSize(30);
  text(displayedText,10,480);

  //Added score (number of dodges in current run) on lower RIGHT
  textSize(20);
  text(displayedScore, 390,480);


}
