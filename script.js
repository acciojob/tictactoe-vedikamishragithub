const winCombo = [
  ['1','2','3'],
  ['4','5','6'],
  ['7','8','9'],
  ['1','4','7'],
  ['2','5','8'],
  ['3','6','9'],
  ['1','5','9'],
  ['3','5','7']
];

let cellStates = {
  "1": "","2": "","3": "",
  "4": "","5": "","6": "",
  "7": "","8": "","9": ""
};

let playerO = '';
let playerX = '';
let turnX = true;
let gameActive = true;

document.getElementById('submit').addEventListener('click', () => {
  const nameX = document.getElementById('player1').value.trim();
  const nameO = document.getElementById('player2').value.trim();
  if (!nameO || !nameX) {
    alert('Please enter both names');
    return;
  }
  playerX = nameX;
  playerO = nameO;
  document.getElementById('form-container').style.display = "none";
  document.getElementById('game').style.display = "block";
  startTicTacToe();
});

function startTicTacToe() {
  let cells = document.querySelectorAll('.cell');
  let statusOfPlayer = document.querySelector('.message');

  gameActive = true;
  turnX = true;

  // Reset game state
  for (let key in cellStates) {
    cellStates[key] = "";
  }

  statusOfPlayer.innerText = `${playerX}, you're up`;

  // Reset board visually
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove("disabled");
  });

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (!gameActive) return;
      if (cell.classList.contains('disabled')) return;

      // Extract the cell key so it matches cellStates
      const cellIdRaw = cell.id;
      const cellId = cellIdRaw.replace('cell', '');

      if (turnX) {
        cell.innerText = "X";
        cellStates[cellId] = 'X';
        statusOfPlayer.innerText = `${playerO}, you're up`;
      } else {
        cell.innerText = "O";
        cellStates[cellId] = 'O';
        statusOfPlayer.innerText = `${playerX}, you're up`;
      }
      turnX = !turnX;

      cell.classList.add('disabled');

      const result = checkResult();
      if (result === "X" || result === "O") {
        gameActive = false;
        const winnerName = (result === 'X' ? playerX : playerO);
        statusOfPlayer.innerText = `${winnerName} congratulations you won!`;
      } else if (result === 'draw') {
        gameActive = false;
        statusOfPlayer.innerText = `It's a draw!`;
      }
    });
  });
}


function checkResult() {
  for (const combo of winCombo) {
    const [a, b, c] = combo;
    if (
      cellStates[a] !== "" &&
      cellStates[a] === cellStates[b] &&
      cellStates[b] === cellStates[c]
    ) {
      return cellStates[a];  // "O" or "X"
    }
  }

  const allFilled = Object.values(cellStates).every(val => val !== "");
  if (allFilled) {
    return 'draw';
  }

	
  return null;
}

document.getElementById('reset').addEventListener('click', () => {
  startTicTacToe();
});
