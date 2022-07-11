let nQueen;

function preload(){
  nQueen = new NQueen();
  nQueen.preload();
};

function setup(){
  createCanvas(windowWidth, windowHeight);
  nQueen.setup();
}
function draw(){
  nQueen.draw()
}

function windowResized(){
  nQueen.windowResized()
}