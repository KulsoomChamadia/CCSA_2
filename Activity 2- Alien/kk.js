let stars = [];

let alienBaseY;
let alienHeadY;        // Y pos for head & neck bobbing
let alienDir = 1;

let blinkTimer = 0;
let isBlinking = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Create starfield with random positions & flicker speed
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255),
      alphaDir: random() < 0.5 ? 1 : -1
    });
  }

  alienBaseY = height / 2 + 40;  // Base pos for alien body/hole
  alienHeadY = alienBaseY;        // Start head bobbing at base
}

function draw() {
  background(15);
  drawStars();

  // Head moves up & down smoothly
  alienHeadY += 0.3 * alienDir;
  if (alienHeadY > alienBaseY + 10 || alienHeadY < alienBaseY - 10) {
    alienDir *= -1;
  }

  // Draw hole at bottom to hide neck base
  fill(30);
  ellipse(width / 2, alienBaseY + 30, 220, 60);

  // Body + hands fixed, no movement here
  drawAlienBodyAndHands(width / 2, alienBaseY);

  // Manage blink timing
  blinkTimer++;
  if (blinkTimer > 200) {
    isBlinking = true;
  }
  if (isBlinking && blinkTimer > 220) {
    isBlinking = false;
    blinkTimer = 0;
  }

  // Draw head and neck bobbing
  drawAlienHeadAndNeck(width / 2, alienHeadY);
}

function drawStars() {
  // Flicker stars with alpha cycling
  for (let s of stars) {
    s.alpha += 1 * s.alphaDir;
    if (s.alpha > 255) {
      s.alpha = 255;
      s.alphaDir = -1;
    } else if (s.alpha < 100) {
      s.alpha = 100;
      s.alphaDir = 1;
    }
    fill(255, s.alpha);
    ellipse(s.x, s.y, s.size, s.size);
  }
}

// Alien body & hands stay put, solid shapes
function drawAlienBodyAndHands(x, y) {
  push();
  translate(x, y);
  
  fill(100, 255, 150);
  beginShape();
  vertex(-50, 25);
  bezierVertex(-40, 10, -20, 0, 0, 0);
  bezierVertex(20, 0, 40, 10, 50, 25);
  endShape(CLOSE);
  
  fill(100, 255, 150);
  ellipse(-60, 30, 30, 20);
  ellipse(60, 30, 30, 20);
  
  pop();
}

// Neck & head move together, eyes blink, mouth chillin
function drawAlienHeadAndNeck(x, y) {
  push();
  translate(x, y);

  fill(90, 240, 140);         // Neck slightly different green
  rect(-10, -10, 20, 30, 10);

  fill(100, 255, 150);        // Head shape
  ellipse(0, -60, 90, 110);

  fill(20);
  if (isBlinking) {           // Blink effect squashes eyes
    ellipse(-25, -65, 25, 8);
    ellipse(25, -65, 25, 8);
  } else {
    ellipse(-25, -65, 25, 40);
    ellipse(25, -65, 25, 40);

    fill(255);                // Pupils
    ellipse(-30, -75, 8, 8);
    ellipse(20, -75, 8, 8);
  }

  fill(20);                   // Small mouth
  ellipse(0, -35, 10, 6);

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      alpha: random(100, 255),
      alphaDir: random() < 0.5 ? 1 : -1
    });
  }
  alienBaseY = height / 2 + 40;
  alienHeadY = alienBaseY;
}
