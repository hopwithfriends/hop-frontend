import OnlineFriend from "@components/friends/OnlineFriend";

interface Friend {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
	isOnline?: boolean;
	currentRoom?: string;
}

interface OnlineFriendsContainerProps {
	friends: Friend[];
}

const OnlineFriendsContainer: React.FC<OnlineFriendsContainerProps> = ({
	friends,
}) => {
	const onlineFriends = friends.filter((friend) => friend.isOnline);

	return (
		<div className="bg-gray-800 w-full h-full p-4 rounded-xl shadow-lg border border-gray-700 overflow-auto">
			<ul className="space-y-3">
				{onlineFriends.map((friend) => (
					<li key={friend.id}>
						<OnlineFriend
							nickname={friend.nickname}
							username={friend.username}
							profilePicture={friend.profilePicture}
							currentRoom={friend.currentRoom}
							id={""}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default OnlineFriendsContainer;
