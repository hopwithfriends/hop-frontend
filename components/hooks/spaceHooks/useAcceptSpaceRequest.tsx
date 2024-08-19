import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useAcceptSpaceRequest = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const acceptSpaceRequest = useCallback(
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
				const result = await serviceMethods.fetchAcceptSpaceRequest(requestId);

				return result;
			} catch (err) {
				console.error("Error accepting space request:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while accepting space request.",
				);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[user],
	);

	return { acceptSpaceRequest, loading, error };
};
