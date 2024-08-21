import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useRemoveFriend = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const removeFriend = useCallback(
		async (friendId: string) => {
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
				const result = await serviceMethods.fetchRemoveFriend(friendId);

				return result;
			} catch (err) {
				console.error("Error removing friend:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { removeFriend, loading, error };
};
