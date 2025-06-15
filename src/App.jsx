import './App.css'
import { useState, useEffect } from 'react';
import Dropdown from './components/dropdown.jsx'
import GuessBox from './components/GuessBox.jsx'
import Champions from './data/champions.json';

function App() {
  const [correctChampion, setCorrectChampion] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [resetCounter, setResetCounter] = useState(0);

  const handleSelect = (champion) => {
    setGuesses(prevGuesses => {    
      const alreadyGuessed = prevGuesses.some(g => g.name === champion.name);
      if (prevGuesses.length < 5 && !alreadyGuessed) {
        return [...prevGuesses, champion];
      }
      return prevGuesses;
    });
  };

  const resetGame = () => {
    setGuesses([]);
    setResetCounter(prev => prev + 1);
    const randomIndex = Math.floor(Math.random() * Champions.length);
    setCorrectChampion(Champions[randomIndex]);
  };

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * Champions.length);
    setCorrectChampion(Champions[randomIndex]);
  }, []);

  const lastGuess = guesses.length ? guesses[guesses.length - 1] : null;
  const isCorrectGuess = lastGuess && lastGuess.name === correctChampion?.name;
  const isGameOver = isCorrectGuess || guesses.length === 5;

  return (
    <div className="container">
      <div className="header">
        <img src="logo.png" className="logo" alt="logo" />
        <h1>Paladle</h1>
      </div>

      {isCorrectGuess && (
        <div className="message">
          <h2>Congratulations! 🎉</h2>
          You guessed the correct champion: {correctChampion.name}
          <img src={correctChampion.image} alt={correctChampion.name} />
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      {!isCorrectGuess && guesses.length === 5 && (
        <div className="message">
          <h2>Game Over! 😔</h2>
          The correct champion was: {correctChampion.name}
          <img src={correctChampion.image} alt={correctChampion.name} />
          <button onClick={resetGame}>Try Again</button>
        </div>
      )}

      <Dropdown onSelect={handleSelect} resetCounter={resetCounter} disabled={isGameOver} />
      <GuessBox guesses={guesses} correctChampion={correctChampion} />
    </div>
  );
}

export default App;
