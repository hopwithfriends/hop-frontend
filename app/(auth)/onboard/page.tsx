"use client";

import { ServiceMethods } from "@lib/servicesMethods";
import { useUser } from "@stackframe/stack";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Onboard: React.FC = () => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [error, setError] = useState("");
	const user = useUser({ or: "redirect" });
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		if (username.trim() === "" || nickname.trim() === "" || imageUrl === null) {
			setError("All fields are required.");
			return;
		}

		setError("");

		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			await serviceMethods.fetchUpdateUser(username, nickname, imageUrl);

			router.push("/dashboard");
		} catch (error) {
			console.error("Error during submission:", error);
			setError("An error occurred while updating your information.");
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-[10%]">
			<div className="flex flex-col items-center space-y-4">
				<h2 className="text-2xl font-bold">Set Profile Picture</h2>
				<input
					type="text"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
					placeholder="Enter image URL"
					className="mt-4 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>

			<h2 className="text-2xl mb-4 mt-10 font-bold">
				Set Username and Nickname
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex flex-col">
					<label
						htmlFor="username"
						className="text-sm font-medium text-gray-700"
					>
						Username:
					</label>
					<input
						type="text"
						id="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Enter your username"
						className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="nickname"
						className="text-sm font-medium text-gray-700"
					>
						Nickname:
					</label>
					<input
						type="text"
						id="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						placeholder="Enter your nickname"
						className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				{error && <p className="text-red-500 text-sm">{error}</p>}
				<button
					type="submit"
					className="w-full py-2 px-4 bg-blue-500 text-white rounded-md shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Onboard;
