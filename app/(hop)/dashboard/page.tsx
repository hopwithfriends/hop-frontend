"use client";
import { useUser } from "@stackframe/stack";
import SpaceContainer from "@components/dashboard/SpaceContainer";
import { useEffect } from "react";

const Dashboard: React.FC = () => {
	const user = useUser({ or: "redirect" });
	useEffect(() => {
		async function fetchUser() {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const res = await fetch("https://hop-backend.fly.dev/api/user", {
				headers: {
					"x-stack-access-token": accessToken ?? "",
					"x-stack-refresh-token": refreshToken ?? "",
				},
			});

			if (res.ok) {
				const data = await res.json();
				console.log(data);
			} else {
				console.error("Failed to fetch user data");
			}
		}
		fetchUser();
	}, [user]);

	const link = "link placeholder";
	const members = 4;
	const screen = "/placeholder.jpg";
	const pfp = "/PFP.jpg";

	return (
		<div className="flex bg-gray-700 text-white h-screen">
			<SpaceContainer screen={screen} pfp={pfp} link={link} members={members} />
		</div>
	);
};

export default Dashboard;
