import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface CreateSpaceParams {
	name: string;
	flyUrl: string;
	userId: string;
	theme: string;
	spaceId: string; // Add this line
	password: string; // Add this line
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
				throw new Error(
					"Access/refresh token are required for the ServiceMethods",
				);
			}

			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			await serviceMethods.fetchCreateSpace(params.name, params.theme);

			setSuccess(true);
			console.log("Space created successfully");
		} catch (error) {
			console.error("Error creating space:", error);
			setError(
				error instanceof Error
					? error.message
					: "An unexpected error occurred while creating the space",
			);
		} finally {
			setLoading(false);
		}
	};

	return { createSpace, loading, error, success };
};

export default useCreateSpace;
