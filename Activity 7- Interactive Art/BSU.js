let font;
let particles = [];
let glowPulse = 0;
let pulseDirection = 1;
let bubbles = [];

let word = "BATH";
let word1 = "SPA";
let word2 = "UNIVERSITY";

function preload() {
  font = loadFont("fonts/Orbitron-ExtraBold.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create floating particles
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      r: random(1, 3),
      speedX: random(-0.5, 0.5),
      speedY: random(-0.5, 0.5)
    });
  }

  // Create bubbles
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      r: random(10, 25),
      speed: random(0.5, 1.5)
    });
  }
}

function draw() {
  background(10, 10, 20); // dark bluish background

  // Glowing grid
  stroke(30, 30, 50);
  strokeWeight(1);
  for (let x = 0; x < width; x += 30) {
    line(x + frameCount % 30, 0, x + frameCount % 30, height);
  }
  for (let y = 0; y < height; y += 30) {
    line(0, y + frameCount % 30, width, y + frameCount % 30);
  }

  // Floating particles
  noStroke();
  for (let p of particles) {
    fill(100, 150, 255, 70);
    ellipse(p.x, p.y, p.r * 2);
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }

  // Bubbles
  for (let b of bubbles) {
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = color(100, 200, 255);
    fill(100, 200, 255, 60);
    stroke(100, 200, 255, 100);
    strokeWeight(1);
    ellipse(b.x, b.y, b.r * 2);
    b.y -= b.speed;
    if (b.y < -b.r) {
      b.y = height + b.r;
      b.x = random(width);
    }
  }
  drawingContext.shadowBlur = 0;

  // Outer frame
  noFill();
  stroke(80, 200, 255);
  strokeWeight(10);
  rect(20, 20, width - 40, height - 40);

  // Corner markers
  strokeWeight(2);
  stroke(0, 150, 255);
  line(20, 20, 60, 20);
  line(20, 20, 20, 60);
  line(width - 20, 20, width - 60, 20);
  line(width - 20, 20, width - 20, 60);
  line(20, height - 20, 60, height - 20);
  line(20, height - 20, 20, height - 60);
  line(width - 20, height - 20, width - 60, height - 20);
  line(width - 20, height - 20, width - 20, height - 60);

  // Glowing text
  glowPulse += pulseDirection * 0.3;
  if (glowPulse > 20 || glowPulse < 5) pulseDirection *= -1;

  textFont(font);
  textSize(min(width, height) / 12);
  textAlign(LEFT);
  fill(230);
  drawingContext.shadowBlur = glowPulse;
  drawingContext.shadowColor = color(0, 150, 255);

  // Measure text widths
  let bathWidth = textWidth(word);
  let spaWidth = textWidth(word1);
  let spacing = 20;
  let totalWidth = bathWidth + spacing + spaWidth;

  // Calculate positions
  let startX = width / 2 - totalWidth / 2;
  let centerY = height / 2.3 + 50;

  // Draw BATH and SPA
  text(word, startX, centerY);
  text(word1, startX + bathWidth + spacing, centerY);

  // Draw UNIVERSITY centered below
  textAlign(CENTER);
  text(word2, width / 2, height / 2.4 + 120);

  drawingContext.shadowBlur = 0;
}

// Resize canvas on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
