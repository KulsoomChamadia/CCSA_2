let colors = []; // Array to store random colors for each letter

function setup() {
  createCanvas(windowWidth, windowHeight); // Fullscreen canvas
  noFill();                                // No fill by default
  strokeWeight(3);                         // Set stroke thickness
  textAlign(CENTER, CENTER);               // Align text to center
  noLoop();                                // Draw only once (no animation)

  // Generate an array of 50 random colors
  for (let i = 0; i < 50; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}

function draw() {
  drawGradientBackground(); // Draw background with gradient
  drawStars();              // Add random stars for a night sky effect

  let phrase = "BATH SPA UNIVERSITY"; // Text to draw with modern letter shapes
  let x = 60;                         // Starting X position for letters
  let y = height / 2;                // Y position centered vertically

  // Loop through each letter in the phrase
  for (let i = 0; i < phrase.length; i++) {
    let letter = phrase[i];
    let col = colors[int(random(colors.length))]; // Pick a random color
    stroke(col);                                  // Apply color to letter outline
    drawModernLetter(letter, x, y);               // Draw custom letter
    x += 60; // Move to the right for next letter
  }
}

// Draws a vertical gradient background from dark purple to black
function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1); // Interpolation value from top to bottom
    let c = lerpColor(color(10, 5, 35), color(0, 0, 10), inter); // Gradient color
    stroke(c);
    line(0, y, width, y); // Draw horizontal line for gradient
  }
}

// Draws small, randomly placed stars with varying transparency
function drawStars() {
  for (let i = 0; i < 150; i++) {
    fill(255, random(100, 200)); // White stars with random alpha
    noStroke();
    ellipse(random(width), random(height), random(1, 3)); // Small star ellipse
  }
}

// Draws custom geometric versions of letters at (x, y)
function drawModernLetter(letter, x, y) {
  push();
  translate(x, y); // Move origin to letter position
  let s = 40;      // Letter size scale

  switch (letter) {
    case 'A':
      triangle(0, s, s / 2, -s, s, s);
      line(s * 0.25, 0, s * 0.75, 0);
      break;
    case 'B':
      rect(0, -s, s / 2, s * 2);
      arc(s / 2, -s / 2, s, s, HALF_PI, -HALF_PI);
      arc(s / 2, s / 2, s, s, -HALF_PI, HALF_PI);
      break;
    case 'T':
      line(0, -s, s, -s);
      line(s / 2, -s, s / 2, s);
      break;
    case 'H':
      line(0, -s, 0, s);
      line(s, -s, s, s);
      line(0, 0, s, 0);
      break;
    case 'S':
      beginShape();
      vertex(s, -s);
      vertex(0, -s);
      vertex(0, 0);
      vertex(s, 0);
      vertex(s, s);
      vertex(0, s);
      endShape();
      break;
    case 'P':
      line(0, -s, 0, s);
      arc(s / 2, -s / 2, s, s, PI + HALF_PI, HALF_PI);
      break;
    case 'U':
      line(0, -s, 0, 0);
      line(s, -s, s, 0);
      arc(s / 2, 0, s, s, 0, PI);
      break;
    case 'N':
      line(0, -s, 0, s);
      line(s, -s, s, s);
      line(0, -s, s, s);
      break;
    case 'I':
      line(s / 2, -s, s / 2, s);
      break;
    case 'V':
      line(0, -s, s / 2, s);
      line(s, -s, s / 2, s);
      break;
    case 'E':
      line(0, -s, 0, s);
      line(0, -s, s, -s);
      line(0, 0, s * 0.75, 0);
      line(0, s, s, s);
      break;
    case 'R':
      line(0, -s, 0, s);
      arc(s / 2, -s / 2, s, s, PI + HALF_PI, HALF_PI);
      line(0, 0, s, s);
      break;
    case 'Y':
      line(0, -s, s / 2, 0);
      line(s, -s, s / 2, 0);
      line(s / 2, 0, s / 2, s);
      break;
    case ' ':
      break; // Skip spaces
    default:
      ellipse(0, 0, 10); // Unknown character: small dot
  }

  pop();
}
