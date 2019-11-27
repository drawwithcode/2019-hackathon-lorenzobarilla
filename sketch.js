//global variables

var mySong;
var analyzer;
var volume = 0;
var reproduction = 0;

var myImage;
var myAntenna;

//Wave obj variable and array
var amountOfWaves = 10;
var allMyWaves = [];

function preload() {
  //preload img and sound
  mySong = loadSound("./assets/tg1.mp3");
  myImage = loadImage("./assets/tg1-new.png");
  myAntenna = loadImage("./assets/antenna.png");
  myEarth = loadImage("./assets/earth.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  //img filters
  myEarth.filter("gray");
  myEarth.filter(BLUR, 3);

  //create analyzer
  analyzer = new p5.Amplitude();
  analyzer.setInput(mySong);

  //create waves with Wave obj
  for (var i = 0; i < amountOfWaves; i++) {
    var tempd = 35 + i * 20;
    var tempWave = new Wave(tempd);
    allMyWaves.push(tempWave);
  }

}

function draw() {
  // clear();
  background(128);

  //show images
  push();
  imageMode(CENTER);
  image(myEarth, windowWidth / 2, windowHeight / 2, windowWidth / 2.5, windowWidth / 2.5);
  image(myAntenna, windowWidth / 2, windowHeight / 2 + myAntenna.height / 5, myAntenna.width / 2.5, myAntenna.height / 2.5);
  // image(myImage, windowWidth/2, windowHeight - myImage.height *2, myImage.width, myImage.height);
  pop();

  push();
  fill("white");
  noStroke();
  ellipse(windowWidth / 2, windowHeight / 2, 25);
  pop();

  push();
  imageMode(CORNER);
  image(myImage, windowWidth * 0.1, windowHeight * 0.1, myImage.width / 10, myImage.height / 10);
  pop();

  // get the volume and remap it to a bigger value
  volume = analyzer.getLevel();
  volume = map(volume, 0, 1, 0, height);

  //display Wave obj
  for (var i = 0; i < allMyWaves.length; i++) {
    var w = allMyWaves[i];
    w.display();
  }
  //text
  push();
  fill(255);
  noStroke();
  var textPar;
  if (!mySong.isPlaying() && reproduction == 0) {
    textPar = "Click to play!"
  } else if (mySong.isPlaying()) {
    textPar = "It's Tg1 time!"
  } else if (!mySong.isPlaying() && reproduction == 1) {
    textPar = "Click to restart!"
  }

  textSize(24);
  text(textPar, windowWidth * 0.1, windowHeight * 0.9);
  pop();
}

//Wave object
function Wave(_d) {
  this.d = _d;

  this.display = function() {
    noFill();
    strokeWeight(2);
    if (mySong.isPlaying()) {
      stroke(random(0, 255), random(0, 255), random(0, 255));
      strokeWeight(2);
    } else {
      stroke(255);
      strokeWeight(0);
    }
    ellipse(windowWidth / 2, windowHeight / 2, this.d + volume);
  }
}

//click to start & click to reload at the end
function mouseClicked() {
  if (!mySong.isPlaying() && reproduction == 0) {
    mySong.play();
    reproduction = 1;
  } else if (!mySong.isPlaying() && reproduction == 1) {
    location = location;
  }
}

//resize
function windowResized() {
  console.log("resized");
  resizeCanvas(windowWidth, windowHeight);
}
