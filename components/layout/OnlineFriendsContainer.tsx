"use client";

import type { FriendsType } from "@app/context/SocketProvider";
import OnlineFriend from "@components/friends/OnlineFriend";

interface OnlineFriendsContainerProps {
	friends: FriendsType[];
}

const OnlineFriendsContainer: React.FC<OnlineFriendsContainerProps> = ({
	friends,
}) => {
	const onlineFriends = friends.filter((friend) => friend.status);

	return (
		<div className="bg-gray-800 w-full h-full p-4 rounded-xl shadow-lg border border-gray-700 overflow-auto">
			<ul className="space-y-3">
				{onlineFriends.map((friend) => (
					<li key={friend.id}>
						<OnlineFriend
							id={friend.id}
							nickname={friend.nickname}
							username={friend.username}
							profilePicture={friend.profilePicture}
							currentRoom={friend.status.spaceId}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default OnlineFriendsContainer;
