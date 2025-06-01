// Array to store all particle objects
let particles = [];

// Maximum number of particles to keep on screen
let maxParticles = 200;

// Array of color options representing emotional tones
let emotionColors = ['#6a5acd', '#1e90ff', '#ff4500', '#CC2A81', '#20b2aa'];

// Background color (not used correctly here – should be color object)
let bgColor = (144, 238, 144); // Currently stored as a tuple, not a color object

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  background(144, 238, 144);               // Initial background color
  noStroke();                              // No outline for shapes
}

function draw() {
  // Draw a semi-transparent background to create a fading trail effect
  background(bgColor, 20);

  // Loop through all particles in reverse order for safe removal
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    // Draw particle with its color and alpha (transparency)
    fill(p.color[0], p.color[1], p.color[2], p.alpha);
    ellipse(p.x, p.y, p.size); // Draw as a circle

    // Update particle position
    p.x += p.vx;
    p.y += p.vy;

    // Fade out and shrink particle
    p.alpha -= 2;
    p.size *= 0.98;

    // Remove particle if fully transparent or too small
    if (p.alpha <= 0 || p.size < 1) {
      particles.splice(i, 1);
    }
  }
}

function mouseMoved() {
  // Measure how fast the mouse is moving
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);

  // Pick a random color from emotionColors and convert to RGB array
  let col = color(random(emotionColors));
  let c = [red(col), green(col), blue(col)];

  // Create a new particle based on mouse movement
  particles.push({
    x: mouseX,
    y: mouseY,
    vx: random(-1, 1) * speed * 0.1, // Small velocity based on speed
    vy: random(-1, 1) * speed * 0.1,
    size: map(speed, 0, 50, 10, 50), // Larger particles for faster movement
    alpha: 255,
    color: c
  });

  // Limit the total number of particles
  if (particles.length > maxParticles) {
    particles.splice(0, 1); // Remove oldest particle
  }
}

function mousePressed() {
  // On mouse click, create a burst of 20 particles
  for (let i = 0; i < 20; i++) {
    let col = color(random(emotionColors));
    let c = [red(col), green(col), blue(col)];

    particles.push({
      x: mouseX,
      y: mouseY,
      vx: random(-3, 3),     // Random velocity in both directions
      vy: random(-3, 3),
      size: random(20, 60),  // Random size for burst effect
      alpha: 255,
      color: c
    });
  }
}

function windowResized() {
  // Adjust canvas size when the window is resized
  resizeCanvas(windowWidth, windowHeight);
}
