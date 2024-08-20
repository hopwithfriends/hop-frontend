"use client";
import { ServiceMethods, type UserType } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import { useEffect, useState } from "react";

// ! ========== WARNING ===========
// ! We need to implement profile page using stack's profile component
// ! Ask Haroon for more info on this
// ! ==============================

const ProfilePage = () => {
	const user = useUser({ or: "redirect" });
	const [userData, setUserData] = useState<UserType>();

	useEffect(() => {
		const getUserData = async () => {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const userData = await serviceMethods.fetchUser();
			setUserData(userData);
		};
		getUserData();
	});

	return (
		<div className="bg-hop-secondary-bg h-screen">
			<h1 className="text-5xl font-bold text-white">Profile</h1>
			<div>
				<Image
					src={userData?.profilePicture || ""}
					alt="profile"
					width={100}
					height={100}
					className="rounded-full"
				/>
			</div>
			<form className="flex flex-col gap-4 w-1/3">
				<div className="flex flex-col gap-2">
					<label className="text-white" htmlFor="username">
						username
					</label>
					<input
						type="text"
						placeholder="username"
						id="username"
						className="bg-hop-friend-bg px-3 py-3 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-white" htmlFor="nickname">
						nickname
					</label>
					<input
						type="text"
						placeholder="nickname"
						id="nickname"
						className="bg-hop-friend-bg px-3 py-3 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-white" htmlFor="email">
						email
					</label>
					<input
						type="text"
						placeholder="email"
						id="email"
						className="bg-hop-friend-bg px-3 py-3 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label className="text-white" htmlFor="password">
						password
					</label>
					<input
						type="text"
						placeholder="password"
						id="password"
						className="bg-hop-friend-bg px-3 py-4 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
					/>
				</div>
				{/* <label htmlFor="password">password</label>
				<input type="text" placeholder="Password" id="password" /> */}
				<button
					type="submit"
					className="text-white bg-gradient-to-r from-purp-grad-1 to-purp-grad-2 mt-1 py-4 rounded-lg text-xl"
				>
					save changes
				</button>
			</form>
		</div>
	);
};

export default ProfilePage;
