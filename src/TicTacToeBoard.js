import React from "react"; // Importing React to use useState, useEffect and useRef hook
import "./css/tic-tac-toe-board.css"; // Importing the CSS File

export default function TicTacToeBoard({ restartGame, setRestartGame, winner, setWinner }){
	const [playerTurn, setPlayerTurn] = React.useState(0); // PlayerTurn state to identify who's turn is it
	const [marked, setMarked] = React.useState(['', '', '', '', '', '', '', '', '']); // It stores the value in the box clicked
	const boardRef = React.useRef(null); // Creating a reference to the board

	const mark = (event, index) => {// Function to mark 'X' or 'O' on the board
		// Mark if place is not occupied and the game is not over
		if (marked[index - 1] === '' && winner === '') {
			const current = playerTurn === 0 ? "X" : "O"; // Mark 'X' or 'O' depending upon player's turn
			marked[index - 1] = current; // Updating the marked state
			event.target.innerText = current; // Mark by placing character 'X' or 'O' on the board
			setPlayerTurn(playerTurn === 0 ? 1 : 0); // Change player turn
		}
	}

	// UseEffect hook to restart game after a winner or a tie or restart game button is clicked
	React.useEffect(() => {
		setMarked(['', '', '', '', '', '', '', '', '']); // clear marked state
		const cells = boardRef.current.children; // Get all boards cells through useRef
		// Clear the board by removing the text 'X' and 'O'
		for (let i = 0; i < 9; i++) {
			cells[i].innerText = '';
		}
		setPlayerTurn(0); // Reset the turn to player one
		setWinner(''); // Clear winner data
		setRestartGame(false); // Set restart game as false so that board is not cleared on every render
	}, [restartGame, setRestartGame, setWinner])

	// useEffect hook to track if the winner is found
	React.useEffect(() => {
		// Check if all the boxes in a row are occupied by the same character (either 'X' or 'O')
		const checkRow = () => {
			let ans = false;
			for (let i = 0; i < 9; i += 3) {
				ans = ans || (marked[i] === marked[i + 1] && marked[i] === marked[i + 2] && marked[i] !== '');
			}
			return ans;
		}

		// Check if all the boxes in a column are occupied by the same character (either 'X' or 'O')
		const checkCol = () => {
			let ans = false;
			for (let i = 0; i < 3; i++) {
				ans = ans || (marked[i] === marked[i + 3] && marked[i] === marked[i + 6] && marked[i] !== '');
			}
			return ans;
		}

		// Check if all the boxes in a left or right diagnol are occupied by the same character (either 'X' or 'O')
		const checkDiagonal = () => {
			return (
                (marked[0] === marked[4] && marked[0] === marked[8] && marked[0] !== '') ||
			    (marked[2] === marked[4] && marked[2] === marked[6] && marked[2] !== '')
            );
		}

		// Call above checks to find if the match is over
		const checkWin = () => {
			return (checkRow() || checkCol() || checkDiagonal());
		}

		// Check if none of the boxes in a row/column/diagonal are occupied by the same character (either 'X' or 'O')
		const checkTie = () => {
			let count = 0;
			marked.forEach((cell) => {
				if (cell !== '') {
					count++;
				}
			})
			return count === 9;
		}

		// Set the winner based on the player turn if checkWin returns true
		if (checkWin()) {
			setWinner(playerTurn === 0 ? "Player 2 is the Winner!" : "Player 1 is the Winner!");
		} else if (checkTie()) {
			// Set the winner state to tie if no winners are found
			setWinner("It's a Tie!");
		}

	})

	return (
        <>
			{/* Align 3 boxes in each row */}
            <div ref={boardRef} className="board">
                <div className="tic-box tic-box-1" onClick={(e) => mark(e, 1)}></div>
                <div className="tic-box tic-box-2" onClick={(e) => mark(e, 2)}></div>
                <div className="tic-box tic-box-3" onClick={(e) => mark(e, 3)}></div>
                <div className="tic-box tic-box-4" onClick={(e) => mark(e, 4)}></div>
                <div className="tic-box tic-box-5" onClick={(e) => mark(e, 5)}></div>
                <div className="tic-box tic-box-6" onClick={(e) => mark(e, 6)}></div>
                <div className="tic-box tic-box-7" onClick={(e) => mark(e, 7)}></div>
                <div className="tic-box tic-box-8" onClick={(e) => mark(e, 8)}></div>
                <div className="tic-box tic-box-9" onClick={(e) => mark(e, 9)}></div>
            </div>
			{/* Player 1 and Player 2 information of 'X' and 'O' assignment */}
			<div className="player-details">
				<div className={`player${playerTurn === 0 ? ' chance' : ''}`}>Player 1: X</div>
				<div className={`player${playerTurn === 1 ? ' chance' : ''}`}>Player 2: O</div>
			</div>
        </>
	)
}
