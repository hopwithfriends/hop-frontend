import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useFetchInvitedSpaces = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchInvitedSpaces = useCallback(async () => {
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
			const invitedSpaces = await serviceMethods.fetchInvitedSpace();

			return invitedSpaces;
		} catch (err) {
			console.error("Error fetching invited spaces:", err);

			setLoading(false);
		}
	}, [user]);

	return { fetchInvitedSpaces, loading, error };
};
