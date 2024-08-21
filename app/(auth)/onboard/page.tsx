"use client";

import { useUser } from "@stackframe/stack";
import type React from "react";
import { useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import dotenv from "dotenv";
dotenv.config();
import "@styles/globals.css";

const Onboard: React.FC = () => {
	const [username, setUsername] = useState("");
	const [nickname, setNickname] = useState("");
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [error, setError] = useState("");
	const user = useUser({ or: "redirect" });
	const router = useRouter();

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (username.trim() === "" || nickname.trim() === "" || !selectedImage) {
			setError("All fields are required.");
			return;
		}

		setError("");

		try {
			const formData = new FormData();
			formData.append("username", username);
			formData.append("nickname", nickname);
			if (selectedImage) {
				formData.append("profilePicture", selectedImage);
			}

			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return null;
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"}/api/user`,
				{
					headers: {
						"x-stack-access-token": accessToken,
						"x-stack-refresh-token": refreshToken,
					},
					method: "PUT",
					body: formData,
				},
			);

			if (!response.ok) {
				throw new Error("Network response was not ok");
			}

			const updatedUser = await response.json();
			console.log("User updated:", updatedUser);
			router.push("/dashboard");
		} catch (error) {
			console.error("Error during submission:", error);
			setError("An error occurred while updating your information.");
		}
	};

	const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedImage(file);
		}
	};

	return (
		<div className="max-w-md mx-auto p-6 bg-hop-purple-300 rounded-lg shadow-md mt-96">
			<form id="updateUserForm" onSubmit={handleSubmit}>
				<img
					src="/images/hop-box-wordmark.png"
					alt="Hop Box Wordmark"
					className=" mb-4 container mx-auto h-16 w-auto"
				/>

				<div className="mb-4">
					<label
						htmlFor="username"
						className="block text-lg  font-semibold text-hop-text-purple"
					>
						Username:
					</label>
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full mt-1 p-2 text-white border border-hidden bg-gradient-to-tr from-purp-grad-1 to-purp-grad-2 outline-none rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="nickname"
						className="block text-lg  font-semibold text-hop-text-purple"
					>
						Nickname:
					</label>
					<input
						type="text"
						id="nickname"
						name="nickname"
						value={nickname}
						onChange={(e) => setNickname(e.target.value)}
						className="w-full mt-1 p-2 border text-white border-hidden bg-gradient-to-tr from-purp-grad-1 to-purp-grad-2 outline-none rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="profilePicture"
						className="block text-lg  font-semibold text-hop-text-purple"
					>
						Profile Picture:
					</label>
					<div className="flex items-center mt-1">
						<label
							htmlFor="profilePicture"
							className="cursor-pointer px-4 py-2 hover:bg-hop-purple-400 bg-hop-purple-600 border-2 border-hop-friend-bg text-hop-text-purple rounded-md font-semibold"
						>
							Choose file
						</label>
						<input
							type="file"
							id="profilePicture"
							name="profilePicture"
							accept="image/*"
							onChange={handleImageUpload}
							className="hidden"
						/>
						<span className="ml-2 text-hop-text-purple">
							{selectedImage ? selectedImage.name : "No file chosen"}
						</span>
					</div>
				</div>

				{error && <p className="text-red-500 text-sm mb-4">{error}</p>}

				<button
					type="submit"
					className="w-full text-xl font-semibold text-hop-text-purple px-24 py-2  p-2 rounded-md  bg-gradient-to-tr from-purp-grad-1 to-purp-grad-2  "
				>
					Update User
				</button>
			</form>
		</div>
	);
};

export default Onboard;
