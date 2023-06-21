/* Create a Tic-Tac-Toe game grid using your HTML element of choice. 
 - When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
 - A heading should say whether it is X’s or O’s turn and change with each move made.
 - A button should be available to clear the grid and restart the game.
- When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner. */

// Variables for storing values that need to be tracked during the game

// Shortcut variable for tracking game status
let statusDisplay = document.querySelector('.game--status')

// Used to stop game if game-ending conditions are met
let gameInPlay = true

// Used to track whose turn it is
let currentPlayer = 'X'

// Used to track results of played cells
let gameState = ["", "", "", "", "", "", "", "", ""]

// Used to supply winning requirements
let winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

// Functions for displaying dynamic player messages
let declareWinner = () =>
  `Player ${currentPlayer} wins!`
let declareTie = () =>
  `Game ends in a tie!`
let whoseTurn = () =>`It's ${currentPlayer}'s turn`

statusDisplay.innerHTML = whoseTurn()

// Update game status and screen
function handleCellPlayed(clickedCell, clickedCellIndex) {
	gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Switch players and update screen
function handlePlayerChange() {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = whoseTurn();
}

function handleResultValidation() {
	//check if current player has won
	let roundWon = false;
    
	// check if values in gameStatus array (plays that have taken place) match any winningCombos
	for (let i = 0; i <= 7; i++) {
        let winCondition = winningCombos[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

	// Check for winner
	if (roundWon) {
        statusDisplay.innerHTML = declareWinner();
        gameInPlay = false;
        return;
    }

	// Check for a tie
	let roundTie = !gameState.includes("");
    if (roundTie) {
        statusDisplay.innerHTML = declareTie();
        gameInPlay = false;
        return;
    }

	// If no one has won yet, switch players
	handlePlayerChange()
}

// Check if cell has already been clicked
function handleCellClick(clickedCellEvent) {
	let clickedCell = clickedCellEvent.target

	// Grab data-cell-index value to id cell and make it a number because getAttribute returns a string

	let clickedCellIndex = parseInt(
		clickedCell.getAttribute('data-cell-index')
	  );

	// Ignore click if there's already a value in the cell or game is not being played
	if (gameState[clickedCellIndex] !== "" || !gameInPlay) {
        return;
    }

	// Proceed with game if cell is empty 
	handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

// Reset board display when game is over
function handleRestartGame() {
	gameInPlay = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = whoseTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}

// Add event listeners to cells and restart button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));

document.querySelector('.game--restart').addEventListener('click', handleRestartGame);




