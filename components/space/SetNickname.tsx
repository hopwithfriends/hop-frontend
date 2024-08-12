"use client";

// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";

interface NicknameProps {
  onSubmit: (username: string) => void;
  setColorProp: (color: string) => void;
}

// For anonomos viewers
const SetNickname: React.FC<NicknameProps> = ({ onSubmit, setColorProp }) => {
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (username && !color) {
      const newColor = randomColor();
      setColor(newColor);
    }
  }, [username, color]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username) {
      onSubmit(username);
      setColorProp(color);
    }
  };

  return (
    <div className="bg-gray-600 text-white rounded-xl shadow-lg p-6 w-96 mx-auto mt-[25%] ml-[38%] absolute z-50 ">
      <p className="text-lg font-semibold mb-4">Set your nickname</p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          maxLength={6}
          className="border border-gray-600 rounded-md p-2 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-950 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SetNickname;
