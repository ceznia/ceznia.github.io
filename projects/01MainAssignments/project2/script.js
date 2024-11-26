let font;
let radius = 5; let angle = 0;
let isDissolving = false;
let points = []; let directions = [];

function preload() {
  font = loadFont('assets/fonts/Roboto-Bold.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(font);
  angleMode(DEGREES);
  background(0);
  points = font.textToPoints("IAD", windowWidth / 3, windowHeight / 1.6, 400);
  setupDirections();
}

function draw() {
  background(0);

  let centerX = width / 2;
  let centerY = height / 2;

  if (isDissolving) {
    // Points dissolve in random directions
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      p.x += directions[i].x;
      p.y += directions[i].y;

      let d = dist(mouseX, mouseY, p.x, p.y);
    
      fill(255, 100);
      noStroke();
      ellipse(p.x, p.y, 10);
    }
  } else {
    // Shaking based on mouse position
    let maxDist = dist(0, 0, width, height);

    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      
      let d = dist(mouseX, mouseY, p.x, p.y);
      let shakiness = map(d, 0, maxDist, 40, 0);
      let centerDist = dist(mouseX, mouseY, centerX, centerY);
      let newRadius = map(centerDist, 0, width / 4, 15, 5);

      let redColor = map(d, 0, width / 2, 255, 0);
      fill(redColor, redColor, redColor);
      noStroke();
      ellipse(p.x + newRadius * cos(angle * shakiness + i * 10), p.y + newRadius * sin(angle * shakiness + i * 10), 10);
    }
  }

  angle += 1;
}

function mousePressed() {
  // Reverse to text
  if (isDissolving) {
    isDissolving = false;
    points = font.textToPoints("IAD", windowWidth / 3, windowHeight / 1.6, 400);
    setupDirections();
  } else {
    isDissolving = true; 
  }
}

// Calculate random directions for each point
function setupDirections() {
  directions = [];
  for (let i = 0; i < points.length; i++) {
    directions.push({
      x: random(-3, 3),
      y: random(-3, 3)
    });
  }
}
