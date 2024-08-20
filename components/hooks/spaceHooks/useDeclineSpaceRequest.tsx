import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useDeclineSpaceRequest = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const declineSpaceRequest = useCallback(
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
				const result = await serviceMethods.fetchDeclineSpaceRequest(requestId);

				return result;
			} catch (err) {
				console.error("Error declining space request:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while declining space request.",
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	return { declineSpaceRequest, loading, error };
};
