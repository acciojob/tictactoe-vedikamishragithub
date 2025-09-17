// Winning combinations
const winCombos = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["1","4","7"],
  ["2","5","8"],
  ["3","6","9"],
  ["1","5","9"],
  ["3","5","7"]
];

// State variables
let player1 = "";
let player2 = "";
let currentPlayer = ""; // will be "X" or "O"
let currentPlayerName = "";
let gameActive = false;
let boardState = {
  "1":"", "2":"", "3":"",
  "4":"", "5":"", "6":"",
  "7":"", "8":"", "9":""
};

// DOM elements
const nameInputDiv = document.getElementById("name-inputs");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const submitBtn = document.getElementById("submit");
const gameDiv = document.getElementById("game");
const messageDiv = document.getElementById("message");
const boardDiv = document.getElementById("board");
const cells = Array.from(document.querySelectorAll(".cell"));

// Start game after names entered
submitBtn.addEventListener("click", function() {
  const name1 = player1Input.value.trim();
  const name2 = player2Input.value.trim();
  if (name1 === "" || name2 === "") {
    alert("Please enter both names");
    return;
  }
  player1 = name1;
  player2 = name2;

  // Hide name input, show game
  nameInputDiv.classList.add("hidden");
  gameDiv.classList.remove("hidden");

  // Initialize game
  currentPlayer = "x";
  currentPlayerName = player1;
  gameActive = true;
  messageDiv.textContent = `${currentPlayerName}, you're up`;

  // Clear board
  for (let key in boardState) {
    boardState[key] = "";
  }
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("disabled");
    cell.addEventListener("click", handleCellClick);
  });
});

// Handler when a cell is clicked
function handleCellClick(e) {
  const cell = e.target;
  const cellId = cell.id;
  if (!gameActive) return;
  if (boardState[cellId] !== "") return;  // already filled

  // Set mark
  boardState[cellId] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("disabled");

  // Check for win or draw
  const result = checkResult();
  if (result === "win") {
    gameActive = false;
    const winnerName = currentPlayer === "x" ? player1 : player2;
    messageDiv.textContent = `${winnerName} congratulations you won!`;
  } else if (result === "draw") {
    gameActive = false;
    messageDiv.textContent = `It's a draw`;
  } else {
    // Switch player
    if (currentPlayer === "x") {
      currentPlayer = "o";
      currentPlayerName = player2;
    } else {
      currentPlayer = "x";
      currentPlayerName = player1;
    }
    messageDiv.textContent = `${currentPlayerName}, you're up`;
  }
}

// Function to check for win or draw
function checkResult() {
  for (const combo of winCombos) {
    const [a,b,c] = combo;
    if (
      boardState[a] !== "" &&
      boardState[a] === boardState[b] &&
      boardState[b] === boardState[c]
    ) {
      return "win";
    }
  }
  const allFilled = Object.values(boardState).every(val => val !== "");
  if (allFilled) {
    return "draw";
  }
  return null;
}

