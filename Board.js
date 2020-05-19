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

  remember = () => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      list[i] = [];
      for (let j = 0; j < 3; j++) {
        list[i][j] = this.map[i][j];
      }
    }
    return list;
  };
  getEmptyCases = () => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.game.board.map[i][j] === EMPTY) {
          list.push([i, j]);
        }
      }
    }
    return list;
  };

  fillGrid = (x, y, content) => {
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
    let case1 =
      this.map[a[0]][a[1]] === this.map[b[0]][b[1]] &&
      this.map[b[0]][b[1]] === YOU &&
      this.map[c[0]][c[1]] === EMPTY;
    let case2 =
      this.map[b[0]][b[1]] === this.map[c[0]][c[1]] &&
      this.map[c[0]][c[1]] === YOU &&
      this.map[a[0]][a[1]] === EMPTY;
    if (case1) {
      return c;
    }
    if (case2) {
      return a;
    } else {
      return null;
    }
  };

  getPossibleCuttingMoves = () => {
    let list = [];
    for (let i = 0; i < 3; i++) {
      if (this.checkTwo([i, 0], [i, 1], [i, 2])) {
        list.push(this.checkTwo([i, 0], [i, 1], [i, 2]));
      }
      if (this.checkTwo([0, i], [1, i], [2, i])) {
        list.push(this.checkTwo([0, i], [1, i], [2, i]));
      }
    }
    if (this.checkTwo([0, 0], [1, 1], [2, 2])) {
      list.push(this.checkTwo([0, 0], [1, 1], [2, 2]));
    }
    if (this.checkTwo([2, 0], [1, 1], [0, 2])) {
      list.push(this.checkTwo([2, 0], [1, 1], [0, 2]));
    }
    return list;
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
