function setup() {
  createCanvas(800, 500);
  x = width;
}

function draw() {
  background('#ED255D');
  strokeWeight(10);
  stroke('white');

  // H
  line(x + 100, 50, x + 100, 200);
  line(x + 100, 75, x + 150, 75);
  line(x + 150, 50, x + 150, 175);

  // E
  line(x + 175, 50, x + 225, 50);
  line(x + 175, 50, x + 175, 175);
  line(x + 175, 75, x + 225, 75);
  line(x + 175, 175, x + 225, 175);

  // L
  line(x + 250, 50, x + 250, 175);
  line(x + 250, 175, x + 300, 175);
  
  // L
  line(x + 325, 50, x + 325, 175);
  line(x + 325, 175, x + 375, 175);

  // O
  circle(x + 440, 110, 115);

  // W
  line(x + 65, 250, x + 100, 450);
  line(x + 100, 450, x + 125, 350);
  line(x + 125, 350, x + 150, 450);
  line(x + 150, 450, x + 165, 300);

  // O
  circle(x + 235, 385, 115);

  // R
  line(x + 310, 450, x + 310, 325);
  line(x + 310, 325, x + 360, 325);
  line(x + 360, 325, x + 360, 350);
  line(x + 360, 350, x + 310, 350);
  line(x + 310, 350, x + 360, 450);

  // L
  line(x + 385, 450, x + 435, 450);
  line(x + 385, 325, x + 385, 450);

  // D
  line(x + 460, 325, x + 460, 450);
  line(x + 460, 325, x + 535, 350);
  line(x + 535, 350, x + 535, 425);
  line(x + 535, 425, x + 460, 450);

  move();
}

function move() {
  x += 10;
  if (x > width - 100) {
    x = -600;
  }
}