class Ai {
  constructor(level, game) {
    this.name = AI;
    this.game = game;
    this.level = level || EASY;
  }

  minimax = (board, depth, isMaximizing) => {
    let result = this.game.board.checkWinner();
    if (result === AI) return 10 - depth;
    else if (result === YOU) return depth - 10;
    else if (result != null) return depth;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == EMPTY) {
            board[i][j] = AI;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = EMPTY;
            if (score > bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == EMPTY) {
            board[i][j] = YOU;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = EMPTY;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  };

  goRandom = (cases) => {
    let move = cases[generateRandomZeroUpTo(cases.length)];
    return {
      i: move[0],
      j: move[1],
    };
  };

  play = (emptyCases, possibleCuttingMoves) => {
    let move;

    if (this.level === EASY) {
      return this.goRandom(emptyCases);
    }

    if (this.level === MEDIUM) {
      if (possibleCuttingMoves.length > 0) {
        return this.goRandom(possibleCuttingMoves);
      } else {
        return this.goRandom(emptyCases);
      }
    }

    if (this.level === HARD) {
      if (this.game.board.map[1][1] === EMPTY) {
        move = { i: 1, j: 1 };
      } else {
        let depth = 0;
        let bestScore = -Infinity;
        emptyCases.forEach((emptyCase) => {
          this.game.board.map[emptyCase[0]][emptyCase[1]] = AI;
          let score = this.minimax(this.game.board.map, depth + 1, false);
          this.game.board.map[emptyCase[0]][emptyCase[1]] = EMPTY;
          if (score > bestScore) {
            bestScore = score;
            move = { i: emptyCase[0], j: emptyCase[1] };
          }
        });
      }
      return move;
    }
  };
}
