const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const boardElement = document.getElementById("board");
const resultElement = document.getElementById("result");
const resetButton = document.querySelector(".reset-btn");

let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

function startGame() {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
    resetButton.style.display = "none"; // Hide the "Play Again" button initially
    createBoard();
}

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.addEventListener("click", () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (!board[index] && !isGameOver) {
        board[index] = currentPlayer;
        updateBoard();
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }
}

function updateBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
        if (board[index]) {
            cell.classList.add("occupied");
        }
    });
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            showResult(`${board[a]} Wins!`);
            isGameOver = true;
            return;
        }
    }

    if (board.every(cell => cell)) {
        showResult("It's a Draw!");
        isGameOver = true;
    }
}

function showResult(message) {
    resultElement.textContent = message;
    resetButton.style.display = "block"; // Show the "Play Again" button after a result
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameOver = false;
    resultElement.textContent = "";
    resetButton.style.display = "none"; // Hide the "Play Again" button again
    createBoard();
}
