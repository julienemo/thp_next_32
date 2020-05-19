let appHistory = localStorage.getItem(GameStatusKey);
if (appHistory) {
  const retrievePreviousGame = window.prompt(
    "Previous game detected. Do you want to restore?",
    "Yes"
  );

  if (retrievePreviousGame) {
    previousGame = JSON.parse(appHistory);
    board = previousGame.board;
    winner = previousGame.winner;
    turn = previousGame.turn;
    finish = previousGame.finish;
    level = previousGame.level;
    var morpion = new Morpion(level, { board, winner, turn, finish });
  }
} else {
  var morpion = new Morpion(HARD);
}
