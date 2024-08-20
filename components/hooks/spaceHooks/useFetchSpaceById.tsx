import { useState, useCallback } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface Space {
	flyUrl: string;
	id: string;
	name: string;
	theme: string;
	password: string;
}

export const useFetchSpaceById = () => {
	const [space, setSpace] = useState<Space | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const user = useUser({ or: "redirect" });

	const fetchSpace = useCallback(
		async (spaceId: string) => {
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
				const response = await serviceMethods.fetchSpaceById(spaceId);

				if (response && typeof response === "object") {
					setSpace(response as Space);
				} else {
					throw new Error("Invalid response format");
				}
			} catch (err) {
				console.error("Error fetching space:", err);

				setLoading(false);
			}
		},
		[user],
	);

	return { fetchSpace, space, loading, error };
};
