import React from 'react';
import { useGameStore } from '../../stores';
import { ChatSidebarContainer } from './ChatSidebar.styles';

const ChatSidebar = () => {
  const { gameData } = useGameStore();
  return (
    <ChatSidebarContainer>
      <h3>Chat</h3>
      {gameData && <div>Players: </div>}
    </ChatSidebarContainer>
  );
};

export default ChatSidebar;