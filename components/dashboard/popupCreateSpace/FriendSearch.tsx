import { useState, useCallback, useEffect } from "react";
import { Search, X } from "lucide-react";
import debounce from "lodash/debounce";
import { useFetchFriends } from "@components/hooks/friendHooks/useFetchFriends";

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

	return (
		<div className="w-full max-w-md mx-auto p-6 bg-hop-purple rounded-lg ">
			<form onSubmit={handleSearch} className="relative">
				<div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
					<input
						type="text"
						placeholder="Search friends"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="flex-grow h-12 px-4 py-2 bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-l-lg text-sm"
					/>
					<button
						type="submit"
						className="h-12 bg-purple-500 text-white px-4 rounded-r-lg hover:bg-purple-600 transition-colors duration-150 flex items-center justify-center"
					>
						<Search size={16} />
					</button>
				</div>
				<div className="absolute left-0 right-0 mt-2 bg-white rounded-lg max-h-48 overflow-y-auto z-10">
					{searchResults.map((friend) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div
							key={friend.id}
							onClick={() => handleUserClick(friend)}
							className="cursor-pointer hover:bg-gray-200 p-3 rounded-lg transition-colors duration-150"
						>
							<span className="text-gray-900">{friend.username}</span>
						</div>
					))}
				</div>
			</form>

			<div>
				<div className="max-h-16 h-16 overflow-y-auto space-y-1">
					{selectedFriends.map((friend) => (
						<div
							key={friend.id}
							className="flex items-center justify-between bg-gray-100 border border-gray-200 rounded-lg p-3"
						>
							<span className="text-gray-900">{friend.username}</span>
							<button
								type="button"
								onClick={() => onRemoveFriend(friend)}
								className="text-red-500 hover:text-red-600 transition-colors duration-150"
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
