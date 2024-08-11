"use client";

import { useState } from "react";
import { Search, UserPlus, X } from "lucide-react";

interface GlobalFriendSearchProps {
	onSearch: (query: string) => void;
}

const GlobalFriendSearch: React.FC<GlobalFriendSearchProps> = ({
	onSearch,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");

	const toggleSearch = () => {
		setIsOpen(!isOpen);
		if (!isOpen) {
			setTimeout(
				() => document.getElementById("global-search-input")?.focus(),
				300,
			);
		} else {
			setSearchQuery("");
			onSearch("");
		}
	};

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		onSearch(searchQuery);
	};

	const handleClose = () => {
		setIsOpen(false);
		setSearchQuery("");
		onSearch("");
	};

	return (
		<div className="absolute bottom-6 right-6 flex items-center">
			<div
				className={`relative flex items-center transition-all duration-300 ease-in-out ${isOpen ? "mr-3" : "mr-0"}`}
			>
				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-64" : "w-0"}`}
				>
					<form onSubmit={handleSearch} className="h-full flex">
						<input
							id="global-add-friend-input"
							type="text"
							placeholder="Find new friends..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full h-10 px-3 py-1 bg-gray-700 text-white placeholder-gray-400 focus:outline-none rounded-l-full text-sm"
						/>
						<button
							type="submit"
							className="h-10 bg-blue-500 text-white px-3 rounded-r-full hover:bg-blue-600 transition-colors duration-200"
						>
							<Search size={16} />
						</button>
					</form>
				</div>
				{isOpen && (
					<button
						onClick={handleClose}
						type="button"
						className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
					/>
				)}
			</div>
			<button
				onClick={toggleSearch}
				className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center focus:outline-none hover:bg-blue-600 transition-colors duration-200 shadow-lg flex-shrink-0"
				type="button"
			>
				<UserPlus className="text-white" size={20} />
			</button>
		</div>
	);
};

export default GlobalFriendSearch;
