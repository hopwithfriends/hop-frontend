import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useRemoveSpace = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const removeSpace = useCallback(
		async (spaceId: string) => {
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
				const result = await serviceMethods.fetchRemoveSpace(spaceId);

				return result;
			} catch (err) {
				console.error("Error removing space:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { removeSpace, loading, error };
};
