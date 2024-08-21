import Image from "next/image";

interface SingleFriendProps {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	status: string | {name:string, spaceId: string} | null;
	onClick: () => void;
}

const SingleFriend: React.FC<SingleFriendProps> = ({
	profilePicture,
	nickname,
	username,
	id,
	status,
	onClick,
}) => {
	const defaultProfilePicture = "/images/pfp-placeholder.png";
	
	return (
		<div
			className="flex items-center p-3 rounded-2xl  bg-[#2f2754] hover:bg-[#534399] text-lg px-5 py-2 mx-3 ease-in-out  shadow-md space-x-4 cursor-pointer transition-colors duration-200"
			onClick={onClick}
			onKeyDown={onClick}
			onKeyPress={onClick}
			onKeyUp={onClick}
			role="button"
			tabIndex={0}
		>
			<div className="w-14 h-14 rounded-full flex-shrink-0 overflow-hidden relative">
				<Image
					src={`${profilePicture}` || defaultProfilePicture}
					alt={`${nickname}'s profile picture`}
					fill={true}
					sizes="100%"
					className="object-cover"
				/>
			</div>
			<div className="flex-1 flex flex-col justify-center">
				<div className="flex items-center space-x-2">
					<div className="text-white font-semibold text-lg">{nickname}</div>
					<div
						className={`w-3.5 h-3.5 rounded-full ${
							status ? "bg-green-400" : "bg-gray-500"
						}`}
					/>
				</div>
				<div className="text-gray-400 text-sm">
					{`@${username}`}
				</div>
			</div>
		</div>
	);
};

export default SingleFriend;
