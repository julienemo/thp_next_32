class Board {
  constructor(game, board = BOARD) {
    this.game = game;
    this.map = [];
    for (let i = 0; i < 3; i++) {
      this.map[i] = [];
      for (let j = 0; j < 3; j++) {
        this.map[i][j] = board[i][j];
      }
    }
  }

  fillGrid = (x, y, content) => {
    console.log(x);
    console.log(this.map[x]);
    console.log(
      `cell ${x} ${y} clicked, current value ${this.map[x][y]} vs ${content}`
    );
    if (this.map[x][y] !== EMPTY && content !== EMPTY) {
      return false;
    } else {
      this.map[x][y] = content;
      return true;
    }
  };

  winningLine(a, b, c) {
    return a == b && b == c && a != EMPTY;
  }

  checkTwo = (a, b, c) => {
    console.log(
      `a${this.map[a[0]][a[1]]} b${this.map[b[0]][b[1]]} c${
        this.map[c[0]][c[1]]
      }`
    );
    let case1 =
      this.map[a[0]][a[1]] === this.map[b[0]][b[1]] &&
      this.map[b[0]][b[1]] === YOU &&
      this.map[c[0]][c[1]] === EMPTY;
    let case2 =
      this.map[b[0]][b[1]] === this.map[c[0]][c[1]] &&
      this.map[c[0]][c[1]] === YOU &&
      this.map[a[0]][a[1]] === EMPTY;
    if (case1) {
      console.log("tail");
      return c;
    }
    if (case2) {
      console.log("head");
      return a;
    } else {
      console.log("nothing");
      return null;
    }
  };

  checkWinner() {
    let winner = null;
    for (let i = 0; i < 3; i++) {
      if (this.winningLine(this.map[i][0], this.map[i][1], this.map[i][2])) {
        winner = this.map[i][0];
      }
      if (this.winningLine(this.map[0][i], this.map[1][i], this.map[2][i])) {
        winner = this.map[0][i];
      }
    }
    if (this.winningLine(this.map[0][0], this.map[1][1], this.map[2][2])) {
      winner = this.map[0][0];
    }
    if (this.winningLine(this.map[2][0], this.map[1][1], this.map[0][2])) {
      winner = this.map[2][0];
    }
    if (winner === null && this.game.turn === 9) {
      return DRAW;
    } else {
      return winner;
    }
  }
}
