class Morpion {
  constructor(level = EASY, { board } = {}) {
    this.board = new Board(this, board);
    this.level = level;

    this.turn = 0;
    this.winner = null;
    this.winZone = document.getElementById("win");

    this.showGraphic();
    this.addEvents();

    if (this.level === HARD && board === undefined) {
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

  minimax = (board, depth, isMaximizing) => {
    let result = this.board.checkWinner();
    if (result == AI) return 10 - depth;
    else if (result === YOU) return depth - 10;
    else if (result != null) return depth;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] == EMPTY) {
            board[i][j] = AI;
            this.turn++;
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = EMPTY;
            this.turn--;
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
            this.turn++;
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = EMPTY;
            this.turn--;
            if (score < bestScore) {
              bestScore = score;
            }
          }
        }
      }
      return bestScore;
    }
  };

  iaTurn = () => {
    console.log("in aiTurn" + this.turn);
    if (this.finish) return;

    let move;
    let emptyCases = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board.map[i][j] === EMPTY) {
          emptyCases.push({ x: i, y: j });
        }
      }
    }

    const goRandom = () => {
      let position = generateRandomZeroUpTo(emptyCases.length);
      let randomMove = emptyCases[position];
      console.log(randomMove);
      return {
        i: randomMove.x,
        j: randomMove.y,
      };
    };

    if (this.level === EASY) {
      console.log("ai in easy");
      move = goRandom();
    }

    if (this.level === MEDIUM) {
      let possibleCuttingMoves = [];
      for (let i = 0; i < 3; i++) {
        if (this.board.checkTwo([i, 0], [i, 1], [i, 2])) {
          possibleCuttingMoves.push(
            this.board.checkTwo([i, 0], [i, 1], [i, 2])
          );
        }
        if (this.board.checkTwo([0, i], [1, i], [2, i])) {
          possibleCuttingMoves.push(
            this.board.checkTwo([0, i], [1, i], [2, i])
          );
        }
      }
      if (this.board.checkTwo([0, 0], [1, 1], [2, 2])) {
        possibleCuttingMoves.push(this.board.checkTwo([0, 0], [1, 1], [2, 2]));
      }
      if (this.board.checkTwo([2, 0], [1, 1], [0, 2])) {
        possibleCuttingMoves.push(this.board.checkTwo([2, 0], [1, 1], [0, 2]));
      }
      if (possibleCuttingMoves.length > 0) {
        let randomPosition = generateRandomZeroUpTo(
          possibleCuttingMoves.length
        );
        let randomMove = possibleCuttingMoves[randomPosition];
        move = {
          i: randomMove[0],
          j: randomMove[1],
        };
      } else {
        move = goRandom();
      }
    }
    if (this.level === HARD) {
      if (this.board.map[1][1] === EMPTY) {
        move = { i: 1, j: 1 };
      } else {
        let depth = 0;
        let bestScore = -Infinity;
        emptyCases.forEach((emptyCase) => {
          this.board.map[emptyCase.x][emptyCase.y] = AI;
          this.turn++;
          let score = this.minimax(this.board.map, depth + 1, false);
          this.board.map[emptyCase.x][emptyCase.y] = EMPTY;
          this.turn--;
          if (score > bestScore) {
            bestScore = score;
            move = { i: emptyCase.x, j: emptyCase.y };
          }
        });
      }
    }

    this.fillCheckDisplay(move.i, move.j, AI);
  };
}

const morpion = new Morpion(MEDIUM);
