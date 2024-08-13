"use client";

import type React from "react";
import { useState } from "react";
import RightSideBar from "@components/space/RightSideBar";
import BottomBar from "@components/space/BottomBar";
import CursorContainer from "@components/space/CursorContainer";
import SetNickname from "@components/space/SetNickname";

const SpacePage: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // actually nickname, isa will change this later 
  const [color, setColor] = useState<string>("");
  const [selectedCursor, setSelectedCursor] = useState<string>("");

  // Get User data /api/user
  const realUsername = "DavilaDawg" // for testing 

  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-grow flex flex-col overflow-hidden relative">
        <div className="relative flex-grow">
          {username ? (
            <CursorContainer username={username} color={color} selectedCursor={selectedCursor} />
          ) : (
            <SetNickname onSubmit={setUsername} setColorProp={setColor} realUsername={realUsername}/>
          )}
          <iframe
            className="absolute inset-0 w-full h-full z-10"
            title="vnc"
            src="https://vnc-socket-2.fly.dev/"
          />
        </div>
        <BottomBar setSelectedCursor={setSelectedCursor} />
      </main>
      <RightSideBar realUsername={realUsername}/>
    </div>
  );
};

export default SpacePage;
