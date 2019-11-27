class Popup{

constructor(){
  this.x = windowWidth/4;
  this.y = windowHeight - (windowHeight/5);
  this.width = windowWidth/2;
  this.height = windowHeight/5.2;


}

//display()
//
//Displays all elements for the popup: background, dialogue and image 
display(){
  //Display background for popup
  fill(0);
  rect(this.x,this.y,this.width,this.height);
  //display text for popup
  fill(255);
  text("Test dialogue",this.x + windowWidth/8, this.y +(windowHeight/10));
  //display image of speaker
  fill(255);
  rect(this.x + windowWidth/100, this.y + (windowHeight/30), 80,80);
  image(imgSpeakerPortrait, this.x + windowWidth/100, this.y + (windowHeight/30), 75,75);

}



}
