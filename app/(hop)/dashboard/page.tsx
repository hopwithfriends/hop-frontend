"use client";
import type React from "react";

import { useUser } from "@stackframe/stack";
import SpaceContainer from "@components/dashboard/SpaceContainer";
import { useEffect, useState } from "react";
import { ServiceMethods } from "@lib/servicesMethods";

interface SpaceContainerProps {
	link?: string;
	members: number;
	screen: string;
	pfp: string;
}

interface UserDataType {
	userId: string;
	username: string;
	nickname: string;
	profilePicture: string;
}

const Dashboard: React.FC<SpaceContainerProps> = ({
	link,
	members,
	screen,
	pfp,
}) => {
	const user = useUser({ or: "redirect" });
	const [userData, setUserData] = useState<UserDataType>();

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
			console.log("dash userdata:", userData) 
			return userData;
		}
		fetchData();
	}, []);

	link = "link placeholder"; // ??
	members = 4;
	screen = "/placeholder.jpg"; // ??
	//pfp = "/PFP.jpg";

	return (
		<div className="flex bg-gray-700 text-white h-screen">
			<SpaceContainer
				screen={screen}
				pfp={userData?.profilePicture}
				link={link}
				members={members}
				realUsername={userData?.username || ""}
			/>
		</div>
	);
};

export default Dashboard;
