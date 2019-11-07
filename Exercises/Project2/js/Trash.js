class Trash {
  //Create size and location for the trash object
  constructor(x, y) {
    this.size = windowWidth / 20;
    this.x = this.size * x;
    this.y = this.size * y;
  }
//display the trash sprite at the set location
  display(){
    image(imgTrash,this.x,this.y,this.size,this.size);
  }
//reset location of trash whenever it is picked up 
  reset(){
    this.x = this.size * floor(random(5,17));
    this.y = this.size * floor(random(2,8));
  }

}
