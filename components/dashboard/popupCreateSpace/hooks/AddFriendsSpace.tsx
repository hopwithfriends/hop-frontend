import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { ApiService } from "@lib/services";

interface AddUserToSpaceParams {
	spaceId: string;
	userId: string;
	role: string;
}

interface AddUserToSpaceResult {
	addUser: (params: AddUserToSpaceParams) => Promise<void>;
	loading: boolean;
	error: string | null;
	success: boolean;
}

const useAddUserToSpace = (): AddUserToSpaceResult => {
	const user = useUser({ or: "redirect" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const addUser = async (params: AddUserToSpaceParams) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error("Access/refresh token are required for the ApiService");
			}

			const apiService = new ApiService(accessToken, refreshToken);
			await apiService.post("/space/addUser", params);

			setSuccess(true);
			console.log("User added successfully");
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred",
			);
		} finally {
			setLoading(false);
		}
	};

	return { addUser, loading, error, success };
};

export default useAddUserToSpace;
