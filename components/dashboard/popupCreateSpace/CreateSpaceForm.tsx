import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import { debounce } from "lodash";
import useFetchUsers from "./hooks/FetchUsersFriends";
import useCreateSpace from "./hooks/CreateNewSpace";
import useAddUserToSpace from "./hooks/AddFriendsSpace";

interface User {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
}

const CreateSpaceForm: React.FC = () => {
	const { users, loading: fetchingUsers, error: fetchError } = useFetchUsers();
	const {
		createSpace,
		loading: creating,
		error: createError,
		success,
	} = useCreateSpace();
	const { addUser, loading: adding, error: addError } = useAddUserToSpace();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [spaceName, setSpaceName] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);
	const [spaceId, setSpaceId] = useState<string | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const debouncedSearch = useCallback(
		debounce((query: string) => {
			if (query) {
				const filtered = users
					.filter(
						(user) =>
							user.nickname.toLowerCase().includes(query.toLowerCase()) ||
							user.username.toLowerCase().includes(query.toLowerCase()),
					)
					.slice(0, 4);
				setSearchResults(filtered);
			} else {
				setSearchResults([]);
			}
		}, 300),
		[users],
	);

	useEffect(() => {
		debouncedSearch(searchQuery);
	}, [searchQuery, debouncedSearch]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleUserClick = async (user: User) => {
		if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
			if (spaceId) {
				try {
					await addUser({
						spaceId,
						userId: user.id,
						role: "member",
					});
					setSelectedUsers([...selectedUsers, user]);
				} catch (error) {
					console.error("Failed to add user to space:", error);
				}
			} else {
				setSelectedUsers([...selectedUsers, user]);
			}
		}
		setSearchQuery("");
		setSearchResults([]);
	};

	const handleRemoveUser = (user: User) => {
		setSelectedUsers(
			selectedUsers.filter((selectedUser) => selectedUser.id !== user.id),
		);
	};

	const handleCreateSpace = async () => {
		if (!spaceName.trim()) {
			alert("Please enter a space name");
			return;
		}

		try {
			await createSpace({
				name: spaceName,
				flyUrl: "",
				userId: "",
				theme: "",
			});

			if (success) {
				for (const user of selectedUsers) {
					await addUser({
						spaceId: "",
						userId: user.id,
						role: "member",
					});
				}

				alert("Space created successfully and members added!");
				// Reset form
				setSpaceName("");
				setSelectedUsers([]);
				setIsPrivate(false);
			}
		} catch (error) {
			console.error("Failed to create space or add members:", error);
			alert("An error occurred while creating the space or adding members.");
		}
	};

	if (fetchingUsers) return <div>Loading users...</div>;
	if (fetchError) return <div>Error: {fetchError}</div>;

	return (
		<div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
			<input
				type="text"
				placeholder="Space name"
				value={spaceName}
				onChange={(e) => setSpaceName(e.target.value)}
				className="w-full h-10 px-3 py-1 mb-6 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-xl text-sm"
			/>

			<form onSubmit={handleSearch} className="mb-4 relative">
				<div className="flex">
					<input
						type="text"
						placeholder="Add member"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-grow h-10 px-3 py-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-l-xl text-sm"
					/>
					<button
						type="submit"
						className="h-10 bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition-colors duration-200"
					>
						<Search size={16} />
					</button>
				</div>
				<div className="absolute top-full left-0 right-0 z-10 bg-slate-400/30 backdrop-blur-sm rounded-b-xl shadow-lg">
					{searchResults.map((user) => (
						<div
							key={user.id}
							onClick={() => handleUserClick(user)}
							onKeyDown={() => {}}
							className="cursor-pointer hover:bg-gray-700 p-2 rounded-xl"
						>
							<span className="text-white">{user.nickname}</span>
						</div>
					))}
				</div>
			</form>

			<div className="mb-4">
				<h3 className="text-white mb-2">Members to add</h3>
				<div className="h-[100px] overflow-y-auto pr-2 space-y-2">
					{selectedUsers.map((user) => (
						<div
							key={user.id}
							className="flex items-center justify-between bg-gray-700 rounded-xl p-2"
						>
							<span className="text-white">{user.nickname}</span>
							<button
								type="button"
								onClick={() => handleRemoveUser(user)}
								className="text-red-500 hover:text-red-600"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			</div>

			<div className="flex items-center justify-between mb-4">
				<span className="text-white">Privacy setting</span>
				<label className="flex items-center cursor-pointer">
					<div className="relative">
						<input
							type="checkbox"
							className="sr-only"
							checked={isPrivate}
							onChange={() => setIsPrivate(!isPrivate)}
						/>
						<div
							className={`block w-14 h-8 rounded-full ${
								isPrivate ? "bg-blue-500" : "bg-gray-600"
							}`}
						/>
						<div
							className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
								isPrivate ? "transform translate-x-6" : ""
							}`}
						/>
					</div>
				</label>
			</div>

			<button
				type="button"
				onClick={handleCreateSpace}
				disabled={creating || adding}
				className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-500"
			>
				{creating || adding ? "Creating..." : "Create Space"}
			</button>

			{(createError || addError) && (
				<div className="mt-2 text-red-500">
					Error: {createError || addError}
				</div>
			)}
		</div>
	);
};

export default CreateSpaceForm;