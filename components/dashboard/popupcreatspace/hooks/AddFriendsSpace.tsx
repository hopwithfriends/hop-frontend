import { useState } from "react";

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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const addUser = async (params: AddUserToSpaceParams) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch("http://localhost:8080/api/space/addUser", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				throw new Error("Failed to add user");
			}

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
