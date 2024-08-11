import Image from "next/image";

interface SingleFriendProps {
	profilePicture?: string;
	nickname: string;
	username: string;
	id: string;
	isOnline?: boolean;
	currentRoom?: string;
	onClick: () => void;
}

const SingleFriend: React.FC<SingleFriendProps> = ({
	profilePicture,
	nickname,
	username,
	id,
	isOnline = false,
	currentRoom = "",
	onClick,
}) => {
	const defaultProfilePicture = "/images/pfp-placeholder.png";

	return (
		<div
			className="flex items-center p-3 rounded-2xl bg-gray-700 shadow-md space-x-4 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
			onClick={onClick}
			onKeyDown={onClick}
			onKeyUp={onClick}
			onKeyPress={onClick}
		>
			<div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden relative">
				<Image
					src={profilePicture || defaultProfilePicture}
					alt={`${nickname}'s profile picture`}
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center">
				<div className="flex items-center space-x-2">
					<div className="text-white font-semibold text-lg">{nickname}</div>
					{isOnline ? (
						<div className="w-3.5 h-3.5 bg-green-400 rounded-full" />
					) : (
						<div className="w-3.5 h-3.5 bg-gray-500 rounded-full" />
					)}
				</div>
				<div className="text-gray-400 text-sm">
					{currentRoom ? currentRoom : `@${username}`}
				</div>
			</div>
		</div>
	);
};

export default SingleFriend;
