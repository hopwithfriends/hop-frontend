"use client";

import { useState, useEffect, useMemo } from "react";
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
	const [friends, setFriends] = useState<Friend[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await fetch(
					"http://localhost:3000/api/user/friend/6ba7b810-9dad-11d1-80b4-00c04fd430c8",
				);
				if (!response.ok) {
					throw new Error("Failed to fetch friends");
				}
				const data = await response.json();
				setFriends(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				} else {
					setError("An unknown error occurred");
				}
			} finally {
				setLoading(false);
			}
		};

		fetchFriends();
	}, []);

	const filteredFriends = useMemo(() => {
		return friends.filter(
			(friend) =>
				friend.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
				friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
		);
	}, [searchQuery, friends]);

	const handleFriendClick = (friend: Friend) => {
		setSelectedFriend(friend);
	};

	const handleSearch = (query: string) => {
		setSearchQuery(query);
	};

	const handleGlobalAddFriend = (query: string) => {
		console.log("Searching for new friend:", query);
	};

	return (
		<div className="flex h-full w-full ml-3 mr-3 mt-4 rounded-xl bg-gray-600 relative">
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
			</div>
			<GlobalFriendSearch onSearch={handleGlobalAddFriend} friends={friends} />
		</div>
	);
};

export default FriendList;
