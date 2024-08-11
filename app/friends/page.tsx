import GroupList from "@components/friends/CreateGroupModal";
import FriendList from "@components/friends/FriendList";
import GroupsComponent from "@components/friends/GroupsComponent";
import LeftSidebar from "@components/layout/LeftSidebar";

const FriendsPage = () => {
	return (
		<div className="flex h-screen overflow-hidden bg-gray-500">
			<LeftSidebar />
			<FriendList />
		</div>
	);
};

export default FriendsPage;
