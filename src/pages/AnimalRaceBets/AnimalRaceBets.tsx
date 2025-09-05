import React from 'react';
import { useSocket } from './hooks/useSocket';
import { useGameStore } from './stores/gameStore';
import { useGameTimer } from './hooks/useGameTimer';
import Intermission from './views/Intermission';
import Betting from './views/Betting';
import Race from './views/Race';
import Results from './views/Results';

const AnimalRaceBets: React.FC = () => {
  const { socket } = useSocket();
  const { 
    isConnected, 
    currentState, 
    socketId 
  } = useGameStore();
  
  // Use client-side timer instead of timeRemaining from store
  const timeRemaining = useGameTimer();

  const renderCurrentView = () => {
    switch (currentState) {
      case 'intermission':
        return <Intermission />;
      case 'betting':
        return <Betting />;
      case 'race':
        return <Race />;
      case 'results':
        return <Results />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <div className="animal-race-bets">
      {/* Connection Status Bar */}
      <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
        <div className="status-info">
          <span className={`status-indicator ${isConnected ? 'online' : 'offline'}`}>
            {isConnected ? '🟢' : '🔴'}
          </span>
          <span>
            {isConnected ? `Connected (${socketId})` : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Game Header */}
      <div className="game-header">
        <h1>Animal Race Bets</h1>
        <div className="game-info">
          <div className="current-state">
            Current Phase: <strong>{currentState.charAt(0).toUpperCase() + currentState.slice(1)}</strong>
          </div>
          <div className="time-remaining">
            Time Remaining: <strong>{timeRemaining}s</strong>
          </div>
        </div>
      </div>

      {/* Current Game View */}
      <div className="game-content">
        {isConnected ? renderCurrentView() : (
          <div className="connection-error">
            <h2>Connection Lost</h2>
            <p>Attempting to reconnect to the game server...</p>
          </div>
        )}
      </div>

      {/* Debug Info (remove in production) */}
      <div className="debug-info" style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'rgba(0,0,0,0.8)', 
        color: 'white', 
        padding: '10px',
        fontSize: '12px',
        borderRadius: '5px'
      }}>
        <div>State: {currentState}</div>
        <div>Timer: {timeRemaining}s</div>
        <div>Connected: {isConnected ? 'Yes' : 'No'}</div>
        <div>Socket: {socketId}</div>
      </div>
    </div>
  );
};

export default AnimalRaceBets;