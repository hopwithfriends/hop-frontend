import React, { useState, useEffect } from "react";
import { FiSettings, FiCopy, FiX } from "react-icons/fi";
import { RiUserAddFill } from "react-icons/ri";
import { useUser } from "@stackframe/stack";
import FriendSearch from "@components/dashboard/popupCreateSpace/FriendSearch";
import { useFetchSpaces } from "@components/hooks/spaceHooks/useFetchSpaces";
import { useAddFriendToSpace } from "@components/hooks/spaceHooks/useAddFriendToSpace";
import dotenv from "dotenv";
dotenv.config();

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

const SpaceSettings = () => {
	const { spaces, loading, error, refetchSpaces } = useFetchSpaces();
	const [isCopied, setIsCopied] = useState(false);
	const [spaceId, setSpaceId] = useState<string | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
	const user = useUser({ or: "redirect" });
	const { addFriendToSpace, loading: addingUser } = useAddFriendToSpace();

	useEffect(() => {
		const extractSpaceId = () => {
			const path = window.location.pathname;
			const pathParts = path.split("/");
			const id = pathParts[pathParts.length - 1];
			setSpaceId(id);
		};

		extractSpaceId();
	}, []);

	const handleSettingsClick = () => {
		console.log("Settings button clicked");
	};

	const handleCopyLinkClick = async () => {
		if (!spaceId) return;
		await refetchSpaces();
		const space = spaces.find((space) => space.id === spaceId);
		if (space) {
			const spaceUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/space/${space.id}`;
			const shareText = `Space URL: ${spaceUrl}\nPassword: ${space.password}`;
			copyToClipboard(shareText);
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(() => {
			setIsCopied(true);
			console.log("Copied to clipboard:", text);
			setTimeout(() => setIsCopied(false), 2000);
		});
	};

	const handleSelectFriend = (friend: Friend) => {
		if (!selectedFriends.some((friend) => friend.id === `${friend.id}`)) {
			setSelectedFriends([...selectedFriends, friend]);
		}
	};

	const handleRemoveFriend = (removedFriend: Friend) => {
		setSelectedFriends(
			selectedFriends.filter((friend) => friend.id !== removedFriend.id),
		);
	};

	const handleAddFriendsToSpace = async () => {
		if (!spaceId) return;

		for (const friend of selectedFriends) {
			await addFriendToSpace(spaceId, friend.id, "anonymous");
		}

		setSelectedFriends([]);
		setIsSearchVisible(false);
	};

	const toggleSearchBar = () => {
		setIsSearchVisible(!isSearchVisible);
		if (!isSearchVisible) {
			setSelectedFriends([]);
		}
	};

	const buttons = [
		{ icon: FiSettings, text: "Settings", onClick: handleSettingsClick },
		{
			icon: FiCopy,
			text: "Copy",
			onClick: handleCopyLinkClick,
			color: isCopied ? "text-green-500" : "text-white", 
		},
		{ icon: RiUserAddFill, text: "Add Friend", onClick: toggleSearchBar },
	];

	return (
		<div className="flex justify-center items-center bg-gray-100">
			<div className="bg-hop-purple p-2 w-full max-w-md relative pt-5">
				<div className="flex flex-col space-y-4">
					{buttons.map((item) => (
						<button
							key={item.text}
							type="button"
							className={`flex items-center space-x-3 px-5 py-3 w-full hover:bg-gray-800 rounded-lg text-base font-semibold transition-colors ${
								item.color || "text-white"
							}`}
							onClick={item.onClick}
						>
							<item.icon className="w-6 h-6" />
							<span>{item.text}</span>
						</button>
					))}
				</div>

				{isSearchVisible && (
					<div className="absolute inset-0 bg-gray-800 bg-opacity-90 p-8 z-10 flex flex-col justify-center items-center">
						<button
							type="button"
							onClick={toggleSearchBar}
							className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
						>
							<FiX size={28} />
						</button>
						<div className="w-full max-w-lg mt-8">
							<FriendSearch
								onSelectFriend={handleSelectFriend}
								selectedFriends={selectedFriends}
								onRemoveFriend={handleRemoveFriend}
							/>
						</div>
						<div className="absolute mt-[161px] right-5">
							<button
								type="button"
								onClick={handleAddFriendsToSpace}
								disabled={selectedFriends.length === 0 || addingUser}
								className="w-8 h-8 bg-green-600 text-white rounded mr-3 flex items-center justify-center hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-400 text-2xl font-bold"
							>
								{addingUser ? (
									<span className="animate-spin">&#8987;</span>
								) : (
									"+"
								)}
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SpaceSettings;
