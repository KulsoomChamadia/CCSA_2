let img;
let posterizeLevel = 4;

function preload() {
  // Load your image before the program starts
  img = loadImage("mountain.jpg"); // Replace "mountain.jpg" with your image file
}

function setup() {
  // Make canvas as big as the browser window
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); // Draw images from the center
  noCursor();        // Hide the default mouse cursor
}

function draw() {
  background(0); // Black background

  // Draw the full image normally, centered on canvas
  image(img, width / 2, height / 2, width, height);

  // Size of the circle where posterize effect will happen
  let size = 100;

  // Make sure the effect circle stays inside the canvas
  let x = constrain(mouseX - size / 2, 0, width - size);
  let y = constrain(mouseY - size / 2, 0, height - size);

  // Map the mouse area on canvas to the image's pixels
  let imgX = map(x, 0, width, 0, img.width);
  let imgY = map(y, 0, height, 0, img.height);
  let imgW = map(size, 0, width, 0, img.width);
  let imgH = map(size, 0, height, 0, img.height);

  // Get that part of the image
  let imgPart = img.get(imgX, imgY, imgW, imgH);

  // Apply the posterize filter to this small part
  imgPart.filter(POSTERIZE, posterizeLevel);

  // Draw the filtered part back onto the canvas at the right spot
  imageMode(CORNER);

  // Draw outline/border behind the posterized square to make it bold
  stroke(20); // White border
  strokeWeight(8); // Thickness of the border
  noFill();
  rect(x, y, size, size);

  // Now draw the filtered image part on top
  image(imgPart, x, y, size, size);
  imageMode(CENTER); // Switch back to center mode

  // Draw a glowing circle cursor that follows the mouse
  noStroke();
  for (let i = 10; i > 0; i--) {
    fill(255, 100 - i * 10);          // White color, fading out
    ellipse(mouseX, mouseY, i * 5);  // Bigger circles first, smaller on top
  }
}

// Make the canvas resize when the window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
