import { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash/debounce";
import { useFetchFriends } from "./hooks/useFetchFriends";

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

interface FriendSearchProps {
	onSelectFriend: (friend: Friend) => void;
	selectedFriends: Friend[];
	onRemoveFriend: (friend: Friend) => void;
}

const FriendSearch: React.FC<FriendSearchProps> = ({
	onSelectFriend,
	selectedFriends,
	onRemoveFriend,
}) => {
	const { friends, loading, error } = useFetchFriends();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState<Friend[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const debouncedSearch = useCallback(
		debounce((query: string) => {
			if (query && friends) {
				const filtered = friends
					.filter(
						(friend) =>
							(friend.nickname?.toLowerCase() || "").includes(
								query.toLowerCase(),
							) ||
							(friend.username?.toLowerCase() || "").includes(
								query.toLowerCase(),
							),
					)
					.slice(0, 2);
				setSearchResults(filtered);
			} else {
				setSearchResults([]);
			}
		}, 300),
		[friends],
	);

	useEffect(() => {
		debouncedSearch(searchQuery);
	}, [searchQuery, debouncedSearch]);

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
	};

	const handleUserClick = (friend: Friend) => {
		onSelectFriend(friend);
		setSearchQuery("");
		setSearchResults([]);
	};

	if (loading) return <div>Loading friends...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="w-full max-w-md mx-auto p-4 bg-transparent rounded-lg">
			<form onSubmit={handleSearch} className="mb-4 relative">
				<div className="flex">
					<input
						type="text"
						placeholder="Search friends"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-grow h-10 px-3 py-1 bg-gray-700 text-white placeholder-gray-700 focus:outline-none rounded-l-xl text-sm"
					/>
					<button
						type="submit"
						className="h-10 bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600 transition-colors duration-200"
					>
						<Search size={16} />
					</button>
				</div>
				<div className="absolute left-0 right-0 mt-1 z-10 bg-slate-400/90 backdrop-blur-sm rounded-xl shadow-lg">
					{searchResults.map((friend) => (
						<div
							onKeyUp={() => {}}
							key={friend.id}
							onClick={() => handleUserClick(friend)}
							className="cursor-pointer hover:bg-gray-700 p-2 rounded-xl"
						>
							<span className="text-white">{friend.username}</span>
						</div>
					))}
				</div>
			</form>

			<div className="mb-4">
				<h3 className="text-white mb-2">Selected Friends</h3>
				<div className="h-[77px] overflow-y-auto pr-2 space-y-2">
					{selectedFriends.map((friend) => (
						<div
							key={friend.id}
							className="flex items-center justify-between bg-gray-700 rounded-xl p-2"
						>
							<span className="text-white">{friend.username}</span>
							<button
								type="button"
								onClick={() => onRemoveFriend(friend)}
								className="text-red-500 hover:text-red-600"
							>
								<X size={16} />
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FriendSearch;
