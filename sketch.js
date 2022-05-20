// list of all point objects on currently displayed
let pointsOnCanvas = [];
const numberOfPoints = 10;
const defaultPathColor = "rgba(0,0,0,0.2)";

function setup() {
  let myCanvas = createCanvas(1000, 600);
  myCanvas.parent("container");
  generatePoints(numberOfPoints);
}

function draw() {}

function generatePoints() {
  // clear canvas
  clear();
  // generate X number of points
  const canvasPadding = 25;
  for (let i = 0; i < numberOfPoints; i++) {
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

    let pt = new Point(i, randX, randY);
    pointsOnCanvas[i] = pt;
    pt.display();
  }

  // instantiate population for current config
  ppn = new Population(10);
  ppn.randomizeAllRoutes();
  ppn.drawAllPaths();
}
