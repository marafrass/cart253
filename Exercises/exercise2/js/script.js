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

// The different speeds and velocity of our avatar
let boostedSpeed = 12;
let startingSpeed = 8;
let avatarSpeed = 8;
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

//Set background image, dimensions and locations of the two versions
let backgroundSpace;
let bg1x;
let bg2x;
let backGroundSizeX = 700;
let backGroundSizeY = 500;

//Set foreground variable
let foreGround;

//Set starting screen and on/off bool
let startScreen;
let showIntro = true;

function preload(){

  //preload avatar and enemy ship
  enemyShip = loadImage('assets/images/enemyShip.png');
  avatarShip = loadImage('assets/images/avatarShip.png');
  backgroundSpace = loadImage('assets/images/spaceBackground.gif');
  foreGround = loadImage('assets/images/foreGround.png');
  startScreen = loadImage('assets/images/startingScreen.png');
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
  displayedText = "Have a nice space day, commander.";

  //Set starting positions of background
  bg1x = 0;
  bg2x = -700;

  //set starting positions of foreground
  fg1x = 0;
  fg2x = -700;




}


// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  background(255,220,220);

  // Draw space backgrounds and scroll
  image(backgroundSpace,bg1x,0,backGroundSizeX,backGroundSizeY);
  image(backgroundSpace,bg2x,0,700,500);
  bg1x +=2;
  bg2x +=2;

  //Move backgrounds over to the left, off screen
  if (bg1x >= width){
    bg1x = -backGroundSizeX;
  }
  if (bg2x >= width){
    bg2x = -backGroundSizeX;
  }

  //draw and move foregrounds in same manner
  image(foreGround,fg1x,0,backGroundSizeX,backGroundSizeY);
  image(foreGround,fg2x,0,700,500);
  fg1x +=4;
  fg2x +=4;

  //Move backgrounds over to the left, off screen
  if (fg1x >= width){
    fg1x = -backGroundSizeX;
  }
  if (fg2x >= width){
    fg2x = -backGroundSizeX;
  }

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

  if (keyIsDown(SHIFT)) {
    avatarSpeed = boostedSpeed;
  }
  else {
    avatarSpeed = startingSpeed;
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
    displayedText = "Damn you, space rascals!"
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

    displayedText = "Please remain within the designated space zone."
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
    displayedText = "";
  }

  // // Display the number of successful dodges in the console
  // console.log(dodges);



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
  textSize(15);
  text(displayedText,10,480);

  //Added score (number of dodges in current run) on lower RIGHT
  textSize(15);
  text(displayedScore, 390,480);

 //Upper left corner instructions
  text("Use arrows to move and left shift to speed up, commander.", 10,20);


//If we still havent clicked past the intro, prevent the game from running
//If intro hasnt been shown yet, show it! flaunt it! display it for all the world to see!
  if (showIntro){
    image(startScreen, 0,0);
    noLoop();
  }

}


//When we click to continue, the game starts to run again
function mousePressed() {
  showIntro = false;
  loop();


//wait do I even need the boolean here
}
