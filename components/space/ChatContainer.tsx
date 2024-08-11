import React from "react";
import { FiSend, FiSmile } from "react-icons/fi";

const ChatContainer = () => {
	return (
		<div className="flex flex-col h-full p-4">
			<p className="text-3xl font-semibold p-2">Chat</p>
			<div className="flex-grow bg-white rounded-xl p-4 overflow-y-auto" />
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
							placeholder="Type a message..."
							className="w-full p-2 pl-10 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
						<button
							type="button"
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
