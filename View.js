class View {
  constructor(game, winner, finish, undoAction, redoAction) {
    this.winZone = document.getElementById("win");
    this.showGraphic(game.board.map, finish, winner);
    this.addEvents(game.playerTurn);
    this.addResetBtn("resetBtn", game.reset);
    this.addUndoRedo(undoAction, redoAction);
  }

  getZone = (x, y) => {
    return document.getElementById(`cell_${x}${y}`);
  };

  addResetBtn = (id, action) => {
    document.getElementById(id).addEventListener("click", action);
  };

  addUndoRedo = (undoAction, redoAction) => {
    document.getElementById("undo_redo_zone").innerHTML = `
      <button id="undoBtn" type="button" class="btn" >Undo</button>
      <button id="redoBtn" type="button" class="btn" >Redo</button>
    `;
    document.getElementById("undoBtn").addEventListener("click", undoAction);
    document.getElementById("redoBtn").addEventListener("click", redoAction);
  };

  showGraphic = (map, finish, winner) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(
          i,
          j
        ).style.backgroundImage = `url(image-morpion/${map[i][j]}.png)`;
      }
    }
    finish && this.endGame(winner);
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
