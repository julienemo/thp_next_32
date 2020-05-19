class View {
  constructor(game) {
    this.game = game;
    this.winZone = document.getElementById("win");
  }

  getZone = (x, y) => {
    return document.getElementById(`cell_${x}${y}`);
  };

  showGraphic = (map) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(
          i,
          j
        ).style.backgroundImage = `url(image-morpion/${map[i][j]}.png)`;
      }
    }
  };

  addEvents = (action) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(i, j).addEventListener("click", () => {
          action(i, j);
        });
      }
    }
  };

  removeEvents = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        var old_element = this.getZone(i, j);
        var new_element = old_element.cloneNode(true);
        old_element.parentNode.replaceChild(new_element, old_element);
      }
    }
  };

  endGame = (winner) => {
    this.removeEvents();
    if (winner === DRAW) {
      this.winZone.textContent = DrawIndication;
    } else {
      this.winZone.textContent = `${winner} won!`;
    }
  };
}
