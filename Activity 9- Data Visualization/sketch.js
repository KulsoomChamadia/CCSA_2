
let cars;
let select;
let currentSpeed = 0;
let targetSpeed = 0;
let currentHP = 0;
let targetHP = 0;
let currentAccel = 0;
let targetAccel = 0;
let currentCapacity = 0;
let targetCapacity = 0;

let maxSpeed = 300;
let maxHP = 1750;
let maxAccel = 5;
let maxCapacity = 2000;

let hoveredGauge = null;
let selectedGauge = null;
let pulse = 0;
let hoveringCarName = false;

function preload() {
  cars = loadTable('cars.csv', 'csv', 'header');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(16);
  
  select = createSelect();
  select.position(10, 10);
  select.style('padding', '6px 14px');
  select.style('background', '#1f1f1f');
  select.style('color', '#00ffe7');
  select.style('border', '2px solid #00ffe7');
  select.style('border-radius', '6px');
  select.style('font-size', '14px');
  select.style('font-family', 'Courier New');
  select.style('box-shadow', '0px 0px 10px rgba(0,255,231,0.5)');

  for (let r = 0; r < cars.getRowCount(); r++) {
    let brand = cars.getString(r, 'Brand');
    let model = cars.getString(r, 'Model');
    select.option(`${brand} ${model}`, r);
  }

  select.changed(onCarChange);

  targetSpeed = Number(cars.getString(0, 'Speed (mph)'));
  targetHP = Number(cars.getString(0, 'Horsepower'));
  targetAccel = 5 - Number(cars.getString(0, 'Time (s)'));
  targetCapacity = targetHP * 2;
}

function draw() {
  background(10, 10, 30);
  pulse = sin(frameCount * 2) * 15;

  checkHover();
  checkCarNameHover();

  currentSpeed = lerp(currentSpeed, targetSpeed, 0.06);
  currentHP = lerp(currentHP, targetHP, 0.06);
  currentAccel = lerp(currentAccel, targetAccel, 0.06);
  currentCapacity = lerp(currentCapacity, targetCapacity, 0.06);

  drawAllGauges();
  drawLabels();
  drawTooltip();

  if (hoveringCarName) {
    drawCarInfoTooltip();
  }
}

function drawAllGauges() {
  let cx = width / 2;
  let cy = height / 2;
  let spacingX = 250;
  let spacingY = 220;

  drawGauge(cx - spacingX, cy - spacingY / 2, currentSpeed, maxSpeed, 'Speed (MPH)', color(0, 255, 255), 'speed');
  drawGauge(cx + spacingX, cy - spacingY / 2, currentHP, maxHP, 'Horsepower', color(255, 0, 200), 'hp');
  drawGauge(cx - spacingX, cy + spacingY / 2, currentAccel, maxAccel, 'Acceleration', color(255, 165, 0), 'accel');
  drawGauge(cx + spacingX, cy + spacingY / 2, currentCapacity, maxCapacity, 'Capacity', color(0, 255, 127), 'capacity');
}

function drawGauge(x, y, value, maxValue, label, col, type) {
  push();
  translate(x, y);
  noFill();
  strokeWeight(28);
  stroke((hoveredGauge === type || selectedGauge === type) ? color(col.levels[0], col.levels[1], col.levels[2], 200 + pulse) : color(col.levels[0], col.levels[1], col.levels[2], 100));
  arc(0, 0, 200, 200, 140, 400);

  let angle = map(value, 0, maxValue, 140, 400);
  rotate(angle);
  stroke(col);
  strokeWeight(3);
  line(0, 0, 0, -70);
  pop();

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label + ': ' + Math.round(value), x, y + 100);
}

function drawLabels() {
  const index = int(select.value());
  const brand = cars.getString(index, 'Brand');
  const model = cars.getString(index, 'Model');

  fill(0, 255, 255);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(`${brand} ${model}`, width / 2, 60);

  textSize(12);
  textAlign(LEFT);
  fill(0, 255, 255);   text("🟦 SPEED", 20, 120);
  fill(255, 0, 200);   text("🟪 HORSEPOWER", 20, 140);
  fill(255, 165, 0);   text("🟧 ACCELERATION", 20, 160);
  fill(0, 255, 127);   text("🟩 CAPACITY", 20, 180);
}

