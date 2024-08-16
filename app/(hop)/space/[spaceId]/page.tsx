"use client";

import { useParams } from "next/navigation";
import VncDisplay from "@components/space/FetchFlyURL";
import { useUser } from "@stackframe/stack";
import BottomBar from "@components/space/BottomBar";
import RightSideBar from "@components/space/RightSideBar";
import { ServiceMethods } from "@lib/servicesMethods";
import { useState, useEffect } from "react";

const SpacePage: React.FC = () => {
	const params = useParams();
	const spaceId = params.spaceId as string;
	const [username, setUsername] = useState("");
	const [selectedCursor, setSelectedCursor] = useState<string>("");
	const user = useUser({ or: "redirect" });

	const fetch = async () => {
		try {
			const { accessToken, refreshToken } = await user.getAuthJson();
			if (!accessToken || !refreshToken) return null;
			const serviceMethods = new ServiceMethods(accessToken, refreshToken);
			const result = await serviceMethods.fetchUser();
			return result;
		} catch (error) {
			console.error("Error during submission:", error);
		}
	};

	function getRandomInt(min: number, max: number) {
		const minimum = Math.ceil(min);
		const maximum = Math.floor(max);
		return Math.floor(Math.random() * (maximum - minimum + 1)) + min;
	}


	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const fetchAndSetUserData = async () => {
			const result = await fetch();
			if (result) {
				setUsername(result.username);
			} else {
				const randNum: number = getRandomInt(1,100)
				setUsername(`anonymous${randNum}`)
			}
		};
		fetchAndSetUserData();
	}, [user]);



	return (
		<div className="flex h-screen overflow-hidden">
			<main className="flex-grow flex flex-col overflow-hidden relative">
				<VncDisplay spaceId={spaceId} />
				<BottomBar setSelectedCursor={setSelectedCursor} />
			</main>
			<RightSideBar />
		</div>
	);
};

export default SpacePage;

// "use client";

// import type React from "react";
// import { useEffect, useState } from "react";
// import RightSideBar from "@components/space/RightSideBar";
// import BottomBar from "@components/space/BottomBar";
// import CursorContainer from "@components/space/CursorContainer";
// import SetNickname from "@components/space/SetNickname";
// import EnterSpace from "@components/space/EnterSpace";
// import Image from "next/image";

// const SpacePage: React.FC = () => {
// 	const [username, setUsername] = useState<string>(""); // actually nickname, isa will change this later
// 	const [color, setColor] = useState<string>("");
// 	const [selectedCursor, setSelectedCursor] = useState<string>("");
// 	const [member, setMember] = useState<boolean>(true);

// 	// Get User data /api/user
// 	//const realUsername = "DavilaDawg"; // for testing
// 	const realUsername = "";

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		if (!realUsername) {
// 			setMember(!true);
// 		}
// 	}, [realUsername]);

// 	return (
// 		<div>
// 			{/* {!username ? (
// 				<Image
// 					src="/hop.png"
// 					alt="Logo"
// 					width={150}
// 					height={150}
// 					priority
// 					className="absolute z-50 left-[9.6%] mt-[21.5%] -rotate-90"
// 				/>
// 			) : (
// 				""
// 			)} */}
// 			<div className="flex h-screen overflow-hidden">
// 				<main className="flex-grow flex flex-col overflow-hidden relative">
// 					<div className="relative flex-grow">
// 						{/* {username ? (
// 							<CursorContainer
// 								username={username}
// 								color={color}
// 								selectedCursor={selectedCursor}
// 							/>
// 						) : member ? (
// 							<EnterSpace
// 								onSubmit={setUsername}
// 								setColorProp={setColor}
// 								realUsername={realUsername}
// 							/>
// 						) : (
// 							<SetNickname
// 								onSubmit={setUsername}
// 								setColorProp={setColor}
// 								realUsername={realUsername}
// 							/>
// 						)} */}
// 						<iframe
// 							className="absolute inset-0 w-full h-full z-10"
// 							title="vnc"
// 							src="https://tencent-1b168ad3-0cf0-4791-8cf4-30fcc99e439e.fly.dev"
// 						/>
// 					</div>
// 					<BottomBar setSelectedCursor={setSelectedCursor} />
// 				</main>
// 				<RightSideBar realUsername={realUsername} />
// 			</div>
// 		</div>
// 	);
// };

// export default SpacePage;
