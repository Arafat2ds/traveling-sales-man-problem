const NUMBER_OF_POINTS = 10;
const DEFAULT_PATH_COLOR = "rgba(0,0,0,0.2)";
let pointsOnCanvas = [];
let allowNextGeneration = false;
let ppn;

function setup() {
  let myCanvas = createCanvas(1000, 600);
  myCanvas.parent("container");
  generateConfig(NUMBER_OF_POINTS);
}

function draw() {
  if (allowNextGeneration) {
    // implement genetic algorithm
    ppn.calculateFitnesses();
    ppn.naturalSelection();
    ppn.mutateAll();
    // console.log(ppn.generationCounter, ": ", ppn.totalFitness);
  }
}

function generateConfig() {
  // clear canvas
  clear();
  // generate X number of points
  const canvasPadding = 25;
  for (let i = 0; i < NUMBER_OF_POINTS; i++) {
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
