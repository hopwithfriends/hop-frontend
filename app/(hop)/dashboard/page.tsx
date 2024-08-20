"use client";
import type React from "react";

import { useUser } from "@stackframe/stack";
import SpaceContainer from "@components/dashboard/SpaceContainer";
import { useEffect, useState } from "react";
import { ServiceMethods, type UserType } from "@lib/servicesMethods";
import LoadingSpinner from "@components/ui/Spiner";

const Dashboard: React.FC = () => {
	const user = useUser({ or: "redirect" });
	const [userData, setUserData] = useState<UserType>();
	const [loading, setLoading] = useState(true);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchData = async () => {
			try {
				const { accessToken, refreshToken } = await user.getAuthJson();
				if (!accessToken || !refreshToken) return;

				const serviceMethods = new ServiceMethods(accessToken, refreshToken);
				const userDataReq = await serviceMethods.fetchUser();
				setUserData(userDataReq);
			} catch (error) {
				console.log("Error fetching user data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex bg-hop-secondary-bg text-white h-screen">
			{!loading && userData ? (
				<SpaceContainer
					profilePicture={userData.profilePicture || "/fallback.png"}
					username={userData.username || ""}
				/>
			) : (
				<div className="ml-[43%]">
					<LoadingSpinner border="border-white" />
				</div>
			)}
		</div>
	);
};

export default Dashboard;
