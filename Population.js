class Population {
  salespeople = [];
  totalFitness;
  generationCounter = 1;
  bestSalespersonIndex;

  constructor(size) {
    for (let i = 0; i < size; i++) {
      this.salespeople.push(new Salesperson());
    }
  }

  // same functions as in Salesperson class but for entire population
  randomizeAllRoutes() {
    this.salespeople.forEach((sp) => {
      sp.setRoute = sp.randomizeRoute(sp.getRoute);
    });
  }

  drawAllPaths() {
    this.salespeople.forEach((sp) => {
      sp.drawPath(DEFAULT_PATH_COLOR);
    });
  }

  calculateFitnesses() {
    this.salespeople.forEach((sp) => {
      sp.calculateFitness();
    });
  }

  // natural selection (genetic algorithm) --> survival of fittest
  naturalSelection() {
    let nextGen = [];

    // add best salesperson from previous generation
    this.setBestSalesperson();
    console.log(
      "BEST: ",
      this.salespeople[this.bestSalespersonIndex].getFitness
    );
    nextGen.push(this.createChild(this.salespeople[this.bestSalespersonIndex]));

    // sum fitnesses of all salespersons (total pool)
    this.totalFitness = 0;
    this.salespeople.forEach((sp) => {
      this.totalFitness += sp.getFitness;
    });

    for (let i = 0; i < this.salespeople.length; i++) {
      // randomly choose parent from the population
      let parent = this.selectRandomParent();
      // create child from parent
      let child = this.createChild(parent);
      nextGen.push(child);
    }

    this.salespeople = nextGen.slice(0);
    this.generationCounter++;
  }

  // higher fitness parents should have a greater chance of being chosen
  selectRandomParent() {
    // pick random value from range (each salesperson's fitness is proportional to the whole)
    let randomFitness = Math.random() * this.totalFitness;

    let threshold = 0;
    for (let i = 0; i < this.salespeople.length; i++) {
      threshold += this.salespeople[i].getFitness;
      // higher fitness is higher proportion of total sum --> higher chance of being selected
      if (threshold > randomFitness) {
        return this.salespeople[i];
      }
    }
  }

  // for simplicity --> child will be duplicate of parent (instead of mixing two parents)
  createChild(parent) {
    let parentClone = new Salesperson();
    parentClone.setRoute = parent.getRoute;
    return parentClone;
  }

  mutateAll() {
    this.salespeople.forEach((sp) => {
      sp.mutate();
    });
  }

  // prevent de-evolution; randomization causes generations to do worse than before
  setBestSalesperson() {
    let maxFitness = 0;
    let maxIndex = 0;
    for (let i = 0; i < this.salespeople.length; i++) {
      if (this.salespeople[i].getFitness > maxFitness) {
        maxFitness = this.salespeople[i].getFitness;
        maxIndex = i;
      }
    }

    this.bestSalespersonIndex = maxIndex;
  }
}
