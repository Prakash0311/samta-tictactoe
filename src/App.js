import React, { useState, useEffect } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [scores, setScores] = useState({ blue: 0, red: 0 });
  const [currentPlayer, setCurrentPlayer] = useState('blue');
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));

  useEffect(() => {
    const savedScores = localStorage.getItem('scores');
    if (savedScores) {
      setScores(JSON.parse(savedScores));
    }
  }, []);

  useEffect(() => {
    if (scores.blue !== 0 || scores.red !== 0) {
      localStorage.setItem('scores', JSON.stringify(scores));
    }
  }, [scores]);

  const handleWin = (winner) => {
    setWinner(winner);
    setScores((prevScores) => ({
      ...prevScores,
      [winner]: prevScores[winner] + 1,
    }));
  };

  const resetGame = () => {
    setWinner(null);
    setCurrentPlayer('blue');
    setSquares(Array(9).fill(null));
  };

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <div className="scores">
        <div className="score blue">Blue: {scores.blue}</div>
        <div className="score red">Red: {scores.red}</div>
      </div>
      <Board 
        currentPlayer={currentPlayer} 
        setCurrentPlayer={setCurrentPlayer} 
        handleWin={handleWin} 
        winner={winner} 
        squares={squares}
        setSquares={setSquares}
      />
      {winner && <button onClick={resetGame}>New Game</button>}
    </div>
  );
}

export default App;
