"use client";
import type React from "react";

import { useUser } from "@stackframe/stack";
import SpaceContainer from "@components/dashboard/SpaceContainer";
import { useEffect, useState } from "react";
import { ServiceMethods, type UserType } from "@lib/servicesMethods";

const Dashboard: React.FC = () => {
	const user = useUser({ or: "redirect" });
	const [userData, setUserData] = useState<UserType>();

	const fallBackProfilePicture =
		"https://res.cloudinary.com/dksp40fgp/image/upload/v1723767101/oklypy7hrfwisbjnxwaw.png";

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		console.log(user.id);
		async function fetchData() {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const serviceMethods = new ServiceMethods(
				accessToken || "",
				refreshToken || "",
			);
			const userDataReq = await serviceMethods.fetchUser();
			setUserData(userDataReq);
			console.log("dash userdata:", userData);
			return userData;
		}
		fetchData();
	}, []);

	return (
		<div className="flex bg-hop-secondary-bg text-white h-screen">
			<SpaceContainer
				profilePicture={userData?.profilePicture || fallBackProfilePicture}
				username={userData?.username || ""}
			/>
		</div>
	);
};

export default Dashboard;
