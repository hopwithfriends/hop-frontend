import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useAddFriend = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const addFriend = useCallback(
		async (username: string) => {
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
				const result = await serviceMethods.fetchAddFriend(username);

				return result;
			} catch (err) {
				console.error("Error adding friend:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while adding friend.",
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	return { addFriend, loading, error };
};
