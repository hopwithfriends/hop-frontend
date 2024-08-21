import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useFetchSpaceOwner = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchSpaceOwner = useCallback(
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
				const spaceOwner = await serviceMethods.fetchSpaceOwner(spaceId);

				return spaceOwner;
			} catch (err) {
				console.error("Error fetching space owner:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { fetchSpaceOwner, loading, error };
};
