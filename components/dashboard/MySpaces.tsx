import { useState, useEffect } from "react";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import CreateSpaceButton from "./CreateSpaceButton";
import RemoveSpaceButton from "@components/space/RemoveSpace";
import { FaLink, FaSearch } from "react-icons/fa";
import FriendSearch from "./popupCreateSpace/FriendSearch";
import useAddUserToSpace from "@components/hooks/spaceHooks/useAddUserToSpace";

interface Space {
	flyUrl: string;
	id: string;
	name: string;
	theme: string;
	password: string;
}

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

const UserSpaces = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [spaces, setSpaces] = useState<Space[]>([]);
	const user = useUser({ or: "redirect" });
	const [copiedSpaceId, setCopiedSpaceId] = useState<string | null>(null);
	const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
	const [isSearchVisible, setIsSearchVisible] = useState(false);
	const [selectedFriends, setSelectedFriends] = useState<Friend[]>([]);
	const {
		addUser,
		loading: addingUser,
		error: addUserError,
		success: addUserSuccess,
	} = useAddUserToSpace();

	const fetchSpaces = async () => {
		setLoading(true);
		setError(null);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error(
					"Access/refresh token are required for the ServiceMethods",
				);
			}

			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const response = await serviceMethods.fetchUserSpaces();

			console.log("Fetched user spaces:", response);

			if (Array.isArray(response) && response.length > 0) {
				setSpaces(response);
			} else {
				setSpaces([]);
			}
		} catch (err) {
			console.error("Error fetching user spaces:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching user spaces.",
			);
		} finally {
			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchSpaces();
	}, []);

	const openVNC = (spaceId: string) => {
		const spaceUrl = `http://localhost:3000/space/${spaceId}`;
		window.open(spaceUrl, "_blank");
	};

	const handleRemoveSpace = (removedSpaceId: string) => {
		setSpaces(spaces.filter((space) => space.id !== removedSpaceId));
	};

	const copyToClipboard = (space: Space) => {
		const spaceUrl = `http://localhost:3000/space/${space.id}`;
		const textToCopy = `Space URL: ${spaceUrl}\nPassword: ${space.password}`;
		navigator.clipboard.writeText(textToCopy).then(() => {
			setCopiedSpaceId(space.id);
			setTimeout(() => setCopiedSpaceId(null), 3000);
		});
	};
	const toggleSearchBar = (spaceId: string) => {
		if (selectedSpaceId === spaceId) {
			setIsSearchVisible(false);
			setTimeout(() => {
				setSelectedSpaceId(null);
			}, 300);
		} else {
			setSelectedSpaceId(spaceId);
			setIsSearchVisible(true);
		}
		setSelectedFriends([]);
	};

	const handleSelectFriend = (friend: Friend) => {
		setSelectedFriends((prev) => [...prev, friend]);
	};

	const handleRemoveFriend = (friend: Friend) => {
		setSelectedFriends((prev) => prev.filter((f) => f.id !== friend.id));
	};

	const handleAddFriendsToSpace = async () => {
		if (!selectedSpaceId) return;

		for (const friend of selectedFriends) {
			await addUser({
				spaceId: selectedSpaceId,
				userId: friend.id,
				role: "member",
			});
		}

		setIsSearchVisible(false);
		setTimeout(() => {
			setSelectedSpaceId(null);
			setSelectedFriends([]);
		}, 300);
	};

	return (
		<div className="container mx-auto px-4">
			{error && <p className="text-red-500 mt-2 mb-4">{error}</p>}
			<div className="mb-4">
				<CreateSpaceButton />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{spaces.map((space) => (
					<div key={space.id} className="flex flex-col">
						<div className="relative w-full h-56">
							<div className="relative w-full h-full rounded-2xl border-4 border-gray-800 overflow-hidden cursor-pointer">
								<div
									onKeyUp={() => {}}
									onClick={() => openVNC(space.id)}
									className="w-full h-full relative"
								>
									<Image
										src="/placeholder.jpg"
										alt={space.name}
										fill={true}
										sizes="100%"
										priority
										className="object-cover"
									/>
								</div>
								<div className="absolute bottom-2 right-2 border-0">
									<RemoveSpaceButton
										spaceId={space.id}
										onRemove={handleRemoveSpace}
									/>
								</div>
							</div>
							<div
								className={`absolute inset-0 bg-gray-800 bg-opacity-90 p-4 rounded-2xl z-10 transition-all duration-300 ease-in-out ${
									isSearchVisible && selectedSpaceId === space.id
										? "opacity-100 visible"
										: "opacity-0 invisible"
								}`}
							>
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
										{addingUser ? (
											<span className="animate-spin">&#8987;</span>
										) : (
											"+"
										)}
									</button>
								</div>
							</div>
							<div className="flex items-center justify-between text-sm sm:text-base mt-2">
								<p className="font-bold truncate max-w-[150px]">{space.name}</p>
								<div className="flex items-center">
									{copiedSpaceId === space.id ? (
										<span className="ml-2 text-green-500">Copied</span>
									) : (
										<FaLink
											className="w-5 h-5 ml-2 text-gray-500 cursor-pointer"
											onClick={(e) => {
												e.stopPropagation();
												copyToClipboard(space);
											}}
											title="Copy space URL and password to clipboard"
										/>
									)}
									<FaSearch
										className="w-5 h-5 ml-2 text-gray-500 cursor-pointer"
										onClick={() => toggleSearchBar(space.id)}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserSpaces;
