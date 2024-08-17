import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface User {
	id: string;
	username: string;
}

export const useAddFriendToSpace = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const user = useUser({ or: "redirect" });

	const searchUsers = async (query: string) => {
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
			const results = await serviceMethods.searchUsers(query);

			setSearchResults(results);
		} catch (err) {
			console.error("Error searching users:", err);
			setError(
				err instanceof Error
					? err.message
					: "Failed to search users. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	const addFriendToSpace = async (spaceId: string, friendId: string) => {
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
			await serviceMethods.fetchAddFriendToSpace(spaceId, friendId, "member");

			console.log("Friend added to space successfully");
		} catch (err) {
			console.error("Error adding friend to space:", err);
			setError(
				err instanceof Error
					? err.message
					: "Failed to add friend to space. Please try again.",
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { addFriendToSpace, searchUsers, searchResults, loading, error };
};
