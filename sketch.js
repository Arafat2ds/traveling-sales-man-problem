function setup() {
  let myCanvas = createCanvas(1000, 600);
  myCanvas.parent("container");
  generatePoints(10);
}

function draw() {}

function generatePoints(number) {
  // clear canvas
  clear();
  // generate X number of points to
  const canvasPadding = 25;
  for (let i = 0; i < number; i++) {
    const randX = random(canvasPadding, width - canvasPadding);
    const randY = random(canvasPadding, height - canvasPadding);
    // differentiate the starting point
    if (i == 0) {
      stroke("#D32F2F");
      strokeWeight(10);
    } else {
      stroke("#000");
      strokeWeight(6);
    }
    point(randX, randY);
  }
}
