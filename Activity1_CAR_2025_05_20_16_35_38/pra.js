function setup() {
  createCanvas(400, 400);
  background(220);
}

function draw() {
  // Body
  fill(0, 255, 0); // green color
  ellipse(200, 250, 100, 150);

  // Head
  fill(0, 255, 0); // green color
  ellipse(200, 150, 75, 75);

  // Eyes
  fill(255, 0, 0); // red color
  ellipse(175, 125, 20, 20);
  ellipse(225, 125, 20, 20);

  // Mouth
  fill(0); // black color
  arc(200, 175, 50, 25, 0, PI);

  // Antennas
  stroke(0); // black color
  strokeWeight(2);
  line(175, 100, 175, 75);
  line(225, 100, 225, 75);

  // Arms
  stroke(0); // black color
  strokeWeight(2);
  line(150, 250, 100, 300);
  line(250, 250, 300, 300);

  // Legs
  stroke(0); // black color
  strokeWeight(2);
  line(175, 300, 150, 350);
  line(225, 300, 250, 350);
}
