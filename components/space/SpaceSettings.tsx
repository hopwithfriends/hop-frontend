import React, { useState, useEffect } from "react";
import { FiSettings, FiCopy, FiX } from "react-icons/fi";
import { RiUserAddFill } from "react-icons/ri";
import { useUser } from "@stackframe/stack";
import FriendSearch from "@components/dashboard/popupCreateSpace/FriendSearch";
import useAddUserToSpace from "@components/hooks/spaceHooks/useAddUserToSpace";
import { useFetchSpaces } from "@components/hooks/spaceHooks/useFetchSpaces";

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

interface Space {
	id: string;
	name: string;
	password: string;
}

const SpaceSettings = () => {
	const { spaces, loading, error, refetchSpaces } = useFetchSpaces();
	const [isCopied, setIsCopied] = useState(false);
	const [spaceId, setSpaceId] = useState<string | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
	const user = useUser({ or: "redirect" });
	const {
		addUser,
		loading: addingUser,
		error: addUserError,
		success: addUserSuccess,
	} = useAddUserToSpace();

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
		const space = spaces.find((s) => s.id === spaceId);
		if (space) {
			const spaceUrl = `http://localhost:3000/space/${space.id}`;
			const shareText = `Space URL: ${spaceUrl}\nPassword: ${space.password}`;
			copyToClipboard(shareText);
		} else {
			console.log("Space not found");
		}
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text).then(
			() => {
				setIsCopied(true);
				console.log("Copied to clipboard:", text);
				setTimeout(() => setIsCopied(false), 2000);
			},
			(err) => {
				console.error("Could not copy text: ", err);
			},
		);
	};

	const handleSelectFriend = (friend: Friend) => {
		if (!selectedFriends.some((f) => f.id === friend.id)) {
			setSelectedFriends([...selectedFriends, friend]);
		}
	};

	const handleRemoveFriend = (friend: Friend) => {
		setSelectedFriends(selectedFriends.filter((f) => f.id !== friend.id));
	};

	const handleAddFriendsToSpace = async () => {
		if (!spaceId) return;

		for (const friend of selectedFriends) {
			await addUser({
				spaceId: spaceId,
				userId: friend.id,
				role: "member",
			});
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
		<div className="p-4 bg-gray-800 rounded-lg max-w-md mx-auto relative">
			<h2 className="text-xl font-semibold mb-4 text-white">Space Settings</h2>

			<div className="flex flex-col space-y-2">
				{buttons.map((item) => (
					<button
						key={item.text}
						type="button"
						className={`flex items-center space-x-2 p-2 hover:bg-gray-700 rounded text-sm sm:text-base ${item.color || "text-white"}`}
						onClick={item.onClick}
					>
						<item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
						<span>{item.text}</span>
					</button>
				))}
			</div>

			<div
				className={`absolute inset-0 bg-gray-800 bg-opacity-90 p-4 rounded-lg z-10 transition-all duration-300 ease-in-out ${
					isSearchVisible ? "opacity-100 visible" : "opacity-0 invisible"
				}`}
			>
				<button
					type="button"
					onClick={toggleSearchBar}
					className="absolute top-2 right-2 text-white hover:text-gray-300"
				>
					<FiX size={24} />
				</button>
				<FriendSearch
					onSelectFriend={handleSelectFriend}
					selectedFriends={selectedFriends}
					onRemoveFriend={handleRemoveFriend}
				/>
				<div className="absolute bottom-3 right-3 flex items-center">
					{addUserError && (
						<p className="text-red-500 mr-5 text-md">{addUserError}</p>
					)}
					{addUserSuccess && (
						<p className="text-green-500 mr-5 text-md">
							Friends added successfully!
						</p>
					)}
					<button
						type="button"
						onClick={handleAddFriendsToSpace}
						disabled={selectedFriends.length === 0 || addingUser}
						className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 text-2xl font-bold"
					>
						{addingUser ? <span className="animate-spin">&#8987;</span> : "+"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default SpaceSettings;
