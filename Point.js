/*
- Point class (represents the cities)
- each point has an index number (allows pinpointing of starting/ending point and route traveled)
- position (x,y)
*/

class Point {
  constructor(index, posX, posY) {
    this.index = index;
    this.posX = posX;
    this.posY = posY;
  }

  get getIndex() {
    return this.index;
  }

  get getPosX() {
    return this.posX;
  }

  get getPosY() {
    return this.posY;
  }

  display() {
    point(this.posX, this.posY);
  }
}
