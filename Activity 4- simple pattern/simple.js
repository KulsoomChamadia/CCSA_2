// Number of spirals in a grid (2x2 in this case)
let spiralCount = 4;

// Size (width and height) of each spiral block
let spiralSize = 150;

// Number of nested rectangles per spiral
let steps = 10;

function setup() {
  // Create canvas large enough to fit spiral grid
  createCanvas(spiralCount / 2 * spiralSize, spiralCount / 2 * spiralSize);

  background(255);     // Set white background
  stroke(0);           // Set outline color to black
  strokeWeight(10);    // Thickness of the rectangle borders
  noFill();            // No fill inside the rectangles

  // Loop through rows and columns to place spirals in a 2x2 grid
  for (let row = 0; row < spiralCount / 2; row++) {
    for (let col = 0; col < spiralCount / 2; col++) {
      // Calculate position offset for each spiral
      let xOffset = col * spiralSize;
      let yOffset = row * spiralSize;

      // Add shadow effect to all 4 spirals in this 2x2 grid
      if ((row === 0 && col === 1) || (row === 1 && col === 0) || (row === 1 && col === 1) || (row === 0 && col === 0)) {
        push(); // Save current drawing settings
        drawingContext.shadowOffsetX = 10;            // Horizontal shadow offset
        drawingContext.shadowOffsetY = 10;            // Vertical shadow offset
        drawingContext.shadowBlur = 15;               // Blur radius
        drawingContext.shadowColor = 'rgba(0, 0, 0, 0.4)'; // Shadow color with transparency
        drawSpiral(xOffset, yOffset, spiralSize, steps); // Draw spiral with shadow
        pop(); // Restore original drawing settings
      } else {
        drawSpiral(xOffset, yOffset, spiralSize, steps); // Draw spiral without shadow
      }
    }
  }
}

// Function to draw a single spiral made of nested rectangles
function drawSpiral(x, y, size, steps) {
  // Calculate how much to shrink the rectangle each step
  let stepSize = size / (steps * 2);

  // Initial coordinates for the outermost rectangle
  let x1 = x + stepSize;
  let y1 = y + stepSize;
  let x2 = x + size - stepSize;
  let y2 = y + size - stepSize;

  // Draw nested rectangles that form a spiral effect
  for (let i = 0; i < steps; i++) {
    rect(x1, y1, x2 - x1, y2 - y1); // Draw current rectangle
    x1 += stepSize * 2;             // Move inner corner inward
    y1 += stepSize * 2;
    x2 -= stepSize * 2;             // Move outer corner inward
    y2 -= stepSize * 2;
  }
}
