import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useUpdateSpace = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const updateSpace = useCallback(
		async (spaceId: string, spaceName: string, spaceTheme: string) => {
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
				const result = await serviceMethods.fetchUpdateSpace(
					spaceId,
					spaceName,
					spaceTheme,
				);

				return result;
			} catch (err) {
				console.error("Error updating space:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { updateSpace, loading, error };
};
