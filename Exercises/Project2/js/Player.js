"use strict"


class Player {
  //constructor()
  //
  //Define position, size, properties and next predicted move
  // also define score, sentence and timeSpent for flavor text 
  constructor() {
    this.size = windowWidth / 20;
    this.x = this.size * 3;
    this.y = this.size * 2;
    this.direction = this.size;
    this.nextMoveX = this.x + this.size;
    this.nextMoveY = this.y;
    this.score = 0;
    this.sentence = 0;
    this.timeSpent = 0;
  }

  //display()
  //
  //Display sprite for player and location where you've selected to move next
  display() {
    push();
    image(imgPlayer, this.x, this.y, this.size, this.size);
    //Set the predicted image to be slightly opaque
    tint(255, 120);
    image(imgPlayer, this.nextMoveX, this.nextMoveY, this.size, this.size);
    pop();
  }

  //move()
  //
  //Update the position of the player based on where their next movement
  // target was, and also play audio for movement
  move() {
    this.x = this.nextMoveX;
    this.y = this.nextMoveY;
    //Play audio for movement
    audioPlayerMove.stop();
    audioPlayerMove.play();
    //Check if player is out of bounds and in that case, adjust
    this.handleConstraints();
    //add an "hour" to time spent
    this.timeSpent += 1;
  }

  //handleInput()
  //
  //Handle input based on the arrow keys
  handleInput() {
    if (keyIsDown(LEFT_ARROW)) {
      this.nextMoveX = this.x - (this.size);
      this.nextMoveY = this.y;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.nextMoveX = this.x + this.size;
      this.nextMoveY = this.y;
    }
    if (keyIsDown(UP_ARROW)) {
      this.nextMoveX = this.x;
      this.nextMoveY = this.y - (this.size);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.nextMoveX = this.x;
      this.nextMoveY = this.y + this.size;
    }
  }
  //handleScoring();
  //
  //Checks distance and overlap with trash, plays appropriate sounds
  //Additionally, spawns in another child
  handleScoring(target) {
    let d = dist(this.x, this.y, target.x, target.y);
    if (d < 5) {
      //reset location of the trash
      target.reset();
      //Add one point
      this.score += 1;
      console.log("Score: " + this.score);

      //Stop previous instances of audio to make sure the sound plays
      audioPlayerMove.stop();
      audioPickUpTrash.stop();

      //play trash pickup audio
      audioPickUpTrash.setVolume(0.5);
      audioPickUpTrash.play();

      //Create a new child (jesus christ martin go back and rephrase this at
      // some point ) at a random location
      spawnKid();
    }
  }

  //reset();
  //
  //Resets location, sentence and score for the player
  reset() {
    this.x = this.size * 3;
    this.y = this.size * 2;
    this.score = 0;
    this.sentence = 0;
    this.timeSpent = 0;
  }

  //handleConstraints()
  //
  //Keep the player within the tiles on the map
  handleConstraints() {
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.x > width - 1) {
      this.x = width - this.size;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y > height - 1) {
      this.y = height - this.size;
    }
  }

}
