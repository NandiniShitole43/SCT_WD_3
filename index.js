let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const index = cell.getAttribute("data-index");
        if (board[index] === "" && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWin();
            switchPlayer();
        }
    });
});

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            statusText.textContent = `Player ${board[a]} wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes("")) {
        statusText.textContent = "It is a draw!";
        gameActive = false;
    }
}

function resetGame() {
    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    
    cells.forEach(cell => {
        cell.textContent = "";
    });
}