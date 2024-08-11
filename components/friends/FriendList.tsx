"use client";

import { useState, useMemo } from "react";
import SingleFriend from "./FriendComponent";
import FriendProfile from "./FriendProfile";
import SlidingSearchBar from "./SearchFreands";
import GlobalFriendSearch from "./GlobalFriendSearch";

interface Friend {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

const FriendList: React.FC = () => {
	const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
	const [searchQuery, setSearchQuery] = useState("");

	const friends: Friend[] = [
		{
			id: "1",
			nickname: "John Doe",
			username: "johndoe",
			isOnline: true,
			currentRoom: "Gaming Lounge",
		},
		{
			id: "2",
			nickname: "Jane Smith",
			username: "janesmith",
			isOnline: false,
		},
		{
			id: "3",
			nickname: "Alice",
			username: "alice",
			isOnline: true,
		},
		{
			id: "4",
			nickname: "Bob",
			username: "bob",
			isOnline: true,
		},
		{
			id: "5",
			nickname: "Charlie",
			username: "charlie",
			isOnline: true,
		},
	];

	const filteredFriends = useMemo(() => {
		return friends.filter(
			(friend) =>
				friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
				friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery]);

	const handleFriendClick = (friend: Friend) => {
		setSelectedFriend(friend);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleClose = () => {
		// Add your logic here
	};

	const handleGlobalAddFriend = (query: string) => {
		// Implement global add friend logic here
		console.log("Searching for new friend:", query);
	};

	return (
		<div className="flex h-full w-full ml-3 mr-3 mt-4 rounded-xl bg-gray-600">
			<div className="w-2/5 overflow-auto px-6 pb-6">
				<div className="flex justify-between items-center mb-4 px-6 pt-3">
					<h2 className="text-2xl font-bold">Friends</h2>
					<SlidingSearchBar onSearch={handleSearch} />
				</div>
				<div className="flex-grow overflow-y-auto px-6 pb-6 rounded-2xl">
					<div className="flex flex-col space-y-4">
						{filteredFriends.map((friend) => (
							<SingleFriend
								key={friend.id}
								{...friend}
								onClick={() => handleFriendClick(friend)}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="w-3/5 p-6">
				{selectedFriend ? (
					<FriendProfile
						friend={selectedFriend}
						onClose={() => setSelectedFriend(null)}
					/>
				) : (
					<div className="flex items-center justify-center h-full text-gray-400">
						Select a friend to view their profile
					</div>
				)}
				<GlobalFriendSearch onSearch={handleGlobalAddFriend} />
			</div>
		</div>
	);
};

export default FriendList;
