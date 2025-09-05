import React from 'react';
import { useGameStore } from '../stores/gameStore';
import { useGameTimer } from '../hooks/useGameTimer'; // Import the custom hook
//import CelebrationAnimation from './CelebrationAnimation'; // Import the CelebrationAnimation component

const Results: React.FC = () => {
  const { 
    currentState, 
    timeRemaining,
    raceData, 
    bettingData, 
    resultsData, 
    sessionData,
    stateSpecificData 
  } = useGameStore();
  
  // Late joiners will have all this data available
  const racers = raceData?.racers || [];
  const winner = resultsData?.winner;
  const positions = resultsData?.positions || [];
  const userBets = bettingData?.userBets || [];
  const payouts = resultsData?.payouts || {};
  const showCelebration = stateSpecificData.results?.showCelebration || false;
  
  if (!winner) {
    return <div>Loading results...</div>;
  }
  
  const winningRacer = racers.find(r => r.id === winner);
  
  return (
    <div className="results-view">
      <h2>🏆 Race Results</h2>
      
      <div className="results-content">
        <div className="results-info">
          <h3>Race Complete!</h3>
          <p>Check out the final standings and payouts!</p>
          
          {resultsData && (
            <div className="backend-data">
              <h4>Backend Data</h4>
              <div className="data-display">
                Random Number: <strong>{resultsData.positions}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="results-timer">
          <p>Next race in: <strong>{timeRemaining} seconds</strong></p>
        </div>

        <div className="results-placeholder">
          <div className="podium">
            <div className="winner">🥇 Winner: {winningRacer?.name}</div>
            <div className="second">🥈 Second: TBD</div>
            <div className="third">🥉 Third: TBD</div>
          </div>
          
          <div className="payout-info">
            <p>💰 Payout calculations coming soon...</p>
          </div>
        </div>

        {userBets.length > 0 && (
          <div className="user-bets">
            <h3>Your Bets</h3>
            {userBets.map(bet => (
              <div key={bet.racerId}>
                Bet on {racers.find(r => r.id === bet.racerId)?.name}: ${bet.amount}
                {payouts[bet.racerId] && ` → Won $${payouts[bet.racerId]}!`}
              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Results;