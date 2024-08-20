import type { FriendInviteType } from "@components/layout/LeftSidebar";
import Image from "next/image";
import { useState } from "react";

type FriendInvitesContainerProps = {
	invites: FriendInviteType[];
	setFriendInvites: (invites: FriendInviteType[]) => void;
};

export default function FriendInvitesContainer({
	invites,
	setFriendInvites,
}: FriendInvitesContainerProps) {
	const handleAcceptInvite = (invite: FriendInviteType) => {
		// ! Implement endpoint interaction here
		setFriendInvites(invites.filter((i) => i.id !== invite.id));
	};

	const handleRejectInvite = (invite: FriendInviteType) => {
		// ! Implement endpoint interaction here
		setFriendInvites(invites.filter((i) => i.id !== invite.id));
	};

	return (
		<div className="flex flex-col gap-2">
			{invites.map((invite) => (
				<div
					key={invite.id}
					className="bg-hop-friend-bg flex items-center gap-2 px-4 py-2 justify-between rounded-md"
				>
					<div className="flex items-center gap-2">
						<Image
							src={invite.profilePicture}
							alt={invite.username}
							width={20}
							height={20}
							className="rounded-full"
						/>
						<div className="text-sm font-medium">{invite.username}</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							onClick={() => handleAcceptInvite(invite)}
							className="text-sm bg-hop-purple-200 font-small text-white px-4 py-1 rounded-md"
						>
							Accept
						</button>
						<button
							type="button"
							onClick={() => handleRejectInvite(invite)}
							className="text-sm bg-hop-purple-200 font-small text-white w-7 h-7 rounded-md flex items-center justify-center"
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Reject Friend Request</title>
								<path
									d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
									fill="currentColor"
									fill-rule="evenodd"
									clip-rule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}