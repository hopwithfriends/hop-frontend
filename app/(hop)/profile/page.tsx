"use client";
import { ServiceMethods, type UserType } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

// ! ========== WARNING ===========
// ! We need to implement profile page using stack's profile component
// ! Ask Haroon for more info on this
// ! ==============================

const ProfilePage = () => {
	const user = useUser({ or: "redirect" });
	const [userData, setUserData] = useState<UserType>();
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState();
	const [nickname, setNickname] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	useEffect(() => {
		const getUserData = async () => {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const userData = await serviceMethods.fetchUser();
			setUserData(userData);
			setLoading(false);
		};
		getUserData();
	}, [user.getAuthJson]);

	async function handleUserDataForm() {}

	return (
		<div className="bg-hop-secondary-bg h-screen pt-16 pl-12">
			<h1 className="text-5xl font-bold text-white">My Profile</h1>
			<div className="flex mt-8 gap-20">
				<div>
					<div className="bg-hop-friend-bg rounded-3xl w-fit">
						<div className="p-10">
							<Image
								src={userData?.profilePicture || ""}
								alt="profile"
								width={120}
								height={120}
								className="rounded-full"
							/>
							<div className="flex items-center gap-3 mt-3 mb-3">
								<span className="text-5xl font-bold text-white">
									@{userData?.username}
								</span>
								<span className="text-xl mt-2 font-bold text-hop-text-purple">
									{userData?.nickname}
								</span>
							</div>
							<button
								type="button"
								className="bg-hop-light-purple mt-2 text-white font-semibold px-5 py-2 rounded-lg text-lg tracking-wide"
							>
								https://hop.com/add/@{userData?.nickname}
							</button>
						</div>
					</div>
					<div className="mt-10 flex flex-col gap-2">
						<button
							type="submit"
							className="text-hop-text-purple w-full font-bold bg-hop-purple-300 hover:bg-hop-purple-200 hover:text-white transition-all duration-200 mt-1 py-4 rounded-lg text-xl"
							onClick={() => {
								user.signOut();
							}}
						>
							connect discord
						</button>
						<button
							type="submit"
							className="text-hop-text-purple w-full font-bold bg-hop-purple-300 hover:bg-hop-purple-200 hover:text-white transition-all duration-200 mt-1 py-4 rounded-lg text-xl"
							onClick={() => {
								user.signOut();
							}}
						>
							log out
						</button>
					</div>
				</div>
				<form
					className="flex flex-col gap-4 w-1/3"
					onSubmit={handleUserDataForm}
				>
					<div className="flex flex-col gap-2">
						<label className="text-white" htmlFor="username">
							username
						</label>
						<input
							type="text"
							placeholder={userData?.username}
							id="username"
							className="bg-hop-friend-bg px-5 py-4 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-white" htmlFor="nickname">
							nickname
						</label>
						<input
							type="text"
							placeholder={userData?.nickname}
							id="nickname"
							className="bg-hop-friend-bg px-5 py-4 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-white" htmlFor="email">
							email
						</label>
						<input
							type="email"
							placeholder={user.primaryEmail}
							id="email"
							className="bg-hop-friend-bg px-5 py-4 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
						/>
					</div>
					<div className="flex flex-col gap-2">
						<label className="text-white" htmlFor="password">
							password
						</label>
						<input
							type="password"
							placeholder="••••••••••"
							id="password"
							className="bg-hop-friend-bg px-5 py-4 rounded-md text-white text-2xl placeholder:text-white focus:outline-none"
						/>
					</div>
					{/* <label htmlFor="password">password</label>
				<input type="text" placeholder="Password" id="password" /> */}
					<button
						type="submit"
						className="text-white font-bold bg-gradient-to-r from-purp-grad-1 to-purp-grad-2 mt-1 py-4 rounded-lg text-xl"
					>
						save changes
					</button>
				</form>
			</div>
		</div>
	);
};

export default ProfilePage;
