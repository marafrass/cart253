class Enemy{

  constructor(){
    this.x = player.targetX;
    this.y = player.targetY;

    this.size = windowWidth/25;

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

this.tx += 0.003;
this.ty += 0.003;
//
//   this.x += this.vx/1000;




  // this.x += this.vx;
  // this.y += this.vy;

  constrain(this.x, (player.targetX - 100), (player.targetX + 100))
    constrain(this.y, (player.targetY - 100), (player.targetY + 100))

}


//display()
//
//displays the enemy
display(){
  push();
  fill(this.fillcolor);
  rect(this.x,this.y,this.size,this.size);
  pop();

}
reset(){
  this.plotPoints = this.maxPlotPoints;
}



}
