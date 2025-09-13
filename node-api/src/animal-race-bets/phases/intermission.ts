import { GameData } from "@my-site/shared/animal-race-bets";

export function generateIntermissionData(gameData: GameData): void {
  const loadingScreens = ['sunset', 'forest', 'stadium', 'desert'] as const;
  const racerIds = [
    'lightning-bolt', 'thunder-strike', 'wind-runner',
    'storm-chaser', 'fire-dash', 'ice-bolt'
  ];

  const loadingScreen = loadingScreens[Math.floor(Math.random() * loadingScreens.length)];
  const shuffled = [...racerIds].sort(() => Math.random() - 0.5);

  gameData.loadingSceneId = loadingScreen as any; // adjust type if needed
  gameData.loadingAnimalIds = [shuffled[0], shuffled[1]] as any; // adjust type if needed
  // Clear phase-specific fields if needed
}