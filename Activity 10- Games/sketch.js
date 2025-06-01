// Game variables
let player;
let redCars = [];
let coins = [];
let score = 0;
let collectedCoins = 0;
let difficulty = "";
let laneWidth;
let roadX;
let trees = [];
let houses = [];
let gameOver = false;
let replayButton;

// Setup the canvas and initialize the game
function setup() {
  createCanvas(windowWidth, windowHeight);
  laneWidth = width / 5; // Divide the canvas into 5 vertical sections
  roadX = laneWidth; // Starting x-position of the road
  initObjects(); // Initialize all game objects
}

// Initialize or reset game elements
function initObjects() {
  if (replayButton) replayButton.remove(); // Remove replay button if it exists
  gameOver = false;

  // Create player car
  player = new Car(width / 2, height - 150, color(0, 200, 255));

  // Create red enemy cars
  redCars = [];
  for (let i = 0; i < 5; i++) {
    let laneIndex;
    if (difficulty === "easy") {
      laneIndex = 1;
    } else {
      laneIndex = floor(random(0, 3));
    }
    let x = roadX + laneWidth * laneIndex;
    redCars.push(new Car(x, -i * 250, color(255, 0, 0), false));
  }

  // Create coins
  coins = [];
  for (let i = 0; i < 5; i++) {
    let x = roadX + laneWidth * floor(random(0, 3)) + laneWidth / 2;
    coins.push(new Coin(x, -random(200, 1000)));
  }

  // Create trees for decoration
  trees = [];
  for (let i = 0; i < 10; i++) {
    trees.push({ x: 30, y: i * 200 });
  }

  // Create houses for decoration
  houses = [];
  for (let i = 0; i < 10; i++) {
    houses.push({ x: width - 100, y: i * 300 });
  }

  // Reset scores
  score = 0;
  collectedCoins = 0;
  loop(); // Resume draw loop
}

// Main draw loop
function draw() {
  background(40, 60, 30); // Set background color

  if (!difficulty || gameOver) {
    showMenu(); // Show difficulty menu or replay screen
    return;
  }

  drawRoad(); // Draw road and lane lines
  drawSides(); // Draw trees and houses
  moveCars(); // Move enemy cars and coins
  movePlayer(); // Handle player movement
  checkCarPass(); // Add score when enemy car passes
  checkCarCollision(); // Detect collisions with red cars
  checkCoinCollection(); // Detect coin collection
  drawObjects(); // Draw all game objects
  drawScoreBoard(); // Draw score and coins
}

// Display difficulty menu or replay screen
function showMenu() {
  textAlign(CENTER, CENTER);
  textSize(40);
  fill(0);
  text(gameOver ? "So Close! Try Again!" : "Select Difficulty", width / 2, height / 2 - 80);

  if (replayButton) replayButton.remove();

  if (gameOver) {
    // Show replay button on game over
    replayButton = createButton("Replay");
    replayButton.position(width / 2 - 50, height / 2 - 10);
    replayButton.style("font-size", "24px");
    replayButton.mousePressed(() => {
      gameOver = false;
      difficulty = "";
      replayButton.remove();
    });
    return;
  }

  // Draw Easy button
  fill(0, 180, 0);
  rect(width / 2 - 210, height / 2, 120, 60, 10);
  fill(255);
  textSize(24);
  text("Easy", width / 2 - 150, height / 2 + 30);

  // Draw Medium button
  fill(255, 165, 0);
  rect(width / 2 - 60, height / 2, 120, 60, 10);
  fill(255);
  text("Medium", width / 2, height / 2 + 30);

  // Draw Hard button
  fill(180, 0, 0);
  rect(width / 2 + 90, height / 2, 120, 60, 10);
  fill(255);
  text("Hard", width / 2 + 150, height / 2 + 30);
}

// Handle mouse click to select difficulty
function mousePressed() {
  if (!difficulty && !gameOver) {
    // Easy difficulty
    if (mouseX > width / 2 - 210 && mouseX < width / 2 - 90 &&
        mouseY > height / 2 && mouseY < height / 2 + 60) {
      difficulty = "easy";
      initObjects();
    }
    // Medium difficulty
    else if (mouseX > width / 2 - 60 && mouseX < width / 2 + 60 &&
             mouseY > height / 2 && mouseY < height / 2 + 60) {
      difficulty = "medium";
      initObjects();
    }
    // Hard difficulty
    else if (mouseX > width / 2 + 90 && mouseX < width / 2 + 210 &&
             mouseY > height / 2 && mouseY < height / 2 + 60) {
      difficulty = "hard";
      initObjects();
    }
  }
}

