export default class Fruit {
  
  constructor(x, y, fruit) {
    this.x = x;
    this.y = y;
    this.fruit = fruit;
  }

  print() {
    let index = convertTo1d(this.x, this.y);
    document.querySelectorAll(".cell")[index].innerText = this.fruit;
  }

  remove() {
    let index = convertTo1d(this.x, this.y);
    document.querySelectorAll(".cell")[index].innerText = "";
  }
}

function convertTo1d(x, y) {
  let index = (y * 4) + x;
  return index;
}