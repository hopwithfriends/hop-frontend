import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useFetchFriendRequests = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchFriendRequests = useCallback(async () => {
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
			const friendRequests = await serviceMethods.fetchAllFriendRequests();

			return friendRequests;
		} catch (err) {
			console.error("Error fetching friend requests:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching friend requests.",
			);
			return null;
		} finally {
			setLoading(false);
		}
	}, [user]);

	return { fetchFriendRequests, loading, error };
};
