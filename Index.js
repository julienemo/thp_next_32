let appHistory = localStorage.getItem(GameStatusKey);

const createNewGame = () => {
  const level = window
    .prompt("Type desired level: (Easy/Medium/Hard)", "Easy")
    .toLowerCase();
  new Morpion({ level });
};
if (appHistory) {
  const retrievePreviousGame = window.prompt(
    "Previous game detected. Do you want to restore?",
    "Yes"
  );

  if (retrievePreviousGame.toLowerCase() === "yes") {
    previousGame = JSON.parse(appHistory);
    winner = previousGame.winner;
    turn = previousGame.turn;
    finish = previousGame.finish;
    level = previousGame.level;
    momento = previousGame.momento;
    new Morpion({ ...previousGame });
  } else {
    createNewGame();
  }
} else {
  createNewGame();
}
