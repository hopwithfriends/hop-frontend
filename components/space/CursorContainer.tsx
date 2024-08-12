import React from "react";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "./Cursor";
import { CustomCursor } from "./CustomCursor";
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
	selectedCursor: string;
}

const renderCursors = (users: Users, color: string, selectedCursor: string) => {
	return Object.keys(users).map((uuid) => {
	  const user = users[uuid];
	  return (
		<React.Fragment key={uuid}>
		  {selectedCursor === "/norm.png" || selectedCursor === "" ? (
			<Cursor
			  key={uuid}
			  color={color}
			  point={[user.state.x, user.state.y]}
			/>
		  ) : (
			<CustomCursor
			  key={uuid}
			  point={[user.state.x, user.state.y]}
			  imageUrl={selectedCursor}
			/>
		  )}
		</React.Fragment>
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
const CursorContainer: React.FC<HomeProps> = ({
	username,
	color,
	selectedCursor,
}) => {
	const [otherUsers, setOtherUsers] = useState<Users>({});
	const [isTracking, setIsTracking] = useState(true);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	const WS_URL = "ws://localhost:8000";

	const containerRef = useRef<HTMLDivElement>(null);

	const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
		queryParams: { username },
	});

	const THROTTLE = 10;

	const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		sendJsonMessage({
			x: 0,
			y: 0,
		});

		const handleMouseMove = (e: MouseEvent) => {
			if (containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const newPosition = {
					x: e.clientX - rect.left,
					y: e.clientY - rect.top,
				};
				setMousePosition(newPosition);
				if (isTracking) {
					sendJsonMessageThrottled.current(newPosition);
				}
			}
		};

		const container = containerRef.current;

		if (container) {
			container.addEventListener("mousemove", handleMouseMove);
		}

		return () => {
			if (container) {
				container.removeEventListener("mousemove", handleMouseMove);
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

	const handleMouseDown = () => {
		setIsTracking(false);
	};

	const handleMouseUp = () => {
		setIsTracking(true);
		sendJsonMessage(mousePosition);
	};

	return (
		<div
			ref={containerRef}
			className="absolute inset-0 bg-transparent z-20 text-black"
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			style={{ pointerEvents: isTracking ? "auto" : "none" }}
		>
			<h1>Hello, {username}</h1>
			<p>Current users:</p>
			{Object.keys(otherUsers).length === 0 ? (
				<p>No other users online.</p>
			) : (
				<>
					{renderUsersList(otherUsers)}
					{renderCursors(otherUsers, color, selectedCursor)}
				</>
			)}
		</div>
	);
};

export default CursorContainer;
