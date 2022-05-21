class Salesperson {
  constructor() {
    this.route = pointsOnCanvas;
    this.fitness = 0;
    this.isBest = false;
    this.distance = 0;
  }

  get getRoute() {
    return this.route;
  }

  get getFitness() {
    return this.fitness;
  }

  set setRoute(route) {
    this.route = route;
  }

  /* 
  - create a randomized route using Durstenfeld shuffle algorithm w/ same starting point
  - essentially shuffling all elements except first element
  */

  randomizeRoute(route) {
    let array = [...route];
    let startingPoint = array.shift();
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    array.unshift(startingPoint);
    return array;
  }

  // display the route a salesperson takes
  drawPath(color) {
    for (let i = 1; i < this.route.length; i++) {
      let p1 = this.route[i - 1];
      let p2 = this.route[i];
      if (this.isBest) {
        stroke("rgba(204, 255, 204, 0.4)");
      } else {
        strokeWeight(1);
        stroke(color);
      }
      line(p1.posX, p1.posY, p2.posX, p2.posY);
    }
  }

  /* 
  - calculate the "fitness" of a salesperson (how good a route is)
  - efficiency of route depends on 1 main factor: distance 
  - lower the distance, the shorter the time it takes to travel b/w all points
  - a good route is the the route with the shortest distance 
  */

  calculateFitness() {
    // find sum of distances of route
    let routeDist = 0;
    for (let i = 1; i < this.route.length; i++) {
      routeDist += dist(
        this.route[i - 1].getPosX,
        this.route[i - 1].getPosY,
        this.route[i].getPosX,
        this.route[i].getPosY
      );
    }
    // taking inverse --> smaller distance means higher fitness
    //! squaring routeDist --> increases weight of shorter path
    this.fitness = 1.0 / routeDist;
    this.distance = routeDist;
  }

  // mutate salesperson to provide "genetic variation" through adding a randomization factor
  mutate() {
    // probability of mutation occurring
    const M_RATE = 0.01;
    for (let i = 0; i < this.route.length; i++) {
      let mutationChance = Math.random();
      if (mutationChance < M_RATE) {
        // randomly shifting one pathway
        this.setRoute = this.shiftRoute();
      }
    }
  }

  shiftRoute() {
    let arr = this.route.slice(0);
    // generate index from 1 to NUM_OF_POINTS
    let rdx1 = Math.floor(Math.random() * (arr.length - 1)) + 1;
    let rdx2 = Math.floor(Math.random() * (arr.length - 1)) + 1;
    // swap points
    let temp = arr[rdx1];
    arr[rdx1] = arr[rdx2];
    arr[rdx2] = temp;
    return arr;
  }
}
