import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { useGameTimer } from '../hooks/useGameTimer';

const Intermission: React.FC = () => {
  const { intermissionData } = useGameStore();
  const clientSideTimeRemaining = useGameTimer(); // Client-side countdown

  if (!intermissionData) {
    return (
      <div className="intermission-view">
        <h2>Intermission</h2>
        <p>Loading intermission data...</p>
      </div>
    );
  }

  return (
    <div className="intermission-view">
      <h2>🏇 Intermission - Get Ready for the Next Race!</h2>
      
      <div className="intermission-content">
        <div className="loading-screen-info">
          <h3>Loading Screen Theme</h3>
          <div className="loading-screen-display">
            <span className="theme-name">{intermissionData.loadingScreen}</span>
            <div className="theme-icon">
              {intermissionData.loadingScreen === 'sunset' && '🌅'}
              {intermissionData.loadingScreen === 'forest' && '🌲'}
              {intermissionData.loadingScreen === 'stadium' && '🏟️'}
              {intermissionData.loadingScreen === 'desert' && '🏜️'}
            </div>
          </div>
        </div>

        <div className="featured-racers">
          <h3>Featured Racers</h3>
          <div className="racers-display">
            <div className="racer">
              <strong>Racer 1:</strong> 
              <span className="racer-name">{intermissionData.racer1Id}</span>
            </div>
            <div className="vs-separator">VS</div>
            <div className="racer">
              <strong>Racer 2:</strong>
              <span className="racer-name">{intermissionData.racer2Id}</span>
            </div>
          </div>
        </div>

        <div className="countdown">
          <p>Next race starts in: <strong>{clientSideTimeRemaining} seconds</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Intermission;