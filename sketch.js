const NUMBER_OF_POINTS = 100;
const POPULATION_COUNT = 10;
const DEFAULT_PATH_COLOR = "rgba(0,0,0,0.15)";
const CANVAS_WIDTH_FACTOR = 2 / 3;
const CANVAS_HEIGHT_FACTOR = 2 / 3;
let pointsOnCanvas = [];
let allowNextGeneration = false;
let ppn;

function setup() {
  let myCanvas = createCanvas(
    CANVAS_WIDTH_FACTOR * windowWidth,
    CANVAS_HEIGHT_FACTOR * windowHeight
  );
  myCanvas.parent("container");
  resizeRows();
  generateConfig(NUMBER_OF_POINTS);
}

function windowResized() {
  resizeCanvas(
    CANVAS_WIDTH_FACTOR * windowWidth,
    CANVAS_HEIGHT_FACTOR * windowHeight
  );
  resizeRows();
  generateConfig();
}

function draw() {
  if (allowNextGeneration) {
    // implement genetic algorithm
    ppn.calculateFitnesses();
    ppn.naturalSelection();
    ppn.mutateAll();
    clear();
    drawPoints();
    ppn.drawAllPaths();
  }
  updateInfo();
}

function generateConfig() {
  // clear canvas
  clear();
  // generate X number of points
  const canvasPadding = 25;
  for (let i = 0; i < NUMBER_OF_POINTS; i++) {
    const randX = random(canvasPadding, width - canvasPadding);
    const randY = random(canvasPadding, height - canvasPadding);
    let pt = new Point(i, randX, randY);
    pointsOnCanvas[i] = pt;
  }

  drawPoints();

  // instantiate population for current config
  ppn = new Population(POPULATION_COUNT);
  ppn.randomizeAllRoutes();
  ppn.drawAllPaths();
}

function toggleEvolution() {
  // CSS stuff changing the style of the button and switching true/false
  let btn = document.getElementById("start-btn");
  if (!allowNextGeneration) {
    btn.innerHTML = `Pause<span class="material-icons" id="pause-icon">pause</span>`;
    btn.className = "btn btn-red";
    allowNextGeneration = true;
  } else {
    btn.innerHTML = `Start<span class="material-icons" id="play-icon">play_arrow</span>`;
    btn.className = "btn btn-blue";
    allowNextGeneration = false;
  }
}

function drawPoints() {
  for (let i = 0; i < pointsOnCanvas.length; i++) {
    // differentiate the starting point
    if (i == 0) {
      stroke("#D32F2F");
      strokeWeight(12);
    } else {
      stroke("#000");
      strokeWeight(10);
    }
    pointsOnCanvas[i].display();
  }
}

function resizeRows() {
  // resize main content row
  let rows = document.getElementsByClassName("row");
  rows.forEach((row) => {
    row.style.width = `${CANVAS_WIDTH_FACTOR * 100}%`;
  });
}

function updateInfo() {
  let genCounter = document.getElementById("gen-counter");
  let distCounter = document.getElementById("dist-counter");
  let salespeopleCounter = document.getElementById("sp-counter");
  genCounter.innerText = ppn.generationCounter;
  if (ppn.bestFitness == 0) {
    distCounter.innerText = 0;
  } else {
    distCounter.innerText = Math.floor(1.0 / ppn.bestFitness);
  }
  salespeopleCounter.innerText = POPULATION_COUNT;
}