function drawTooltip() {
  if (hoveredGauge) {
    fill(20, 20, 20, 240);
    stroke(0, 255, 255);
    strokeWeight(1);
    rect(mouseX + 12, mouseY - 28, 150, 30, 5);
    noStroke();
    fill(0, 255, 255);
    textSize(12);
    textAlign(LEFT, CENTER);
    if (hoveredGauge === 'speed') {
      text("Speed (MPH) Gauge", mouseX + 20, mouseY - 12);
    } else if (hoveredGauge === 'hp') {
      text("Horsepower (HP) Gauge", mouseX + 20, mouseY - 12);
    } else if (hoveredGauge === 'accel') {
      text("Acceleration Gauge", mouseX + 20, mouseY - 12);
    } else if (hoveredGauge === 'capacity') {
      text("Capacity Gauge", mouseX + 20, mouseY - 12);
    }
    textAlign(CENTER);
  }
}

function drawCarInfoTooltip() {
  const index = int(select.value());
  const brand = cars.getString(index, 'Brand');
  const model = cars.getString(index, 'Model');
  const speed = cars.getString(index, 'Speed (mph)');
  const hp = cars.getString(index, 'Horsepower');
  const time = cars.getString(index, 'Time (s)');
  const capacity = Math.round(targetCapacity);

  const boxWidth = 240;
  const boxHeight = 120;
  const x = constrain(mouseX + 20, 0, width - boxWidth - 10);
  const y = constrain(mouseY - boxHeight - 20, 0, height - boxHeight - 10);

  fill(20);
  stroke(0, 255, 255);
  strokeWeight(1);
  rect(x, y, boxWidth, boxHeight, 8);

  noStroke();
  fill(0, 255, 255);
  textSize(14);
  textAlign(LEFT, TOP);
  let ty = y + 10;
  text(`Model: ${brand} ${model}`, x + 10, ty);
  text(`Speed: ${speed} MPH`, x + 10, ty + 20);
  text(`Horsepower: ${hp} HP`, x + 10, ty + 40);
  text(`0-60 Time: ${time} s`, x + 10, ty + 60);
  text(`Capacity: ${capacity}`, x + 10, ty + 80);
}

function checkHover() {
  hoveredGauge = null;
  let cx = width / 2;
  let cy = height / 2;
  let spacingX = 250;
  let spacingY = 220;
  let hoverAreas = [
    { x: cx - spacingX, y: cy - spacingY / 2, key: 'speed' },
    { x: cx + spacingX, y: cy - spacingY / 2, key: 'hp' },
    { x: cx - spacingX, y: cy + spacingY / 2, key: 'accel' },
    { x: cx + spacingX, y: cy + spacingY / 2, key: 'capacity' },
  ];
  for (let a of hoverAreas) {
    if (dist(mouseX, mouseY, a.x, a.y) < 100) {
      hoveredGauge = a.key;
      cursor(HAND);
      return;
    }
  }
}

function checkCarNameHover() {
  const index = int(select.value());
  const carName = `${cars.getString(index, 'Brand')} ${cars.getString(index, 'Model')}`;
  textSize(28);
  const nameWidth = textWidth(carName);
  const nameHeight = 30;

  const centerX = width / 2;
  const centerY = 60;

  if (
    mouseX > centerX - nameWidth / 2 &&
    mouseX < centerX + nameWidth / 2 &&
    mouseY > centerY - nameHeight / 2 &&
    mouseY < centerY + nameHeight / 2
  ) {
    hoveringCarName = true;
    cursor(HAND);
  } else {
    hoveringCarName = false;
    cursor(hoveredGauge ? HAND : ARROW);
  }
}

function mousePressed() {
  if (hoveredGauge) {
    selectedGauge = hoveredGauge;
  } else {
    selectedGauge = null;
  }
}

function onCarChange() {
  let index = int(select.value());
  targetSpeed = Number(cars.getString(index, 'Speed (mph)'));
  targetHP = Number(cars.getString(index, 'Horsepower'));
  targetAccel = 5 - Number(cars.getString(index, 'Time (s)'));
  targetCapacity = targetHP * 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
