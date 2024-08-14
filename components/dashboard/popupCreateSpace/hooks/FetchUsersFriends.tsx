import { useState, useEffect } from "react";
import { useUser } from "@stackframe/stack";
import { ApiService } from "@lib/services";

interface User {
	id: string;
	nickname: string;
	username: string;
	profilePicture?: string;
}

const useFetchUsers = () => {
	const user = useUser({ or: "redirect" });
	const [users, setUsers] = useState<User[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) {
					throw new Error(
						"Access/refresh token are required for the ApiService",
					);
				}

				const apiService = new ApiService(accessToken, refreshToken);
				const data = await apiService.get("/user/friend");
				setUsers(data);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : "An unknown error occurred",
				);
			} finally {
				setLoading(false);
			}
		};

		fetchUsers();
	}, [user]);

	return { users, loading, error };
};

export default useFetchUsers;
