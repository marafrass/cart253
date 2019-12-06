//WIP SPACEGAME
//by Martin Hanses
//
// Use arrow keys to fly (you control the ship, not the reticule)
// Press shift to fire laser

let gameStarted = false;
let gameOver = false;
let gameWon = false;

//TEST FOR playerHUD
let playerHUD;

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

//create audio variables
let audLaser;
let audPlayerHit;
let audEnemyExplosion;
let audOverheat;
let audMusic;

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

  //Load all audio files
  audLaser = loadSound('assets/sounds/laser.wav');
  audPlayerHit = loadSound('assets/sounds/hit.wav');
  audEnemyExplosion = loadSound('assets/sounds/explosion.wav');
  audOverheat =loadSound('assets/sounds/overheat.wav');
  audMusic =loadSound('assets/sounds/music.wav');

}

//setup()
//
//Set up game window and screen
function setup() {

  createCanvas(windowWidth - 5 , windowHeight - 5);
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
    let size = floor(random(1, 1));
    //Create debris based on the variable
    let newStar = new Debris(x, y, size);
    //place the new piece of debris in the debris array
    debris.push(newStar);
  }
  let x = floor(random(0, windowWidth));
  let y = floor(random(0, windowHeight));
  //create an enemy bullet at the position of the enemy
  enemyBullet = new EnemyBullet(enemy.x, enemy.y, 20);
  debris.push(enemyBullet);

  playerHUD = new HUD();
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

  //display and set playerHUD
  playerHUD.setDialogue();
  playerHUD.display();


}

//handleGameIntro()
//
//Run game intro state when applicable
function handleGameIntro() {
  push();
  background(255);
  fill(0);
  text("Dont hit the enemy ship, hit the red missile! \n Use arrow keys to steer ship and left shift to fire lasers. \n Don't get hit by the red missile! Click to begin", 50, 50);
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
  text("You died! Click to try again!", 50, 50);
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
  text("You win! Click to start over ", 50, 50);
  pop();
}

//mouseClicked()
//
//run whenever we click the mouse
function mouseClicked() {

  //If game still hasnt started, click to begin and to start playing music
  if (gameStarted === false) {
    gameStarted = true;
    if (audMusic.isPlaying() === false){
      audMusic.loop();
    }
  }
  //if the game is over, click to restart the whole thaang
if (gameOver === true) {
    player.reset();
    gameOver = false;
    gameStarted = false;
  }
  //if the player has won, click to restart the game
  if (gameWon === true){
    player.reset();
    enemy.reset();
    gameWon = false;
    gameStarted = false;
    gameOver = false;
  }

}
