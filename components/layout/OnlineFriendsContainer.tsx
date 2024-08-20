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
		<div className="w-full rounded-xl shadow-lg overflow-auto">
			<ul className="space-y-3">
				{onlineFriends.map((friend) => (
					<li key={friend.id} className="w-full mt-3 flex flex-col gap-2">
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
