import Image from "next/image";

interface FriendProfileProps {
	friend: {
		id: string;
		nickname: string;
		username: string;
		profilePicture?: string;
		status: string | { name: string; spaceId: string } | null;
	};
	onClose: () => void;
}

const FriendProfile: React.FC<FriendProfileProps> = ({ friend, onClose }) => {
	const defaultProfilePicture = "/images/pfp-placeholder.png";
	
	return (
		<div className="bg-gray-700 p-6 rounded-xl shadow-lg">
			<button
				onClick={onClose}
				className="float-right text-gray-400 hover:text-white"
				type="button"
			>
				&times; Close
			</button>
			<div className="flex flex-col items-center">
				<div className="w-24 h-24 rounded-full overflow-hidden relative mb-4">
					<Image
						src={friend.profilePicture || defaultProfilePicture}
						alt={`${friend.nickname}'s profile picture`}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<h2 className="text-2xl font-bold text-white mb-2">
					{friend.nickname}
					{`${friend.status} haaa`}
				</h2>
				<p className="text-gray-400 mb-4">@{friend.username}</p>
				<div className="flex items-center mb-4">
					<div
						className={`w-3 h-3 rounded-full mr-2 ${friend.status ? "bg-green-400" : "bg-gray-500"}`}
					/>
					<span className="text-gray-300">
						{friend.status ? "Online" : "Offline"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default FriendProfile;
