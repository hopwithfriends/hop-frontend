"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";

interface UserState {
  x: number;
  y: number;
}

interface User {
  username: string;
  state: UserState;
}

interface Users {
  [uuid: string]: User;
}

interface HomeProps {
  username: string;
  color: string;
}

const renderCursors = (users: Users, color: string) => {
  return Object.keys(users).map((uuid) => {
    const user = users[uuid];
    return (
      <Cursor key={uuid} point={[user.state.x, user.state.y]} color={color} />
    );
  });
};

const renderUsersList = (users: Users) => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        return <li key={uuid}>{users[uuid].username}</li>;
      })}
    </ul>
  );
};

const CursorContainer: React.FC<HomeProps> = ({ username, color }) => {
  const [otherUsers, setOtherUsers] = useState<Users>({});
  const WS_URL = "ws://localhost:8000";

  const containerRef = useRef<HTMLDivElement>(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 30;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    const onmousemove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        sendJsonMessageThrottled.current({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", onmousemove);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", onmousemove);
      }
    };
  }, [sendJsonMessage]);

  useEffect(() => {
    if (lastJsonMessage) {
      const users = lastJsonMessage as Users;
      const filteredUsers = Object.keys(users).reduce<Users>((acc, uuid) => {
        if (users[uuid].username !== username) {
          acc[uuid] = users[uuid];
        }
        return acc;
      }, {});
      setOtherUsers(filteredUsers);
    }
  }, [lastJsonMessage, username]);

  return (
    <div className="absolute inset-0 bg-transparent z-20 pointer-events-none">
      <div
        ref={containerRef}
        className="absolute inset-0 z-20"
        style={{ pointerEvents: "none" }}
      >
        <h1>Hello, {username}</h1>
        <p>Current users:</p>
        {Object.keys(otherUsers).length === 0 ? (
          <p>No other users online.</p>
        ) : (
          <>
            {renderUsersList(otherUsers)}
            {renderCursors(otherUsers, color)}
          </>
        )}
      </div>
    </div>
  );
};

export default CursorContainer;