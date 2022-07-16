import React from 'react'; // Importing React to use useState hook
import TicTacToeBoard from './TicTacToeBoard'; // Importing the required components
import "./css/tic-tac-toe-board-container.css"; // Importing the CSS File

export default function TicTacToeBoardContainer() {
	// Restart state to track whether the game should be restart or not after a tie, win or button press
	const [restartGame, setRestartGame] = React.useState(false);
	// Winner state to store who won
	const [winner, setWinner] = React.useState('');
	
	return (
		<div className="tic-tac-toe">
			{/* tic-tac-toe heading */}
			<h1>Tic-Tac-Toe</h1>
			{/* tic-tac-toe board */}
			<TicTacToeBoard restartGame={restartGame} setRestartGame={setRestartGame} winner={winner} setWinner={setWinner} />
			{/* Show the winner */}
			<div className='winner'>{winner}</div>
			{/* Button used to restart the game*/}
			<button className='restart-game' onClick={()=>setRestartGame(true)}>
				Restart Game
			</button>
		</div>
	);
}
