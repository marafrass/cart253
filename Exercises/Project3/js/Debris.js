class Debris {
  constructor(x,y,size){
  this.x = x;
  this.y = y;
  this.size = size;
  this.alpha = 0;
  }


update(){

  let d = dist(this.x,this.y,mouseX,mouseY);

  if (mouseX < this.x){
    this.x += d/100;
  } else {
    this.x -= d/100;
  }


    if (mouseY < this.y){
      this.y += d/100;
    } else {
      this.y -= d/100;
    }

  this.alpha +=4;
  fill(255,255,255,this.alpha);
  rect(this.x,this.y,this.size,this.size);
  console.log("star");

  if (this.x > windowWidth || this.x < 0 || this.y < 0 || this.y > windowHeight){
    this.reset();
  }

}

reset(){
  this.alpha = 0;
  this.x = floor(random(0, 640));
  this.y = floor(random(0, 480));
}


}
