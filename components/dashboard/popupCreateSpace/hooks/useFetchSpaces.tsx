import { useState, useEffect } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface Space {
	flyUrl: string;
	id: string;
	name: string;
	theme: string;
	password: string;
}

export const useFetchSpaces = () => {
	const [spaces, setSpaces] = useState<Space[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchSpaces = async () => {
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
			const response = await serviceMethods.fetchUserSpaces();

			if (Array.isArray(response) && response.length > 0) {
				setSpaces(response);
			} else {
				setSpaces([]);
			}
		} catch (err) {
			console.error("Error fetching user spaces:", err);
			setError(
				err instanceof Error
					? err.message
					: "An unexpected error occurred while fetching user spaces.",
			);
		} finally {
			setLoading(false);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchSpaces();
	}, [user]);

	return { spaces, loading, error, refetchSpaces: fetchSpaces };
};
