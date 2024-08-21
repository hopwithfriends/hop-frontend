import { useAcceptSpaceRequest } from "@components/hooks/spaceHooks/useAcceptSpaceRequest";
import { useDeclineSpaceRequest } from "@components/hooks/spaceHooks/useDeclineSpaceRequest";
import type { SpaceRequestType } from "@components/layout/LeftSidebar";
import Image from "next/image";

type SpaceInvitesContainerProps = {
	invites: SpaceRequestType[];
	setSpaceRequests: (invites: SpaceRequestType[]) => void;
};

export default function SpaceInvitesContainer({
	invites,
	setSpaceRequests,
}: SpaceInvitesContainerProps) {
	const { acceptSpaceRequest } = useAcceptSpaceRequest();
	const { declineSpaceRequest } = useDeclineSpaceRequest();

	const handleAccept = async (invite: SpaceRequestType) => {
		try {
			await acceptSpaceRequest(invite.id);
			setSpaceRequests(invites.filter((i) => i.id !== invite.id));
		} catch (error) {
			console.error(error);
		}
	};

	const handleReject = async (invite: SpaceRequestType) => {
		await declineSpaceRequest(invite.id);
		setSpaceRequests(invites.filter((i) => i.id !== invite.id));
	};

	return (
		<div className="flex flex-col gap-2">
			{invites.map((invite) => (
				<div
					key={invite.id}
					className="bg-hop-friend-bg flex items-center gap-2 px-4 py-2 justify-between rounded-md"
				>
					<div className="flex items-center gap-4">
						<Image
							src={invite.inviterId.profilePicture}
							alt={invite.inviterId.username}
							width={30}
							height={30}
							className="rounded-full"
						/>
						<div className="flex flex-col">
							<p className="text-md font-medium">{invite.spaceId.name}</p>
							<p className="text-xs text-hop-light-purple font-normal">
								@{invite.inviterId.username}
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<button
							type="button"
							className="text-sm bg-hop-purple-200 font-small text-white w-7 h-7 rounded-md flex items-center justify-center"
							onClick={() => handleAccept(invite)}
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Accept Space Request</title>
								<path
									d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<button
							type="button"
							className="text-sm bg-hop-purple-200 font-small text-white w-7 h-7 rounded-md flex items-center justify-center"
							onClick={() => handleReject(invite)}
						>
							<svg
								width="15"
								height="15"
								viewBox="0 0 15 15"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<title>Reject Space Request</title>
								<path
									d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
									fill="currentColor"
									fillRule="evenodd"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					</div>
				</div>
			))}
		</div>
	);
}
