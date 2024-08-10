import React from 'react';
import { FiSettings, FiShare2, FiLink } from 'react-icons/fi';

const SpaceSettings = () => {
  return (
    <div className="p-4 bg-gray-200 rounded-lg h-[30vh] ml ">
      <h2 className="text-lg font-semibold mb-2">Space Settings</h2>
      <div className="flex flex-col space-y-2">
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded">
          <FiSettings size={18} />
          <span>Settings</span>
        </button>
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded">
          <FiShare2 size={18} />
          <span>Share</span>
        </button>
        <button className="flex items-center space-x-2 p-2 hover:bg-gray-300 rounded">
          <FiLink size={18} />
          <span>Copy Link</span>
        </button>
      </div>
    </div>
  );
};

export default SpaceSettings;
