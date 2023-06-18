/* Create a Tic-Tac-Toe game grid using your HTML element of choice. 
 - When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
 - A heading should say whether it is X’s or O’s turn and change with each move made.
 - A button should be available to clear the grid and restart the game.
- When a player has won, or the board is full and the game results in a draw, a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner. */

/* function displayValue(e) {
    alert(`value: ${e.target.textContent}`)
    alert(`position: ${e.target.getAttribute("data-index")}`);
  } */

let playerX = 'x'
let playerO = 'o'
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

let cellNumbers = document.querySelectorAll('[data-cell]')
let gameBoard = document.querySelector('#ttt-container')
let gameResult = document.querySelector('#ttt-result')
let gameRestartBtn = document.querySelector('#gameRestartBtn')
let resultMessage = document.querySelector('resultText')
let isPlayerO = false

playGame()

gameRestartBtn.addEventListener('click', playGame)

function playGame() {
	isPlayerO = false
	cellNumbers.forEach(cell => {
		cell.classList.remove(playerX)
		cell.classList.remove(playerO)
		cell.removeEventListener('click', playerTurn)
		cell.addEventListener('click', playerTurn, { once: true })
	})
	
  setBoardHoverClass()
	resultMessage.classList.remove('show')
}

function playerTurn(e) {
	let cell = e.target
	let currentPlayer = isPlayerO ? playerO : playerX
	showXO(cell, currentPlayer)
	if (isWin(currentPlayer)) {
		gameEnd(false)
	} else if (isTie()) {
		gameEnd(true)
	} else {
		togglePlayer()
		setBoardHoverClass()
	}
}

function gameEnd (draw) {
  if (draw) {
    resultMessage.innerHTML = 'It is a tie!'
  } else {
    resultMessage.innerHTML = `${isPlayerO ? 'Xs win!' : 'Os win!'}`
  } 
  gameResult.classList.add('show')
}

function isTie() {
	return [...cellNumbers].every(cell => {
		return cell.classList.contains(playerX) || cell.classList.contains(playerO)
	})
}

function showXO(cell, currentPlayer) {
	cell.classList.add(currentPlayer)
}

function togglePlayer() {
	isPlayerO = !isPlayerO
}

function setBoardHoverClass() {
	gameBoard.classList.remove(playerX)
	gameBoard.classList.remove(playerO)
	if (isPlayerO) {
		gameBoard.classList.add(playerO)
	} else {
		gameBoard.classList.add(playerX)
	}
}

function isWin(currentPlayer) {
	return winningCombos.some(combo => {
		return combo.every(index => {
			return cellNumbers[index].classList.contains(currentPlayer)
		})
	})
}