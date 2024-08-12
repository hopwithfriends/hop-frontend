"use client";

import { useState, useEffect } from "react";
import { Search, UserPlus, X } from "lucide-react";
import PopContainer from "./PopUpContainer";
import FriendProfile from "./FriendProfile";
import SingleFriend from "./FriendComponent";

interface Friend {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

interface GlobalFriendSearchProps {
	onSearch: (query: string) => void;
	friends: Friend[];
}

const GlobalFriendSearch: React.FC<GlobalFriendSearchProps> = ({
	onSearch,
	friends,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Friend[]>([]);
	const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

	useEffect(() => {
		if (searchQuery) {
			const filtered = friends.filter(
				(friend) =>
					friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
					friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
			);
			setSearchResults(filtered);
		} else {
			setSearchResults([]);
		}
	}, [searchQuery, friends]);

	const toggleSearch = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			setSearchQuery("");
			setSearchResults([]);
			setSelectedFriend(null);
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	const handleClose = () => {
		setIsOpen(false);
		setSearchQuery("");
		setSearchResults([]);
		setSelectedFriend(null);
	};

	const handleFriendClick = (friend: Friend) => {
		setSelectedFriend(friend);
	};

	return (
		<>
			<button
				onClick={toggleSearch}
				className="absolute bottom-6 right-6 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors duration-200 shadow-lg"
				type="button"
			>
				<UserPlus className="text-white" size={20} />
			</button>

			<PopContainer isOpen={isOpen} onClose={handleClose}>
				<div className="p-6 w-96">
					<h2 className="text-2xl font-bold mb-4 text-white">Find Friends</h2>
					<form onSubmit={handleSearch} className="mb-4">
						<div className="flex">
							<input
								id="global-add-friend-input"
								type="text"
								placeholder="Search for friends..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="flex-grow h-10 px-3 py-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-l-md text-sm"
							/>
							<button
								type="submit"
								className="h-10 bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600 transition-colors duration-200"
							>
								<Search size={16} />
							</button>
						</div>
					</form>

					{selectedFriend ? (
						<FriendProfile
							friend={selectedFriend}
							onClose={() => setSelectedFriend(null)}
						/>
					) : (
						<div className="max-h-80 overflow-y-auto">
							{searchResults.map((friend) => (
								<SingleFriend
									key={friend.id}
									{...friend}
									onClick={() => handleFriendClick(friend)}
								/>
							))}
						</div>
					)}

					<button
						onClick={handleClose}
						type="button"
						className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
					>
						Close
					</button>
				</div>
			</PopContainer>
		</>
	);
};

export default GlobalFriendSearch;
