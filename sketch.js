const DEFAULT_PATH_COLOR = "rgba(0,0,0,0.15)";
const CANVAS_HEIGHT_FACTOR = 0.6;
const STROKE_WEIGHT_POINT = 12;
let canvas_margin = 100;
let numberOfPoints = 10;
let populationCount = 10;
let pointsOnCanvas = [];
let allowNextGeneration = false;
let ppn;
let pointCounter;
let salespeopleCounter;
let genCounter;
let distCounter;
let keepCurrentConfig = false;
let inputFields = document.getElementsByClassName("input");

function setup() {
  let myCanvas = createCanvas(
    windowWidth - canvas_margin * 2,
    CANVAS_HEIGHT_FACTOR * windowHeight
  );
  myCanvas.parent("container");
  generateConfig();
}

function windowResized() {
  resizeCanvas(
    windowWidth - canvas_margin * 2,
    CANVAS_HEIGHT_FACTOR * windowHeight
  );
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

  // HTML stuff --> updating text
  // disable editing of population size and number of points variables while "evolution" occurring
  pointCounter = document.getElementById("pt-counter");
  salespeopleCounter = document.getElementById("sp-counter");
  if (allowNextGeneration) {
    pointCounter.disabled = true;
    salespeopleCounter.disabled = true;
  } else {
    pointCounter.disabled = false;
    salespeopleCounter.disabled = false;
  }

  // update population size and number of point variables to content
  numberOfPoints = pointCounter.value;
  populationCount = salespeopleCounter.value;

  // update generation and best distance counters as they change
  genCounter = document.getElementById("gen-counter");
  distCounter = document.getElementById("dist-counter");
  genCounter.innerText = ppn.generationCounter;
  if (ppn.bestFitness == 0) {
    distCounter.innerText = 0;
  } else {
    distCounter.innerText = `${Math.floor(1.0 / ppn.bestFitness)} (Gen: ${
      ppn.bestFitnessGen
    })`;
  }

  resizeInput();
}

function generateConfig() {
  // clear canvas
  clear();

  // validation for population / points variables
  if (numberOfPoints < 2) {
    numberOfPoints = 2;
    pointCounter.value = numberOfPoints;
  }

  if (populationCount < 1) {
    populationCount = 1;
    salespeopleCounter.value = populationCount;
  }

  // generate X number of points (if not restarting simulation)
  if (!keepCurrentConfig) {
    pointsOnCanvas = [];
    const canvasPadding = 25;
    for (let i = 0; i < numberOfPoints; i++) {
      const randX = random(canvasPadding, width - canvasPadding);
      const randY = random(canvasPadding, height - canvasPadding);
      let pt = new Point(i, randX, randY);
      pointsOnCanvas[i] = pt;
    }
  }

  // display points on canvas
  drawPoints();

  // instantiate population for current config
  ppn = new Population(populationCount);
  ppn.randomizeAllRoutes();
  ppn.drawAllPaths();

  // disable restart
  keepCurrentConfig = false;
}

function drawPoints() {
  for (let i = 0; i < pointsOnCanvas.length; i++) {
    // differentiate the starting point
    if (i == 0) {
      stroke("#D32F2F");
      strokeWeight(STROKE_WEIGHT_POINT + 2);
    } else {
      stroke("#000");
      strokeWeight(STROKE_WEIGHT_POINT);
    }
    pointsOnCanvas[i].display();
  }
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

function restartEvolution() {
  keepCurrentConfig = true;
  if (allowNextGeneration) {
    toggleEvolution();
  }
  generateConfig();
}

function resizeInput() {
  inputFields.forEach((field) => {
    field.style.width = field.value.length + "ch";
  });
}

const mediaQuery = window.matchMedia("(max-width: 850px)");

function smallScreenChange(e) {
  if (e.matches) {
    canvas_margin = 50;
  } else {
    canvas_margin = 100;
  }
}

mediaQuery.addEventListener("change", smallScreenChange);
