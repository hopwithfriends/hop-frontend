import { useState, useEffect } from "react";

interface User {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
}

const FetchUsersFriends = (userId: string) => {
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const useFetchUsersFriends = async () => {
			try {
				const response = await fetch(
					`http://localhost:8080/api/user/friend/${userId}`,
				);
				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}
				const data = await response.json();
				setUsers(data);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "An unknown error occurred",
				);
			} finally {
				setLoading(false);
			}
		};

		useFetchUsersFriends();
	}, [userId]);

	return { users, loading, error };
};

export default FetchUsersFriends;
