class Morpion {
  constructor(level = EASY, { board } = {}) {
    this.board = new Board(this, board);
    this.ai = new Ai(level, this);
    this.turn = 0;
    this.winner = null;
    this.winZone = document.getElementById("win");

    this.showGraphic();
    this.addEvents();

    if (this.ai.level === HARD && board === undefined) {
      this.iaTurn();
    }
  }

  getZone = (x, y) => {
    return document.getElementById(`cell_${x}${y}`);
  };

  showGraphic = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(
          i,
          j
        ).style.backgroundImage = `url(image-morpion/${this.board.map[i][j]}.png)`;
      }
    }
  };

  addEvents = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.getZone(i, j).addEventListener("click", () => {
          this.playerTurn(i, j);
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

  showGameEndIndication = () => {
    if (this.winner === null) return;
    this.finish = true;
    this.removeEvents();
    if (this.winner === DRAW) {
      this.winZone.textContent = DrawIndication;
    } else {
      this.winZone.textContent = `${this.winner} won!`;
    }
  };

  fillCheckDisplay = (x, y, player) => {
    if (this.board.fillGrid(x, y, player) === false) {
      alert("Cell occupied");
      return;
    } else {
      console.log("filling goes on normally");
      this.turn += player === EMPTY ? -1 : 1;
      this.winner = this.board.checkWinner();
      this.showGraphic();
      this.showGameEndIndication();
      return true;
    }
  };

  playerTurn = (x, y) => {
    if (this.finish) return;
    if (this.fillCheckDisplay(x, y, YOU)) {
      this.iaTurn();
    }
  };

  iaTurn = () => {
    console.log("in aiTurn" + this.turn);
    const move = this.ai.play();
    console.log("move = " + JSON.stringify(move));
    if (move) {
      this.fillCheckDisplay(move.i, move.j, AI);
    }
  };
}

const morpion = new Morpion(HARD);
