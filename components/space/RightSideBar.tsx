import React from 'react';
import SpaceSettings from './SpaceSettings';
import ChatContainer from './ChatContainer';

const RightSideBar = () => {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-100 border-l border-gray-300">
      <div className="p-4">
        <SpaceSettings />
      </div>
      <div className="flex-grow p-4">
        <ChatContainer />
      </div>
    </div>
  );
};

export default RightSideBar;
