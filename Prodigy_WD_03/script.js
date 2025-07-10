const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');

let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
let currentPlayer = 'X'; // X = player, O = AI

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== '' || !isGameActive || currentPlayer !== 'X') return;

  makeMove(index, 'X');

  if (checkGameEnd()) return;

  currentPlayer = 'O';
  statusText.textContent = "AI's turn...";
  
  // Delay for AI move
  setTimeout(() => {
    aiMove();
    if (!checkGameEnd()) {
      currentPlayer = 'X';
      statusText.textContent = "Your turn (X)";
    }
  }, 500);
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function aiMove() {
  const emptyIndexes = board
    .map((val, idx) => (val === '' ? idx : null))
    .filter(v => v !== null);

  if (emptyIndexes.length === 0) return;

  const randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  makeMove(randomIndex, 'O');
}

function checkWin(player) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

function checkGameEnd() {
  if (checkWin('X')) {
    statusText.textContent = "You win! 🎉";
    isGameActive = false;
    return true;
  }
  if (checkWin('O')) {
    statusText.textContent = "AI wins! 🤖";
    isGameActive = false;
    return true;
  }
  if (board.every(cell => cell !== '')) {
    statusText.textContent = "It's a draw! 😐";
    isGameActive = false;
    return true;
  }
  return false;
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  statusText.textContent = "Your turn (X)";
  cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);
