import type React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import { FiSend, FiSmile } from "react-icons/fi";
import useWebSocket from "react-use-websocket";
interface RightSideBarProps {
	realUsername: string;
}

interface ChatMessage {
	type: "chat" | "join";
	username: string;
	message?: string;
}

const ChatContainer: React.FC<RightSideBarProps> = ({ realUsername }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [inputMessage, setInputMessage] = useState("");

	//const WS_URL = `ws://localhost:8000?username=${encodeURIComponent(realUsername)}`;
	const WS_URL = useMemo(
		() => `ws://localhost:8000?username=${encodeURIComponent(realUsername)}`,
		[realUsername],
	);

	const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(WS_URL);

	useEffect(() => {
		if (readyState === WebSocket.CLOSED) {
			console.error("WebSocket connection closed unexpectedly");
			// Handle reconnection or inform user
		}
	}, [readyState]);

	const handleNewMessage = useCallback((newMessage: ChatMessage) => {
		setMessages((prevMessages) => {
		  // Only add join messages if it's the first message
		  if (newMessage.type === "join" && prevMessages.length > 0) {
			return prevMessages;
		  }
		  return [...prevMessages, newMessage];
		});
	  }, []);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (lastJsonMessage) {
			try {
				const data = lastJsonMessage as ChatMessage;
				if (
					data.type === "chat" ||
					(data.type === "join" && messages.length<1)
				) {
					// ONLY WANT JOIN ON PAGE MOUNT
					setMessages((prevMessages) => [...prevMessages, data]);
				}
			} catch (error) {
				console.error("Error processing WebSocket message:", error);
			}
		}
	}, [lastJsonMessage]);

	const handleSendMessage = () => {
		if (inputMessage.trim()) {
			sendJsonMessage({
				type: "chat",
				username: realUsername,
				message: inputMessage,
			});
			setInputMessage("");
		}
	};

	return (
		<div className="flex flex-col h-full p-4">
			<p className="text-3xl font-semibold p-2">Chat</p>

			<div className="flex-grow bg-white rounded-xl p-4 overflow-y-auto">
				{messages.map((msg, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<p key={index}>
						{msg.type === "join"
							? `${msg.username} joined` // ONLY ON SUBMIT OF SETNICKNAME COMPONENT
							: `${msg.username}: ${msg.message}`}
					</p>
				))}
			</div>

			<div className="mt-4">
				<div className="p-4 border-t border-gray-300">
					<div className="relative flex items-center">
						<button
							type="button"
							className="absolute left-2 text-gray-500 hover:text-gray-700 focus:outline-none"
						>
							<FiSmile className="w-5 h-5" />
						</button>
						<input
							type="text"
							value={inputMessage}
							onChange={(e) => setInputMessage(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
							placeholder="Type a message..."
							className="w-full p-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
							type="button"
							onClick={handleSendMessage}
							className="absolute right-2 text-blue-500 hover:text-blue-600 focus:outline-none"
						>
							<FiSend className="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatContainer;
