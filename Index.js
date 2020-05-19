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
    momento = previousGame.momento;
    var morpion = new Morpion({ ...previousGame });
  }
} else {
  const level = window
    .prompt("Type desired level: (Easy/Medium/Hard)", "Easy")
    .toLowerCase();
  var morpion = new Morpion({ level });
}
