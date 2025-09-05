import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { useGameTimer } from '../hooks/useGameTimer'; // Adjust the import based on your file structure

const Betting: React.FC = () => {
  const { bettingData } = useGameStore();
  const timeRemaining = useGameTimer(); // ← Client-side countdown

  return (
    <div className="betting-view">
      <h2>💰 Place Your Bets</h2>
      
      <div className="betting-content">
        <div className="betting-info">
          <h3>Betting Phase Active</h3>
          <p>Choose your favorite racer and place your bets!</p>
          
          {bettingData && (
            <div className="backend-data">
              <h4>Backend Data</h4>
              <div className="data-display">
                Random Number: <strong>{bettingData.bettingDeadline}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="betting-timer">
          <p>Betting closes in: <strong>{timeRemaining} seconds</strong></p>
          <div className="timer-bar">
            <div 
              className="timer-progress" 
              style={{ width: `${(timeRemaining / 30) * 100}%` }}
            />
          </div>
        </div>

        <div className="betting-placeholder">
          <p>🚧 Betting interface coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default Betting;