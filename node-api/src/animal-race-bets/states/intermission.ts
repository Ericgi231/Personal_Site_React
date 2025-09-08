export interface IntermissionData {
  loadingScreen: 'sunset' | 'forest' | 'stadium' | 'desert';
  racer1Id: string;
  racer2Id: string;
}

export function generateIntermissionData(): IntermissionData {
  const loadingScreens = ['sunset', 'forest', 'stadium', 'desert'] as const;
  const racerIds = [
    'lightning-bolt', 'thunder-strike', 'wind-runner', 
    'storm-chaser', 'fire-dash', 'ice-bolt'
  ];

  // Pick random loading screen
  const loadingScreen = loadingScreens[Math.floor(Math.random() * loadingScreens.length)];
  
  // Pick two random unique racers
  const shuffled = [...racerIds].sort(() => Math.random() - 0.5);
  
  return {
    loadingScreen,
    racer1Id: shuffled[0],
    racer2Id: shuffled[1]
  };
}

export const INTERMISSION_DURATION = 15000; // 15 seconds