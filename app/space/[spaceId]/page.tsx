"use-client"

import React from "react";
import RightSideBar from "@components/space/RightSideBar";
import BottomBar from "@components/space/BottomBar";
import CursorContainer from "@components/space/CursorContainer";
import SetNickname from "@components/space/SetNickname"

const SpacePage = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <main className="flex-grow flex flex-col overflow-hidden relative">
        <div className="relative flex-grow">
          <SetNickname />
          <CursorContainer />
          <iframe
            className="absolute inset-0 w-full h-full z-10"
            title="vnc"
            src="https://vnc-socket-2.fly.dev/"
          />
        </div>
        <BottomBar />
      </main>
      <RightSideBar />
    </div>
  );
};

export default SpacePage;
