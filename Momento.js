class Momento {
  constructor({ AiHistory, playerHistory, playerLastStep }) {
    this.AiHistory = AiHistory || [];
    this.playerHistory = playerHistory || [];
    this.playerLastStep = playerLastStep || null;
    this.playerLastStep = null;
  }

  addHistory = (x, y, player) => {
    if (player === YOU) {
      this.playerHistory.push([x, y]);
    }
    if (player === AI) {
      this.AiHistory.push([x, y]);
    }
    this.updateLast();
  };

  undo = () => {
    this.playerHistory.pop();
    this.AiHistory.pop();
    this.updateLast();
  };

  updateLast = () => {
    let playerHistoryLength = this.playerHistory.length;
    this.playerLastStep = this.playerHistory[playerHistoryLength - 1];
    let AiHistoryLength = this.AiHistory.length;
    this.AiLastStep = this.AiHistory[AiHistoryLength - 1];
  };
}
