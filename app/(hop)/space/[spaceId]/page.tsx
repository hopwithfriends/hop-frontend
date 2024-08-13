"use client";

import type React from "react";
import { useEffect, useState } from "react";
import RightSideBar from "@components/space/RightSideBar";
import BottomBar from "@components/space/BottomBar";
import CursorContainer from "@components/space/CursorContainer";
import SetNickname from "@components/space/SetNickname";
import EnterSpace from "@components/space/EnterSpace";

const SpacePage: React.FC = () => {
	const [username, setUsername] = useState<string>(""); // actually nickname, isa will change this later
	const [color, setColor] = useState<string>("");
	const [selectedCursor, setSelectedCursor] = useState<string>("");
	const [member, setMember] = useState<boolean>(true);

	// Get User data /api/user
	const realUsername = "DavilaDawg"; // for testing
  //const realUsername= ""

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!realUsername) {
			setMember(!true);
		}
	}, [realUsername]);

	return (
		<div className="flex h-screen overflow-hidden">
			<main className="flex-grow flex flex-col overflow-hidden relative">
				<div className="relative flex-grow">
					{username ? (
						<CursorContainer
							username={username}
							color={color}
							selectedCursor={selectedCursor}
						/>
					) : member ? (
						<EnterSpace
							onSubmit={setUsername}
							setColorProp={setColor}
							realUsername={realUsername}
						/>
					) : (
						<SetNickname
							onSubmit={setUsername}
							setColorProp={setColor}
							realUsername={realUsername}
						/>
					)}

					<iframe
						className="absolute inset-0 w-full h-full z-10"
						title="vnc"
						src="https://isaaaaaaaaaaaaaaaaa.fly.dev/"
					/>
				</div>
				<BottomBar setSelectedCursor={setSelectedCursor} />
			</main>
			<RightSideBar realUsername={realUsername} />
		</div>
	);
};

export default SpacePage;
