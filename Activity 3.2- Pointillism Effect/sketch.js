let img;

function preload() {
  // Load image data for later pixel color sampling
  img = loadImage("broken.jpg");
}

function setup() {
  // Initialize drawing area to fill the entire browser window
  createCanvas(windowWidth, windowHeight);
  background(0);      // Set black background initially
  noStroke();         // Disable outlines on shapes
  angleMode(DEGREES); // Use degrees for angle calculations
  frameRate(30);      // Limit frame updates to 30 per second for smooth animation
}

function draw() {
  // Set number of shapes to draw depending on whether mouse is pressed
  let density = mouseIsPressed ? 20 : 4;

  // Loop to randomly position shapes across canvas
  for (let i = 0; i < density; i++) {
    // Pick random coordinates on canvas
    let x = random(width);
    let y = random(height);

    // Get pixel color from the image mapped to canvas coordinates
    let c = img.get(floor(map(x, 0, width, 0, img.width)), floor(map(y, 0, height, 0, img.height)));

    // Calculate average brightness of sampled pixel color
    let brightness = (c[0] + c[1] + c[2]) / 3;

    // Determine size of shape based on vertical mouse position and pixel brightness
    let size = map(mouseY, 0, height, 5, 30);
    size *= map(brightness, 0, 255, 0.6, 1.4);

    // Set fill color using sampled pixel with opacity adjusted by brightness
    fill(c[0], c[1], c[2], map(brightness, 0, 255, 100, 50));

    // Save current drawing state and translate origin to random point
    push();
    translate(x, y);

    // Calculate phase of animation cycle over 6 seconds
    let t = millis() % 6000;
    let phase = t / 6000;

    // Draw shapes that morph smoothly through three forms based on phase
    if (phase < 0.33) {
      ellipse(0, 0, size, size);
    } else if (phase < 0.66) {
      let morph = map(phase, 0.33, 0.66, 0, 1);
      drawMorphShape(size, morph, 'circleToSquare');
    } else {
      let morph = map(phase, 0.66, 1, 0, 1);
      drawMorphShape(size, morph, 'squareToTriangle');
    }

    // Restore previous drawing state
    pop();
  }
}

function drawMorphShape(size, t, type) {
  beginShape();

  if (type === 'circleToSquare') {
    // Generate four vertices interpolating from circle points to square corners
    let points = [];
    for (let i = 0; i < 4; i++) {
      // Square corner coordinates
      let sqx = size / 2 * (i === 0 || i === 3 ? 1 : -1);
      let sqy = size / 2 * (i < 2 ? -1 : 1);

      // Circle points at 45, 135, 225, 315 degrees
      let angle = 45 + i * 90;
      let cx = (size / 2) * cos(angle);
      let cy = (size / 2) * sin(angle);

      // Interpolate position between circle and square based on morph parameter
      let x = lerp(cx, sqx, t);
      let y = lerp(cy, sqy, t);
      points.push({ x, y });
    }

    // Draw vertices along calculated points
    for (let pt of points) {
      vertex(pt.x, pt.y);
    }

  } else if (type === 'squareToTriangle') {
    // Define target triangle vertices and source square vertices
    let tri = [
      { x: 0, y: -size / 2 },
      { x: -size / 2, y: size / 2 },
      { x: size / 2, y: size / 2 },
    ];
    let sq = [
      { x: -size / 2, y: -size / 2 },
      { x: size / 2, y: -size / 2 },
      { x: size / 2, y: size / 2 },
      { x: -size / 2, y: size / 2 },
    ];

    // Interpolate each vertex position from square corners to triangle corners
    let v0x = lerp(sq[0].x, tri[0].x, t);
    let v0y = lerp(sq[0].y, tri[0].y, t);
    let v1x = lerp(sq[1].x, tri[0].x, t);
    let v1y = lerp(sq[1].y, tri[0].y, t);
    let v2x = lerp(sq[2].x, tri[2].x, t);
    let v2y = lerp(sq[2].y, tri[2].y, t);
    let v3x = lerp(sq[3].x, tri[1].x, t);
    let v3y = lerp(sq[3].y, tri[1].y, t);

    // Draw vertices of the morphing polygon
    vertex(v0x, v0y);
    vertex(v1x, v1y);
    vertex(v2x, v2y);
    vertex(v3x, v3y);
  }
  endShape(CLOSE);
}

function windowResized() {
  // Adjust canvas dimensions to new window size
  resizeCanvas(windowWidth, windowHeight);
}
