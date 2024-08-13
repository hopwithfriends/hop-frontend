"use client";

// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import useWebSocket from "react-use-websocket";
interface NicknameProps {
	setUsername: (username: string) => void;
	setColorProp: (color: string) => void;
	realUsername: string;
}

const EnterSpace: React.FC<NicknameProps> = ({
	setUsername,
	setColorProp,
	realUsername,
}) => {
	const [color, setColor] = useState("");
	const [wsUrl, setWsUrl] = useState<string | null>(null);

	// FETCH NICKNAME FROM DB
	const username = "isa"; // FOR TESTING

	const { sendJsonMessage } = useWebSocket(wsUrl, {
		shouldReconnect: () => false,
		reconnectAttempts: 0,
		share: true,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!color) {
			const newColor = randomColor();
			setColor(newColor);
			setColorProp(color);
		}
	}, [color]);

	useEffect(() => {
		if (realUsername) {
			setWsUrl(
				`ws://localhost:8000?username=${encodeURIComponent(realUsername)}`,
			);
		}
	}, [realUsername]);

	const handleClick = () => {
		setUsername(username);
		sendJsonMessage({
			type: "setRealUsername",
			realUsername: realUsername,
		});
	};

	return (
		<>
			<div className="bg-gray-600 text-white rounded-xl shadow-lg p-6 w-96 mx-auto h-56 mt-[23%] ml-[41%] absolute z-50 ">
				<button
					type="button"
					onClick={handleClick}
					className="bg-gray-900 hover:bg-gray-950 text-white p-16 ml-8 rounded-xl text-4xl font-bold mt-[1.5%] focus:outline-none focus:ring-2 focus:ring-gray-500"
				>
					Connect
				</button>
			</div>
		</>
	);
};

export default EnterSpace;
