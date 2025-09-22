
import { useEffect } from 'react';
import { GameData } from '@my-site/shared/animal-race-bets';
import { ConnectionInfo } from '../types';

export function useSaveState(gameData: GameData, connectionInfo: ConnectionInfo) {
	useEffect(() => {
		if (gameData) {
			sessionStorage.setItem('animalRaceBetsGameData', JSON.stringify(gameData));
		}
	}, [gameData]);

	useEffect(() => {
		if (connectionInfo) {
			sessionStorage.setItem('animalRaceBetsConnectionInfo', JSON.stringify(connectionInfo));
		}
	}, [connectionInfo]);
}
