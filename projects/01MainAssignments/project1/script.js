let message = "InteractionDesignInteractionDesign";
let bg;
let font;
let waves = [];
let seed = 23563;

function preload() {
  font = loadFont('fonts/assets/PicNic-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  frameRate(60);
  rectMode(CENTER);
  bg = color(0);
  textSize(30);
  textFont(font);
}

function draw() {
  background(bg);
  randomSeed(seed);
  noFill();
  strokeWeight(5);
  stroke(20, 250, 40);

  // Fill array
  for (let i = 0; i < waves.length; i++) {
    let wave = waves[i];
    textWave(wave.offset, wave.angle);
  }
}

function textWave(offset, angle) {
  let currentChar = message[0];
  let yspace = height / message.length;

  for (let i = 0; i < message.length; i++) {
    let sinWave = sin(radians(i * 10 + frameCount) + PI * offset);
    fill(150 + sinWave * 100);
    textSize(35 + sinWave * 30);

    let x = sinWave * 200 * 0.3;
    let y = i * yspace;

	  let rotatedX = x * cos(angle) - y * sin(angle);
    let rotatedY = x * sin(angle) + y * cos(angle);

    text(message[i], rotatedX + width / 2, rotatedY + height / 2);
  }
}

function mouseClicked() {
  seed = random(456812);
  let newWave = {
    offset: waves.length, 
    angle: random(TWO_PI),
  };
  waves.push(newWave);

  if (waves.length >= 15) {
    waves = [];
    background(0);
  }
}
