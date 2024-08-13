"use client";

// biome-ignore lint/style/useImportType: <explanation>
import React, { useState, useEffect } from "react";
import randomColor from "randomcolor";
import useWebSocket from "react-use-websocket";
interface NicknameProps {
	onSubmit: (username: string) => void;
	setColorProp: (color: string) => void;
	realUsername: string;
}

// For anonomos viewers
const SetNickname: React.FC<NicknameProps> = ({
	onSubmit,
	setColorProp,
	realUsername,
}) => {
	const [username, setUsername] = useState("");
	const [color, setColor] = useState("");
	const [wsUrl, setWsUrl] = useState<string | null>(null);

	const { sendJsonMessage } = useWebSocket(wsUrl, {
		shouldReconnect: () => false,
		reconnectAttempts: 0,
		share: true,
	});

	useEffect(() => {
		if (username && !color) {
			const newColor = randomColor();
			setColor(newColor);
		}
	}, [username, color]);

	useEffect(() => {
		if (realUsername) {
		  setWsUrl(`ws://localhost:8000?username=${encodeURIComponent(realUsername)}`);
		}
	  }, [realUsername]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (username) {
			onSubmit(username);
			setColorProp(color);
			
			sendJsonMessage({
				type: "setRealUsername",
				realUsername: realUsername,
			});
		}
	};

	return (
		<>
			<div className="bg-gray-600 text-white rounded-xl shadow-lg p-6 w-96 mx-auto mt-[25%] ml-[41%] absolute z-50 ">
				<p className="text-lg font-semibold mb-4">Set your nickname</p>
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<input
						type="text"
						value={username}
						placeholder="Enter your nickname..."
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
		</>
	);
};

export default SetNickname;
