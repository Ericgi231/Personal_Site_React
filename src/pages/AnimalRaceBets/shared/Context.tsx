// AnimalRaceBets.context.tsx
import React, { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

interface GameContextType {
  socket: Socket | null;
  gameData: any; // Replace with your actual type
  bettingData: any; // Replace with your actual type
}

export const GameContext = createContext<GameContextType>({
  socket: null,
  gameData: null,
  bettingData: null,
});

export const useGameContext = () => useContext(GameContext);