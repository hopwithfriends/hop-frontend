"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import moment from "moment";
import "../../styles/globals.css";
interface ChatMessage {
	type: "chat" | "join";
	username: string;
	message?: string;
	time: string;
}

const ChatContainer: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputMessage, setInputMessage] = useState("");
	const [username, setUsername] = useState("");
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [time, setTime] = useState("");
	const user = useUser({ or: "redirect" });
	const wsRef = useRef<WebSocket | null>(null);
	const isInitialConnection = useRef(true);
	const messageListRef = useRef<HTMLDivElement | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (messageListRef.current) {
			const scrollOptions: ScrollToOptions = {
				top: messageListRef.current.scrollHeight,
				behavior: "smooth",
			};
			messageListRef.current.scrollTo(scrollOptions);
		}
	}, [messages]);

	const fetchIt = async () => {
		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const result = await serviceMethods.fetchUser();
			return result;
		} catch (error) {
			console.error("Error during submission:", error);
		}
	};

	function getRandomInt(min: number, max: number) {
		const minimum = Math.ceil(min);
		const maximum = Math.floor(max);
		return Math.floor(Math.random() * (maximum - minimum + 1)) + min;
	}

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchAndSetUserData = async () => {
			const result = await fetchIt();
			if (result) {
				setUsername(result.username);
			} else {
				const randNum: number = getRandomInt(1, 100);
				setUsername(`user${randNum}`);
			}
		};
		fetchAndSetUserData();
	}, [user]);

	useEffect(() => {
		if (!username) return;

		const connectWebSocket = () => {
			const WS_URL = `wss://hop-websocket1-76a542d0c47b.herokuapp.com?username=${encodeURIComponent(username)}`;
			const ws = new WebSocket(WS_URL);

			ws.onopen = () => {
				console.log("open ws");
				if (isInitialConnection.current) {
					const joinMessage = {
						type: "join",
						username: username,
					};
					ws.send(JSON.stringify(joinMessage));
					isInitialConnection.current = false;
				}
			};

			ws.onmessage = (event) => {
				try {
					const data = JSON.parse(event.data) as ChatMessage;
					if (data.type === "chat") {
						setMessages((prevMessages) => [...prevMessages, data]);
					}
				} catch (error) {
					console.error("Error processing WebSocket message:", error);
				}
			};

			ws.onclose = () => {
				console.log(
					"WebSocket disconnected, attempting to reconnect in 3 seconds...",
				);
				setTimeout(connectWebSocket, 3000);
			};
			wsRef.current = ws;
		};

		connectWebSocket();

		return () => {
			if (wsRef.current) {
				wsRef.current.close();
			}
		};
	}, [username]);

	const handleSendMessage = () => {
		setTime(moment().format("LT"));
		if (inputMessage.trim() && wsRef.current) {
			const message = {
				type: "chat",
				username: username,
				message: inputMessage,
				time: time,
			};
			wsRef.current.send(JSON.stringify(message));
			setInputMessage("");
		}
	};

	const handleEmojiSelect = (emoji: { native: string }) => {
		setInputMessage((prevMessage) => prevMessage + emoji.native);
		setShowEmojiPicker(false);
	};

	return (
		<div className="flex flex-col h-full p-4 ">
			<p className="text-3xl font-bold p-2 text-white">chat</p>

			<div className="bg-black broder-2 border-white rounded-xl p-4 flex flex-col h-full max-h-[896px] message-container">
				<div
					className="flex flex-col message-list overflow-y-auto"
					ref={messageListRef}
				>
					{messages.map((msg, index) => {
						if (!msg.username) return null;

						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<div className="flex flex-col message" key={index}>
								<div className="flex flex-col">
									<p className="whitespace-pre-wrap break-words border-2 font-bold rounded-xl p-2 bg-purple-400 text-black border-purple-600">
										{`${msg.username}: ${msg.message}`}
									</p>
									<p className="text-sm font-light text-white">{msg.time}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<div className="mt-4 text-white">
				<div className="p-2 border-t border-gray-300">
					<div className="relative flex items-center pt-2">
						<button
							type="button"
							className="absolute left-2 text-purple-500 hover:text-purple-700 focus:outline-none"
							onClick={() => setShowEmojiPicker(!showEmojiPicker)}
						>
							<FiSmile className="w-5 h-5" />
						</button>
						{showEmojiPicker && (
							<div className="absolute bottom-14">
								<Picker
									data={data}
									perLine="6"
									theme="dark"
									maxFrequentRows="2"
									onEmojiSelect={handleEmojiSelect}
								/>
							</div>
						)}
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
							placeholder="Type a message..."
							className="w-full p-3 pl-12 pr-16 rounded-lg border-2 text-white font-bold border-purple-500 bg-black focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
						/>
						<button
							type="button"
							onClick={handleSendMessage}
							className="absolute right-2 text-purple-500 hover:text-purple-800 focus:outline-none p-2"
						>
							<FiSend className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatContainer;
