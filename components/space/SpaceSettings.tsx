import React, { useState, useEffect } from "react";
import { FiSettings, FiCopy, FiX } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
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
	const { spaces, refetchSpaces } = useFetchSpaces();
	const [urlCopied, setUrlCopied] = useState(false);
	const [passCopied, setPassCopied] = useState(false);
	const [spaceId, setSpaceId] = useState<string | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
	const [isButtonClicked, setIsButtonClicked] = useState(false);
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
			navigator.clipboard.writeText(spaceUrl).then(() => {
				setUrlCopied(true);
				setTimeout(() => setUrlCopied(false), 2000);
			});
		}
	};

	const handleCopyPasswordClick = async () => {
		if (!spaceId) return;
		await refetchSpaces();
		const space = spaces.find((space) => space.id === spaceId);
		if (space) {
			const spaceUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000"}/space/${space.id}`;
			navigator.clipboard.writeText(space.password).then(() => {
				setPassCopied(true);
				setTimeout(() => setPassCopied(false), 2000);
			});
		}
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
		setIsButtonClicked(true);
		console.log("clicked");

		for (const friend of selectedFriends) {
			await addFriendToSpace(spaceId, friend.id, "anonymous");
		}

		setSelectedFriends([]);
		setIsSearchVisible(false);
		setTimeout(() => setIsButtonClicked(false), 1000);
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
			text: "Copy link",
			onClick: handleCopyLinkClick,
			color: urlCopied ? "text-green-500" : "text-white",
		},
		{
			icon: FiCopy,
			text: "Copy password",
			onClick: handleCopyPasswordClick,
			color: passCopied ? "text-green-500" : "text-white",
		},
		{ icon: RiUserAddFill, text: "Add Friend", onClick: toggleSearchBar },
	];

	return (
		<div className="flex justify-center items-center bg-gray-100">
			<div className="bg-hop-purple p-2 w-full max-w-md relative pt-5">
				<div className="flex flex-col">
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
					<div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
						<div className="w-full max-w-lg mt-8">
							<FriendSearch
								onSelectFriend={handleSelectFriend}
								selectedFriends={selectedFriends}
								onRemoveFriend={handleRemoveFriend}
								onClose={toggleSearchBar}
							/>
						</div>
						<div className="mt-4 flex justify-end">
							<button
								type="button"
								onClick={handleAddFriendsToSpace}
								disabled={selectedFriends.length === 0 || addingUser}
								className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-200 disabled:bg-gray-400"
							>
								{addingUser ? (
									<span className="animate-spin">&#8987;</span>
								) : (
									<IoMdAddCircle />
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
