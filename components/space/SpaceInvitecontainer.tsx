import { useEffect, useState } from "react";
import { useAcceptSpaceRequest } from "@components/hooks/spaceHooks/useAcceptSpaceRequest";
import { useDeclineSpaceRequest } from "@components/hooks/spaceHooks/useDeclineSpaceRequest";
import { useFetchInvitedSpaces } from "@components/hooks/spaceHooks/useFetchInvitedSpaces";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";

interface SpaceRequest {
	id: string;
	spaceId: string;
	inviterId: string;
	invitedId: string;
	role: string;
}

interface SpaceDetails {
	id: string;
	name: string;
}

interface SpaceDetailsMap {
	[spaceId: string]: SpaceDetails;
}

const SpaceRequestsContainer: React.FC = () => {
	const [spaceRequests, setSpaceRequests] = useState<SpaceRequest[]>([]);
	const [spaceDetails, setSpaceDetails] = useState<SpaceDetailsMap>({});
	const {
		fetchInvitedSpaces,
		loading: fetchLoading,
		error: fetchError,
	} = useFetchInvitedSpaces();
	const {
		acceptSpaceRequest,
		loading: acceptLoading,
		error: acceptError,
	} = useAcceptSpaceRequest();
	const {
		declineSpaceRequest,
		loading: declineLoading,
		error: declineError,
	} = useDeclineSpaceRequest();
	const user = useUser({ or: "redirect" });

	useEffect(() => {
		const loadSpaceRequests = async () => {
			const requests = await fetchInvitedSpaces();
			if (requests) {
				setSpaceRequests(requests);
				await fetchSpaceDetails(requests);
			}
		};
		loadSpaceRequests();
	}, [fetchInvitedSpaces]);

	const fetchSpaceDetails = async (requests: SpaceRequest[]) => {
		const { accessToken, refreshToken } = await user.getAuthJson();
		if (!accessToken || !refreshToken) {
			console.error("Access/refresh token are required for the ServiceMethods");
			return;
		}

		const serviceMethods = new ServiceMethods(accessToken, refreshToken);
		const details: SpaceDetailsMap = {};

		for (const request of requests) {
			try {
				const spaceDetail = await serviceMethods.fetchSpaceById(
					request.spaceId,
				);
				details[request.spaceId] = spaceDetail;
			} catch (error) {
				console.error(
					`Error fetching details for space ${request.spaceId}:`,
					error,
				);
			}
		}

		setSpaceDetails(details);
	};

	const handleAccept = async (requestId: string) => {
		const result = await acceptSpaceRequest(requestId);
		if (result) {
			setSpaceRequests((prevRequests) =>
				prevRequests.filter((req) => req.id !== requestId),
			);
		}
	};

	const handleDecline = async (requestId: string) => {
		const result = await declineSpaceRequest(requestId);
		if (result) {
			setSpaceRequests((prevRequests) =>
				prevRequests.filter((req) => req.id !== requestId),
			);
		}
	};

	return (
		<div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
			<h2 className="text-2xl font-bold mb-4 p-4 bg-gray-100">
				Space Invitations
			</h2>
			<div className="divide-y divide-gray-200">
				{spaceRequests.map((request) => (
					<div
						key={request.id}
						className="flex items-center p-4 hover:bg-gray-50"
					>
						<div className="flex-grow">
							<h3 className="font-medium">
								{spaceDetails[request.spaceId]?.name || "Loading space name..."}
							</h3>
							<p className="text-sm text-gray-500">Role: {request.role}</p>
							<p className="text-xs text-gray-400">
								Inviter ID: {request.inviterId}
							</p>
							<p className="text-xs text-gray-400">
								Space ID: {request.spaceId}
							</p>
						</div>
						<div className="flex flex-col space-y-2">
							<button
								type="button"
								onClick={() => handleAccept(request.id)}
								disabled={acceptLoading}
								className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50"
							>
								Accept
							</button>
							<button
								type="button"
								onClick={() => handleDecline(request.id)}
								disabled={declineLoading}
								className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50"
							>
								Decline
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default SpaceRequestsContainer;
