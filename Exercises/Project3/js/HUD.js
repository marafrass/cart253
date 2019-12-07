class HUD {
  //constructor()
  //
  //set all setup variables for the object
  constructor() {
    this.x = windowWidth / 4;
    this.y = windowHeight - (windowHeight / 5);
    this.width = windowWidth / 2;
    this.height = windowHeight / 5.2;

    this.currentDialogue = "First shot ";
  }

  //display()
  //
  //Displays all elements for the popup: background, dialogue, flair  and image
  display() {

    //DISPLAY FLAIR
    image(imgHudFlair,0,0,windowWidth,windowHeight);

    //DISPLAY DIALOGUE BOX
    //display background for box
    push();
    stroke(0, 255, 0);
    strokeWeight(3);
    fill(0);
    rect(this.x, this.y, this.width, this.height);
    pop();

    //display enemy dialogue and "incoming transmission"
    textSize(windowWidth / 80);
    fill(255);
    text(this.currentDialogue, this.x + this.width / 5, this.y + this.width / 12, this.width - (this.width / 5), this.y + (windowHeight / 10));
    text("INCOMING TRANSMISSION:", this.x + this.width / 5, this.y + this.width / 23, this.width - (this.width / 5), this.y + (windowHeight / 10));


    //draw portrait of enemy
    push();
    image(imgSpeakerPortrait, this.x + this.width / 50, this.y + this.width / 50, this.width / 7, this.width / 7);
    pop();

    //DISPLAY HEALTH FOR PLAYER
    push();
    rectMode(BOTTOM);
    if (player.health <= 50) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    stroke(5);
    rect(windowWidth - (windowWidth / 20), this.y + (this.height * 0.9), windowWidth / 50, -player.health);
    pop();

    //DISPLAY ENERGY FOR PLAYER
    push();
    rectMode(BOTTOM);
    //switch colors depending on if overheated or not
    if (player.overHeated === true) {
      fill(200, 0, 0);
    } else {
      fill(255, 200, 20);
    }
    stroke(4);
    rect(windowWidth - (windowWidth / 16), this.y + (this.height * 0.9), windowWidth / 80, -player.energy);
    pop();

    //display status texts for health and energy

    //ENERGY
    push();
    textSize(this.width / 25);
    strokeWeight(4);
    stroke(255);
    fill(0);
    if (player.overHeated === true) {
      text("LASERS\nOVERHEATED!", this.x + (this.width * 1.01), this.y + (this.height * 0.5));
    }

    pop();
    //HEALTH
    push();
    strokeWeight(4);
    stroke(255);
    fill(0);
    textSize(this.width / 38);
    if (player.health <= 50) {
      text("SHIP INTEGRITY CRITICAL", this.x + (this.width * 1.01), this.y * 1.05);
    }
    pop();

  }

  //setDialogue();
  //
  //Sets the current dialogue based on progress
  setDialogue() {
    if (enemy.plotPoints === enemy.maxPlotPoints) {
      this.currentDialogue = "Please, don't follow me. If you do, I have to deploy more murder missiles. This additional text is here to see if the window works."
    } else if (enemy.plotPoints >= 9) {
      this.currentDialogue = "hit this many more to win the game: 9"
    } else if (enemy.plotPoints >= 8) {
      this.currentDialogue = "hit this many more to win the game: 8"
    } else if (enemy.plotPoints >= 7) {
      this.currentDialogue = "hit this many more to win the game: 7"
    } else if (enemy.plotPoints >= 6) {
      this.currentDialogue = "hit this many more to win the game: 6"
    } else if (enemy.plotPoints >= 5) {
      this.currentDialogue = "hit this many more to win the game: 5"
    } else if (enemy.plotPoints >= 4) {
      this.currentDialogue = "hit this many more to win the game: 4"
    } else if (enemy.plotPoints >= 3) {
      this.currentDialogue = "hit this many more to win the game: 3"
    } else if (enemy.plotPoints >= 2) {
      this.currentDialogue = "hit this many more to win the game: 2"
    } else if (enemy.plotPoints >= 1) {
      this.currentDialogue = "hit this many more to win the game: 1"
    } else {
      this.currentDialogue = "welp i died "
    }
  }
}
