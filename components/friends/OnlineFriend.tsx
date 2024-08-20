import { useState, useRef } from "react";
import Image from "next/image";
import HoverCard from "./HoverCard";

interface OnlineFriendProps {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

const OnlineFriend: React.FC<OnlineFriendProps> = (friend) => {
	const [showHoverCard, setShowHoverCard] = useState(false);
	const friendRef = useRef<HTMLDivElement>(null);
	const defaultProfilePicture = "/images/pfp-placeholder.png";

	return (
		<div
			ref={friendRef}
			className="bg-hop-friend-bg py-3 pl-4 rounded-xl relative flex gap-2"
			onMouseEnter={() => setShowHoverCard(true)}
			onMouseLeave={() => setShowHoverCard(false)}
		>
			<div className="relative w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
				<Image
					src={friend.profilePicture || defaultProfilePicture}
					alt={`${friend.nickname}'s profile picture`}
					fill={true}
					sizes="100%"
					className="object-cover"
				/>
			</div>
			<div className="">
				<div className="flex items-center gap-2">
					<div className="text-white font-medium text-md">
						{friend.username}
					</div>
					<div
						className={`w-2 h-2 rounded-full ${friend.isOnline ? "bg-gray-500" : "bg-green-400"}`}
					/>
				</div>
				<div className="text-hop-light-purple text-xs">
					{friend.currentRoom || `@${friend.nickname}`}
				</div>
			</div>
			{showHoverCard && <HoverCard friend={friend} parentRef={friendRef} />}
		</div>
	);
};

export default OnlineFriend;
