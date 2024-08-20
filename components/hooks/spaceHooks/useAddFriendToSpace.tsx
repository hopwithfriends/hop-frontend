import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface AddFriendToSpaceResult {
	success: boolean;
	message?: string;
}

export const useAddFriendToSpace = () => {
	const [result, setResult] = useState<AddFriendToSpaceResult | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const addFriendToSpace = useCallback(
		async (friendId: string, spaceId: string, role: string) => {
			setLoading(true);
			setError(null);
			setResult(null);

			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) {
					throw new Error(
						"Access/refresh token are required for the ServiceMethods",
					);
				}

				const serviceMethods = new ServiceMethods(accessToken, refreshToken);
				const response = await serviceMethods.fetchSendSpaceRequests(
					friendId,
					spaceId,
					role,
				);

				if (response && typeof response === "object") {
					setResult({
						success: true,
						message: "Friend successfully added to space",
					});
				} else {
					throw new Error("Invalid response format");
				}
			} catch (err) {
				console.error("Error adding friend to space:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { addFriendToSpace, result, loading, error };
};
