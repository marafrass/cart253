class Enemy{

  constructor(){
    this.x = player.targetX;
    this.y = player.targetY;

    this.vx = 0;
    this.vy = 0;

    this.tx = random(0,10);
    this.ty = random(0,10);
    this.fillcolor = 120;
    this.maxPlotPoints = 10;
    this.plotPoints = this.maxPlotPoints;

  }




update(){

  this.x = width * noise(this.tx);
  this.y = height * noise(this.ty);

  this.tx += 0.01;
  this.ty += 0.01;

  constrain(this.x, (player.targetX - 20), (player.targetY + 20))

}


//display()
//
//displays the enemy
display(){
  push();
  fill(this.fillcolor);
  rect(this.x,this.y,40,40);
  pop();

}
reset(){
  this.plotPoints = this.maxPlotPoints;
}



}
