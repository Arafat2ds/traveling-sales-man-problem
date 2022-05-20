// list of all point objects on currently displayed
let pointsOnCanvas = [];

function setup() {
  let myCanvas = createCanvas(1000, 600);
  myCanvas.parent("container");
  generatePoints(10);
}

function draw() {}

function generatePoints(number) {
  // clear canvas
  clear();
  // generate X number of points
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

    let pt = new Point(i, randX, randY);
    pointsOnCanvas[i] = pt;
    pt.display();
  }

  let sp = new Salesperson();
  let sp2 = new Salesperson();
  let sp3 = new Salesperson();
  sp.drawPath("green");
  sp2.setRoute = sp2.randomizeRoute(sp2.getRoute);
  sp2.drawPath("blue");
  sp3.setRoute = sp3.randomizeRoute(sp3.getRoute);
  sp3.drawPath("orange");
}
