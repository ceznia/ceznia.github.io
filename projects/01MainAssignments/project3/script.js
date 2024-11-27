//game mechanics
let isOn = false;
let isPlaying = false; let isWin = false;
let level = 1; let maxLevel = 5;

//slider variables
let sliderX, sliderY;
let sliderWidth = 80, sliderHeight = 40, knobDiameter = 30;
let speedX = 10, speedY = 10;
let font; 

function preload() {
  font = loadFont('assets/fonts/Roboto-Bold.ttf'); 
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(30);
  rectMode(CENTER);
  textFont(font);

  sliderX = random(windowWidth);
  sliderY = random(windowHeight);
}

function draw() {
  background(0);

  // Level Indicator
  textSize(24);
  fill(255);
  textAlign(LEFT, TOP);
  text("Level: " + level, 50, 50);

  if (isWin) {
    // Win Screen
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("You won!\nPress Spacebar to Restart", width / 2, height / 2);
    return;
  }

  if (!isPlaying) {
    // Start Screen
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Try to hit the button!\nPress Spacebar to Start", width / 2, height / 2);
  } else {
    // Game logic
    sliderX += level * speedX;
    sliderY += level * speedY; 

    if (sliderX + sliderWidth / 2 >= windowWidth || sliderX - sliderWidth / 2 <= 0) {
      speedX *= -1;
    } 
    if (sliderY + sliderHeight / 2 >= windowHeight || sliderY - sliderHeight / 2 <= 0) {
      speedY *= -1; 
    }

    sliderButton();
  }
}

function sliderButton() {
  // Draw slider background
  if (isOn) {
    fill(0, 255, 0); // Green for ON
  } else {
    fill(255, 0, 0); // Red for OFF
  }
  rect(sliderX, sliderY, sliderWidth, sliderHeight, 20);

  // Draw knob
  fill(255);
  noStroke();
  if (isOn) {
    ellipse(sliderX + sliderWidth / 4, sliderY, knobDiameter);
  } else {
    ellipse(sliderX - sliderWidth / 4, sliderY, knobDiameter);
  }
}

function mousePressed() {
  if (!isPlaying || isWin) return; // Ignore clicks if not playing or won

  let d = dist(mouseX, mouseY, sliderX, sliderY);
  if (d < sliderWidth / 2 && !isOn) {
    isOn = true; 
    setTimeout(levelUp, 1000); // Wait 1 second before leveling up
  }
}

function levelUp() {
  if (level < maxLevel) {
    level += 1; 
    speedX *= 1;
    speedY *= 1;

    // Reset Slider
    isOn = false;
    sliderX = random(windowWidth);
    sliderY = random(windowHeight);
  } else {
    // Max level reached, player wins
    isWin = true;
    isPlaying = false; // Stop game
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (!isPlaying && !isWin) {
      // Start the game
      isPlaying = true;
    } else if (isWin) {
      // Reset game after winning
      resetGame();
    }
  }
}

function resetGame() {
  level = 1;
  speedX = 10;
  speedY = 10;
  isOn = false;
  isPlaying = false;
  isWin = false;

  sliderX = random(windowWidth);
  sliderY = random(windowHeight);
}
