let img;
let osc;
let started = false;
let currentFreq = 200;
let currentAmp = 0;
let targetAmp = 0;

function preload() {
  // Load the image that we’ll sample colors from
  img = loadImage("beach.jpg");  // Swap this for your own image file
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Setup sine wave oscillator, start it silent
  osc = new p5.Oscillator('sine');
  osc.amp(0);
  osc.start();

  // Enable audio only after user interaction (browser rule)
  userStartAudio();
}

function draw() {
  background(0);
  // Draw the background image, filling the whole canvas
  image(img, 0, 0, width, height);

  // Map mouse coords to image pixels to sample color under cursor
  let imgX = floor(map(mouseX, 0, width, 0, img.width));
  let imgY = floor(map(mouseY, 0, height, 0, img.height));

  img.loadPixels();
  let index = 4 * (imgY * img.width + imgX);
  let r = img.pixels[index];
  let g = img.pixels[index + 1];
  let b = img.pixels[index + 2];

  // Draw a bold cursor:
  // First draw a semi-transparent black circle behind for contrast
  noStroke();
  fill(0, 150); // subtle shadow to keep cursor visible over any color
  ellipse(mouseX, mouseY, 60, 60);

  // Then draw the sampled color circle on top with some opacity
  fill(r, g, b, 200);
  ellipse(mouseX, mouseY, 50, 50);

  // Calculate sound frequency based on green intensity and brightness
  let brightness = (r + g + b) / 3;
  let greenRatio = g / 255;
  let targetFreq = map(greenRatio * brightness, 0, 255, 120, 300); // calming low tones

  let easing = 0.03; // smooth transition value

  // Only make sound if mouse is inside canvas area
  if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
    currentFreq += (targetFreq - currentFreq) * easing;
    targetAmp = 0.02;  // keep sound soft, subtle
  } else {
    targetAmp = 0;     // mute when cursor outside
  }

  // Smoothly change amplitude towards target volume
  currentAmp += (targetAmp - currentAmp) * easing;

  osc.freq(currentFreq);     // update oscillator freq
  osc.amp(currentAmp, 0.1);  // fade amp smoothly
}

function windowResized() {
  // Adjust canvas size when window changes
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (!started) {
    userStartAudio();
    started = true;
  }
}
