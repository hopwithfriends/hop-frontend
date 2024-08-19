import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useUpdateSpaceRole = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const updateSpaceRole = useCallback(
		async (spaceId: string, userId: string, role: string) => {
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
				const result = await serviceMethods.fetchUpdateSpaceRole(
					spaceId,
					userId,
					role,
				);

				return result;
			} catch (err) {
				console.error("Error updating space role:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while updating space role.",
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	return { updateSpaceRole, loading, error };
};
