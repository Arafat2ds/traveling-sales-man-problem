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
