class View {
  constructor(game) {
    this.game = game;
    this.winZone = document.getElementById("win");
    this.showGraphic(game.board.map, game.finish, game.winner);
    this.addEvents(game.playerTurn);
    this.addResetBtn("resetBtn", game.reset);
    this.addUndo(game.undoStep);
    this.showLevel(game.ai.level);
    this.showTurn(game.turn);
    this.addLevelBtns();
  }

  showLevel = (level) => {
    document.getElementById("level_zone").innerHTML = level;
  };

  showTurn = (turn) => {
    document.getElementById("turn_zone").innerHTML = turn;
  };

  addLevelBtns = () => {
    document.getElementById("level_btn_zone").innerHTML = `
      <button type="button" class="btn levelBtn" >Easy</button>
      <button type="button" class="btn levelBtn" >Medium</button>
      <button type="button" class="btn levelBtn" >Hard</button>
    `;

    document.querySelectorAll(".levelBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let level = e.target.innerText;
        this.game.changeLevel(level);
        this.showLevel(level);
      });
    });
  };
  getZone = (x, y) => {
    return document.getElementById(`cell_${x}${y}`);
  };

  addResetBtn = (id, action) => {
    document.getElementById(id).addEventListener("click", action);
  };

  addUndo = (undoAction) => {
    document.getElementById("undo_zone").innerHTML = `
      <button id="undoBtn" type="button" class="btn" >Undo</button>
    `;
    document.getElementById("undoBtn").addEventListener("click", undoAction);
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
    document.getElementById("undo_zone").style.display = "none";
    if (winner === DRAW) {
      this.winZone.textContent = DrawIndication;
    } else {
      this.winZone.textContent = `${winner} won!`;
    }
  };
}
