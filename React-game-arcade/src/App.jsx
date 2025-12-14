import React, { useState } from 'react';
import './App.css';

// Importing all 10 games
import TicTacToe from './games/TicTacToe';
import CoinFlipper from './games/CoinFlipper';
import RockPaperScissors from './games/RockPaperScissors';
import GuessTheNumber from './games/GuessTheNumber';
import CookieClicker from './games/CookieClicker';
import ReactionTimer from './games/ReactionTimer';
import WhackAMole from './games/WhackAMole';
import MemoryGame from './games/MemoryGame';
import Hangman from './games/Hangman';
import Snake from './games/Snake';

const App = () => {
  const [activeGame, setActiveGame] = useState(null);

  const games = [
    { id: 'tic-tac-toe', name: '❌ Tic Tac Toe', component: <TicTacToe goBack={() => setActiveGame(null)} /> },
    { id: 'coin-flipper', name: '🪙 Coin Flipper', component: <CoinFlipper goBack={() => setActiveGame(null)} /> },
    { id: 'rps', name: '✂️ Rock Paper Scissors', component: <RockPaperScissors goBack={() => setActiveGame(null)} /> },
    { id: 'guess', name: '❓ Guess Number', component: <GuessTheNumber goBack={() => setActiveGame(null)} /> },
    { id: 'cookie', name: '🍪 Cookie Clicker', component: <CookieClicker goBack={() => setActiveGame(null)} /> },
    { id: 'reaction', name: '⚡ Reaction Timer', component: <ReactionTimer goBack={() => setActiveGame(null)} /> },
    { id: 'mole', name: '🔨 Whack-A-Mole', component: <WhackAMole goBack={() => setActiveGame(null)} /> },
    { id: 'memory', name: '🧠 Memory Game', component: <MemoryGame goBack={() => setActiveGame(null)} /> },
    { id: 'hangman', name: '🔤 Hangman', component: <Hangman goBack={() => setActiveGame(null)} /> },
    { id: 'snake', name: '🐍 Snake', component: <Snake goBack={() => setActiveGame(null)} /> },
  ];

  return (
    <div className="app-container">
      {activeGame ? (
        activeGame
      ) : (
        <>
          <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>React Arcade 🕹️</h1>
          <p style={{ color: '#888' }}>Select a game to start playing</p>
          <div className="game-grid">
            {games.map((game) => (
              <div key={game.id} className="game-card" onClick={() => setActiveGame(game.component)}>
                {game.name}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;