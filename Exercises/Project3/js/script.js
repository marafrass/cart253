//WIP SPACEGAME
//by Martin Hanses
//
// Use arrow keys to fly (you control the ship, not the reticule)
// Press shift to fire laser


//TEST FOR POPUP
let popup;


//Create debris variables
let star;
let stars = [];
//create player and reticule variable
let player;
let reticule;

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
  imgSpeakerPortrait = loadImage('assets/images/portraitPlaceholder.png')

  //TESTING PURPOSES PLACEHOLDER PORTRAIT


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
  //Create stars based on amount set in loop
  for (let i = 0; i < 100; i++) {
    //randomize location
    let x = floor(random(0, windowWidth));
    let y = floor(random(0, windowHeight));
    //Create star based on the variable
    let newStar = new Debris(x, y, 4);
    //place the new star in the stars array
    stars.push(newStar);

  }
}

//draw()
//call all functions we use
function draw() {
  handleGameplay();
}

//function handleGameplay()
//
//This function displays the elements of the main game
function handleGameplay(){

    //Handle background functions
    backgroundSprite.display();
    backgroundSprite.handleInput();
    //Handle enemy functions
    enemy.display();
    enemy.update();
    //handle star debris
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
    }
    //update all player functions
    player.update();
    player.display();
    player.handleInput();
    player.handleShooting();
    //add WIP instructions to the screen
    push();
    text("Use the arrow keys to fly \nand shift to fire lasers!",50,50);
    pop();


    //TEST FOR Popup
    popup = new Popup();
    popup.display();

}
