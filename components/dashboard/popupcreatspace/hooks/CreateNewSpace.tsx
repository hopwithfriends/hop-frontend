import { useState } from "react";

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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const createSpace = async (params: CreateSpaceParams) => {
		setLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await fetch("http://localhost:8080/api/space", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(params),
			});

			if (!response.ok) {
				throw new Error("Failed to create space");
			}

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
