const boxEvent = document.querySelectorAll("[box-event]");
const tabuleiro = document.querySelector("[box-tabuleiro]");
const winText = document.querySelector("[win-text]");
const winBox = document.querySelector("[win-box]");
const regame = document.querySelector("[re-game]");
const jogador1 = document.querySelector("[choose-box-one]");
const registro1 = document.querySelector("[register1]");
const nameX = document.querySelector("[value1]");
const jogador2 = document.querySelector("[choose-box-two]");
const registro2 = document.querySelector("[register2]");
const nameY = document.querySelector("[value2]");
const subName = document.querySelector("[text-play]");

let circle;

let players = [];

const vitoria = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const regisPlayer1 = () => {
  registro1.addEventListener("click", () => {
    registrarPrimeiro = nameX.value;
    players.push(registrarPrimeiro);
    console.log(players);
    jogador1.classList.remove("mostrar-escolha1");
    jogador2.classList.add("mostrar-escolha2");
  });
};

const regisPlayer2 = () => {
  registro2.addEventListener("click", () => {
    registrarSegundo = nameY.value;
    players.push(registrarSegundo);
    console.log(players);
    jogador2.classList.remove("mostrar-escolha2");
    subName.innerText = `Vez de ${nameX.value}`;
  });
};

const Start = () => {
  circle = false;
  for (const box of boxEvent) {
    box.classList.remove("o");
    box.classList.remove("x");
    box.removeEventListener("click", boxClick);
    box.addEventListener("click", boxClick, { once: true });
  }

  tabuleiroHover();
  winBox.classList.remove("mostrar-vencedor");
};

const playAgain = () => {
  circle = false;

  for (const box of boxEvent) {
    box.classList.remove("o");
    box.classList.remove("x");
    box.removeEventListener("click", boxClick);
    box.addEventListener("click", boxClick, { once: true });
  }

  tabuleiroHover();
};

const endGame = (draw) => {
  if (draw) {
    winText.innerText = "Empate";
  } else {
    winText.innerText = circle
      ? `${nameY.value} Ganhou`
      : `${nameX.value} Ganhou`;
  }

  tabuleiroHover();
  winBox.classList.add("mostrar-vencedor");
};

const checkWin = (currentPlayer) => {
  return vitoria.some((combination) => {
    return combination.every((index) => {
      return boxEvent[index].classList.contains(currentPlayer);
    });
  });
};

const verificarEmpate = () => {
  return [...boxEvent].every((box) => {
    return box.classList.contains("x") || box.classList.contains("o");
  });
};

const placeMark = (box, turn) => {
  box.classList.add(turn);
};

const tabuleiroHover = () => {
  tabuleiro.classList.remove("o");
  tabuleiro.classList.remove("x");

  if (circle) {
    tabuleiro.classList.add("o");
    subName.innerText = `Vez de ${nameY.value}`;
  } else {
    tabuleiro.classList.add("x");
    subName.innerText = `Vez de ${nameX.value}`;
  }
};

const changeTurn = () => {
  circle = !circle;
  tabuleiroHover();
};

const boxClick = (e) => {
  const box = e.target;
  const turn = circle ? "o" : "x";

  placeMark(box, turn);

  const isDraw = verificarEmpate();

  const isWin = checkWin(turn);
  if (isWin) {
    endGame(false);
  } else if (isDraw) {
    endGame(true);
  }

  if (isDraw) {
    endGame(true);
  }

  changeTurn();
};

Start();
regisPlayer1();
regisPlayer2();
jogador1.classList.add("mostrar-escolha1");
regame.addEventListener("click", Start);
