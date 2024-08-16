"use client";

import { useParams } from "next/navigation";
import VncDisplay from "@components/space/FetchFlyURL";
import { useUser } from "@stackframe/stack";
import BottomBar from "@components/space/BottomBar";
import RightSideBar from "@components/space/RightSideBar";
import { ServiceMethods } from "@lib/servicesMethods";
import { useState, useEffect } from "react";
import CursorContainer from "@components/space/CursorContainer";
import SetNickname from "@components/space/SetNickname";
import EnterSpace from "@components/space/EnterSpace";
import Image from "next/image";

const SpacePage: React.FC = () => {
	const params = useParams();
	const spaceId = params.spaceId as string;
	const [username, setUsername] = useState("");
	const [color, setColor] = useState<string>("");
	const [selectedCursor, setSelectedCursor] = useState<string>("");
	const [member, setMember] = useState<boolean>(false);
	const [enterSpace, setEnterSpace] = useState<boolean>(false)
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
				setMember(!false)
			} else {
				const randNum: number = getRandomInt(1, 100);
				setUsername(`anonymous${randNum}`);
			}
		};
		fetchAndSetUserData();
	}, [user]);

	return (
		<div className="flex h-screen flex-col overflow-hidden">
			<Image
				src="/hop.png"
				alt="Logo"
				width={150}
				height={150}
				priority
				className="absolute z-50 left-[9.6%] mt-[21.5%] -rotate-90"
			/>
			<div className="flex flex-grow overflow-hidden">
				<main className="flex-grow flex flex-col">
					<div className="relative flex-grow flex items-center justify-center">
						{enterSpace ? (
							<CursorContainer
								username={username}
								color={color}
								selectedCursor={selectedCursor}
							/>
						) : member ? (
							<EnterSpace
								onSubmit={setEnterSpace}
								setColorProp={setColor}
								realUsername={username}
							/>
						) : (
							<SetNickname
								onSubmit={setEnterSpace}
								setColorProp={setColor}
								realUsername={username}
							/>
						)}
						<VncDisplay spaceId={spaceId} />
					</div>
					<BottomBar setSelectedCursor={setSelectedCursor} />
				</main>
				<RightSideBar />
			</div>
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
// 						 <VncDisplay spaceId={spaceId} />
// 					</div>
// 					<BottomBar setSelectedCursor={setSelectedCursor} />
// 				</main>
// 				<RightSideBar/>
// 			</div>
// 		</div>
// 	);
// };

// export default SpacePage;
