// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius, upKey, downKey, leftKey, rightKey, sprintKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.sprintSpeed = speed * 1.3;
    this.standardSpeed = speed;
    // Health properties
    this.startingHealth = radius;
    this.minHealth = 31;
    this.maxHealth = 130;
    this.health = this.startingHealth; // Must be AFTER defining this.startingHealth
    this.healthLossPerMove = 0.4;
    this.standardHealthLossPerMove = 0.2;
    this.sprintingHealthLossPerMove = 0.6;
    this.healthGainPerEat = 0.5;
    // Score properties
    this.donutsEaten = 0;

    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health; // Radius is defined in terms of health
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;
    this.sprintKey = sprintKey;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {

    this.speed = this.speed - (this.donutsEaten / 4);

    //Sprinting movement (also increases speed of health lost)
    if (keyIsDown(this.sprintKey)) {
      this.speed = this.sprintSpeed;
      this.healthLossPerMove = this.sprintingHealthLossPerMove;
    } else {
      this.speed = this.standardSpeed;
      this.healthLossPerMove = this.standardHealthLossPerMove;
    }

    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    } else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    } else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    } else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    } else {
      this.vy = 0;
    }
  }

  // move
  //
  // Updates the position according to velocity
  //
  // Handles wrapping
  move() {
    // Update position, with size (health) affecting speed of movement
    this.x += this.vx;
    this.y += this.vy;

    // Update health - player can not become smaller than their minimum health!
    this.health = this.health - this.healthLossPerMove / 3;
    this.health = constrain(this.health, this.minHealth, this.maxHealth);

    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    } else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    } else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the donut's health and increases
  // the predator's. If the donut dies, one point is added to predator, and donut gets reset.
  handleEating(donut) {
    // Calculate distance from this predator to the donut
    let d = dist(this.x, this.y, donut.x, donut.y);
    // Check if the distance is less than their two radii (an overlap)
    // ALSO check if the player is bigger than the donut - only then can it fall
    // into the hole.
    if ((d < this.radius + donut.radius) && (this.radius > donut.radius)) {
      // Increase predator health and constrain it to its possible range
      this.health += this.healthGainPerEat;
      this.health = constrain(this.health, 0, this.maxHealth);
      // Decrease donut health by the same amount
      donut.health -= this.healthGainPerEat;
      // Check if the donut was eaten and reset it if so
      if (donut.health < 0) {
        donut.reset();
        // Add one to the donutsEaten score
        this.donutsEaten += 1;
        console.log(this.donutsEaten);
      }
    }
  }


  //handleFighting()
  //
  //Check if players are overlapping, and in that case, make the one with more donutsEaten grow
  //And the other shrink
  handleFighting(player) {
    //Check distance between players
    let d = dist(this.x, this.y, player.x, player.y);
    //Check if this distance is shorter than the radius of the players
    if (d < this.radius + player.radius) {
      // If this player has more donutsEaten, make it grow further and
      // shrink the other player
      if (this.donutsEaten > player.donutsEaten) {
        this.health += this.healthGainPerEat / 3;
        player.health -= player.healthGainPerEat / 3;
      }
    }
  }

  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    fill(this.fillColor);
    this.radius = this.health;
    ellipse(this.x, this.y, this.radius * 2);
    //Create number in middle of circle showing the current player score
    textSize(this.radius);
    fill(255);
    textAlign(CENTER, CENTER);
    text(this.donutsEaten, this.x, this.y);
    pop();
  }
  
  // reset();
  //
  //Reset size and score for the predator.
  reset() {
    this.health = this.startingHealth;
    this.donutsEaten = 0;
  }
}
