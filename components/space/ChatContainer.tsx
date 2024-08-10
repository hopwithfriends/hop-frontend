import React from 'react';

const ChatContainer = () => {
  return (
    <div className="flex flex-col h-[58vh] bg-gray-200 rounded-lg p-4  ">
      <div className="flex-grow"></div>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded-lg border border-gray-300"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
