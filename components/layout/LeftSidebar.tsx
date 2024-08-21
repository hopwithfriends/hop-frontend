"use client";

import { Logo } from "@/components/ui/Logo";
import Link from "next/link";
import OnlineFriendsContainer from "./OnlineFriendsContainer";
import type { FriendsType } from "@app/context/SocketProvider";
import FriendInvitesContainer from "@components/dashboard/FriendInvitesContainer";
import SpaceInvitesContainer from "@components/dashboard/SpaceInvitesContainer";
import { useEffect, useState } from "react";
import { useFetchFriendRequests } from "@components/hooks/friendHooks/useFetchFriendRequests";
import { useUser } from "@stackframe/stack";
import { useFetchSpaceRequests } from "@components/hooks/spaceHooks/useFetchSpaceRequests";

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

export type SpaceRequestType = {
	id: string;
	spaceId: {
		id: string;
		name: string;
	};
	inviterId: {
		id: string;
		username: string;
		profilePicture: string;
	};
	role: string;
};

const LeftSidebar: React.FC<LeftSidebarProps> = ({ friends }) => {
	const user = useUser();
	const [friendInvites, setFriendInvites] = useState<FriendRequestType[]>([]);
	const [spaceRequests, setSpaceRequests] = useState<SpaceRequestType[]>([]);
	const { fetchFriendRequests, loading: friendRequestLoading } =
		useFetchFriendRequests();
	const { fetchSpaceRequests } = useFetchSpaceRequests();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchFriendRequestsData = async () => {
			const friendRequests = await fetchFriendRequests();
			if (friendRequests === null) {
				setFriendInvites([]);
				return;
			}
			setFriendInvites(friendRequests);
		};

		const fetchSpaceRequestsData = async () => {
			const spaceRequestsData = await fetchSpaceRequests();
			if (spaceRequestsData === null) {
				setSpaceRequests([]);
				return;
			}
			setSpaceRequests(spaceRequestsData);
			console.log("Space Requests Data", spaceRequestsData);
		};
		fetchFriendRequestsData();
		fetchSpaceRequestsData();
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
						<span className="text-xl font-semibold text-hop-text-purple px-24 py-2">
							friends
						</span>
					</button>
				</Link>
				<p className="text-2xl font-bold text-white mt-5">online friends</p>
				<OnlineFriendsContainer friends={friends} />
				<div className="mt-5">
					{spaceRequests.length > 0 || friendInvites.length > 0 ? (
						<h1 className="text-2xl font-bold text-white mb-1">invites</h1>
					) : null}
					<div>
						{friendInvites && friendInvites.length > 0 && (
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
								className={`text-sm font-bold text-hop-purple-400 mb-2 ${friendInvites && friendInvites.length === 0 ? "mt-2" : "mt-8"}`}
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
