class Cell {
  constructor(content = EMPTY) {
    this.content = content;
    this.className = null;
  }

  fillCell = (content) => {
    this.content = content;
  };

  fillGraphic = (player) => {
    this.graph = `url(image-morpion/${player}.png)`;
  };
}
