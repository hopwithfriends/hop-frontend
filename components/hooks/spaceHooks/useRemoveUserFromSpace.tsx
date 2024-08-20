import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

export const useRemoveUserFromSpace = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const removeUserFromSpace = async (spaceId: string, userId: string) => {
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
			await serviceMethods.fetchRemoveUserFromSpace(spaceId, userId);

			return true;
		} catch (err) {
			console.error("Error removing user from space:", err);

			setLoading(false);
		}
	};

	return { removeUserFromSpace, loading, error };
};
