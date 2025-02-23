// Controller
import Store from "./store.js";
import View from "./view.js";

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  store.addEventListener("statechange", () => {
    view.render(store.game, store.stats);
  });

  window.addEventListener("storage", () => {
    console.log("state changed from another tab");
    view.render(store.game, store.stats);
  });

  // At every reload, itll render the view
  view.render(store.game, store.stats);

  view.bindGameResetEvent(() => {
    store.reset();
  });

  view.bindNewRoundEvent(() => {
    store.newRound();
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    // Updates state
    store.playerMove(+square.id);
  });
}

window.addEventListener("load", init);
