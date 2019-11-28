//WIP SPACEGAME
//by Martin Hanses
//
// Use arrow keys to fly (you control the ship, not the reticule)
// Press shift to fire laser

let gameStarted = false;
let gameOver = false;
let gameWon = false;

//TEST FOR POPUP
let popup;

//Create debris array
let debris = [];
//create player and reticule variable
let player;
let reticule;

let enemyBullet;

//create backgrounds
let earth;
let backgroundSprite;

//create enemy variable
let enemy;

//Create sprite variables for player
let imgPlayer;
let imgPlayerBottomLeft;
let imgPlayerBottomRight;
let imgPlayerTopLeft;
let imgPlayerTopRight;
let imgPlayerRight;
let imgPlayerLeft;
let imgPlayerTop;
let imgPlayerBottom;

//TESTING
let imgSpeakerPortrait;

//preload()
//
//Preload images and sounds
function preload() {

  reticule = loadImage('assets/images/target.png');
  earth = loadImage('assets/images/earth.png')
  imgPlayer = loadImage('assets/images/playerShipCenter.png')
  imgPlayerBottomLeft = loadImage('assets/images/playerShipBottomLeft.png')
  imgPlayerBottomRight = loadImage('assets/images/playerShipBottomRight.png')
  imgPlayerTopLeft = loadImage('assets/images/playerShipTopLeft.png')
  imgPlayerTopRight = loadImage('assets/images/playerShipTopRight.png')
  imgPlayerLeft = loadImage('assets/images/playerShipLeft.png')
  imgPlayerRight = loadImage('assets/images/playerShipRight.png')
  imgPlayerTop = loadImage('assets/images/playerShipTop.png')
  imgPlayerBottom = loadImage('assets/images/playerShipBottom.png')

  //TESTING PURPOSES PLACEHOLDER PORTRAIT
  imgSpeakerPortrait = loadImage('assets/images/portraitPlaceholder.png')
}

//setup()
//
//Set up game window and screen
function setup() {

  createCanvas(windowWidth, windowHeight);
  //Set player and background
  player = new Player();
  backgroundSprite = new Background();
  //create your evil opponent
  enemy = new Enemy();
  //Create debris based on amount set in loop
  for (let i = 0; i < 100; i++) {
    //randomize location
    let x = floor(random(0, windowWidth));
    let y = floor(random(0, windowHeight));
    //Create debris based on the variable
    let newStar = new Debris(x, y, 4);
    //place the new piece of debris in the debris array
    debris.push(newStar);
  }
  let x = floor(random(0, windowWidth));
  let y = floor(random(0, windowHeight));
  enemyBullet = new EnemyBullet(x, y, 20);
  debris.push(enemyBullet);
}

//draw()
//call all functions we use
function draw() {

  if (player.health <= 0) {
    handleGameOver();
  } else if (enemy.plotPoints <= 0){
    gameWon = true;
    handleVictory();
  } else if (gameStarted === true) {
    handleGameplay();
  } else {
    handleGameIntro();
  }
}

//function handleGameplay()
//
//This function displays the elements of the main game
function handleGameplay() {

  //Handle background functions
  backgroundSprite.display();
  backgroundSprite.handleInput();

  //Handle enemy functions
  enemy.display();
  enemy.update();

  //handle debris and enemyBullet
  for (let i = 0; i < debris.length; i++) {
    debris[i].update();
  }
  //handle enemyBullet collisions
  enemyBullet.handleCollisions();

  //update all player functions
  player.update();
  player.display();
  player.handleInput();
  player.handleShooting();

  //add WIP instructions to the screen
  push();
  text("Use the arrow keys to fly \nand shift to fire lasers!", 50, 50);
  pop();

  //TEST FOR Popup
  popup = new Popup();
  popup.display();

}

//handleGameIntro()
//
//Run game intro state when applicable
function handleGameIntro() {
  push();
  background(255);
  fill(0);
  text("click to begin", 50, 50);
  pop();
}

//handleGameOver()
//
//Run gameover state when applicable
function handleGameOver() {
  gameOver = true;
  push();
  background(255);
  fill(0);
  text("you ded lol", 50, 50);
  pop();
}

//handleVictory()
//
//Run gameover state when applicable
function handleVictory() {
  gameOver = true;
  push();
  background(255);
  fill(0);
  text("You win!", 50, 50);
  pop();
}

//mouseClicked()
//
//run whenever we click the mouse
function mouseClicked() {

  //If game still hasnt started, click to begin
  if (gameStarted === false) {
    gameStarted = true;
  }
  //if the game is over, click to restart the whole thaang
if (gameOver === true) {
    player.reset();
    gameOver = false;
    gameStarted = false;
  }
  if (gameWon === true){
    player.reset();
    enemy.reset();
    gameWon = false;
    gameStarted = false;
    gameOver = false;
  }

}
