'use client';

import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
// import { FaUserFriends } from "react-icons/fa";
import OnlineFriendsContainer from "./OnlineFriendsContainer";
import type { FriendsType } from "@app/context/SocketProvider";
import FriendInvitesContainer from "@components/dashboard/FriendInvitesContainer";
import SpaceInvitesContainer from "@components/dashboard/SpaceInvitesContainer";
import { useEffect, useState } from "react";
import { useFetchFriendRequests } from "@components/hooks/friendHooks/useFetchFriendRequests";
import { useUser } from "@stackframe/stack";

interface LeftSidebarProps {
	friends: FriendsType[];
}

export type FriendRequestType = {
	id: string;
	userId: {
		id: string;
		profilePicture: string;
		username: string;
	};
	friendId: string;
};

export type FriendInviteType = {
	id: string;
	username: string;
	profilePicture: string;
};

const mockFriendInvites = [
	{
		id: "1",
		username: "@aidan",
		profilePicture: "https://via.placeholder.com/150",
	},
	{
		id: "2",
		username: "@aidan",
		profilePicture: "https://via.placeholder.com/150",
	},
	{
		id: "3",
		username: "@aidan",
		profilePicture: "https://via.placeholder.com/150",
	},
];

export type SpaceRequestType = {
	id: string;
	spaceName: string;
	username: string;
	profilePicture: string;
};

const mockSpaceRequests = [
	{
		id: "1",
		spaceName: "Space 1",
		username: "@aidan",
		profilePicture: "https://via.placeholder.com/150",
	},
	{
		id: "2",
		spaceName: "Space 2",
		username: "@aidan",
		profilePicture: "https://via.placeholder.com/150",
	},
];

const LeftSidebar: React.FC<LeftSidebarProps> = ({ friends }) => {
	const user = useUser();
	const [friendInvites, setFriendInvites] = useState<FriendRequestType[]>([]);
	const [spaceRequests, setSpaceRequests] =
		useState<SpaceRequestType[]>(mockSpaceRequests);
	const {
		fetchFriendRequests,
		loading: friendRequestLoading,
		error: friendRequestError,
	} = useFetchFriendRequests();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchFriendRequestsData = async () => {
			const friendRequests = await fetchFriendRequests();
			if (friendRequests === null) {
				setFriendInvites([]);
				return;
			}
			setFriendInvites(friendRequests);
			console.log(friendRequests);
		};
		fetchFriendRequestsData();
	}, []);

	return (
		<div className="bg-hop-purple text-white p-6 w-80 h-screen flex flex-col items-center">
			<Link href="/dashboard" className="mt-10">
				<Logo />
			</Link>
			<nav className="mt-10">
				<Link href="/friends">
					<button
						type="button"
						className="bg-gradient-to-r from-purp-grad-1 to-purp-grad-2 mt-1 flex items-center justify-center rounded-xl"
					>
						<span className="text-2xl font-semibold text-hop-text-purple px-24 py-4">
							friends
						</span>
					</button>
				</Link>
				<p className="text-2xl font-bold text-white mt-5">online friends</p>
				{friendRequestLoading ? (
					"loading.."
				) : (
					<OnlineFriendsContainer friends={friends} />
				)}

				<div className="mt-5">
					{spaceRequests.length > 0 || friendInvites.length > 0 ? (
						<h1 className="text-2xl font-bold text-white mb-1">invites</h1>
					) : null}
					<div>
						{friendInvites.length > 0 && (
							<h2 className="text-sm font-bold text-hop-purple-400 mb-2">
								FRIEND REQUESTS
							</h2>
						)}
						<FriendInvitesContainer
							invites={friendInvites}
							setFriendInvites={setFriendInvites}
						/>
					</div>
					<div>
						{spaceRequests.length > 0 && (
							<h2
								className={`text-sm font-bold text-hop-purple-400 mb-2 ${friendInvites.length === 0 ? "mt-2" : "mt-8"}`}
							>
								SPACE INVITES
							</h2>
						)}
						<SpaceInvitesContainer
							invites={spaceRequests}
							setSpaceRequests={setSpaceRequests}
						/>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default LeftSidebar;
