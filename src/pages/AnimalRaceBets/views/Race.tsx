import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { useGameTimer } from '../hooks/useGameTimer'; // Adjust the import based on your project structure

const Race: React.FC = () => {
  const { raceData, timeRemaining } = useGameStore();
  const clientSideTimeRemaining = useGameTimer(); // Client-side countdown

  return (
    <div className="race-view">
      <h2>🏁 Race in Progress</h2>
      
      <div className="race-content">
        <div className="race-info">
          <h3>The Race Has Started!</h3>
          <p>Watch the animals compete for victory!</p>
          
          {raceData && (
            <div className="backend-data">
              <h4>Backend Data</h4>
              <div className="data-display">
                Random Number: <strong>{raceData.raceId}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="race-timer">
          <p>Race ends in: <strong>{clientSideTimeRemaining} seconds</strong></p>
          <div className="timer-bar">
            <div 
              className="timer-progress" 
              style={{ width: `${(clientSideTimeRemaining / 20) * 100}%` }}
            />
          </div>
        </div>

        <div className="race-track-placeholder">
          <p>🏎️ Race track animation coming soon...</p>
          <div className="fake-progress">
            <div className="progress-bar">
              <div 
                className="race-progress" 
                style={{ 
                  width: `${((20 - clientSideTimeRemaining) / 20) * 100}%`,
                  transition: 'width 1s ease-in-out'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Race;