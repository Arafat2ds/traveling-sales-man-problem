class Salesperson {
  constructor() {
    this.route = pointsOnCanvas;
  }

  get getRoute() {
    return this.route;
  }

  set setRoute(route) {
    this.route = route;
  }

  // create a randomized route using Durstenfeld shuffle algorithm w/ same starting point
  // essentially shuffling all elements except first element
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
      strokeWeight(1);
      stroke(color);
      line(p1.posX, p1.posY, p2.posX, p2.posY);
    }
  }
}
