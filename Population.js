class Population {
  salespeople = [];

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
      sp.drawPath(defaultPathColor);
    });
  }

  calculateFitnesses() {
    this.salespeople.forEach((sp) => {
      sp.calculateFitness();
    });
  }
}
