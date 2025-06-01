// I'm loading the honk sound before the sketch starts
let clouds = [];
let sunY = 50;
let sunDirection = 1;
let smokePuffs = [];
let birds = [];
let birdsActive = true;
let honkSound;

function preload() {
  // Loading the honk sound (make sure 'honk.mp3' is in the same folder)
  honkSound = loadSound('honk.mp3');
}

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);

  // I'm creating a few clouds with different speeds and positions
  for (let i = 0; i < 6; i++) {
    clouds.push({
      x: i * 150 - 100,
      y: random(60, 180),
      speed: random(0.3, 0.6)
    });
  }

  // Birds will fly once across the screen and then disappear
  for (let i = 0; i < 5; i++) {
    birds.push({
      x: random(-200, -50),
      y: random(50, 120),
      speed: random(1, 2)
    });
  }
}

function draw() {
  background(150, 206, 235); // Light blue sky background

  // I made the sun move up and down to make the scene feel alive
  sunY += sunDirection;
  if (sunY > 80 || sunY < 30) {
    sunDirection *= -1;
  }
  noStroke();
  fill(255, 255, 0);
  ellipse(140, sunY, 50, 50);

  // Drawing clouds and making them move across the screen
  fill(255);
  noStroke();
  for (let c of clouds) {
    c.x += c.speed;
    if (c.x > width + 100) {
      c.x = -120;
      c.y = random(60, 180); // Clouds reappear with new height
    }
    drawCloud(c.x, c.y);
  }

  // Birds appear only once — like a small bonus animation
  if (birdsActive) {
    fill(0);
    for (let b of birds) {
      b.x += b.speed;
      drawBird(b.x, b.y);
    }
    if (birds.every(b => b.x > width + 50)) {
      birdsActive = false; // They disappear after flying offscreen
    }
  }

  // This is the road below the car
  fill(100);
  stroke(0);
  rect(250, height - 28, width, 50);
  fill(200);
  rect(250, height - 25, width, 5);

  // I'm drawing smoke puffs to simulate car exhaust
  for (let i = smokePuffs.length - 1; i >= 0; i--) {
    let p = smokePuffs[i];
    p.y -= 0.5;
    p.alpha -= 2;
    fill(100, 100, 100, p.alpha);
    noStroke();
    ellipse(p.x, p.y, p.size);
    if (p.alpha <= 0) {
      smokePuffs.splice(i, 1); // Remove faded smoke
    }
  }

  // Every 10 frames, new exhaust smoke comes out of the back of the car
  if (frameCount % 10 === 0) {
    smokePuffs.push({
      x: width / 2 - 145, // Car's back side
      y: height - 140,
      size: random(10, 20),
      alpha: 100
    });
  }

  // Drawing the back part of the car
  rectMode(CENTER);
  fill(155, 0, 0);
  rect(width / 2 - 20, height - 200, 130, 90);

  // Main car body
  fill(225, 0, 0);
  rect(width / 2 - 15, height - 140, 250, 90);

  // Windows
  stroke(10);
  fill(25, 0, 0);
  rect(230, 275, 150, 80); // Window frame
  fill(150, 206, 235);
  rect(200, 275, 60, 60);
  rect(260, 275, 60, 60);

  // Wheels
  fill(25, 25, 0);
  ellipse(width / 1 - 190, height - 80, 70, 70); // Rear
  fill(200);
  ellipse(width / 1 - 190, height - 80, 50, 50);
  fill(25, 0, 0);
  ellipse(width / 2 - 90, height - 80, 70, 70); // Front
  fill(200);
  ellipse(width / 2 - 90, height - 80, 50, 50);

  // Headlights (both top and bottom)
  fill(255, 255, 0);
  rect(width / 1 - 145, height - 120, 20, 20);
  rect(width / 1 - 145, height - 160, 20, 20);
  rect(width / 1 - 143, height - 118, 20, 20);
  rect(width / 1 - 143, height - 162, 20, 20);
}

// I'm drawing a fluffy cloud shape here
function drawCloud(x, y) {
  noStroke();
  fill(255);
  ellipse(x, y, 60, 40);
  ellipse(x + 25, y - 10, 50, 35);
  ellipse(x - 25, y - 10, 50, 35);
  ellipse(x, y - 15, 40, 30);
}

// A simple flying bird drawn like the letter 'M'
function drawBird(x, y) {
  stroke(0);
  strokeWeight(2);
  noFill();
  arc(x, y, 20, 10, PI, 0);
  arc(x + 20, y, 20, 10, PI, 0);
}

// Clicking plays a honk sound
function mousePressed() {
  if (honkSound && honkSound.isLoaded()) {
    honkSound.play();
  }
}
