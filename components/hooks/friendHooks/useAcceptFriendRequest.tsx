import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useAcceptFriendRequest = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const acceptFriendRequest = useCallback(
		async (requestId: string) => {
			setLoading(true);
			setError(null);

			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) {
					throw new Error(
						"Access/refresh token are required for the ServiceMethods",
					);
				}

				const serviceMethods = new ServiceMethods(accessToken, refreshToken);
				const result = await serviceMethods.fetchAcceptFriendRequest(requestId);

				return result;
			} catch (err) {
				console.error("Error accepting friend request:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { acceptFriendRequest, loading, error };
};
