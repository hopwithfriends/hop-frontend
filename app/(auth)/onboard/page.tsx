"use client";

import ProfilePicUploader from '@components/profile/ProfilePicUploader';
import type React from 'react';
import { useState } from 'react';

interface OnboardProps {
  onSubmit: (username: string, nickname: string) => void;
}

const Onboard: React.FC<OnboardProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (username.trim() === '' || nickname.trim() === '') {
      setError('Both fields are required.');
      return;
    }

    setError('');
    onSubmit(username, nickname);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-[10%]">
        <ProfilePicUploader/>
      <h2 className="text-2xl mb-4 mt-10 font-bold">Set Your Username and Nickname</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nickname" className="text-sm font-medium text-gray-700">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Enter your nickname"
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Onboard;
