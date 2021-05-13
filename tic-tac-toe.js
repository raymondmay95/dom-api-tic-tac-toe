const playerXImage =
  "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg";
const playerYImages =
  "https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg";

let currentPlayerSymbol = playerXImage;
let squareValues = Array("", "", "", "", "", "", "", "", "");
let ticTacToeGrid = document.getElementById("tic-tac-toe-board");
// new game button
let newGameButton = document.getElementById("newGame");
newGameButton.disabled = true;
newGameButton.addEventListener("click", reset);
// give up button
let giveUpButton = document.getElementById("giveUp");
giveUpButton.addEventListener("click", reset);

// game status
let gameStatus = document.getElementById("game-status");
gameStatus.innerText = "It's X's turn";

const possibleWins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6],
  [1, 4, 7],
  [2, 5, 8],
];

function clickToAddCurrentPlayerSymbolToBoard(e) {
  let curSquare = e.target.id;
  if (curSquare === "tic-tac-toe-board") return;
  if (e.target.classList.contains("playerSymbol")) return;
  let index = curSquare.split("").pop();
  let elementToRender = document.createElement("img");
  elementToRender.setAttribute("src", currentPlayerSymbol);
  elementToRender.classList = "playerSymbol";
  e.target.appendChild(elementToRender);
  currentPlayerSymbol === playerXImage
    ? (squareValues[index] = "X")
    : (squareValues[index] = "Y");

  if (currentPlayerSymbol === playerXImage) {
    currentPlayerSymbol = playerYImages;
    gameStatus.innerText = "It's Y's turn";
  } else {
    currentPlayerSymbol = playerXImage;
    gameStatus.innerText = "It's X's turn";
  }

  checkForWin(squareValues);
}

function reset() {
  currentPlayerSymbol = playerXImage;
  squareValues = Array("", "", "", "", "", "", "", "", "");
  gameStatus.innerText = "It's X's turn";
  let squares = document.querySelectorAll(".square");
  squares.forEach((DOMElement) => {
    if (DOMElement.childNodes[0])
      DOMElement.removeChild(DOMElement.childNodes[0]);
  });
}

function checkForWin(squareValues) {
  possibleWins.forEach((setOfMoves) => {
    let xMovesToWin = 3;
    let yMovesToWin = 3;
    for (let i = 0; i < setOfMoves.length; i++) {
      let cur = setOfMoves[i];
      if (squareValues[cur] === "X") xMovesToWin -= 1;
      if (squareValues[cur] === "Y") yMovesToWin -= 1;
    }
    if (xMovesToWin === 0) gameStatus.innerText = "X Wins";
    if (yMovesToWin === 0) gameStatus.innerText = "Y Wins";
  });
  if (gameStatus.innerText === "X Wins" || gameStatus.innerText === "Y Wins") {
    ticTacToeGrid.removeEventListener(
      "click",
      clickToAddCurrentPlayerSymbolToBoard
    );
    newGameButton.disabled = false;
    return;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  ticTacToeGrid.addEventListener("click", clickToAddCurrentPlayerSymbolToBoard);
});
