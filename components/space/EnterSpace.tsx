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

const EnterSpace: React.FC<NicknameProps> = ({
	onSubmit,
	setColorProp,
	realUsername,
}) => {
	const [color, setColor] = useState("");
	const [wsUrl, setWsUrl] = useState<string | null>(null);

    // FETCH NICKNAME FROM DB
    const username= "isa" // FOR TESTING

	// const WS_URL = `ws://localhost:8000?username=${encodeURIComponent(username)}`;

	const { sendJsonMessage } = useWebSocket(wsUrl, {
		shouldReconnect: () => false,
		reconnectAttempts: 0,
		share: true,
	});

	useEffect(() => {
		if (!color) {
			const newColor = randomColor();
			setColor(newColor);
		}
	}, [color]);

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
			<div className="bg-gray-600 text-white rounded-xl shadow-lg p-6 w-96 mx-auto h-56 mt-[25%] ml-[41%] absolute z-50 ">
				<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
					<button
						type="button"
						className="bg-gray-900 hover:bg-gray-950 text-white rounded-xl text-4xl font-bold py-16 mt-[1.5%] focus:outline-none focus:ring-2 focus:ring-gray-500"
					>
						Connect
					</button>
				</form>
			</div>
		</>
	);
};

export default EnterSpace;
