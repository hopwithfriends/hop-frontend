import React from "react";
import OnlineFriend from "@components/friends/OnlineFriend";

const OnlineFriendsContainer = () => {
  return (
    <div className="bg-gray-800 w-full max-h-[calc(100vh-150px)] p-4 rounded-lg shadow-lg border border-gray-700 overflow-auto">
      <ul className="space-y-3">
        <li><OnlineFriend /></li>
        <li><OnlineFriend /></li>
        <li><OnlineFriend /></li>
        <li><OnlineFriend /></li>
        <li><OnlineFriend /></li>
        <li><OnlineFriend /></li>
      </ul>
    </div>
  );
};

export default OnlineFriendsContainer;
