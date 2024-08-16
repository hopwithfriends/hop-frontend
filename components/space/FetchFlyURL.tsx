"use client";

import { useState, useEffect } from "react";
import { useUser } from "@stackframe/stack";
import { ServiceMethods } from "@lib/servicesMethods";

interface VncDisplayProps {
	spaceId: string;
}

const VncDisplay: React.FC<VncDisplayProps> = ({ spaceId }) => {
	const user = useUser({ or: "redirect" });
	const [flyUrl, setFlyUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// biome-ignore lint/style/useConst: <explanation>
		let interval: NodeJS.Timeout;

		const fetchSpaceData = async () => {
			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) {
					throw new Error(
						"Access/refresh token are required for the ServiceMethods",
					);
				}

				const serviceMethods = new ServiceMethods(accessToken, refreshToken);
				const response = await serviceMethods.fetchSpaceById(spaceId);

				console.log("Space data:", response);

				if (response.flyUrl) {
					setFlyUrl(response.flyUrl);
					setLoading(false);
					clearInterval(interval);
				}
			} catch (err) {
				console.error("Error fetching space data:", err);
				setError(
					err instanceof Error
						? err.message
						: "An unexpected error occurred while fetching space data.",
				);
				setLoading(false);
				clearInterval(interval);
			}
		};

		fetchSpaceData();

		interval = setInterval(fetchSpaceData, 5000); // every 5 seconds

		return () => clearInterval(interval); // unmount
	}, [user, spaceId]);

	if (loading) {
		return <div>Loading space data...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="relative flex-grow">
			{flyUrl ? (
				<iframe
					className="absolute inset-0 w-full h-full z-10"
					title="vnc"
					src={flyUrl}
				/>
			) : (
				<div>Waiting for VNC to be ready...</div>
			)}
		</div>
	);
};

export default VncDisplay;
