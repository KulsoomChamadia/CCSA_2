const sound = new SimplePlayer("1234.mp3");
let analyzer = new Tone.Waveform(1024);
sound.toDestination();
sound.connect(analyzer);

let loaded = false;
let cols = 20;
let rows = 15;
let smoothedWaveform = [];

let colorTheme = "Dark Navy-Slate Gray";

let dropdown;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  noStroke();
  noCursor();

  // Initialize the waveform smoothing array
  for (let i = 0; i < 1024; i++) {
    smoothedWaveform[i] = 0;
  }

  // Create dropdown for theme selection
  dropdown = createSelect();
  dropdown.position(20, 20);
  dropdown.style("font-size", "12px");
  dropdown.style("padding", "5px");
  dropdown.option("Dark Navy-Slate Gray");
  dropdown.option("Charcoal Black-Crimson Pink");
  dropdown.option("Obsidian Ember-Gold Flare");
  dropdown.option("Royal Purple-Acid Lime");
  dropdown.value(colorTheme);
  dropdown.changed(() => {
    colorTheme = dropdown.value();
  });
}

function draw() {
  // Space-like background with semi-transparency
  background(10, 10, 20, 50);

  if (loaded) {
    let waveform = analyzer.getValue();
    let w = width / cols;
    let h = height / rows;

    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        let index = floor(map(x + y * cols, 0, cols * rows, 0, waveform.length));
        smoothedWaveform[index] = lerp(smoothedWaveform[index], waveform[index], 0.25);
        let waveVal = smoothedWaveform[index];
        let scale = map(waveVal, -1, 1, 0.5, 1.5);

        let xpos = x * w + w / 2;
        let ypos = y * h + h / 2;

        let d = dist(mouseX, mouseY, xpos, ypos);
        let sizeFactor = map(d, 0, 300, 1.5, 0.5, true);

        // Define color themes
        let c1, c2;
        switch (colorTheme) {
          case "Dark Navy-Slate Gray":
            c1 = color('#0D1B2A');
            c2 = color('#778DA9');
            break;
          case "Charcoal Black-Crimson Pink":
            c1 = color('#1C1C1C');
            c2 = color('#FF4F81');
            break;
          case "Obsidian Ember-Gold Flare":
            c1 = color('#1B1B1B');
            c2 = color('#FFD700');
            break;
          case "Royal Purple-Acid Lime":
            c1 = color('#3D2C8D');
            c2 = color('#B9FBC0');
            break;
        }

        // Get base color based on grid position
        let t = map(x + y * cols, 0, cols * rows, 0, 1);
        let baseColor = lerpColor(c1, c2, t);

        // Add highlight effect near mouse
        let proximity = map(d, 0, 100, 1, 0, true);
        let highlightColor = color(0, 255, 255); // Cyan highlight
        let finalColor = lerpColor(baseColor, highlightColor, proximity);

        // Draw the reactive box
        fill(finalColor.levels[0], finalColor.levels[1], finalColor.levels[2], 100);
        push();
        translate(xpos, ypos);
        rect(0, 0, w * scale * sizeFactor, h * scale * sizeFactor);
        pop();
      }
    }

    // Draw glowing "space dust" dots in background
    for (let i = 0; i < 20; i++) {
      fill(255, random(50, 150));
      noStroke();
      ellipse(random(width), random(height), random(1, 3));
    }
  } else {
    // Loading screen
    background(0);
    fill(255);
    textSize(20);
    text("Loading... Click to start", 20, 70);
  }

  // Custom glowing cursor
  push();
  noStroke();
  fill(255, 255, 255, 180);
  ellipse(mouseX, mouseY, 5, 5);
  pop();
}

function mouseClicked() {
  if (!loaded) return;
  sound.start();
}

// When sound is loaded, enable interaction
Tone.loaded().then(function () {
  loaded = true;
});
