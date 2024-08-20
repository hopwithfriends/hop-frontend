import { useEffect, useState } from "react";
import { useAcceptFriendRequest } from "@components/hooks/friendHooks/useAcceptFriendRequest";
import { useDeclineFriendRequest } from "@components/hooks/friendHooks/useDeclineFriendRequest";
import { useFetchFriendRequests } from "@components/hooks/friendHooks/useFetchFriendRequests";
import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";

interface FriendRequest {
	id: string;
	userId: string;
	friendId: string;
}

interface UserDetails {
	id: string;
	username: string;
}

interface UserDetailsMap {
	[userId: string]: UserDetails;
}

const FriendRequestsContainer: React.FC = () => {
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [userDetails, setUserDetails] = useState<UserDetailsMap>({});
	const {
		fetchFriendRequests,
		loading: fetchLoading,
		error: fetchError,
	} = useFetchFriendRequests();
	const {
		acceptFriendRequest,
		loading: acceptLoading,
		error: acceptError,
	} = useAcceptFriendRequest();
	const {
		declineFriendRequest,
		loading: declineLoading,
		error: declineError,
	} = useDeclineFriendRequest();
	const user = useUser({ or: "redirect" });

	useEffect(() => {
		const loadFriendRequests = async () => {
			const requests = await fetchFriendRequests();
			if (requests) {
				setFriendRequests(requests);
				await fetchUserDetails(requests);
			}
		};
		loadFriendRequests();
	}, [fetchFriendRequests]);

	const fetchUserDetails = async (requests: FriendRequest[]) => {
		const { accessToken, refreshToken } = await user.getAuthJson();
		if (!accessToken || !refreshToken) {
			console.error("Access/refresh token are required for the ServiceMethods");
			return;
		}

		const serviceMethods = new ServiceMethods(accessToken, refreshToken);
		const details: UserDetailsMap = {};

		for (const request of requests) {
			try {
				const userDetail = await serviceMethods.fetchUser();
				details[request.friendId] = userDetail;
			} catch (error) {
				console.error(
					`Error fetching details for user ${request.friendId}:`,
					error,
				);
			}
		}

		setUserDetails(details);
	};

	const handleAccept = async (requestId: string) => {
		const result = await acceptFriendRequest(requestId);
		if (result) {
			setFriendRequests((prevRequests) =>
				prevRequests.filter((req) => req.id !== requestId),
			);
		}
	};

	const handleDecline = async (requestId: string) => {
		const result = await declineFriendRequest(requestId);
		if (result) {
			setFriendRequests((prevRequests) =>
				prevRequests.filter((req) => req.id !== requestId),
			);
		}
	};

	if (fetchLoading)
		return <div className="text-center py-4">Loading friend requests...</div>;
	if (fetchError)
		return (
			<div className="text-center py-4 text-red-500">Error: {fetchError}</div>
		);

	return (
		<div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
			<h2 className="text-2xl font-bold mb-4 p-4 bg-gray-100">
				Friend Requests
			</h2>
			<div className="divide-y divide-gray-200">
				{friendRequests.map((request) => (
					<div
						key={request.id}
						className="flex items-center p-4 hover:bg-gray-50"
					>
						<div className="flex-grow">
							<h3 className="font-medium">
								{userDetails[request.friendId]?.username ||
									"Loading username..."}
							</h3>
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
			{acceptError && (
				<div className="p-4 text-red-500">
					Error accepting request: {acceptError}
				</div>
			)}
			{declineError && (
				<div className="p-4 text-red-500">
					Error declining request: {declineError}
				</div>
			)}
		</div>
	);
};

export default FriendRequestsContainer;
