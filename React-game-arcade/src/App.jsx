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
import Pong from './games/Pong';
import TronDuel from './games/TronDuel';
import ClickWar from './games/ClickWar';
import ReactionDuel from './games/ReactionDuel';
import MathFight from './games/MathFight';
import Gomoku from './games/Gomoku';
import MemoryDuel from './games/MemoryDuel';
import NimGame from './games/NimGame';
import DotsAndBoxes from './games/DotsAndBoxes';
import SOSGame from './games/SOSGame';
import DiceRace from './games/DiceRace';
import TankDuel from './games/TankDuel';

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


    // --- 2P GAMES (Original 4 + New 12) ---
    { id: 'tictactoe', name: '❌ Tic Tac Toe', mode: '2P', component: <TicTacToe goBack={() => setActiveGame(null)} /> },
    { id: 'c4', name: '🔴 Connect Four', mode: '2P', component: <ConnectFour goBack={() => setActiveGame(null)} /> },
    { id: 'rps', name: '✌️ Rock Paper Scissors', mode: '2P', component: <RockPaperScissors goBack={() => setActiveGame(null)} /> },
    { id: 'tug', name: '💪 Tug of War', mode: '2P', component: <TugOfWar goBack={() => setActiveGame(null)} /> },

    // NEW ADDITIONS
    { id: 'pong', name: '🏓 Pong', mode: '2P', component: <Pong goBack={() => setActiveGame(null)} /> },
    { id: 'tron', name: '🏍️ Tron Duel', mode: '2P', component: <TronDuel goBack={() => setActiveGame(null)} /> },
    { id: 'clickwar', name: '🖱️ Click War', mode: '2P', component: <ClickWar goBack={() => setActiveGame(null)} /> },
    { id: 'reaction2p', name: '⚡ Reaction Duel', mode: '2P', component: <ReactionDuel goBack={() => setActiveGame(null)} /> },
    { id: 'math2p', name: '➗ Math Fight', mode: '2P', component: <MathFight goBack={() => setActiveGame(null)} /> },
    { id: 'gomoku', name: '⚪⚫ Gomoku', mode: '2P', component: <Gomoku goBack={() => setActiveGame(null)} /> },
    { id: 'memory2p', name: '🃏 Memory Duel', mode: '2P', component: <MemoryDuel goBack={() => setActiveGame(null)} /> },
    { id: 'nim', name: '🔥 Nim', mode: '2P', component: <NimGame goBack={() => setActiveGame(null)} /> },
    { id: 'dots', name: '🔳 Dots & Boxes', mode: '2P', component: <DotsAndBoxes goBack={() => setActiveGame(null)} /> },
    { id: 'sos', name: '🆘 SOS', mode: '2P', component: <SOSGame goBack={() => setActiveGame(null)} /> },
    { id: 'dice', name: '🎲 Dice Race', mode: '2P', component: <DiceRace goBack={() => setActiveGame(null)} /> },
    { id: 'tank', name: '🔤 Tank Duel', mode: '2P', component: <TankDuel goBack={() => setActiveGame(null)} /> },
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
