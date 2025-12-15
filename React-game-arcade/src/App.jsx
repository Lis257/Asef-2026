import React, { useState, useEffect } from 'react';
import './App.css';

// --- GAMES ---
import CoinFlipper from './games/CoinFlipper';
import GuessTheNumber from './games/GuessTheNumber';
import CookieClicker from './games/CookieClicker';
import ReactionTimer from './games/ReactionTimer';
import WhackAMole from './games/WhackAMole';
import MemoryGame from './games/MemoryGame';
import Hangman from './games/Hangman';
import MathDash from './games/MathDash';
import SimonSays from './games/SimonSays';
import TypingSpeed from './games/TypingSpeed';
import Snake from './games/Snake';
import TwoZeroFourEight from './games/2048';
import SlidingPuzzle from './games/SlidingPuzzle';
import LightsOut from './games/LightsOut';
import ColorFlood from './games/ColorFlood';
import Hanoi from './games/Hanoi';

// --- 2P GAMES ---
import TicTacToe from './games/TicTacToe';
import RockPaperScissors from './games/RockPaperScissors';
import ConnectFour from './games/ConnectFour';
import TugOfWar from './games/TugOfWar';

const App = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [playerMode, setPlayerMode] = useState('1P');
  const [loading, setLoading] = useState(true);

  // ⏳ Fake loading delay (boot screen)
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  const games = [
    { id: 'snake', name: '🐍 Snake', mode: '1P', component: <Snake goBack={() => setActiveGame(null)} /> },
    { id: '2048', name: '🔢 2048', mode: '1P', component: <TwoZeroFourEight goBack={() => setActiveGame(null)} /> },
    { id: 'sliding', name: '🧩 Sliding Tiles', mode: '1P', component: <SlidingPuzzle goBack={() => setActiveGame(null)} /> },
    { id: 'lights', name: '💡 Lights Out', mode: '1P', component: <LightsOut goBack={() => setActiveGame(null)} /> },
    { id: 'flood', name: '🎨 Color Flood', mode: '1P', component: <ColorFlood goBack={() => setActiveGame(null)} /> },
    { id: 'hanoi', name: '🗼 Tower of Hanoi', mode: '1P', component: <Hanoi goBack={() => setActiveGame(null)} /> },
    { id: 'memory', name: '🧠 Memory Match', mode: '1P', component: <MemoryGame goBack={() => setActiveGame(null)} /> },
    { id: 'math', name: '➕ Math Dash', mode: '1P', component: <MathDash goBack={() => setActiveGame(null)} /> },
    { id: 'simon', name: '🔔 Simon Says', mode: '1P', component: <SimonSays goBack={() => setActiveGame(null)} /> },
    { id: 'typing', name: '⌨️ Typing Speed', mode: '1P', component: <TypingSpeed goBack={() => setActiveGame(null)} /> },
    { id: 'mole', name: '🔨 Whack-A-Mole', mode: '1P', component: <WhackAMole goBack={() => setActiveGame(null)} /> },
    { id: 'reaction', name: '⚡ Reaction Time', mode: '1P', component: <ReactionTimer goBack={() => setActiveGame(null)} /> },
    { id: 'hangman', name: '🔤 Hangman', mode: '1P', component: <Hangman goBack={() => setActiveGame(null)} /> },
    { id: 'cookie', name: '🍪 Cookie Clicker', mode: '1P', component: <CookieClicker goBack={() => setActiveGame(null)} /> },
    { id: 'guess', name: '❓ Guess Number', mode: '1P', component: <GuessTheNumber goBack={() => setActiveGame(null)} /> },
    { id: 'coin', name: '🪙 Coin Flip', mode: '1P', component: <CoinFlipper goBack={() => setActiveGame(null)} /> },

    { id: 'tictactoe', name: '❌ Tic Tac Toe', mode: '2P', component: <TicTacToe goBack={() => setActiveGame(null)} /> },
    { id: 'c4', name: '🔴 Connect Four', mode: '2P', component: <ConnectFour goBack={() => setActiveGame(null)} /> },
    { id: 'rps', name: '✌️ Rock Paper Scissors', mode: '2P', component: <RockPaperScissors goBack={() => setActiveGame(null)} /> },
    { id: 'tug', name: '💪 Tug of War', mode: '2P', component: <TugOfWar goBack={() => setActiveGame(null)} /> },
  ];

  const filteredGames = games.filter(game => game.mode === playerMode);

  // 🔥 LOADING SCREEN
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-card">
          <div className="joystick">🕹️</div>
          <h1 className="loading-title">React Arcade</h1>

          <div className="loading-bar">
            <div className="loading-bar-fill"></div>
          </div>

          <div className="loading-text">
            Loading games<span className="loading-dots"></span>
          </div>
        </div>
      </div>
    );
  }

  // 🎮 MAIN APP
  return (
    <div className="app-container">
      {activeGame ? (
        <div className="game-screen">{activeGame}</div>
      ) : (
        <div className="menu-fade-in">
          <header>
            <h1>React Arcade 🕹️</h1>
            <p className="subtitle">Level {games.length}/50</p>
          </header>

          <nav className="category-tabs">
            <button
              className={playerMode === '1P' ? 'active-tab p1' : 'p1'}
              onClick={() => setPlayerMode('1P')}
            >
              Single Player
            </button>
            <button
              className={playerMode === '2P' ? 'active-tab p2' : 'p2'}
              onClick={() => setPlayerMode('2P')}
            >
              Multiplayer
            </button>
          </nav>

          <main className="game-grid">
            {filteredGames.map(game => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => setActiveGame(game.component)}
              >
                <span className="game-name">{game.name}</span>
              </div>
            ))}
          </main>
        </div>
      )}
    </div>
  );
};

export default App;
