class King {
  constructor(x, y) {
    this.size = windowWidth / 20;
    this.x = this.size * x;
    this.y = this.size * y;

  }


  display(){
    image(imgTrash,this.x,this.y,this.size,this.size);


  }

  reset(){
    this.x = this.size * floor(random(5,17));
    this.y = this.size * floor(random(2,8));
  }





}
