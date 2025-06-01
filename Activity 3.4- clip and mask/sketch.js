let img;
let word = "SUNSET";
let font;
let fontSize;
let spacing;

function preload() {
  img = loadImage("sunset.jpg"); // Make sure this image exists in the sketch folder
  font = loadFont("nope.ttf");   // Make sure this font exists in the sketch folder
}

function setup() {
  createCanvas(950, 700);
  textFont(font);
  textAlign(CENTER, TOP);
  updateSizes();
}

function updateSizes() {
  fontSize = height * 0.3;
  textSize(fontSize);
  spacing = (width / word.length) * 0.8;
  spacing = min(spacing, 200);
}

function draw() {
  background(51, 51, 51);
  updateSizes();

  let totalWidth = spacing * word.length;
  let startX = (width - totalWidth) / 2;

  for (let i = 0; i < word.length; i++) {
    let letter = word[i];
    let x = startX + i * spacing + spacing / 2;

    // Animate the vertical offset with sine wave
    let wave = sin(frameCount * 0.05 + i) * fontSize * 0.1;
    let yOffset = wave;

    // Create graphics mask
    let maskGraphics = createGraphics(spacing, height);
    maskGraphics.pixelDensity(1);
    maskGraphics.fill(255);
    maskGraphics.noStroke();
    maskGraphics.textFont(font);
    maskGraphics.textAlign(CENTER, TOP);
    maskGraphics.textSize(fontSize);
    maskGraphics.text(letter, spacing / 2, yOffset);

    // Add stretched vertical bar under the letter
    maskGraphics.rect(spacing / 2 - 40, fontSize + yOffset, 80, height - fontSize - yOffset);

    // Extract corresponding slice from the image
    let imgSlice = img.get(i * (img.width / word.length), 0, img.width / word.length, img.height);
    imgSlice.resize(spacing, height);
    imgSlice.mask(maskGraphics);

    // Optional: add a shadow effect
    push();
    tint(0, 50);
    image(imgSlice, x - spacing / 2 + 7, 7 + yOffset);
    pop();

    // Draw final masked image
    image(imgSlice, x - spacing / 2, yOffset);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
