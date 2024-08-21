import Image from "next/image";
import { Button } from "@components/ui/Button";
import DeleteFriendComponent from "./RemoveFriend";

interface FriendProfileProps {
	friend: {
		id: string;
		nickname: string;
		username: string;
		profilePicture?: string;
		status: string | { name: string; spaceId: string } | null;
	},
	onClose: () => void;
	onFriendRemoved: (friendId: string) => void;
}

const FriendProfileRemoveBTN: React.FC<FriendProfileProps> = ({
	friend,
	onClose,
	onFriendRemoved,
}) => {
	const defaultProfilePicture = "/images/pfp-placeholder.png";

	return (
		<div className=" bg-[#2f2754] p-6 rounded-xl shadow-lg">
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
						fill={true}
						sizes="100%"
						className="object-cover"
					/>
				</div>
				<h2 className="text-2xl font-bold text-white mb-2">
					{friend.nickname}
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
				<div className="flex flex-col items-center mt-4">
					<button
						className="focus:outline-none font-bold  text-white bg-[#7964D9] hover:bg-[#534399] rounded-md text-md px-5 py-2 mx-3 my-3 transition duration-300 ease-in-out"
						type="button"
					>
						Send message
					</button>
					<DeleteFriendComponent
						friendId={friend.id}
						onFriendRemoved={onFriendRemoved}
					/>
				</div>
			</div>
		</div>
	);
};

export default FriendProfileRemoveBTN;
