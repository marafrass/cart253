//WIP SPACEGAME
//by Martin Hanses
//
// Use arrow keys to fly (you control the ship, not the reticule)
// Press shift to fire laser


//Create debris variables
let star;
let stars = [];
//create player and reticule variable
let player;
let reticule;

//create backgrounds
let earth;
let backgroundSprite;

//create enemy
let enemy;

//preload()
//
//Preload images and sounds
function preload() {

  reticule = loadImage('assets/images/target.png');
  earth = loadImage('assets/images/earth.png')

}

//setup()
//
//Set up game window and screen
function setup() {

  createCanvas(windowWidth, windowHeight);
  player = new Player();
  backgroundSprite = new Background();

  enemy = new Enemy();

  for (let i = 0; i < 100; i++) {

    //randomize location
    let x = floor(random(0, windowWidth));
    let y = floor(random(0, windowHeight));
    //Create kid based on the variable
    let newStar = new Debris(x, y, 4);
    //place the new kid in the kids array

    stars.push(newStar);

  }
}

//draw()
//call all functions we use
function draw() {

  backgroundSprite.display();
  backgroundSprite.handleInput();

  enemy.display();
  enemy.update();



  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
  }

  player.update();
  player.display();
  player.handleInput();
  player.handleShooting();

  push();
  text("Use the arrow keys to fly \nand shift to fire lasers!",50,50);
  pop();

}
