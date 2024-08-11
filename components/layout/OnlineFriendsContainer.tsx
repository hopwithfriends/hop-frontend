import OnlineFriend from "@components/friends/OnlineFriend";
interface OnlineProps {
	username: string;
	spaceName: string;
	pfp: string;
}

const OnlineFriendsContainer: React.FC<OnlineProps> = ({
	spaceName,
	username,
	pfp,
}) => {
	username = "Username";
	spaceName = "Space name";
	pfp = "/PFP.jpg";

	return (
		<div className="bg-gray-800 w-full h-full p-4 rounded-xl shadow-lg border border-gray-700 overflow-auto">
			<ul className="space-y-3">
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
				<li>
					<OnlineFriend username={username} spaceName={spaceName} pfp={pfp} />
				</li>
			</ul>
		</div>
	);
};

export default OnlineFriendsContainer;
