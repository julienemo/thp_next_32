class Morpion {
  constructor({ level, board, turn, winner, finish, momento } = {}) {
    this.board = new Board(this, board);
    this.ai = new Ai(level, this);
    this.momento = new Momento({ momento });
    this.turn = turn || 0;
    this.winner = winner || null;
    this.finish = finish || false;
    this.view = new View(this);

    if (this.ai.level === HARD && board === undefined) {
      this.iaTurn();
    }
  }

  saveGame = () => {
    localStorage.setItem(
      GameStatusKey,
      JSON.stringify({
        board: this.board.remember(),
        winner: this.winner,
        finish: this.finish,
        turn: this.turn,
        level: this.ai.level,
        momento: {
          playerHistory: this.momento.playerHistory,
          AiHistory: this.momento.AiHistory,
          playerLastStep: this.momento.playerLastStep,
        },
      })
    );
  };

  reset = () => {
    localStorage.removeItem(GameStatusKey);
    location.reload();
  };

  changeLevel = (level) => {
    this.ai.level = level.toLowerCase();
  };

  afterMove = () => {
    this.view.showTurn(this.turn);
    this.winner = this.board.checkWinner();
    this.winner && (this.finish = true);
    this.view.showGraphic(this.board.map, this.finish, this.winner);
    this.saveGame();
  };

  undoStep = () => {
    let playerLast = this.momento.playerLastStep;
    let AiLast = this.momento.AiLastStep;
    this.board.fillGrid(playerLast[0], playerLast[1], EMPTY);
    this.board.fillGrid(AiLast[0], AiLast[1], EMPTY);
    this.turn -= 2;
    this.momento.undo();
    this.afterMove();
  };

  doStep = (x, y, player) => {
    if (this.board.fillGrid(x, y, player) === false) {
      alert("Cell occupied");
      return;
    }
    this.turn += 1;
    this.momento.addHistory(x, y, player);
    this.afterMove();
    return true;
  };

  playerTurn = (x, y) => {
    if (this.finish) return;
    this.doStep(x, y, YOU) && this.iaTurn();
  };

  iaTurn = () => {
    if (this.finish) return;

    let availabilities = this.board.getEmptyCases();
    let possibleCuttingMove = this.board.getPossibleCuttingMoves();
    const move = this.ai.play(availabilities, possibleCuttingMove);

    move && this.doStep(move.i, move.j, AI);
  };
}
