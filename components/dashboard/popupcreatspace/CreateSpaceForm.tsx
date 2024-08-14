import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useUser } from "@stackframe/stack";

interface User {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
}

const CreateSpaceForm: React.FC = () => {
	const user = useUser({ or: "redirect" });
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [spaceName, setSpaceName] = useState("");
	const [isPrivate, setIsPrivate] = useState(false);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { accessToken, refreshToken } = await user.getAuthJson();

				const response = await fetch("http://localhost:8080/api/user/friend", {
					headers: {
						"x-stack-access-token": accessToken ?? "",
						"x-stack-refresh-token": refreshToken ?? "",
					},
				});

				if (!response.ok) {
					throw new Error(
						`Failed to fetch users: ${response.status} ${response.statusText}`,
					);
				}

				const data = await response.json();
				setUsers(data);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "An unknown error occurred",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [user]);

	useEffect(() => {
		if (searchQuery) {
			const filtered = users
				.filter(
					(user) =>
						user.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
						user.username.toLowerCase().includes(searchQuery.toLowerCase()),
				)
				.slice(0, 4);
			setSearchResults(filtered);
		} else {
			setSearchResults([]);
		}
	}, [searchQuery, users]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleUserClick = (user: User) => {
		if (!selectedUsers.some((selectedUser) => selectedUser.id === user.id)) {
			setSelectedUsers([...selectedUsers, user]);
		}
		setSearchQuery("");
		setSearchResults([]);
	};

	const handleRemoveUser = (user: User) => {
		setSelectedUsers(
			selectedUsers.filter((selectedUser) => selectedUser.id !== user.id),
		);
	};

	const handleCreateSpace = () => {
		console.log("Creating space:", {
			name: spaceName,
			members: selectedUsers,
			isPrivate,
		});
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="w-full max-w-md mx-auto p-4 bg-gray-800 rounded-lg">
			<div className="mb-6">
				<input
					type="text"
					placeholder="Space name"
					value={spaceName}
					onChange={(e) => setSpaceName(e.target.value)}
					className="w-full h-10 px-3 py-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-xl text-sm"
				/>
			</div>

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
					{" "}
					{searchResults.map((user) => (
						<div
							key={user.id}
							onClick={() => handleUserClick(user)}
							onKeyDown={() => {}}
							onKeyUp={() => {}}
							onKeyPress={() => {}}
							className="cursor-pointer hover:bg-gray-700 p-2 rounded-xl"
						>
							<span className="text-white">{user.nickname}</span>
						</div>
					))}
				</div>
			</form>

			<div className="mb-4">
				<h3 className="text-white mb-2">Members</h3>
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
							className={`block w-14 h-8 rounded-full ${isPrivate ? "bg-blue-500" : "bg-gray-600"}`}
						/>
						<div
							className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isPrivate ? "transform translate-x-6" : ""}`}
						/>
					</div>
				</label>
			</div>

			<button
				type="button"
				onClick={handleCreateSpace}
				className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition-colors duration-200"
			>
				Create
			</button>
		</div>
	);
};

export default CreateSpaceForm;