// Draw the road and lane dividers
function drawRoad() {
  fill(50);
  rect(roadX, 0, laneWidth * 3, height);
  stroke(255);
  strokeWeight(4);
  for (let i = 1; i < 3; i++) {
    for (let j = 0; j < height; j += 40) {
      line(roadX + i * laneWidth, j, roadX + i * laneWidth, j + 20);
    }
  }
  noStroke();
}

// Draw trees and houses on the sides
function drawSides() {
  for (let tree of trees) {
    fill(139, 69, 19);
    rect(tree.x, tree.y + 20, 10, 30);
    fill(34, 139, 34);
    ellipse(tree.x + 5, tree.y + 20, 30);
    tree.y += 2;
    if (tree.y > height) tree.y = -200;
  }

  for (let house of houses) {
    fill(220, 180, 140);
    rect(house.x, house.y, 60, 60);
    fill(150, 50, 50);
    triangle(house.x, house.y, house.x + 30, house.y - 30, house.x + 60, house.y);
    house.y += 2;
    if (house.y > height) house.y = -300;
  }
}

// Move enemy cars and reset if off screen
function moveCars() {
  for (let car of redCars) {
    car.y += 3;
    if (car.y > height + 50) {
      car.y = -random(200, 600);
      let laneIndex;
      if (difficulty === "easy") {
        laneIndex = 1;
      } else {
        laneIndex = floor(random(0, 3));
      }
      car.x = roadX + laneWidth * laneIndex;
      car.passed = false;
    }
  }

  for (let coin of coins) {
    coin.y += 3;
    if (coin.y > height + 50) {
      coin.reset();
    }
  }
}

// Move player left and right with arrow or A/D keys
function movePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    player.x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    player.x += 5;
  }

  // Prevent player from leaving road bounds
  player.x = constrain(player.x, roadX, roadX + laneWidth * 3 - 40);
}

// Add to score when red car passes player
function checkCarPass() {
  for (let car of redCars) {
    if (!car.passed && car.y > player.y + player.height) {
      score++;
      car.passed = true;
    }
  }
}

// End game if player collides with a red car
function checkCarCollision() {
  for (let car of redCars) {
    if (dist(player.x + 20, player.y + 30, car.x + 20, car.y + 30) < 40) {
      gameOver = true;
      noLoop(); // Stop draw loop
      loop();   // Restart draw to show menu
    }
  }
}

// Check if player collects a coin
function checkCoinCollection() {
  for (let coin of coins) {
    if (dist(player.x + 20, player.y + 30, coin.x, coin.y) < 25) {
      collectedCoins++;
      coin.reset();
    }
  }
}

// Draw player, cars, and coins
function drawObjects() {
  player.display();
  for (let car of redCars) car.display();
  for (let coin of coins) coin.display();
}

// Display current score and coins collected
function drawScoreBoard() {
  fill(255);
  textSize(24);
  textAlign(LEFT, TOP);
  text("Score: " + score, 20, 20);
  text("Coins: " + collectedCoins, 20, 50);
}

// Car class to define player and enemy cars
class Car {
  constructor(x, y, col, passed = false) {
    this.x = x;
    this.y = y;
    this.color = col;
    this.width = 40;
    this.height = 60;
    this.passed = passed;
  }

  display() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height, 10);
    fill(0);
    rect(this.x + 5, this.y + 10, 30, 10);
    fill(0);
    ellipse(this.x + 8, this.y + this.height, 10, 10);
    ellipse(this.x + this.width - 8, this.y + this.height, 10, 10);
  }
}

// Coin class
class Coin {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    fill(255, 215, 0);
    ellipse(this.x, this.y, 20);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("$", this.x, this.y);
  }

  // Reset coin position to a random lane
  reset() {
    let lane = floor(random(0, 3));
    this.x = roadX + laneWidth * lane + laneWidth / 2;
    this.y = -random(200, 1000);
  }
}

// Resize canvas and reinitialize game elements when window changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  laneWidth = width / 5;
  roadX = laneWidth;
  initObjects();
}
