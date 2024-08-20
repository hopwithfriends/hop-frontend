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

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		async function fetchData() {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const serviceMethods = new ServiceMethods(
				accessToken || "",
				refreshToken || "",
			);
			const userDataReq = await serviceMethods.fetchUser();
			setUserData(userDataReq);
			return userData;
		}
		fetchData();
	}, []);
	
	const color = "border-white"

	return (
		<div className="flex bg-hop-secondary-bg text-white h-screen">
			{userData ? (
				<SpaceContainer
					profilePicture={userData.profilePicture}
					username={userData.username}
				/>
			) : (
				<div className= "ml-[43%]">
					<LoadingSpinner border={color}/>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
