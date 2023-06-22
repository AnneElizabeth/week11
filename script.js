// Variables for storing values that need to be tracked during the game

// Shortcut variable for tracking game status
let gameUpdates = document.querySelector('.gameStatus')

// Used to stop game if game-ending conditions are met
let gameInPlay = true

// Used to track whose turn it is
let currentPlayer = 'X'

// Used to track results of played cells
let playerMoves = ["", "", "", "", "", "", "", "", ""]

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

gameUpdates.innerHTML = whoseTurn()

// Update game status and screen
function trackCellClicks(clickedCell, cellIndexClicked) {
	playerMoves[cellIndexClicked] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

// Switch players and update screen
function changePlayers() {
	currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameUpdates.innerHTML = whoseTurn();
}

function checkResults() {
	// Check if current player has won
	let winningRound = false;
    
	// Check if values in gameStatus array (plays that have taken place) match any values in winningCombos array
	for (let i = 0; i <= 7; i++) {
        let isGameWinner = winningCombos[i];
        let a = playerMoves[isGameWinner[0]];
        let b = playerMoves[isGameWinner[1]];
        let c = playerMoves[isGameWinner[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            winningRound = true;
            break
        }
    }

	// Check for winner
	if (winningRound) {
        gameUpdates.innerHTML = declareWinner();
        gameInPlay = false;
        return;
    }

	// Check for a tie
	let tiedRound = !playerMoves.includes("");
    if (tiedRound) {
        gameUpdates.innerHTML = declareTie();
        gameInPlay = false;
        return;
    }

	// If no one has won yet, switch players
	changePlayers()
}

// Check if cell has already been clicked
function cellClickCheck(cellClickEvent) {
	let clickedCell = cellClickEvent.target

	// Grab data-cell-index value to id cell and make it a number because getAttribute returns a string

	let cellIndexClicked = parseInt(
		clickedCell.getAttribute('data-cell-index')
	  );

	// Ignore click if there's already a value in the cell or game is not being played
	if (playerMoves[cellIndexClicked] !== "" || !gameInPlay) {
        return;
    }

	// Proceed with game if cell is empty 
	trackCellClicks(clickedCell, cellIndexClicked);
    checkResults();
}

// Reset board display when game is over
function newGame() {
	gameInPlay = true;
    currentPlayer = "X";
    playerMoves = ["", "", "", "", "", "", "", "", ""];
    gameUpdates.innerHTML = whoseTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "")
}

// Add event listeners to cells and restart button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClickCheck));

document.querySelector('.newGame').addEventListener('click', newGame);




