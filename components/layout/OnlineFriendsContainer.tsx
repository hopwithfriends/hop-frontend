import React from "react";
import OnlineFriend from "@components/friends/OnlineFriend";
import ScrollBar from "@components/ui/SrollBar";

const OnlineFriendsContainer = () => {
  return (
    <div className="bg-gray-800 w-full h-full p-4 rounded-xl shadow-lg border border-gray-700 overflow-auto">
        <ul className="space-y-3">
          <li>
            <OnlineFriend />
          </li>
          <li>
            <OnlineFriend />
          </li>
          <li>
            <OnlineFriend />
          </li>
          <li>
            <OnlineFriend />
          </li>
          <li>
            <OnlineFriend />
          </li>
          <li>
            <OnlineFriend />
          </li>
        </ul>
    </div>
  );
};

export default OnlineFriendsContainer;
