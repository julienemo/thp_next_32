class View {
  constructor(game) {
    this.game = game;
    this.winZone = document.getElementById("win");
    this.showGraphic(game.turn);
    this.addResetBtn("resetBtn", game.reset);
    this.addUndoRedo(game.undoStep, game.redoStep);
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

  addUndoRedo = (undoAction, redoAction) => {
    document.getElementById("undo_zone").innerHTML = `
      <button id="undoBtn" type="button" class="btn" >Undo</button>
      <button id="redoBtn" type="button" class="btn" >Redo</button>

    `;
    document.getElementById("undoBtn").addEventListener("click", undoAction);
    document.getElementById("redoBtn").addEventListener("click", redoAction);
  };

  showGraphic = (currentStep) => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(
          i,
          j
        ).style.backgroundImage = `url(image-morpion/Empty.png)`;
      }
    }
    if (this.game.momento.history.length > 0) {
      let shown = this.game.momento.history.slice(0, currentStep);
      let shownLength = shown.length;
      let lastSnapShot = shown[shownLength - 1] || {
        finish: false,
        winner: null,
      };
      for (let n = 0; n < shownLength; n += 1) {
        this.getZone(
          shown[n].x,
          shown[n].y
        ).style.backgroundImage = `url(image-morpion/${shown[n].player}.png)`;
      }
      this.endGame(lastSnapShot.winner);
    }
    this.addEvents(this.game.playerTurn);
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
    if (winner !== null) {
      document.getElementById("undo_zone").style.display = "none";
    }
    if (winner === null) {
      this.winZone.textContent = "";
    } else if (winner === DRAW) {
      this.winZone.textContent = DrawIndication;
    } else {
      this.winZone.textContent = `${winner} won!`;
    }
  };
}
