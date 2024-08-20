import { useState, useEffect } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface Friend {
	id: string;
	nickname: string;
	username: string;
}

export const useFetchFriends = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchFriends = async () => {
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
			const response = await serviceMethods.fetchAllFriends();

			if (Array.isArray(response)) {
				setFriends(response);
			} else {
				setFriends([]);
			}
		} catch (err) {
			console.error("Error fetching friends:", err);

			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchFriends();
	}, [user]);

	return { friends, loading, error, refetchFriends: fetchFriends };
};
