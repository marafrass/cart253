class Player {
  constructor() {
    this.x = windowWidth / 2;
    this.y = windowHeight / 1.5;
    this.targetX = this.x;
    this.targetY = this.y - 100;
    this.size = 75;
    this.vx = 0;
    this.vy = 0;

    this.bullet = createVector(this.x, this.y);
    this.bulletSize = 10;

    this.bulletIsActive = true;
  }

  //update()
  //
  //Update the position of the player and the reticule
  update() {

    if (this.bulletIsActive === false) {
      this.bullet.x = this.x;
      this.bullet.y = this.y;
    }

    this.x += this.vx;
    this.y += this.vy;
    this.targetX -= this.vx;
    this.targetY -= this.vy;

    this.vx = constrain(this.vx, -8, 8);
    this.vy = constrain(this.vy, -8, 8);

    this.constrainToMap();





  }

  //handleInput()
  //
  //Handle the input keys to change velocity
  handleInput() {

    if (keyIsDown(LEFT_ARROW)) {
      this.vx += -0.5;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.vx += 0.5;
    } else if (this.vx < 0) {
      this.vx += 0.3;
    } else if (this.vx > 0) {
      this.vx -= 0.3;
    }

    if (keyIsDown(UP_ARROW)) {
      this.vy += -0.5;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.vy += 0.5;
    } else if (this.vy < 0) {
      this.vy += 0.3;
    } else if (this.vy > 0) {
      this.vy -= 0.3;
    }

    // shooting boys
    if (keyIsDown(SHIFT) && this.bulletIsActive === false) {
      this.bulletIsActive = true;
    }

  }

  //display()
  //
  //display images for the player and the reticule
  display() {
    push();
    imageMode(CENTER, CENTER);
    rectMode(CENTER, CENTER);
    image(reticule, this.targetX, this.targetY, 50, 50);

    fill(255, 255, 255);

    let currentSprite;

    //If player is on the left of the screen, find the right left sprite
    if (this.x < windowWidth / 3) {
      if (this.y > (windowHeight - (windowHeight / 3))) {
        currentSprite = imgPlayerBottomLeft;
      } else if (this.y > (windowHeight / 3)) {
          currentSprite = imgPlayerLeft;
        } else {
          currentSprite = imgPlayerTopLeft;
        }
    //If player is on the right of the screen, find the right, um, right sprite
      } else if (this.x > (windowWidth - windowWidth / 3)) {
          if (this.y > (windowHeight - (windowHeight / 3))) {
            currentSprite = imgPlayerBottomRight;
          } else if (this.y > (windowHeight / 3)) {
              currentSprite = imgPlayerRight;
            } else {
              currentSprite = imgPlayerTopRight;
            }
    //If player is in the center, find the right sprite
          } else {
            if (this.y > (windowHeight - (windowHeight / 3))) {
              currentSprite = imgPlayerBottom;
            } else if (this.y > (windowHeight /3)) {
                currentSprite = imgPlayer;
              } else {
                currentSprite = imgPlayerTop;
              }
            }

    image(currentSprite, this.x, this.y, this.size*2, this.size);
    pop();

    if (this.bulletIsActive === true) {

      let bulletToTarget = dist(this.bullet.x, this.bullet.y, this.targetX, this.targetY);

      if (bulletToTarget < 10) {
        this.bulletIsActive = false;
        this.bullet.x = this.x;
        this.bullet.y = this.y;
        this.bulletSize = 10;
      } else {

        let d = dist(this.x, this.y, this.targetX, this.targetY);


        let vecObject = createVector(this.bullet.x, this.bullet.y);
        let vecTarget = createVector(this.targetX, this.targetY);
        let vecDesiredVel = vecTarget.sub(vecObject);

        let frameVel = vecDesiredVel.limit(d / 10);

        this.bullet.x += frameVel.x;
        this.bullet.y += frameVel.y;

        push();
        strokeWeight(3);
        stroke(0, 0, 255);
        rect(this.bullet.x, this.bullet.y, this.bulletSize, this.bulletSize);
        pop();

        this.bulletSize -= 1;
      }
    }

  }

  //handleShooting()
  //
  //Checks if lasers collide with enemy when shots are fired
  handleShooting() {
    let d = dist(player.targetX, player.targetY, enemy.x, enemy.y)
    if (d < 20) {
      enemy.fillcolor += 20;
    }

  }
  //constrainToMap()
  //
  //Nudges the player ship to a smaller area of the screen
  constrainToMap() {

    if (this.x < (windowWidth / 20)) {
      this.vx += 1;
    }
    if (this.x > (windowWidth - windowWidth / 20)) {
      this.vx -= 1;
    }
    if (this.y < (windowHeight / 5)) {
      this.vy += 1;
    }

    if (this.y > (windowHeight - windowHeight / 10)) {
      this.vy -= 1;
    }

  }



}
