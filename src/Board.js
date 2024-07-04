import React from 'react';
import Square from './Square';
import './Board.css';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function Board({ currentPlayer, setCurrentPlayer, handleWin, winner, squares, setSquares }) {
  const checkWinner = (squares) => {
    for (let [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;
    setSquares(newSquares);

    const newWinner = checkWinner(newSquares);
    if (newWinner) {
      handleWin(newWinner);
    } else if (!newSquares.includes(null)) {
      handleWin('tie');  // Use 'tie' as a special indicator for a tie
    } else {
      setCurrentPlayer(currentPlayer === 'blue' ? 'red' : 'blue');
    }
  };

  return (
    <div className="board">
      {squares.map((square, index) => (
        <Square key={index} value={square} onClick={() => handleClick(index)} />
      ))}
    </div>
  );
}

export default Board;
