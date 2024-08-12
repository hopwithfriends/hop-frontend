"use client";

import React from "react";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./components/Cursor";

const CursorContainer = () => {
  return (
    <div
      className="
        absolute 
        inset-0
        bg-transparent
        z-20   
        pointer-events-none
        text-white
      "
    >
      hi
    </div>
  );
};

export default CursorContainer;
