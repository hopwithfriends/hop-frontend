import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface User {
	id: string;
}

export const useFetchUserId = () => {
	const [userId, setUserId] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchUserId = useCallback(async () => {
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
			const userInfo: User = await serviceMethods.fetchUser();

			setUserId(userInfo.id);
			return userInfo.id;
		} catch (err) {
			console.error("Error fetching user information:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching user ID.",
			);
			return null;
		} finally {
			setLoading(false);
		}
	}, [user]);

	return { fetchUserId, userId, loading, error };
};
