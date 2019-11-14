let star;
let stars = [];


function setup() {

  createCanvas(640, 480);
    let nustar = new Debris(300, 200, 5);

  for (let i = 0; i < 50; i++) {



      //randomize location
      let x = floor(random(0, 640));
      let y = floor(random(0, 480));
      //Create kid based on the variable
      let newStar = new Debris(x, y,5);
      //place the new kid in the kids array

    stars.push(newStar);

  }
}

function draw() {

  background(0);

  for (let i = 0; i < stars.length; i++)
    stars[i].update();
}
