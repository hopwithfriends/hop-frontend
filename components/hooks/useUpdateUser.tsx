import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useUpdateUser = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const updateUser = useCallback(
		async (username: string, nickname: string, profilePicture: string) => {
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
				const updatedUser = await serviceMethods.fetchUpdateUser(
					username,
					nickname,
					profilePicture,
				);

				return updatedUser;
			} catch (err) {
				console.error("Error updating user:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while updating user.",
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	return { updateUser, loading, error };
};
