import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { ApiService } from "@lib/services";

interface CreateSpaceParams {
	name: string;
	flyUrl: string;
	userId: string;
	theme: string;
}

interface CreateSpaceResult {
	createSpace: (params: CreateSpaceParams) => Promise<void>;
	loading: boolean;
	error: string | null;
	success: boolean;
}

const useCreateSpace = (): CreateSpaceResult => {
	const user = useUser({ or: "redirect" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const createSpace = async (params: CreateSpaceParams) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) {
				throw new Error("Access/refresh token are required for the ApiService");
			}

			const apiService = new ApiService(accessToken, refreshToken);
			await apiService.post("/space", params);

			setSuccess(true);
			console.log("Space created successfully");
		} catch (error) {
			setError(
				error instanceof Error ? error.message : "An unknown error occurred",
			);
		} finally {
			setLoading(false);
		}
	};

	return { createSpace, loading, error, success };
};

export default useCreateSpace;
