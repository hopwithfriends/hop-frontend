import React from 'react';

const OnlineFriend = () => {
  return (
    <div className="flex items-center p-3 bg-gray-700 rounded-lg shadow-md space-x-4">
      <div className="w-14 h-14 bg-gray-500 rounded-full flex-shrink-0" />
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center space-x-2">
          <div className="text-white font-semibold text-lg">Friend Name</div>
          <div className="w-3.5 h-3.5 bg-green-400 rounded-full" />
        </div>
        <div className="text-gray-400 text-sm">Room Name</div>
      </div>
    </div>
  );
};

export default OnlineFriend;
