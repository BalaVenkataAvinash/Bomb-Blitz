import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import axios from 'axios';
import Navbar from './Navbar';

const NUM_ROWS = 5;
const NUM_COLS = 5;
const NUM_GEMS = 20;
const NUM_BOMBS = 5;

const generateGrid = () => {
  const grid = Array(NUM_ROWS).fill(null).map(() => Array(NUM_COLS).fill(null));

  let gemsPlaced = 0;
  while (gemsPlaced < NUM_GEMS) {
    const row = Math.floor(Math.random() * NUM_ROWS);
    const col = Math.floor(Math.random() * NUM_COLS);
    if (grid[row][col] === null) {
      grid[row][col] = 'gem';
      gemsPlaced++;
    }
  }

  let bombsPlaced = 0;
  while (bombsPlaced < NUM_BOMBS) {
    const row = Math.floor(Math.random() * NUM_ROWS);
    const col = Math.floor(Math.random() * NUM_COLS);
    if (grid[row][col] === null) {
      grid[row][col] = 'bomb';
      bombsPlaced++;
    }
  }

  return grid;
};

const Game = () => {
  const [grid, setGrid] = useState([]);
  const [revealed, setRevealed] = useState(Array(NUM_ROWS).fill(null).map(() => Array(NUM_COLS).fill(false)));
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pastScores, setPastScores] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => { 
    startNewGame();
    fetchUserData();
  }, []);

  const startNewGame = () => {
    setGrid(generateGrid());
    setRevealed(Array(NUM_ROWS).fill(null).map(() => Array(NUM_COLS).fill(false)));
    setScore(0);
    setGameOver(false);
    setShowConfetti(false);
    setMessage('');
  };

  const fetchUserData = async () => {
    try {
      console.log(localStorage.getItem('token'));
      if (!localStorage.getItem('token')) {
        console.error('No token found');
        return;
      }
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/game/user-data`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(response);
      setHighScore(response.data.highScore || 0);
      setPastScores(response.data.pastScores || []);
    } catch (error) {
      console.error('Error fetching user data:', error.response ? error.response.data : error.message);
    }
  };  

  const updateHighScore = async () => {
    if (score > highScore) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/game/highscore`, 
          { score },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setHighScore(response.data.highScore);
        setShowConfetti(true);
      } catch (error) {
        console.error('Error updating high score:', error);
      }
    }
  };

  const updatePastScores = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/game/past-scores`, 
        { score },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      localStorage.setItem('pastScores', JSON.stringify(response.data.pastScores));
      console.log(pastScores)
      setPastScores(response.data.pastScores || []);
    } catch (error) {
      console.error('Error updating past scores:', error);
    }
  };

  const handleClick = (row, col) => {
    if (gameOver || revealed[row][col]) return;
  
    const cell = grid[row][col];
    const newRevealed = [...revealed];
    newRevealed[row][col] = true;
    setRevealed(newRevealed);
  
    if (cell === 'bomb') {
      setGameOver(true);
      updateHighScore();
      updatePastScores(); // Update past scores when game ends
      setMessage(score > highScore ? 'Game Over! You hit a bomb. New High Score!' : 'Game Over! You hit a bomb. Better luck next time!');
    } else if (cell === 'gem') {
      setScore(prevScore => prevScore + 1);
      if (score + 1 === NUM_GEMS) {
        setGameOver(true);
        setShowConfetti(true);
        setMessage('Congratulations! You found all the gems!');
        updateHighScore();
        updatePastScores(); // Update past scores when game ends
      }
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="game-container flex flex-col items-center justify-center min-h-screen bg-white text-blue-900 p-6">
        {showConfetti && <Confetti />}
        
        <h2 className="text-3xl font-bold mb-4">Gem & Bomb Game</h2>
        <p className="text-lg mb-2">Find all the gems without hitting a bomb!</p>
        
        <div className="grid grid-cols-5 gap-1 mb-4">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleClick(rowIndex, colIndex)}
                className={`w-12 h-12 ${revealed[rowIndex][colIndex] ? (cell === 'gem' ? 'bg-green-500' : cell === 'bomb' ? 'bg-red-500' : 'bg-gray-300') : 'bg-gray-300'} border-2 border-gray-400`}
                disabled={revealed[rowIndex][colIndex] || gameOver}
              >
                {revealed[rowIndex][colIndex] && cell === 'gem' && <span role="img" aria-label="gem">💎</span>}
                {revealed[rowIndex][colIndex] && cell === 'bomb' && <span role="img" aria-label="bomb">💣</span>}
              </button>
            ))
          ))}
        </div>

        <p className="mb-6">Current Score: {score}</p>
        <p className="mb-6">High Score: {highScore}</p>
        
        <button
          onClick={startNewGame}
          className="w-64 py-2 mb-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
        >
          New Game
        </button>

        {/* <div className="w-full max-w-lg mb-8">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">Past Scores:</h3>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
            {pastScores.map((score, index) => (
              <li key={index}>{score}</li>
            ))}
          </ul>
        </div> */}
        {message && <p className="text-xl font-semibold mt-4">{message}</p>}
      </div>
    </>
  );
};

export default Game;
