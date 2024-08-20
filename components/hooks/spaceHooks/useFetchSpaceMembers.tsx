import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useFetchSpaceMembers = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchSpaceMembers = useCallback(
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
				const spaceMembers = await serviceMethods.fetchSpaceMembers(spaceId);

				return spaceMembers;
			} catch (err) {
				console.error("Error fetching space members:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { fetchSpaceMembers, loading, error };
};
